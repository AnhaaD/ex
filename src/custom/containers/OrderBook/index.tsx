import classNames from 'classnames';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import {
    accumulateVolume,
    calcMaxVolume,
    sortAsks,
    sortBids,
} from '../../../helpers';
import {
    Market,
    RootState,
    selectCurrentMarket,
    selectCurrentPrice,
    selectDepthAsks,
    selectDepthBids,
    selectDepthLoading,
    setCurrentPrice,
} from '../../../modules';
import { Decimal, Loader, OrderBook as OrderBookTable } from '../../../openware';
import move = require('../../assets/images/Move.svg');

interface ReduxProps {
    asks: string[][];
    asksLoading: boolean;
    bids: string[][];
    bidsLoading: boolean;
    currentMarket: Market | undefined;
    currentPrice: string;
}

interface DispatchProps {
    setCurrentPrice: typeof setCurrentPrice;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

export class OrderBookContainer extends React.Component<Props> {
    public render() {
        const { asks, asksLoading, bids, bidsLoading } = this.props;
        const cn = classNames('pg-orderbook', {
            'pg-orderbook--loading': asksLoading || bidsLoading,
        });

        return (
            <div className={cn}>
                <div className="cr-table-header__content">
                    <div className="cr-title-component">
                        {this.props.intl.formatMessage({ id: 'page.body.trade.header.orderbook' })}&nbsp;&nbsp;<span className="cr-title-component__market">{this.props.currentMarket && this.props.currentMarket.name}</span><img className="cr-title-component__move" src={move} />
                    </div>
                </div>
                <div className="pg-orderbook__body">
                    {asksLoading || bidsLoading ? <Loader /> : this.orderBook(sortBids(bids), sortAsks(asks))}
                </div>
                <div className="cr-table-footer"/>
            </div>
        );
    }

    private orderBook = (bids, asks) => (
        <React.Fragment>
            {this.renderHead()}
            <div className="pg-orderbook__tables">
                <OrderBookTable
                    side={'right'}
                    data={this.renderBidsOrderBook(bids, 'bids', this.props.intl.formatMessage({ id: 'page.noDataToShow' }), this.props.currentMarket)}
                    rowBackgroundColor={'rgba(84, 180, 137, 0.4)'}
                    maxVolume={calcMaxVolume(bids, asks)}
                    orderBookEntry={accumulateVolume(bids)}
                    onSelect={this.handleOnSelect}
                />
                <OrderBookTable
                    side={'left'}
                    data={this.renderAsksOrderBook(asks, 'asks', this.props.intl.formatMessage({ id: 'page.noDataToShow' }), this.props.currentMarket)}
                    rowBackgroundColor={'rgba(232, 94, 89, 0.4)'}
                    maxVolume={calcMaxVolume(bids, asks)}
                    orderBookEntry={accumulateVolume(asks)}
                    onSelect={this.handleOnSelect}
                />
            </div>
        </React.Fragment>
    );

    private renderHead = () => {
        const askCells = this.renderAsksHeaders().map((c, index) => <div key={index}>{c}</div>);
        const bidCells = this.renderBidsHeaders().map((c, index) => <div key={index}>{c}</div>);

        return (
            <div className="pg-orderbook__head">
                <div className="pg-orderbook__head-row">
                    <div className="pg-orderbook__head-row__column">{bidCells}</div>
                    <div className="pg-orderbook__head-row__column">{askCells}</div>
                </div>
            </div>
        );
    };

    private renderAsksHeaders = () => {
        return [
            this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.price' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.volume' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.amount' }),
        ];
    };

    private renderBidsHeaders = () => {
        return [
            this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.amount' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.volume' }),
            this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.price' }),
        ];
    };

    private renderAsksOrderBook = (array: string[][], side: string, message: string, currentMarket?: Market) => {
        const total = accumulateVolume(array);
        const priceFixed = currentMarket ? currentMarket.bid_precision : 0;
        const amountFixed = currentMarket ? currentMarket.ask_precision : 0;
        return (array.length > 0) ? array.map((item, i) => {
            const [price, volume] = item;
            return [
                    <Decimal key={i} fixed={priceFixed}>{price}</Decimal>,
                    <Decimal key={i} fixed={amountFixed}>{total[i]}</Decimal>,
                    <Decimal key={i} fixed={amountFixed}>{volume}</Decimal>,
                ];
        }) : [[[''], message]];
    }

    private renderBidsOrderBook = (array: string[][], side: string, message: string, currentMarket?: Market) => {
        const total = accumulateVolume(array);
        const priceFixed = currentMarket ? currentMarket.bid_precision : 0;
        const amountFixed = currentMarket ? currentMarket.ask_precision : 0;
        return (array.length > 0) ? array.map((item, i) => {
            const [price, volume] = item;
            return [
                    <Decimal key={i} fixed={amountFixed}>{volume}</Decimal>,
                    <Decimal key={i} fixed={amountFixed}>{total[i]}</Decimal>,
                    <Decimal key={i} fixed={priceFixed}>{price}</Decimal>,
                ];
        }) : [[[''], message]];
    }

    private handleOnSelect = (index: string) => {
        const { asks, currentPrice } = this.props;
        const priceToSet = asks[Number(index)] ? asks[Number(index)][0] : '';

        if (currentPrice !== priceToSet) {
            this.props.setCurrentPrice(priceToSet);
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    asks: selectDepthAsks(state),
    asksLoading: selectDepthLoading(state),
    bids: selectDepthBids(state),
    bidsLoading: selectDepthLoading(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    });

const OrderBook = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrderBookContainer));
type OrderBookProps = ReduxProps;

export {
    OrderBook,
    OrderBookProps,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/OrderBook/index.tsx
