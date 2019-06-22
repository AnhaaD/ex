import * as React from 'react';
import { Link } from 'react-router-dom';

class FooterComponent extends React.Component {
    public render() {
        return (
            <footer id="footer-content">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-12">
                            <Link to="/home" className="footer-logo" />
                        </div>
                        <div className="col-12 d-sm-none d-block">
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                Exchange
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <ul className="footer-nav">
                                                <li className="footer-nav__item">
                                                    <Link to="/trading" className="footer-nav__link">Exchange</Link>
                                                </li>
                                                <li className="footer-nav__item">
                                                    <Link to="/markets" className="footer-nav__link">Markets</Link>
                                                </li>
                                               {/* <li className="footer-nav__item"><Link to="/leaderboard" className="footer-nav__link">Leaderboards</Link></li>*/}
                                               {/* <li className="footer-nav__item"><a href="https://streamex.zendesk.com/hc/en-us/articles/360006038479-Trading-Fees" target="_blank" className="footer-nav__link">Fees</a></li>*/}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Help
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <ul className="footer-nav">
                                                {/*<li className="footer-nav__item"><a href="https://streamex.zendesk.com/hc/en-us/categories/360001244999-FAQ" target="_blank" className="footer-nav__link">FAQ</a></li>*/}
                                                <li className="footer-nav__item">
                                                    <Link to="/privacy-policy" className="footer-nav__link">Privacy Policy</Link>
                                                </li>
                                                <li className="footer-nav__item">
                                                    <Link to="/terms-and-conditions" className="footer-nav__link">Terms and Conditions</Link>
                                                </li>
                                                {/*<li className="footer-nav__item"><a href="https://streamex.zendesk.com/hc/en-us" target="_blank" className="footer-nav__link">Support</a></li>*/}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                        <h5 className="mb-0">
                                            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Connect
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <ul className="footer-soc">
                                                <li className="footer-soc__item">
                                                    <a href="#" target="_blank" className="footer-soc__link">
                                                        <span className="footer-soc__link-icon icon-twitter"/>
                                                    </a>
                                                </li>
                                                <li className="footer-soc__item">
                                                    <a href="#" target="_blank" className="footer-soc__link">
                                                        <span className="footer-soc__link-icon icon-facebook"/>
                                                    </a>
                                                </li>
                                                <li className="footer-soc__item">
                                                    <a href="#" target="_black" className="footer-soc__link">
                                                        <span className="footer-soc__link-icon icon-mail"/>
                                                    </a>
                                                </li>
                                                <li className="footer-soc__item">
                                                    <a href="#" target="_black" className="footer-soc__link">
                                                        <span className="footer-soc__link-icon icon-mail" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 d-sm-block d-none">
                            <ul className="footer-nav">
                                <li className="footer-nav__item">
                                    <span className="footer-title">Links</span>
                                </li>
                                <li className="footer-nav__item">
                                    <Link to="/trading" className="footer-nav__link">Exchange</Link>
                                </li>
                                <li className="footer-nav__item">
                                    <Link to="/markets" className="footer-nav__link">Markets</Link>
                                </li>
                                {/*<li className="footer-nav__item"><Link to="/leaderboard" className="footer-nav__link">Leaderboards</Link></li>*/}
                                {/*<li className="footer-nav__item"><a href="https://streamex.zendesk.com/hc/en-us/articles/360006038479-Trading-Fees" target="_blank" className="footer-nav__link">Fees</a></li>*/}
                            </ul>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 d-sm-block d-none">
                            <ul className="footer-nav">
                                <li className="footer-nav__item">
                                    <span className="footer-title">Help</span>
                                </li>
                                {/*<li className="footer-nav__item"><a href="https://streamex.zendesk.com/hc/en-us/categories/360001244999-FAQ" target="_blank" className="footer-nav__link">FAQ</a></li>*/}
                                <li className="footer-nav__item">
                                    <Link to="/privacy-policy" className="footer-nav__link">Privacy Policy</Link>
                                </li>
                                <li className="footer-nav__item">
                                    <Link to="/terms-and-conditions" className="footer-nav__link">Terms and Conditions</Link>
                                </li>
                                {/*<li className="footer-nav__item"><a href="https://streamex.zendesk.com/hc/en-us" target="_blank" className="footer-nav__link">Support</a></li>*/}
                            </ul>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-sm-block d-none">
                            <span className="footer-title">Connect</span>
                            <ul className="footer-soc">
                                <li className="footer-soc__item">
                                    <a href="#" target="_blank" className="footer-soc__link">
                                        <span className="footer-soc__link-icon icon-twitter" />
                                    </a>
                                </li>
                                <li className="footer-soc__item">
                                    <a href="#" target="_blank" className="footer-soc__link">
                                        <span className="footer-soc__link-icon icon-facebook" />
                                    </a>
                                </li>
                                <li className="footer-soc__item">
                                    <a href="#" target="_black" className="footer-soc__link">
                                        <span className="footer-soc__link-icon icon-mail"/>
                                    </a>
                                </li>
                                <li className="footer-soc__item">
                                    <a href="#" target="_black" className="footer-soc__link">
                                        <span className="footer-soc__link-icon icon-mail" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12">
                            <p className="footer-copyright">© 2018 - 2019 Libra Exchange. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export const Footer = FooterComponent;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/Footer/index.tsx
