import * as React from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import close = require('../../../assets/images/close.svg');
import { Modal } from '../../../components';
import { RootState } from '../../../modules';
import image = require('../../assets/images/default.png');
import facebook = require('../../assets/images/facebook.svg');
import telegram = require('../../assets/images/telegram.svg');
import twitter = require('../../assets/images/twitter.svg');
import {
    SocialLastTradesContainer,
    SocialPortfolioRepartitionContainer,
    SocialProfitLossContainer,
    SocialTradingVolumeContainer,
} from '../../containers';
import {
    createSubscription,
    getUserProfile,
    selectSocialProfileUser,
    SubscribedUserPerformanceInterface,
    SubscribedUserProfileInterface,
    unsubscribeSubscription,
} from '../../modules';

interface SocialUserProfileScreenProps extends RouterProps {
    match: {
        params: {
            nickname: string;
        };
    };
}

interface ReduxProps {
    user: SubscribedUserProfileInterface;
}

interface DispatchProps {
    createSubscription: typeof createSubscription;
    getUserProfile: typeof getUserProfile;
    unsubscribeSubscription: typeof unsubscribeSubscription;
}

interface SocialUserProfileScreenState {
    showModal: boolean;
    activeChart: 'daily' | 'weekly' | 'monthly';
}

interface ChartItemInterface {
    code: string;
    currency: string;
    balance: string;
    value: number;
}

type Props = ReduxProps & DispatchProps & SocialUserProfileScreenProps;

class SocialUserProfileScreen extends React.Component<Props, SocialUserProfileScreenState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showModal: false,
            activeChart: 'daily',
        };
    }

    public componentDidMount() {
        this.props.getUserProfile({
            nickname: this.props.match.params.nickname,
            period: 'daily',
        });
    }

    public render() {
        const { user } = this.props;

        return (
            <div className="pg-social-user-profile-screen container">
                <div className="row mt-5">
                    <div className="pg-social-user-profile-screen__header col-12 mt-5">
                        <div className="col-12 pg-social-user-profile-screen__header-image">
                            <img src={image} />
                        </div>
                        <div className="col-12 py-1">
                            <span className="py-1">{user && user.nickname}</span>
                            <span className="flag-icon py-3 pl-2">
                                {user && user.country ? (<ReactCountryFlag className="br-3" code={user.country.toLowerCase()} svg={true} />) : null}
                            </span>
                            <div className="col-12 pg-social-user-profile-screen__header-info mt-3">
                                <div className="col col-md-8 pg-social-user-profile-screen__header-info-block d-inline-block">
                                    <div className="col col-md-4 px-0 d-inline-block pg-social-header__content">
                                        <div className="col-12 px-0 pg-social-header__content-value">{user && user.subscribers}</div>
                                        <div className="col-12 px-0 pg-social-header__content-text">Subscribers</div>
                                    </div>
                                    <div className="col col-md-4 px-0 d-inline-block pg-social-user-profile-screen__header-info-block-center pg-social-header__content">
                                        <div className="col-12 px-0 pg-social-header__content-value">
                                            {this.getHeaderTradingVolumeData()}
                                        </div>
                                        <div className="col-12 px-0 pg-social-header__content-text">Trading Volume</div>
                                    </div>
                                    <div className="col col-md-4 px-0 d-inline-block pg-social-header__content">
                                        <div className="col-12">
                                            <div className="col-4 d-inline-block mr-0 px-0 pg-social-header__content-icon">
                                                <a href={user && user.facebook_url} className="facebook">
                                                    <img src={facebook} alt="facebook"/>
                                                </a>
                                            </div>
                                            <div className="col-4 d-inline-block mx-0 px-0 pg-social-header__content-icon">
                                                <a href={user && user.twitter_url} className="twitter">
                                                    <img src={twitter} alt="twitter"/>
                                                </a>
                                            </div>
                                            <div className="col-4 d-inline-block ml-0 px-0 pg-social-header__content-icon">
                                                <a href={user && user.telegram_url} className="telegram">
                                                    <img src={telegram} alt="telegram"/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 my-4 mx-0 px-0 pg-social-user-profile-screen__header-info-deep">
                                    {this.getSubscriptionButton()}
                                    <Modal
                                        show={this.state.showModal}
                                        header={this.renderModalHeader()}
                                        content={this.renderModalBody()}
                                        footer={this.renderModalFooter()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.getContentForSubscribedUser()}
                </div>
            </div>
        );
    }

    private getHeaderTradingVolumeData = () => {
        const { user } = this.props;

        if (user && user.performances && user.performances.length) {
            return user.performances[user.performances.length - 1].traded_volume;
        }

        return 'NEED TO SUBSCRIBE';
    };

    private getSubscriptionButton = () => {
        const { user } = this.props;

        if (user && user.performances) {
            return (
                <div className="col-2 px-0 mx-0 d-inline-block subscribe-button" onClick={this.unsubscribeSubscription}>
                    Unsubscribe
                </div>
            );
        }

        return (
            <div className="col-2 px-0 mx-0 d-inline-block subscribe-button" onClick={this.openModal}>
                Subscribe
            </div>
        );
    };

    private getContentForSubscribedUser = () => {
        const { user } = this.props;

        if (user && user.performances) {
            return (
                <React.Fragment>
                    <SocialProfitLossContainer
                        activeChart={this.state.activeChart}
                        handleSetDailyChart={this.handleSetDailyChart}
                        handleSetWeeklyChart={this.handleSetWeeklyChart}
                        handleSetMonthlyChart={this.handleSetMonthlyChart}
                        data={user && user.performances as SubscribedUserPerformanceInterface[]}
                    />
                    <SocialTradingVolumeContainer data={this.getTradingVolumeData()} />
                    <SocialPortfolioRepartitionContainer data={this.getProftolioRepartitionData()} />
                    <SocialLastTradesContainer data={this.getRecentTradesData()} />
                </React.Fragment>
            );
        }

        return null;
    };

    private getRecentTradesData = () => {
        const { user } = this.props;

        if (user && user.recent_trades) {
            const data = user && user.recent_trades && user.recent_trades.map(item => {
                return {
                    pair: item.market,
                    amount: item.volume,
                    action: item.taker_type,
                    date: item.created_at,
                };
            });

            return data;
        }
        return [];
    };

    private getTradingVolumeData = () => {
        const { user } = this.props;

        const data = user && user.performances && user.performances.map(item => {
            return {
                name: (item.date || item.week || item.month) as string,
                volume: item.traded_volume,
            };
        });

        return data ? data : [];
    };

    private getProftolioRepartitionData = () => {
        const { user } = this.props;

        const data: ChartItemInterface[] = [];
        if (user && user.portfolio) {
            for (const key of Object.keys(user.portfolio)) {
                data.push({
                    code: key,
                    currency: key.toUpperCase(),
                    balance: `${user.portfolio[key]}%`,
                    value: user.portfolio[key],
                });
            }
        }

        return data;
    };

    private renderModalHeader = () => {
        return (
            <div className="pg-social-user-profile-screen-modal__header">
                <img
                    className="pg-social-user-profile-screen-modal__header-closeIcon"
                    src={close}
                    onClick={this.closeModal}
                />
            </div>
        );
    };

    private renderModalBody = () => {
        const { user } = this.props;

        return (
            <div className="pg-social-user-profile-screen-modal__body">
                <div className="col-12">
                    <img src={image} />
                </div>
                <div className="col-12 pg-social-user-profile-screen-modal__body-header">
                    <span className="flag-icon py-3 pl-2">
                        {user && user.nickname} {user && user.country ? (<ReactCountryFlag className="br-3" code={user.country.toLowerCase()} svg={true} />) : null}
                    </span>
                </div>
                <div className="col-12 pg-social-user-profile-screen-modal__body-content py-3">
                    <span className="pg-social-user-profile-screen-modal__body-content-volume pr-2">
                        {user && user.subscription_price}
                    </span>
                    <span className="pg-social-user-profile-screen-modal__body-content-currency-name">
                        STE
                    </span>
                </div>
                <div className="col-12 pg-social-user-profile-screen-modal__body-text py-3">
                    *Price how much trades need to pay to see trader's trades and get alerts when he trades
                </div>
            </div>
        );
    };

    private renderModalFooter = () => {
        return (
            <div className="pg-social-user-profile-screen-modal__footer">
                <div className="pg-social-user-profile-screen-modal__footer-button py-3" onClick={this.handleSubscribe}>
                    Pay and Subscribe
                </div>
            </div>
        );
    };

    private openModal = () => {
        this.setState({
            showModal: true,
        });
    };

    private closeModal = () => {
        this.setState({
            showModal: false,
        });
    };

    private handleSetDailyChart = () => {
        this.props.getUserProfile({
            nickname: this.props.match.params.nickname,
            period: 'daily',
        });

        this.setState({
            activeChart: 'daily',
        });
    };

    private handleSetWeeklyChart = () => {
        this.props.getUserProfile({
            nickname: this.props.match.params.nickname,
            period: 'weekly',
        });

        this.setState({
            activeChart: 'weekly',
        });
    };

    private handleSetMonthlyChart = () => {
        this.props.getUserProfile({
            nickname: this.props.match.params.nickname,
            period: 'monthly',
        });

        this.setState({
            activeChart: 'monthly',
        });
    };

    private handleSubscribe = () => {
        const { user } = this.props;
        if (user) {
            this.props.createSubscription({ nickname: user.nickname });
        }

        this.setState({
            showModal: false,
        });
    };

    private unsubscribeSubscription = () => {
        const { user } = this.props;

        if (user) {
            this.props.unsubscribeSubscription({ nickname: user.nickname });
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectSocialProfileUser(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    createSubscription: payload => dispatch(createSubscription(payload)),
    getUserProfile: payload => dispatch(getUserProfile(payload)),
    unsubscribeSubscription: payload => dispatch(unsubscribeSubscription(payload)),
});

// tslint:disable-next-line:no-any
export const SocialUserProfile = withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialUserProfileScreen) as any);


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/SocialUserProfileScreen/index.tsx
