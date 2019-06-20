import classnames from 'classnames';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
    capitalize,
    localeDate,
    setTradesType,
} from '../../../helpers';
import {
    fetchHistory,
    Market,
    RootState,
    selectCurrentMarket,
    selectCurrentPrice,
    selectFullHistory,
    selectHistory,
    selectHistoryLoading,
    selectMarkets,
    setCurrentPrice,
    WalletHistoryList,
} from '../../../modules';
import { Decimal, Loader, Table } from '../../../openware';

interface ReduxProps {
    marketsData: Market[];
    list: WalletHistoryList;
    fetching: boolean;
    fullHistory: number;
    currentMarket: Market | undefined;
    currentPrice: string;
}

interface DispatchProps {
    fetchHistory: typeof fetchHistory;
    setCurrentPrice: typeof setCurrentPrice;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

class TradeHistoryComponent extends React.Component<Props> {

    public componentDidMount() {
        const { currentMarket } = this.props;
        if (currentMarket) {
            this.props.fetchHistory({ type: 'trades', page: 0, limit: 0, market: currentMarket.id });
        }
    }

    public componentWillReceiveProps(next: Props) {
        if (next.currentMarket && this.props.currentMarket !== next.currentMarket) {
            this.props.fetchHistory({ type: 'trades', page: 0, limit: 0, market: next.currentMarket.id });
        }
    }

    public render() {
        const { fetching, list } = this.props;
        const classNameEmpty = classnames({
            'cr-table__noData': !list || !list.length,
        });
        return (
            <div className={classNameEmpty}>
                {fetching ? <Loader /> : this.renderContent()}
            </div>
        );
    }

    public renderContent = () => {
        return (
            <React.Fragment>
                <Table
                    header={this.getHeaders()}
                    data={this.retrieveData()}
                    onSelect={this.handleOnSelect}
                    colSpan={6}
                />
            </React.Fragment>
        );
    };

    private getHeaders = () => {
        return [
            this.translate('page.body.trade.header.openOrders.content.date'),
            this.translate('page.body.trade.header.openOrders.content.pair'),
            this.translate('page.body.trade.header.openOrders.content.side'),
            this.translate('page.body.trade.header.openOrders.content.price'),
            this.translate('page.body.trade.header.openOrders.content.amount'),
            this.translate('page.body.trade.header.openOrders.content.total'),
        ];
    };

    private retrieveData = () => {
        const { list } = this.props;
        return [...list].length > 0
            ? [...list].map(this.renderRow)
            : [[this.props.intl.formatMessage({ id: 'page.noDataToShow' })]];
    };

    private renderRow = item => {
        const { currentMarket } = this.props;
        const { id, created_at, side, price, volume } = item;
        const priceFixed = currentMarket ? currentMarket.bid_precision : 0;
        const amountFixed = currentMarket ? currentMarket.ask_precision : 0;
        const total = Number(volume) * Number(price);

        const capitalSide = capitalize(side);
        const marketPair = currentMarket.name;
        const marketFirst = marketPair.slice(0, this.slashIndex(marketPair));
        const marketSecond = marketPair.slice(this.slashIndex(marketPair), marketPair.length);
        const currency = marketPair.slice(this.slashIndex(marketPair) + 1, marketPair.length);

        return [
            localeDate(created_at, 'time'),
            <span key={id}>{marketFirst}<span className="mute">{marketSecond}</span></span>,
            <span key={id} style={{ color: setTradesType(side).color }}>{capitalSide}</span>,
            <Decimal key={id} fixed={priceFixed}>{price}</Decimal>,
            <Decimal key={id} fixed={amountFixed}>{volume}</Decimal>,
            <span className="space-around" key={id}><span><Decimal key={id} fixed={amountFixed}>{total}</Decimal> </span><span className="mute">{currency}</span></span>,
        ];
    };

    private slashIndex = (str: string) => {
        return str.indexOf('/');
    }

    private translate = (e: string) => this.props.intl.formatMessage({ id: e });

    private handleOnSelect = (index: string) => {
        const { list, currentPrice } = this.props;
        const priceToSet = list[Number(index)] ? list[Number(index)].price : '';

        if (currentPrice !== priceToSet) {
            this.props.setCurrentPrice(priceToSet);
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    marketsData: selectMarkets(state),
    list: selectHistory(state),
    fetching: selectHistoryLoading(state),
    fullHistory: selectFullHistory(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        fetchHistory: params => dispatch(fetchHistory(params)),
        setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    });

const TradeTab = injectIntl(connect(mapStateToProps, mapDispatchToProps)(TradeHistoryComponent));

export {
    TradeTab,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/TradeHistoryTabs/TradeHistory.tsx
