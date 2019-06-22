import * as React from 'react';
import info1 = require('../../assets/images/home/icon-info-1@2x.png');
import info2 = require('../../assets/images/home/icon-info-2@2x.png');
import info3 = require('../../assets/images/home/icon-info-3@2x.png');
import info4 = require('../../assets/images/home/icon-info-4@2x.png');

class AdvantageCardsComponent extends React.Component {
    public render() {
        return (
            <div className="row my-5">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="home-down-box">
                                <img className="home-down-box__image" src={info1} alt="" width="42" height="46" />
                                <h4 className="home-down-box__title">STRONG SECURITY</h4>
                                <span className="home-down-box__text">Protection against DDoS attacks, full data encryption, compliant with PCI DSS standards</span>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="home-down-box">
                                <img className="home-down-box__image" src={info2} alt="" width="42" height="46" />
                                <h4 className="home-down-box__title">PROFESSIONAL TEAM</h4>
                                <span className="home-down-box__text">Professional team with rich experience in the field of blockchain, finance, digital assets and AI</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="home-down-box">
                                <img className="home-down-box__image" src={info3} alt="" width="42" height="46" />
                                <h4 className="home-down-box__title">INTERNATIONAL COVERAGE</h4>
                                <span className="home-down-box__text">Providing Services Worldwide and open to anyone that can access our trading platform.</span>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="home-down-box">
                                <img className="home-down-box__image" src={info4} alt="" width="42" height="46" />
                                <h4 className="home-down-box__title">ENJOY ANONYMITY</h4>
                                <span className="home-down-box__text">Create an account and trade happily without the imposition of KYC.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const AdvantageCards = AdvantageCardsComponent;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/AdvantageCardsComponent/index.tsx
