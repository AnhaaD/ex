import classnames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
    capitalize,
    localeDate,
    setTradeColor,
} from '../../../helpers';
import {
    Market,
    openOrdersCancelFetch,
    ordersCancelAllFetch,
    RootState,
    selectCancelOpenOrdersFetching,
    selectCurrentMarket,
    selectOpenOrdersFetching,
    selectOpenOrdersList,
    selectUserLoggedIn,
    userOpenOrdersFetch,
} from '../../../modules';
import { OrderCommon } from '../../../modules/types';
import { Decimal, Loader } from '../../../openware';
import { CloseButton, OpenOrders } from '../../components';

interface ReduxProps {
    currentMarket: Market | undefined;
    list: OrderCommon[];
    fetching: boolean;
    cancelFetching: boolean;
    userLoggedIn: boolean;
}

interface DispatchProps {
    userOpenOrdersFetch: typeof userOpenOrdersFetch;
    openOrdersCancelFetch: typeof openOrdersCancelFetch;
}

interface OpenOrdersTabProps {
    ordersCancelAll: typeof ordersCancelAllFetch;
    cancelAllFetching: boolean;
    //tslint:disable-next-line:no-any
    handleCancelAll: () => any;
}

type Props = OpenOrdersTabProps & ReduxProps & DispatchProps & InjectedIntlProps;

export class OpenOrdersContainer extends React.Component<Props> {
    public componentDidMount() {
        const { currentMarket, userLoggedIn, list } = this.props;
        if (userLoggedIn && currentMarket && !list.length) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        }
    }

    public componentWillReceiveProps(next: Props) {
        const { userLoggedIn, currentMarket, cancelAllFetching } = next;
        const { userLoggedIn: prevUserLoggedIn, currentMarket: prevCurrentMarket, cancelAllFetching: prevCancelAllFetching } = this.props;

        if (!prevUserLoggedIn && userLoggedIn && currentMarket) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        } else if (userLoggedIn && currentMarket && prevCurrentMarket !== currentMarket) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        }
        if (!prevCancelAllFetching && cancelAllFetching) {
            this.props.userOpenOrdersFetch({ market: currentMarket });
        }
    }

    public render() {
        const { list, fetching } = this.props;
        const classNameEmpty = classnames({
            'cr-table__noData': !list.length,
        });
        const classNames = classnames('pg-open-orders', {
            'pg-open-orders--empty': !list.length,
            'pg-open-orders--loading': fetching,
        });
        return (
            <div className={classNameEmpty}>
                <div className={classNames}>
                    {fetching ? <Loader /> : this.openOrders()}
                </div>
            </div>
        );
    }

    private renderHeadersKeys = () => {
        return [
            'Date',
            'Pair',
            'Type',
            'Side',
            'Price',
            'Amount',
            'Filled',
            'Total',
            'S/L',
            'TP',
            '',
        ];
    };

    private renderHeaders = () => {
        const cancelAll = this.props.list.length ? (
            <React.Fragment>
                <CloseButton
                    className={'cr-cancel-button'}
                    onClick={this.props.handleCancelAll}
                    label={this.translate('page.body.trade.header.openOrders.content.cancelAll')}
                />
            </React.Fragment>
        ) : null;
        return [
            this.translate('page.body.trade.header.openOrders.content.date'),
            this.translate('page.body.trade.header.openOrders.content.pair'),
            this.translate('page.body.trade.header.openOrders.content.type'),
            this.translate('page.body.trade.header.openOrders.content.side'),
            this.translate('page.body.trade.header.openOrders.content.price'),
            this.translate('page.body.trade.header.openOrders.content.amount'),
            this.translate('page.body.trade.header.openOrders.content.filled'),
            this.translate('page.body.trade.header.openOrders.content.total'),
            this.translate('page.body.trade.header.openOrders.content.sl'),
            this.translate('page.body.trade.header.openOrders.content.tp'),
            cancelAll,
        ];
    };

    private openOrders = () => {
        return (
            <OpenOrders
                headersKeys={this.renderHeadersKeys()}
                headers={this.renderHeaders()}
                data={this.renderData()}
                onCancel={this.handleCancel}
                className={'cr-cancel-button'}
            />
        );
    };

    private renderData = () => {
        const { list, currentMarket } = this.props;

        if (list.length === 0) {
            return [[this.translate('page.noDataToShow')]];
        }

        return list.map((item: OrderCommon) => {
            const { id, price, created_at, remaining_volume, origin_volume, side, ord_type } = item;
            const executedVolume = Number(origin_volume) - Number(remaining_volume);
            const remainingAmount = Number(remaining_volume);
            const total = Number(origin_volume) * Number(price);
            const filled = ((executedVolume / Number(origin_volume)) * 100).toFixed(2);
            const priceFixed = currentMarket ? currentMarket.bid_precision : 0;
            const amountFixed = currentMarket ? currentMarket.ask_precision : 0;
            const capitalSide = capitalize(side);
            const capitalType = ord_type && capitalize(ord_type);

            const marketPair = currentMarket.name;
            const marketFirst = marketPair.slice(0, this.slashIndex(marketPair));
            const marketSecond = marketPair.slice(this.slashIndex(marketPair), marketPair.length);
            const currency = marketPair.slice(this.slashIndex(marketPair) + 1, marketPair.length);

            return [
                localeDate(created_at, 'fullDate'),
                <span key={id}>{marketFirst}<span className="mute">{marketSecond}</span></span>,
                capitalType,
                <span key={id} style={{ color: setTradeColor(side).color }}>{capitalSide}</span>,
                Decimal.format(price, priceFixed),
                Decimal.format(remainingAmount, amountFixed),
                <span key={id}>{filled}%</span>,
                <span className="space-around" key={id}>{Decimal.format(total, amountFixed)} <span className="mute">{currency}</span></span>,
                <span key={id}>-</span>,
                <span key={id}>-</span>,
                side,
            ];
        });
    };

    private slashIndex = (str: string) => str.indexOf('/');

    private translate = (e: string) => this.props.intl.formatMessage({ id: e });

    private handleCancel = (index: number) => {
        const { list, cancelFetching, cancelAllFetching } = this.props;
        if (cancelAllFetching || cancelFetching) {
            return;
        }

        const orderToDelete = list[index];
        this.props.openOrdersCancelFetch({ id: orderToDelete.id, list });
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    list: selectOpenOrdersList(state),
    fetching: selectOpenOrdersFetching(state),
    cancelFetching: selectCancelOpenOrdersFetching(state),
    userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    userOpenOrdersFetch: payload => dispatch(userOpenOrdersFetch(payload)),
    openOrdersCancelFetch: payload => dispatch(openOrdersCancelFetch(payload)),
});

export type OpenOrdersProps = ReduxProps;

export const OpenOrdersTab = injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(OpenOrdersContainer),
);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/TradeHistoryTabs/OpenOrders.tsx
