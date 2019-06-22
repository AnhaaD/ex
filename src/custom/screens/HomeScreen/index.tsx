import * as React from 'react';
import { Link } from 'react-router-dom';
import { AdvantageCards, Cards, Footer } from '../../components';
import { HomeContainer } from '../../containers';

class HomeScreenComponent extends React.Component {
    public render() {
        return (
            <div className="pg-home-screen">
                <div className="container">
                    <div className="title-page">
                        <h1 className="title-page__text home-title-page">
                            Welcome to the Libra Exchange crypto trading platform
                        </h1>
                        <ul className="home-page-list">
                            <li className="home-page-list__item">
                                <Link to="/signup" className="home-page-list__link">
                                    Create Account
                                </Link>
                            </li>
                            <li className="home-page-list__item">
                                <span className="home-page-list__text">
                                    Already Registered?
                                </span>
                                <Link to="/signin" className="home-page-list__link">
                                    Log In
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Cards />
                    <HomeContainer />
                    <AdvantageCards/>
                </div>
                <Footer />
            </div>
        );
    }
}

export const HomeScreen = HomeScreenComponent;


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/HomeScreen/index.tsx
