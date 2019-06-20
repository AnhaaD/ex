import classnames from 'classnames';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { FormType } from '../../../components';
import {
    klineFetch,
    KlineState,
    klineUpdateTimeRange,
    Market,
    marketsFetch,
    orderExecuteFetch,
    RootState,
    selectCurrentMarket,
    selectKline,
    selectMarkets,
    selectUserLoggedIn,
} from '../../../modules';
import {
    RangerConnectFetch,
    rangerConnectFetch,
    RangerState,
    selectRanger,
} from '../../../modules/public/ranger';
import { Input } from '../../../openware';
import { Button } from '../../components/Button';
import { TipIcon } from '../../containers/Wallets/TipIcon';
import { clearChart, drawChart } from './getChart';
import activeBuyIcon = require('./icons/activeBuy.svg');
import activeSellIcon = require('./icons/activeSell.svg');
import buyIcon = require('./icons/buy.svg');
import close = require('./icons/close.svg');
import sellIcon = require('./icons/sell.svg');

interface ReduxProps {
    kline: KlineState;
    markets: Market[];
    currentMarket?: Market;
    rangerState: RangerState;
    userLoggedIn: boolean;
}

interface DispatchProps {
    marketsFetch: typeof marketsFetch;
    rangerConnect: typeof rangerConnectFetch;
    klineFetch: typeof klineFetch;
    orderExecute: typeof orderExecuteFetch;
    klineUpdateTimeRange: typeof klineUpdateTimeRange;
}

interface StoreProps {
    amount: string;
    price: string;
    type: FormType;
    open: boolean;
}

export type ZoomChartProps = ReduxProps & DispatchProps;

// tslint:disable jsx-no-multiline-js
class ZoomChartComponent extends React.Component<ZoomChartProps, StoreProps> {
    constructor(props: ZoomChartProps) {
        super(props);

        this.state = {
            amount: '0',
            price: '0',
            type: 'buy',
            open: true,
        };
    }

    public componentDidMount() {
        const {
            markets,
            currentMarket,
            userLoggedIn,
            rangerState: { connected },
        } = this.props;

        if (!markets.length || !currentMarket) {
            this.props.marketsFetch();
        }

        if (!connected) {
            this.props.rangerConnect({ withAuth: userLoggedIn });
        }

        if (currentMarket) {
            const rangeTo = Math.floor(new Date().setDate(new Date().getDate()) / 1000);
            const rangeFrom = Math.floor(new Date().setDate(new Date().getDate() - 1) / 1000);

            const payload = {
                  market: currentMarket.id || 'ethusd',
                  resolution: this.resolutionToSeconds(this.props.kline.period || '15m'),
                  from: this.props.kline.range.from !== 0 ? String(this.props.kline.range.from) : String(rangeFrom),
                  to: this.props.kline.range.to !== 0 ? String(this.props.kline.range.to) : String(rangeTo),
              };

            this.props.klineFetch(payload);
            this.props.klineUpdateTimeRange({from: rangeFrom, to: rangeTo});
            this.forceUpdate();
        }
    }

    public componentWillReceiveProps(next: ZoomChartProps) {
        if (next.currentMarket && (!this.props.currentMarket || next.currentMarket.id !== this.props.currentMarket.id)) {
            const rangeTo = Math.floor(new Date().setDate(new Date().getDate()) / 1000);
            const rangeFrom = Math.floor(new Date().setDate(new Date().getDate() - 1) / 1000);

            const payload = {
                market: next.currentMarket.id || 'ethusd',
                resolution: this.resolutionToSeconds(next.kline.period || '15m'),
                from: next.kline.range.from !== 0 ? String(next.kline.range.from) : String(rangeFrom),
                to: next.kline.range.to !== 0 ? String(next.kline.range.to) : String(rangeTo),
            };

            this.props.klineFetch(payload);
            this.props.klineUpdateTimeRange({from: rangeFrom, to: rangeTo});
            this.forceUpdate();
        }
    }

    public render() {
        const { currentMarket, kline } = this.props;
        const { open } = this.state;

        if (kline.data.length) {
            drawChart(kline.data);
        } else {
            clearChart();
        }

        const submitOrderButtonClass = classnames({
            'pg-trading-order-button pg-trading-order-button-sell': this.state.type === 'sell',
            'pg-trading-order-button pg-trading-order-button-buy': this.state.type === 'buy',
        });

        const displayForm = classnames({
            'pg-trading-ui-hidden': !open,
        });

        return (
            <React.Fragment>
                {kline.data.length === 0 ? (<div className="pg-trading-ui-message">There is no data to show</div>) : null}
                <div className="pg-trading-ui-container">
                    <div className="pg-trading-ui-buttons">
                        {this.state.type === 'buy' ? (
                            <div className="pg-trading-ui-buttons__icons">
                                <img src={activeBuyIcon} onClick={this.handleBuy}/>
                                <img src={sellIcon} onClick={this.handleSell} />
                            </div>
                        ) : (
                            <div className="pg-trading-ui-buttons__icons">
                                <img src={buyIcon} onClick={this.handleBuy}/>
                                <img src={activeSellIcon} onClick={this.handleSell} />
                            </div>
                        )}
                    </div>
                    <div className="pg-trading-ui">
                        <svg id="zoomchart" />
                        <div id="form" className={displayForm}>
                            <div className="pg-trading-order">
                                <div className="pg-trading-order-item">
                                    <div className="pg-trading-order-item__close">
                                        <img src={close} onClick={this.closeFloatingWindow}/>
                                    </div>
                                    <div className="pg-trading-order-item__label">
                                        Amount
                                    </div>
                                    <div className="pg-trading-order-item__input">
                                        <Input
                                            type="number"
                                            value={this.state.amount}
                                            placeholder={'Amount'}
                                            className="pg-trading-order-item__input-amount"
                                            onChangeValue={this.handleChangeInputAmount}
                                        />
                                        <span className="pg-trading-order-item__input-label">
                                            {currentMarket ? currentMarket.ask_unit.toUpperCase() : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="pg-trading-order-item">
                                    <div className="pg-trading-order-item__label">
                                        Total price
                                        <TipIcon/>
                                    </div>
                                    <div className="pg-trading-order-item__input">
                                        <Input
                                            type="number"
                                            value={''}
                                            placeholder={'Total'}
                                            className="pg-trading-order-item__input-total-price"
                                            onChangeValue={this.handleChangeInputAmount}
                                        />
                                        <span className="pg-trading-order-item__input-label">
                                            {currentMarket ? currentMarket.bid_unit.toUpperCase() : ''}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    label={this.state.type}
                                    noMargin={true}
                                    className={submitOrderButtonClass}
                                    onClick={this.handleSubmit}
                                />
                            </div>
                        </div>
                        <div className="pg-trading-order-price-indicator" onClick={this.openFloatingWindow}>
                            <span id="price-indicator">0</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private resolutionToSeconds = (r: string): number => {
        const minutes = parseInt(r, 10);
        if (r === '1D') {
            return 1440;
        } else if (r === 'D') {
            return 4320;
        } else if (!isNaN(minutes)) {
            return minutes;
        } else {
            return 1;
        }
    };

    private openFloatingWindow = () => {
        this.setState({
            open: true,
        });
    };

    private closeFloatingWindow = () => {
        this.setState({
            open: false,
        });
    };

    private handleChangeInputAmount = (text: string) => {
        const { amount } = this.state;

        if (amount === '0' && text.length === 2) {
            this.setState({
                amount: text.slice(1),
            });
        } else if (text.length === 0) {
            this.setState({
                amount: text,
            });
        } else {
            this.setState({
                amount: text,
            });
        }
    };

    private handleSubmit = () => {
        const { type, amount } = this.state;
        const price = document.getElementsByClassName('pg-trading-order-item__input-total-price')[0]
            .getElementsByTagName('input')[0]
            .value;

        if (!this.props.currentMarket) {
            return;
        }
        const order = {
            market: this.props.currentMarket.id,
            side: type,
            volume: amount.toString(),
            ord_type: 'limit',
            price: price,
        };
        this.props.orderExecute(order);
    };

    private handleSell = () => {
        this.setState({
            type: 'sell',
        });

        this.openFloatingWindow();
    };

    private handleBuy = () => {
        this.setState({
            type: 'buy',
        });

        this.openFloatingWindow();
    };
}

const reduxProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    kline: selectKline(state),
    markets: selectMarkets(state),
    currentMarket: selectCurrentMarket(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    rangerConnect: (payload: RangerConnectFetch['payload']) => dispatch(rangerConnectFetch(payload)),
    klineFetch: payload => dispatch(klineFetch(payload)),
    klineUpdateTimeRange: payload => dispatch(klineUpdateTimeRange(payload)),
    orderExecute: payload => dispatch(orderExecuteFetch(payload)),
});

export const ZoomChart = connect<ReduxProps, DispatchProps, {}, RootState>(reduxProps, mapDispatchProps)(ZoomChartComponent);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/ZoomTradingChart/index.tsx
