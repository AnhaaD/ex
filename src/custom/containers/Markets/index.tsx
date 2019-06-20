import classnames from 'classnames';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
    RootState,
    selectUserInfo,
    setCurrentPrice,
    User,
} from '../../../modules';
import {
    Market,
    marketsTickersFetch,
    selectCurrentMarket,
    selectMarkets,
    selectMarketsLoading,
    selectMarketTickers,
    setCurrentMarket,
    Ticker,
} from '../../../modules/public/markets';
import { depthFetch, orderBookFetch } from '../../../modules/public/orderBook';
import { walletsFetch } from '../../../modules/user/wallets';
import { Decimal, Loader } from '../../../openware';
import { Markets } from '../../components';

interface ReduxProps {
    userData: User;
    markets: Market[];
    marketsLoading?: boolean;
    marketTickers: {
        [key: string]: Ticker,
    };
    currentMarket: Market | undefined;
}

interface DispatchProps {
    setCurrentMarket: typeof setCurrentMarket;
    depthFetch: typeof depthFetch;
    walletsFetch: typeof walletsFetch;
    orderBookFetch: typeof orderBookFetch;
    tickers: typeof marketsTickersFetch;
    setCurrentPrice: typeof setCurrentPrice;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

class MarketsContainer extends React.Component<Props> {
    private headers = [
        this.props.intl.formatMessage({id: 'page.body.trade.header.markets.content.name'}),
        this.props.intl.formatMessage({id: 'page.body.trade.header.markets.content.last'}),
        this.props.intl.formatMessage({id: 'page.body.trade.header.markets.content.24h'}),
        this.props.intl.formatMessage({id: 'page.body.trade.header.markets.content.currency'}),
    ];

    public componentDidMount() {
        if (this.props.markets.length === 0) {
            this.props.tickers();
        }
        this.props.walletsFetch();
    }

    public render() {
        const { marketsLoading } = this.props;
        const className = classnames('pg-markets', {
            'pg-markets--loading': marketsLoading,
        });
        return (
            <div className={className}>
                {marketsLoading ? <Loader /> : this.markets()}
                <div className="cr-table-footer"/>
            </div>
        );
    }

    private markets = () => {
        const { currentMarket } = this.props;
        const key = currentMarket && currentMarket.name;
        return (
            <Markets
                filters={false}
                data={this.mapMarkets()}
                rowKeyIndex={0}
                onSelect={this.handleOnSelect}
                onChange={this.handleOnChange}
                selectedKey={key}
                headers={this.headers}
                title={this.props.intl.formatMessage({id: 'page.body.trade.header.pin'})}
                filterPlaceholder={' '}
            />
        );
    };

    private mapMarkets() {
        const { markets, marketTickers } = this.props;
        const defaultTicker = {
            last: 0,
            price_change_percent: '+0.00%',
            vol: '0.0',
        };
        return markets.map((market: Market) =>
            ([
                market.id,
                market.name,
                Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.ask_precision),
                (marketTickers[market.id] || defaultTicker).price_change_percent,
                Decimal.format(Number((marketTickers[market.id] || defaultTicker).vol), 0),
            ]),
        );
    }

    private handleOnSelect = (index: string) => {
        const { markets, currentMarket } = this.props;
        const marketToSet = markets.find(el => el.name === index);
        this.props.setCurrentPrice('');

        if (!currentMarket || currentMarket.id !== marketToSet.id) {
            this.props.setCurrentMarket(marketToSet);
            this.props.depthFetch(marketToSet);
            this.props.orderBookFetch(marketToSet);
        }
    };

    private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            localStorage.setItem(`favorites.${event.target.value}`, String(event.target.checked));
        } else {
            localStorage.removeItem(`favorites.${event.target.value}`);
        }
        this.forceUpdate();
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    userData: selectUserInfo(state),
    markets: selectMarkets(state),
    marketsLoading: selectMarketsLoading(state),
    marketTickers: selectMarketTickers(state),
    currentMarket: selectCurrentMarket(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        setCurrentMarket: (market: Market) => dispatch(setCurrentMarket(market)),
        walletsFetch: () => dispatch(walletsFetch()),
        depthFetch: (market: Market) => dispatch(depthFetch(market)),
        orderBookFetch: (market: Market) => dispatch(orderBookFetch(market)),
        tickers: () => dispatch(marketsTickersFetch()),
        setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    });

export const MarketsComponent = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MarketsContainer));


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Markets/index.tsx
