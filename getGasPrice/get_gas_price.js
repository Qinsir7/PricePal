const ethers = require('ethers');
const moment = require('moment');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'gas_price.csv',
    header: [
        { id: 'item_id', title: 'item_id' },
        { id: 'timestamp', title: 'timestamp' },
        { id: 'target_value', title: 'target_value' },
    ]
});

async function fetchGasPrices() {
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/fbd1cd3ce9494434ac35c07bac0e4e74');
    const currentBlockNumber = await provider.getBlockNumber();
    const blocksPerDay = 10;
    const days = 2048;

    for (let i = 0; i < days; i++) {
        let totalGasPrice = ethers.BigNumber.from(0);
        let count = 0;

        for (let j = 0; j < blocksPerDay; j++) {
            const blockNumber = currentBlockNumber - i * blocksPerDay - j;
            const block = await provider.getBlock(blockNumber);

            if (block) {
                totalGasPrice = totalGasPrice.add(block.gasUsed);
                count++;
            }
        }

        const averageGasPrice = totalGasPrice.div(count);
        const record = {
            item_id: 1,
            timestamp: moment().subtract(i, 'days').format('YYYY-MM-DD'),
            averageGasPrice: ethers.utils.formatUnits(averageGasPrice, 'gwei'),
        };

        await csvWriter.writeRecords([record]);
        console.log(`Wrote record for day ${i}`);
    }
}

fetchGasPrices().catch(console.error);
