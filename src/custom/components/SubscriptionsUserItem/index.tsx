import classnames from 'classnames';
import * as React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import image = require('../../assets/images/default.png');
import { ModalUnsubscribeConfirmation } from '../../containers/ModalUnsubscribeConfirmation';
import { convertToPercent } from '../../helpers';
import { UserSubscriptions } from '../../modules';

export interface UserItemSubscriptionsProps {
    unsubscribe: (value: string) => void;
    index: number;
    user: UserSubscriptions;
}

interface UserItemSubscriptionsState {
    showUnsubscribeConfirmModal: boolean;
}

class UserItemSubscriptions extends React.Component<UserItemSubscriptionsProps, UserItemSubscriptionsState> {
    constructor(props: UserItemSubscriptionsProps) {
        super(props);

        this.state = {
            showUnsubscribeConfirmModal: false,
        };
    }

    public render() {
        const {
            index,
            user,
        } = this.props;

        const {
            showUnsubscribeConfirmModal,
        } = this.state;

        // tslint:disable:jsx-no-lambda
        return (
            <div className="col-12 pg-subscriptions-item container-fluid my-3 p-0 row">
                <div className="col-12 col-md-4 pg-subscriptions-item__name">
                    <div className="col-12 row mx-0">
                        <div className="col-1 pg-subscriptions-item__name-index px-0">
                            {index + 1}.
                        </div>
                        <div className="col-3 pg-subscriptions-item__name-picture">
                            <div className="r-hex">
                                <div className="r-hex-inner">
                                    <div className="r-hex-inner-2">
                                        <img src={image}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 pl-0 pg-subscriptions-item__name-nickname">
                            {user.nickname}
                            <span className="br-3 pl-3">
                                {user.nationality ? (<ReactCountryFlag code={user.nationality} svg={true} />) : null}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 pg-subscriptions-item__performance">
                    {this.getPerformance()}
                </div>
                <div className="col-12 col-md-4 pg-subscriptions-item__subscribes">
                    <div className="pg-subscriptions-item__subscribes__profile-button">
                        <Link to={`/social/users/${user.nickname}`} className="p-3">See Profile</Link>
                    </div>
                    <div className="pg-subscriptions-item__subscribes__button">
                        <span onClick={this.handleToggleConfirmModal} className="pg-subscriptions-item__subscribes__button__unsubscribe p-3">Unsubscribe</span>
                    </div>
                </div>
                <ModalUnsubscribeConfirmation
                        show={showUnsubscribeConfirmModal}
                        onSubmit={() => this.handleUnsubscribe(user)}
                        onDismiss={this.handleToggleConfirmModal}
                />
            </div>
        );
    }
    // tslint:enable:jsx-no-lambda

    private handleToggleConfirmModal = () => {
        this.setState((state: UserItemSubscriptionsState) => ({
            showUnsubscribeConfirmModal: !state.showUnsubscribeConfirmModal,
        }));
    };

    private handleUnsubscribe = (user: UserSubscriptions) => {
        if (user) {
            this.props.unsubscribe(user.nickname);
        }
        this.handleToggleConfirmModal();
    };

    private getPerformance = () => {
        const { user } = this.props;

        const cx = (userPerformances: string) => classnames({
            'color-red': parseFloat(userPerformances) < 0,
            'color-green': parseFloat(userPerformances) >= 0,
        });

        const widthsRed = (userPerformances: string) => {
            return {
                width: parseFloat(userPerformances) < 0 ? `${parseFloat(userPerformances) * -100}%` : '0',
            };
        };

        const widthsGreen = (userPerformances: string) => {
            return {
                width: parseFloat(userPerformances) > 0 ? `${parseFloat(userPerformances) * 100}%` : '0',
            };
        };

        return (
            <div className="row col-12 pg-subscriptions-item__performance__content px-0">
                <div className="col-4 px-0 mx-0 pg-subscriptions-item__performance__content-item">
                    7d ‧ <span className={cx(user.performances.d7)}>{convertToPercent(parseFloat(user.performances.d7))}</span>
                    <div className="border-line row col-12">
                        <div className="col-6 border-line-red p-0">
                            <div className="col-12 red px-0" style={widthsRed(user.performances.d7)} />
                        </div>
                        <div className="col-6 border-line-green p-0">
                            <div className="col-12 green px-0" style={widthsGreen(user.performances.d7)} />
                        </div>
                    </div>
                </div>
                <div className="col-4 px-0 mx-0 pg-subscriptions-item__performance__content-item">
                    30d ‧ <span className={cx(user.performances.d30)}>{convertToPercent(parseFloat(user.performances.d30))}</span>
                    <div className="border-line row col-12">
                        <div className="col-6 border-line-red p-0">
                            <div className="col-12 red px-0" style={widthsRed(user.performances.d30)} />
                        </div>
                        <div className="col-6 border-line-green p-0">
                            <div className="col-12 green px-0" style={widthsGreen(user.performances.d30)} />
                        </div>
                    </div>
                </div>
                <div className="col-4 px-0 mx-0 pg-subscriptions-item__performance__content-item">
                    90d ‧ <span className={cx(user.performances.d90)}>{convertToPercent(parseFloat(user.performances.d90))}</span>
                    <div className="border-line row col-12">
                        <div className="col-6 border-line-red p-0">
                            <div className="col-12 red px-0" style={widthsRed(user.performances.d90)} />
                        </div>
                        <div className="col-6 border-line-green p-0">
                            <div className="col-12 green px-0" style={widthsGreen(user.performances.d90)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export const SubscriptionsUserItem = UserItemSubscriptions;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/SubscriptionsUserItem/index.tsx
