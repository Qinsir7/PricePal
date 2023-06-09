// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "interface/IGasPriceGetter.sol";
import "AxiomGasPriceGetter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/automation/AutomationCompatibleInterface.sol";

contract PricePal {
    
    AxiomGasPriceGetter axiomGasPriceGetter;

    address admin;
    // uint8
    enum orderType{
        shortTerm,
        mediumTerm,
        longTerm
    }
    enum orderLevel{
        normal,
        advanced
    }
    // TODO 
    // 1.insured
    struct Order{
        orderType Type;
        orderLevel Level;
        uint256 startTime;
        uint256 endTime;
        uint256 triggerValue;
        uint256 maxValue;
        uint256 rate;
        bool exists;
        bool isExpired;
    }

    uint256 constant public DENOMINATOR = 1000;
    uint256 public minOrderValue = 1000;
    uint256 public maxOrderValue = 10000;
    uint256 public cash = 0.1 ether;

    mapping(address => Order) public userOrder;
    mapping(orderType => uint256) public orderRate;
    mapping(orderType => uint256) public baseGasPrice;
    mapping(orderType => uint256) public floatRate;

    Order[] public orderList;

    mapping(orderType => address[]) public orderTypeUsers;

    event Deposit(address user, orderType ordertype, orderLevel Level, uint256 gasPrice);
    event Claim(address user, uint256 amount);

    modifier onlyAdmin{
        require(msg.sender == admin);
        _;
    }

    modifier onlyAxiomGasPriceGetter{
        require(msg.sender == address(axiomGasPriceGetter));
        _;
    }

    constructor() {
        admin = msg.sender;
 
        orderRate[orderType.shortTerm] = 20;
        orderRate[orderType.mediumTerm] = 25;
        orderRate[orderType.longTerm] = 30;

        baseGasPrice[orderType.shortTerm] = 10 gwei;
        baseGasPrice[orderType.mediumTerm] = 15 gwei;
        baseGasPrice[orderType.longTerm] = 20 gwei;

        floatRate[orderType.shortTerm] = 1025;
        floatRate[orderType.mediumTerm] = 1050;
        floatRate[orderType.longTerm] = 1100;
    }


    // orderValue: coverage
    // orderType: types in different period
    function deposit(address user, orderType ordertype, orderLevel Level) external payable {
        if(isExistOrder(user)){
            require(userOrder[user].isExpired == true, "Order already exists");
        }
        delete userOrder[user];
        paramValidation(ordertype, Level);
        uint256 payValue = calcuValue(ordertype, Level);
        require(msg.value >= payValue, "no money");
        userOrder[user] = generateOrder(ordertype, Level);
        if(msg.value > payValue) {
            payable(msg.sender).call{value: msg.value - payValue};
        }
        emit Deposit(user, ordertype, Level, block.basefee);
    }

    
    function generateOrder(orderType ordertype, orderLevel Level) internal view returns(Order memory orderData) {
        orderData.Type = ordertype;
        orderData.startTime = block.timestamp;
        orderData.isExpired = false;
        orderData.exists = true;
        orderData.Level = Level;
        if(Level == orderLevel.normal){
            orderData.maxValue = minOrderValue;
        }
        else{
            orderData.maxValue = maxOrderValue;
        }
        if(ordertype == orderType.shortTerm){
            orderData.endTime = block.timestamp + 3 days;
            orderData.triggerValue = baseGasPrice[orderType.shortTerm] * floatRate[orderType.shortTerm] / DENOMINATOR;
            orderData.rate = orderRate[orderType.shortTerm];
        }
        else if(ordertype == orderType.mediumTerm){
            orderData.endTime = block.timestamp + 7 days;
            orderData.triggerValue = baseGasPrice[orderType.mediumTerm] * floatRate[orderType.mediumTerm] / DENOMINATOR;
            orderData.rate = orderRate[orderType.mediumTerm];
        }
        else if(ordertype == orderType.longTerm){
            orderData.endTime = block.timestamp + 15 days;
            orderData.triggerValue = baseGasPrice[orderType.longTerm] * floatRate[orderType.longTerm] / DENOMINATOR;
            orderData.rate = orderRate[orderType.longTerm];
            
        }
    }

    function calcuValue(orderType ordertype, orderLevel Level) view public returns(uint256 payment){
        if(ordertype == orderType.shortTerm){
            if(Level == orderLevel.normal) {
                payment = minOrderValue * orderRate[orderType.shortTerm] / DENOMINATOR;
            }
            else {
                payment = maxOrderValue * orderRate[orderType.shortTerm] / DENOMINATOR;
            }
        }
        else if(ordertype == orderType.mediumTerm){
            if(Level == orderLevel.normal) {
                payment = minOrderValue * orderRate[orderType.mediumTerm] / DENOMINATOR;
            }
            else {
                payment  = maxOrderValue * orderRate[orderType.mediumTerm] / DENOMINATOR;
            }
        }
        else if(ordertype == orderType.longTerm){
            if(Level == orderLevel.normal) {
                payment = minOrderValue * orderRate[orderType.longTerm] / DENOMINATOR;
            } 
            else {
                payment = maxOrderValue * orderRate[orderType.longTerm] / DENOMINATOR;
            }
        }
        else {
            revert("error message");
        }
    }

    function isExistOrder(address user) public view returns(bool){
        return userOrder[user].exists;
    }

    function paramValidation(orderType ordertype, orderLevel Level) internal pure{
        require(Level == orderLevel.normal || Level == orderLevel.advanced, "incorrect value");
        require(ordertype == orderType.shortTerm || ordertype == orderType.mediumTerm || ordertype == orderType.longTerm, "error message");
    }

    function claimNormal(address payable user, uint256 sendAmount) external onlyAdmin{
        // delete userOrder[user];
        userOrder[user].isExpired = true;
        user.call{value: sendAmount};
        emit Claim(user, 0);
    }

    function claimAdvanced(address payable user, uint256 blockNumber) external onlyAxiomGasPriceGetter{
        uint256[] memory gasList = new uint256[](3);
        gasList = getAxiomGasPrice(blockNumber);
        uint256 amount = Axiomcheck(user, blockNumber, gasList);
        // delete userOrder[user];
        userOrder[user].isExpired = true;
        user.call{value: amount};
        emit Claim(user, 0);
    }

    function setOrderRate(orderType ordertype, uint256 rate) external onlyAxiomGasPriceGetter {
        orderRate[ordertype] = rate;
    }

    function setBaseGasPrice(orderType ordertype, uint256 gasPrice) external onlyAxiomGasPriceGetter {
        baseGasPrice[ordertype] = gasPrice;
    }
    
    function setFloatRate(orderType ordertype, uint256 float) external onlyAxiomGasPriceGetter {
        floatRate[ordertype] = float;
    }

    function setAxiomGasPriceGetter(address newAxiomGasPriceGetter) external onlyAdmin {
        axiomGasPriceGetter = AxiomGasPriceGetter(newAxiomGasPriceGetter);
    }

    receive() external payable {}


    // ****************** Axiom Aggregate Price *********************** //
    
    function getAxiomGasPrice(uint256 blockNumber) public returns(uint256[] memory gasPriceList) {
        /*
        **************************
        */ 
        gasPriceList = new uint256[](3);
        gasPriceList[0] = axiomGasPriceGetter.getBaseFeePerGasForBlock(blockNumber - 1);
        gasPriceList[1] = axiomGasPriceGetter.getBaseFeePerGasForBlock(blockNumber);
        gasPriceList[2] = axiomGasPriceGetter.getBaseFeePerGasForBlock(blockNumber + 1);
        return gasPriceList;

    }

    function Axiomcheck(address user, uint256 blockNumber, uint256[] memory gasPriceList) view public returns(uint256 claimValue){
        /**
        calculate logic
        */ 
        return claimValue;
    }

    //Chainlink Automation Keeper

    function checkUpkeep(bytes calldata checkData) external returns (bool upkeepNeeded, bytes memory performData){
        bool upkeepNeeded = false;
        uint256 gasPrice = axiomGasPriceGetter.getBaseFeePerGasForBlock(block.number - 1);
        // Minimum gas price for each orderType required to claim
        uint256[] memory _gasPrice;
        bytes memory claimNum;
        /**
        calculate the _gasPrice according to orderType
        */ 
        for (uint i = 0; i < _gasPrice.length; i++){
            if(gasPrice > _gasPrice[i]){
                upkeepNeeded = true;
                //TODO
                claimNum = "0x1";
            }
        }
        return(upkeepNeeded, claimNum);
    }   

    function performUpkeep(bytes calldata performData) external{
        address[] memory userToClaim;
        uint256 amount = 10;
        /**
        calculate the userToClaim according to the claimNum, and the amount
        */ 
        for (uint i = 0; i < userToClaim.length; i++) {
            address user = userToClaim[i];
            userOrder[user].isExpired = true;
            user.call{value: amount};
            emit Claim(user, amount);    
        }
    }

}


