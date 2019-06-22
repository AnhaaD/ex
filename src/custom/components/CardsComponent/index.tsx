import * as React from 'react';

class CardsComponent extends React.Component {
    public render() {
        return (
            <div className="row my-5">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="home-info-box">
                        <div className="home-info-box__image trading-competition" />
                        <div className="home-info-box__text-left">
                            <span className="home-info-box__text">3 Major Markets & 3 New Markets Trade</span>
                            <h4 className="home-info-box__title title-page__text--orange-color"> BTC, LTC, BCH, VALID, EXPM, & Libra</h4>
                            <span className="home-info-box__text">New Coin Listing Coming Soon</span>
                            {/*<a className="home-info-box__link" href="https://streamex.zendesk.com/hc/en-us/articles/360006049199-Streamex-Partner-program" target="_blank"> Learn More </a>*/}
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="home-info-box">
                        <div className="home-info-box__image get-up-to"/>
                        <div className="home-info-box__text-left">
                            <span className="home-info-box__text">Do More Than Trade</span>
                            <h4 className="home-info-box__title title-page__text--green-color">You Can also shop @ the SHA GAlleria !</h4>
                            {/*<span className="home-info-box__text">Just by Holding STE tokens</span>*/}
                            <a className="home-info-box__link" href="#" target="_blank">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="home-info-box">
                        <div className="home-info-box__image enjoy-unlimited-trading"/>
                        <div className="home-info-box__text-left">
                            <span className="home-info-box__text">Enjoy Unlimited trading</span>
                            <h4 className="home-info-box__title title-page__text--blue-color">NO KYC required</h4>
                            <span className="home-info-box__text">Up to 10BTC Daily Withdrawals without KYC!</span>
                            {/*<a className="home-info-box__link" href="https://streamex.zendesk.com/hc/en-us/articles/360005972760-Crypto-Crypto-trading-with-no-KYC-requirements" target="_blank">Learn More</a>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const Cards = CardsComponent;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/CardsComponent/index.tsx
