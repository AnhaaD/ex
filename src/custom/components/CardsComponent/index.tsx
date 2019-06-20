import * as React from 'react';

class CardsComponent extends React.Component {
    public render() {
        return (
            <div className="row my-5">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="home-info-box">
                        <div className="home-info-box__image trading-competition" />
                        <div className="home-info-box__text-left">
                            <span className="home-info-box__text">Streamex Partner Program</span>
                            <h4 className="home-info-box__title title-page__text--orange-color">Earn up to 60% referral trading fees</h4>
                            <span className="home-info-box__text">Instant settlement of your earnings</span>
                            <a className="home-info-box__link" href="https://streamex.zendesk.com/hc/en-us/articles/360006049199-Streamex-Partner-program" target="_blank">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                    <div className="home-info-box">
                        <div className="home-info-box__image get-up-to"/>
                        <div className="home-info-box__text-left">
                            <span className="home-info-box__text">Get up to</span>
                            <h4 className="home-info-box__title title-page__text--green-color">0.04% Trading fees</h4>
                            <span className="home-info-box__text">Just by Holding STE tokens</span>
                            <a className="home-info-box__link" href="https://streamex.zendesk.com/hc/en-us/articles/360005971720-0-04-Trading-fees-PROMO" target="_blank">
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
                            <span className="home-info-box__text">Up to 2BTC daily withdrawals without doing KYC</span>
                            <a className="home-info-box__link" href="https://streamex.zendesk.com/hc/en-us/articles/360005972760-Crypto-Crypto-trading-with-no-KYC-requirements" target="_blank">
                                Learn More
                            </a>
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
