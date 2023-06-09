import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLineChart, faLightbulb, faRobot, faBuilding, faGasPump, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return (
        <div className="" id="content">

            <section data-section-id="1" data-share="" data-category="features-white-pattern" data-component-id="79798086_01_awz" className="py-24 md:pb-32 bg-white" data-config-id="auto-img-1">
                <div className="container px-4 mx-auto">
                    <div className="md:max-w-4xl mb-12 mx-auto text-center">
                        <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter" data-config-id="auto-txt-2-1">GasInsure for ChainLink Hackathon</h1>
                        <p className="text-lg md:text-xl text-coolGray-500 font-medium" data-config-id="auto-txt-3-1">GasInsure offers wide protection against gas price volatility. Trust in our automated, on-chain claims handling. Customize your insurance period and amount with a small premium. Secure and tailor-made blockchain insurance solutions at your fingertips with GasInsure.</p>
                    </div>

                    <div className='flex justify-center items-center mb-20'>
                        <div>
                            <a href="/insurance" className=" py-4 px-6 sm:px-10 inline-flex items-center justify-center text-center text-dark text-base bg-emerald-500 text-white hover:shadow-lg font-medium rounded-lg transition duration-300 ease-in-out ">
                                TRY IT NOW !
                                <span className="pl-2"><svg width="20" height="8" viewBox="0 0 20 8" className="fill-current"><path d="M19.2188 2.90632L17.0625 0.343819C16.875 0.125069 16.5312 0.0938193 16.2812 0.281319C16.0625 0.468819 16.0312 0.812569 16.2188 1.06257L18.25 3.46882H0.9375C0.625 3.46882 0.375 3.71882 0.375 4.03132C0.375 4.34382 0.625 4.59382 0.9375 4.59382H18.25L16.2188 7.00007C16.0312 7.21882 16.0625 7.56257 16.2812 7.78132C16.375 7.87507 16.5 7.90632 16.625 7.90632C16.7812 7.90632 16.9375 7.84382 17.0312 7.71882L19.1875 5.15632C19.75 4.46882 19.75 3.53132 19.2188 2.90632Z"></path></svg></span>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                                <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-emerald-500 rounded-lg">
                                    <FontAwesomeIcon className='h-8 w-8' icon={faLineChart} />
                                </div>
                                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold" data-config-id="auto-txt-4-1">Reliable Pricing Model Powered by AWS Forecast</h3>
                                <p className="text-coolGray-500 font-medium" data-config-id="auto-txt-5-1">A time-series forecasting service based on machine learning (ML) to predict future gas prices, for creating correctly priced derivatives</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                                <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-emerald-500 rounded-lg">
                                    <FontAwesomeIcon className='h-8 w-8' icon={faLightbulb} />
                                </div>
                                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold" data-config-id="auto-txt-6-1">Innovative Products and Services</h3>
                                <p className="text-coolGray-500 font-medium" data-config-id="auto-txt-7-1">PricePal powers innovative services like insurance for gas price or subscription in paymaster, hedging high and volatile gas prices</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                                <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-emerald-500 rounded-lg">
                                    <FontAwesomeIcon className='h-8 w-8' icon={faRobot} />
                                </div>
                                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold" data-config-id="auto-txt-8-1">Automatic Execution Powered by Chainlink Automation</h3>
                                <p className="text-coolGray-500 font-medium" data-config-id="auto-txt-9-1">Automation monitors on-chain, and when the gas price exceeds the threshold given by AWS Forecast, it credibly compensates users for losses</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                                <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-emerald-500 rounded-lg">
                                    <FontAwesomeIcon className='h-8 w-8' icon={faBuilding} />
                                </div>
                                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold" data-config-id="auto-txt-10-1">Reliable Infrastructure</h3>
                                <p className="text-coolGray-500 font-medium" data-config-id="auto-txt-11-1">PricePal’s design ensures future-proof scalability and reliability for the web3 ecosystem. Trustless infrastructure is deployed for de-risking gas fees.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                                <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-emerald-500 rounded-lg">
                                    <FontAwesomeIcon className='h-8 w-8' icon={faGasPump} />
                                </div>
                                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold" data-config-id="auto-txt-12-1">Gas Efficiency</h3>
                                <p className="text-coolGray-500 font-medium" data-config-id="auto-txt-13-1">PricePal helps to reduce gas fees and users need not to concern about gas price while making transactions.</p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                                <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-emerald-500 rounded-lg">
                                    <FontAwesomeIcon className='h-8 w-8' icon={faSignInAlt} />
                                </div>
                                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold" data-config-id="auto-txt-14-1">Frictionless Onboarding</h3>
                                <p className="text-coolGray-500 font-medium" data-config-id="auto-txt-15-1">PricePal can enable paymasters via account abstraction(ERC-4337) to offer a seamless user experience, and onboarding time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home