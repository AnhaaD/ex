import classnames from 'classnames';
import * as React from 'react';
import { SocialProfitLossItem } from '../../components';
import { SubscribedUserPerformanceInterface } from '../../modules';

export interface SocialProfitLossProps {
    activeChart: string;
    handleSetDailyChart: () => void;
    handleSetWeeklyChart: () => void;
    handleSetMonthlyChart: () => void;
    data: SubscribedUserPerformanceInterface[];
}

interface SocialProfitLossState {
    profitAmount: number;
}

class SocialProfitLoss extends React.Component<SocialProfitLossProps, SocialProfitLossState> {
    constructor(props: SocialProfitLossProps) {
        super(props);

        this.state = {
            profitAmount: 1,
        };
    }

    public componentWillReceiveProps(next: SocialProfitLossProps) {
        const { data } = next;

        if (data) {
            const maxProfitAmount = Math.ceil(Math.max.apply(Math, data.map(item => parseFloat(item.performance))));

            this.setState({
                profitAmount: (maxProfitAmount > 0) ? maxProfitAmount : 1,
            });
        }
    }

    public render() {
        const { activeChart } = this.props;

        const dailyItemStyles = classnames('pg-profit-loss__header-content-switcher-block-item px-3 py-1', {
            active: activeChart === 'daily',
        });

        const weeklyItemStyles = classnames('pg-profit-loss__header-content-switcher-block-item px-3 py-1', {
            active: activeChart === 'weekly',
        });

        const monthlyItemStyles = classnames('pg-profit-loss__header-content-switcher-block-item px-3 py-1', {
            active: activeChart === 'monthly',
        });

        return (
            <div className="col-12 pg-profit-loss">
                <div className="row col-12 pg-profit-loss__header">
                    <div className="pg-profit-loss__header-title d-inline-block">
                        Profit/Loss
                    </div>
                    <div className="pg-profit-loss__header-content d-inline-block">
                        <div className="pg-profit-loss__header-content-currency d-inline-block px-3">
                            Currency: <span className="currency">USD</span>
                        </div>
                        <div className="pg-profit-loss__header-content-switcher d-inline-block">
                            <div className="pg-profit-loss__header-content-switcher-block">
                                <div className={dailyItemStyles} onClick={this.props.handleSetDailyChart}>
                                    Daily
                                </div>
                                <div className={weeklyItemStyles} onClick={this.props.handleSetWeeklyChart}>
                                    Weekly
                                </div>
                                <div className={monthlyItemStyles} onClick={this.props.handleSetMonthlyChart}>
                                    Monthly
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-12 pg-profit-loss__content">
                    {this.getProfitLossChart()}
                </div>
            </div>
        );
    }

    private getProfitLossChart = () => {
        const { data } = this.props;
        const { profitAmount } = this.state;

        const chartNamesStyles = {
            marginTop: `${(profitAmount - 1) * 100 + 10}px`,
        };

        const middleBlockNumberStyles = {
            padding: `${(profitAmount - 1) * 100 + 90}px 0 90px 0`,
        };

        if (!data) {
            return (
                <div className="mt-2 mb-4">No data yet</div>
            );
        }

        return (
            <div className="row col-12 my-5">
                <div className="col-1 mx-0 px-0">
                    <div className="col-12 mx-0 px-0">
                        {profitAmount * 100}%
                    </div>
                    <div className="col-12 mx-0 px-0 col-12">
                        <div className="pg-profit-loss__content-middle-block-number" style={middleBlockNumberStyles}>
                            0
                        </div>
                    </div>
                    <div className="col-12 mx-0 px-0">
                        -100%
                    </div>
                </div>
                <div className="col-11 mx-0 px-0 mt-4">
                    <div className="pg-profit-loss__content-chart pg-profit-loss__content-middle-block">
                        {this.getChartCandles()}
                    </div>
                    <div className="pg-profit-loss__content-chart-names" style={chartNamesStyles}>
                        {this.getChartNames()}
                    </div>
                </div>
            </div>
        );
    };

    private getChartCandles = () => {
        const { data } = this.props;
        const { profitAmount } = this.state;

        if (data) {
            return data.map((item, index) => {
                const performance = parseFloat(item.performance);
                const profit = performance > 0 ? (performance * 100) : 0;
                const loss = performance < 0 ? (performance * -100) : 0;

                return (
                    <SocialProfitLossItem
                        key={index}
                        profit={profit}
                        loss={loss}
                        top={profitAmount * 100}
                    />
                );
            });
        }

        return [];
    };

    private getChartNames = () => {
        const { data } = this.props;

        if (data) {
            return data.map((item, index) => {
                return (
                    <div key={index} className="pg-profit-loss__content-chart-names-item">
                        {item.date || item.week || item.month}
                    </div>
                );
            });
        }

        return [];
    };
}

export const SocialProfitLossContainer = SocialProfitLoss;


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/SocialProfitLossContainer/index.tsx
