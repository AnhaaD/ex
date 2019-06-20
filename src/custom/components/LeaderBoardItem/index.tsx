import classnames from 'classnames';
import * as React from 'react';
import ReactCountryFlag from 'react-country-flag';
import image = require('../../assets/images/default.png');
import { convertNumberToShortFormat, convertToPercent } from '../../helpers';
import { UserLeaderBoard } from '../../modules';

export interface UserItemLeaderBoardProps {
    index: number;
    user: UserLeaderBoard;
    handleToggleUser: () => void;
    open: boolean;
    onClickTraderProfile: (nickname: string) => void;
}

class UserItemLeaderBoard extends React.Component<UserItemLeaderBoardProps> {
    public render() {
        const {
            index,
            user,
            open,
        } = this.props;

        return (
            <div className="col-12 pg-leaderboard-item container-fluid my-3 p-0">
                <div className="row col-12 px-0 mx-0" onClick={this.props.handleToggleUser}>
                    <div className="col-12 col-md-5 pg-leaderboard-item__name row">
                        <div className="col-12 row mx-0">
                            <div className="col-1 pg-leaderboard-item__name-index px-0">
                                {index + 1}.
                            </div>
                            <div className="col-3 pg-leaderboard-item__name-picture">
                                <div className="r-hex">
                                    <div className="r-hex-inner">
                                        <div className="r-hex-inner-2">
                                            {user.picture ? <img src={user.picture} /> : <img src={image}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8 pl-0 pg-leaderboard-item__name-nickname">
                                {user.nickname}
                                <span className="br-3 pl-3">
                                    {user.nationality ? (<ReactCountryFlag code={user.nationality} svg={true} />) : null}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 row pg-leaderboard-item__performance">
                        {this.getPerformance()}
                    </div>
                    <div className="col-12 col-md-2 pg-leaderboard-item__volume pr-0">
                        <span className="pg-leaderboard-item__volume__value">
                            {convertNumberToShortFormat(user.trading_volume)}
                        </span><br />
                        <span className="pg-leaderboard-item__volume__text">
                            Trading Volume
                        </span>
                    </div>
                </div>
                {open ? this.getSubsribers() : null}
            </div>
        );
    }

    private getSubsribers = () => {
        const { user } = this.props;
        return (
            <div className="row col-12 pg-leaderboard-item__subscribers px-0 pl-1 mx-0">
                <div className="col-12 pg-leaderboard-item__subscribers-line my-3" />
                <div className="col-12 col-md-9 pb-4">
                    <div className="col-12 pg-leaderboard-item__subscribers-number pt-3">
                        {user.subscribers}
                    </div>
                    <div className="col-12 pg-leaderboard-item__subscribers-text">
                        Subscribers
                    </div>
                </div>
                <div className="col-12 col-md-3 pt-3 px-0 pr-5 pb-3">
                    <div className="pg-leaderboard-item__subscribers__button">
                        <a onClick={this.onClickTraderProfile(user.nickname)} className="p-3">Trader Profile</a>
                    </div>
                </div>
            </div>
        );
    };

    private onClickTraderProfile = (name: string) => () => this.props.onClickTraderProfile(name);

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
            <div className="row col-12 pg-leaderboard-item__performance__content px-0">
                <div className="col-4 px-0 mx-0 pg-leaderboard-item__performance__content-item">
                    7d ‧ <span className={cx(user.performances.d7)}>{convertToPercent(user.performances.d7)}</span>
                    <div className="border-line row col-12">
                        <div className="col-6 border-line-red p-0">
                            <div className="col-12 red px-0" style={widthsRed(user.performances.d7)} />
                        </div>
                        <div className="col-6 border-line-green p-0">
                            <div className="col-12 green px-0" style={widthsGreen(user.performances.d7)} />
                        </div>
                    </div>
                </div>
                <div className="col-4 px-0 mx-0 pg-leaderboard-item__performance__content-item">
                    30d ‧ <span className={cx(user.performances.d30)}>{convertToPercent(user.performances.d30)}</span>
                    <div className="border-line row col-12">
                        <div className="col-6 border-line-red p-0">
                            <div className="col-12 red px-0" style={widthsRed(user.performances.d30)} />
                        </div>
                        <div className="col-6 border-line-green p-0">
                            <div className="col-12 green px-0" style={widthsGreen(user.performances.d30)} />
                        </div>
                    </div>
                </div>
                <div className="col-4 px-0 mx-0 pg-leaderboard-item__performance__content-item">
                    90d ‧ <span className={cx(user.performances.d90)}>{convertToPercent(user.performances.d90)}</span>
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

export const LeaderBoardUserItem = UserItemLeaderBoard;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/LeaderBoardItem/index.tsx
