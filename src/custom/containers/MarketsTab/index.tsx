import { History } from 'history';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import {
    RootState,
    selectHistory,
    selectUserLoggedIn,
    WalletHistoryList,
} from '../../../modules';
import {
    currenciesFetch,
    Currency,
    selectCurrencies,
    selectCurrenciesLoading,
} from '../../../modules/public/currencies';
import {
    Market,
    marketsFetch,
    marketsTickersFetch,
    selectCurrentMarket,
    selectMarkets,
    selectMarketsLoading,
    selectMarketTickers,
    setCurrentMarket,
    Ticker,
} from '../../../modules/public/markets';
import { rangerConnectFetch, RangerConnectFetch } from '../../../modules/public/ranger';
import { RangerState } from '../../../modules/public/ranger/reducer';
import { selectRanger } from '../../../modules/public/ranger/selectors';
import {
    Decimal,
    FilterInput,
} from '../../../openware';
import { SortAsc, SortDefault, SortDesc } from '../../assets/images/SortIcons';
import { StarChecked } from '../../assets/images/starChecked';
import { StarDefault } from '../../assets/images/starDefault';
import { VALUATION_CURRENCY } from '../../constants';
import {
    checkFavoritesName,
    handleCCYPrecision,
} from '../../helpers';
import { consist } from '../../helpers/checkConsistency';
import { estimateUnitValue } from '../../helpers/estimateValue';
import { CryptoIcon } from '../CryptoIcon';

interface ReduxProps {
    currencies: Currency[];
    currenciesLoading?: boolean;
    currentMarket: Market | undefined;
    historyList: WalletHistoryList;
    markets: Market[];
    marketsLoading?: boolean;
    marketTickers: {
        [key: string]: Ticker,
    };
    rangerState: RangerState;
    userLoggedIn: boolean;
}

interface DispatchProps {
    fetchCurrencies: typeof currenciesFetch;
    fetchMarkets: typeof marketsFetch;
    rangerConnect: typeof rangerConnectFetch;
    setCurrentMarket: typeof setCurrentMarket;
    tickers: typeof marketsTickersFetch;
}

interface OwnProps {
    showFilter: boolean;
}

interface HistoryProps {
    history: History;
}

interface MarketsTabState {
    currentBidUnit: string;
    currentMaketsListTab: number;
    filterSearchKey: string;
    // tslint:disable-next-line:no-any
    filteredData: any;
    sortItems: {
        field: string;
        type: number;
    };
}

const TOP_BY_VOLUME = 15;
const TOP_BY_CHANGE = 5;

type Props = HistoryProps & ReduxProps & DispatchProps & RouterProps & InjectedIntlProps & OwnProps;

// tslint:disable member-ordering jsx-no-multiline-js jsx-no-lambda

class MarketsTabComponent extends React.Component<Props, MarketsTabState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentBidUnit: '',
            currentMaketsListTab: 1,
            filterSearchKey: '',
            filteredData: -1,
            sortItems: {
                field: '',
                type: 0,
            },
        };
    }

    public translate = (id: string) => this.props.intl.formatMessage({ id });

    public componentDidMount() {
        const {
            currencies,
            fetchCurrencies,
            fetchMarkets,
            markets,
            rangerState: {connected},
            tickers,
            userLoggedIn,
        } = this.props;

        if (markets.length === 0) {
            fetchMarkets();
            tickers();
        }

        if (currencies.length === 0) {
            fetchCurrencies();
        }

        if (!connected) {
            this.props.rangerConnect({withAuth: userLoggedIn});
        }

        if (markets[0]) {
            this.setState({ currentBidUnit: markets[0].bid_unit });
        }
    }

    public componentWillReceiveProps(next: Props) {
        const {
            currencies,
            fetchCurrencies,
            markets,
            tickers,
        } = this.props;

        if (next.markets.length === 0 && next.markets !== markets) {
            tickers();
        }

        if (next.currencies.length === 0 && next.currencies !== currencies) {
            fetchCurrencies();
        }

        if (next.markets.length && next.markets !== markets) {
            this.setState({ currentBidUnit: next.markets[0].bid_unit });
        }
    }

    // tslint:disable-next-line:no-any
    public renderHeader(currentBidUnitData: any) {
        const { markets } = this.props;
        const {
            currentBidUnit,
        } = this.state;

        const currentBidUnitsList = markets.filter((value, i, market) => market.map(x => x.bid_unit).indexOf(value.bid_unit) === i);
        return (
            <React.Fragment>
                <div className="cr-markets-list__header">
                    {currentBidUnitsList[0] && currentBidUnitsList.map((item, i) => (
                        <div
                            className={currentBidUnit === item.bid_unit ? 'cr-markets-list__header__button cr-markets-list__header__button--checked' : 'cr-markets-list__header__button'}
                            key={i}
                            onClick={() => this.handleSetCurrentBidUnit(item.bid_unit)}
                        >
                            {item.bid_unit.toUpperCase()}
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    public renderFilter(currentBidUnitData: any) {
        const {
            currentMaketsListTab,
        } = this.state;

        const marketListTabs = [
            this.translate('page.body.markets.favorites'),
            this.translate('page.body.markets.all'),
            this.translate('page.body.markets.main'),
            this.translate('page.body.markets.topPerformances'),
            this.translate('page.body.markets.newestListed'),
        ];

        return (
            <React.Fragment>
                <div className="cr-markets-list__filter">
                    {marketListTabs.length && marketListTabs.map((item, i) => (
                        (i === 0) ? (
                            <span
                                className={currentMaketsListTab === i ? 'cr-markets-list__filter__tab cr-markets-list__filter__tab--active' : 'cr-markets-list__filter__tab'}
                                onClick={() => this.handleSetMarketListTab(i)}
                                key={i}
                            >
                                <StarChecked/>
                                {item}
                            </span>
                        ) : (
                            marketListTabs.length - 1 === i) ? (
                                <span
                                    className="cr-markets-list__filter__tab cr-markets-list__filter__tab--disabled"
                                    key={i}
                                >
                                    {item}
                                </span>
                            ) : (
                                <span
                                    className={currentMaketsListTab === i ? 'cr-markets-list__filter__tab cr-markets-list__filter__tab--active' : 'cr-markets-list__filter__tab'}
                                    onClick={() => this.handleSetMarketListTab(i)}
                                    key={i}
                                >
                                    {item}
                                </span>
                            )
                        ),
                    )}
                    <div className="cr-markets-list__filter__search">
                        <FilterInput
                            data={currentBidUnitData}
                            onFilter={this.handleOnFilter}
                            filter={this.handleFilter}
                            placeholder={' '}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    // tslint:disable-next-line:no-any
    public renderItems(sortedData: any) {
        const { currencies, showFilter } = this.props;
        const {
            currentBidUnit,
        } = this.state;
        const dataSortedByFavorites = sortedData && sortedData.sort((a, b) => (checkFavoritesName(a.id) < checkFavoritesName(b.id)) ? 1 : (checkFavoritesName(a.id) > checkFavoritesName(b.id)) ? -1 : 0);
        const valuationPrecision = handleCCYPrecision(currencies, VALUATION_CURRENCY, -1);

        return (
            <React.Fragment>
                {dataSortedByFavorites[0] && dataSortedByFavorites.map((market, i) => {
                    const marketValuationPrecision = valuationPrecision === -1 ? market.bid_precision : valuationPrecision;
                    const showValuation = (market.bid_unit.toLowerCase() !== VALUATION_CURRENCY.toLowerCase());

                    return (
                        <tr key={i}>
                            <td>
                                {showFilter ? <div className="pg-markets-tab__favorite" onClick={() => this.handleOnChange(market.id, checkFavoritesName(market.id) ? false : true)}>
                                    <div className="pg-markets-tab__favorite-block">
                                        {checkFavoritesName(market.id) ? <StarChecked/> : <StarDefault/>}
                                        <input
                                            className={checkFavoritesName(market.id) ? 'cr-markets-list-table__body__item__favorite__checkbox' : 'cr-markets-list-table__body__item__favorite__checkbox-disabled'}
                                            checked={checkFavoritesName(market.id)}
                                            readOnly={true}
                                            type="checkbox"
                                        />
                                    </div>
                                </div> : null}
                                <div className="pg-markets-tab__redirect" onClick={() => this.handleRedirectToTrading(market)}>
                                    <div className="currency-image">
                                        <CryptoIcon code={market.ask_unit.toUpperCase()} />
                                    </div>
                                    <div className="pg-markets-tab__currency">
                                        <div className="pg-markets-tab__currency-name">
                                            {market.ask_unit.toUpperCase()}/{currentBidUnit.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <Decimal fixed={market.ask_precision}>{market.last}</Decimal>
                                { showValuation &&
                                    <span className="table-small-text">
                                        ≈ $
                                        <Decimal fixed={marketValuationPrecision}>
                                            {+market.last * +market.valuation}
                                        </Decimal>
                                    </span>
                                }
                            </td>
                            <td>
                                <span className={+market.price_change_percent.slice(0,-1) > 0 ? 'table-bg-color bg-green' : +market.price_change_percent.slice(0,-1) < 0 ? 'table-bg-color bg-red' : 'table-bg-color bg-white'}>
                                    {market.price_change_percent}
                                </span>
                            </td>
                            <td>
                                <Decimal fixed={market.ask_precision}>{market.high}</Decimal>
                                { showValuation &&
                                    <span className="table-small-text">
                                        ≈ $
                                        <Decimal fixed={marketValuationPrecision}>
                                            {+market.last !== 0 ? (+market.valuation * +market.high) : 0}
                                        </Decimal>
                                    </span>
                                }
                            </td>
                            <td>
                                <Decimal fixed={market.ask_precision}>{market.low}</Decimal>
                                { showValuation &&
                                    <span className="table-small-text">
                                        ≈ $
                                        <Decimal fixed={marketValuationPrecision}>
                                            {+market.last !== 0 ? (+market.valuation * +market.low) : 0}
                                        </Decimal>
                                    </span>
                                }
                            </td>
                            <td>
                                <Decimal fixed={0}>{market.vol}</Decimal>
                            </td>
                            { showValuation ? (
                            <td>
                                $<Decimal fixed={marketValuationPrecision}>{Math.abs(+market.valuation * (+market.last - +market.open))}</Decimal>
                            </td>
                            ) : (
                            <td>
                                $<Decimal fixed={marketValuationPrecision}>{Math.abs(+market.last - +market.open)}</Decimal>
                            </td>
                            )}
                        </tr>
                    );
                })}
            </React.Fragment>
        );
    }

    public render() {
        const {
            currencies,
            markets,
            marketTickers,
            showFilter,
        } = this.props;
        const {
            currentBidUnit,
            filterSearchKey,
            filteredData,
        } = this.state;

        const currentBidUnitMarkets = markets.filter(market => market.bid_unit === currentBidUnit);

        const defaultTicker = {
            last: '0.0',
            high: '0.0',
            low: '0.0',
            open: '0.0',
            price_change_percent: '+0.00%',
            vol: '0.0',
        };

        const currentBidUnitData = currentBidUnitMarkets.map(market =>
            ({
                ...market,
                last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.ask_precision),
                price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
                high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.ask_precision),
                low: Decimal.format(Number((marketTickers[market.id] || defaultTicker).low), market.ask_precision),
                open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.ask_precision),
                vol: Decimal.format(Number((marketTickers[market.id] || defaultTicker).vol), market.ask_precision),
            }),
        ).map(market =>
            ({
                ...market,
                valuation: estimateUnitValue(VALUATION_CURRENCY,  market.bid_unit, 1, currencies, markets, marketTickers),
            }),
        );

        let filtredMarketItems = this.handleTabFilterData(currentBidUnitData);

        if (filterSearchKey && filteredData !== -1) {
            filtredMarketItems = filtredMarketItems.filter(market => consist(market.ask_unit, filterSearchKey));
        }

        const sortedData = this.handleSortItems(filtredMarketItems);

        return (
            <div className="pg-markets-tab">
                <div className="cr-markets-list" style={!showFilter ? {flex: 1} : {}}>
                    {showFilter && this.renderFilter(currentBidUnitData)}
                    <div className="table-content">
                        {this.renderHeader(currentBidUnitData)}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <span onClick={() => this.handleChangeSortType('ask_unit')}>
                                            {this.translate('page.body.markets.table.sort.pair')}
                                            <span className="sort-icon">
                                                {this.handleChangeSortIcon('ask_unit')}
                                            </span>
                                        </span>
                                    </th>
                                    <th>
                                        <span onClick={() => this.handleChangeSortType('last')}>
                                            {this.translate('page.body.markets.table.sort.lastPrice')}
                                            <span className="sort-icon">
                                                {this.handleChangeSortIcon('last')}
                                            </span>
                                        </span>
                                    </th>
                                    <th>
                                        <span onClick={() => this.handleChangeSortType('price_change_percent')}>
                                            {this.translate('page.body.markets.table.sort.change')}
                                            <span className="sort-icon">
                                                {this.handleChangeSortIcon('price_change_percent')}
                                            </span>
                                        </span>
                                    </th>
                                    <th>
                                        {this.translate('page.body.markets.table.sort.high')}
                                    </th>
                                    <th>
                                        {this.translate('page.body.markets.table.sort.low')}
                                    </th>
                                    <th>
                                        {this.translate('page.body.markets.table.sort.vol')}
                                    </th>
                                    <th>
                                        <span onClick={() => this.handleChangeSortType('change')}>
                                            {this.translate('page.body.markets.table.sort.change')}
                                            <span className="sort-icon">
                                                {this.handleChangeSortIcon('change')}
                                            </span>
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderItems(sortedData)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // tslint:disable-next-line:no-any
    public handleSortItems = (items: any) => {
        const { sortItems } = this.state;

        switch (sortItems.type) {
            case 1:
                switch (sortItems.field) {
                    case 'ask_unit':
                        return items.sort((a, b) => a[sortItems.field] > b[sortItems.field] ? 1 : -1);
                    case 'price_change_percent':
                        return items.sort((a, b) => +a[sortItems.field].slice(0,-1) < +b[sortItems.field].slice(0,-1) ? 1 : -1);
                    case 'change':
                        return items.sort((a, b) => +a[sortItems.field] * a.sortItems < +b[sortItems.field] * +b.sortItems ? 1 : -1);
                    default:
                        return items.sort((a, b) => +a[sortItems.field] < +b[sortItems.field] ? 1 : -1);
                }
            case 2:
                switch (sortItems.field) {
                    case 'ask_unit':
                        return items.sort((a, b) => a[sortItems.field] < b[sortItems.field] ? 1 : -1);
                    case 'price_change_percent':
                        return items.sort((a, b) => +a[sortItems.field].slice(0,-1) > +b[sortItems.field].slice(0,-1) ? 1 : -1);
                    case 'change':
                        return items.sort((a, b) => +a[sortItems.field] * a.sortItems > +b[sortItems.field] * +b.sortItems ? 1 : -1);
                    default:
                        return items.sort((a, b) => +a[sortItems.field] > +b[sortItems.field] ? 1 : -1);
                }
            default:
                return items;
        }
    }

    private handleOnChange = (market: string, checked: boolean) => {
        if (checked) {
            localStorage.setItem(`favorites.${market}`, String(checked));
        } else {
            localStorage.removeItem(`favorites.${market}`);
        }
        this.forceUpdate();
    };

    public handleChangeSortIcon = (currentField: string) => {
        const { sortItems } = this.state;
        if (currentField === sortItems.field) {
            switch (sortItems.type) {
                case 1:
                    return <SortDesc/>;
                case 2:
                    return <SortAsc/>;
                default:
                    return <SortDefault/>;
            }
        } else {
            return <SortDefault/>;
        }
    }

    // tslint:disable-next-line:no-any
    public handleOnFilter = (result: any) => {
        this.setState({
            filteredData: result,
        });
    }

    private handleFilter = (market, term) => {
        this.setState({
            filterSearchKey: term,
        });
        return !term || consist(market.ask_unit, term);
    };

    // tslint:disable-next-line:no-any
    private handleTabFilterData = (currentData: any) => {
        const { currentMaketsListTab } = this.state;

        if (currentData.length) {
            switch (currentMaketsListTab) {
                case 0:
                    return currentData.filter(item => checkFavoritesName(item.id));
                case 2:
                    return currentData.sort((a, b) => +a.vol < +b.vol ? 1 : -1).filter((item, i) => i < TOP_BY_VOLUME);
                case 3:
                    return currentData.sort((a, b) => +a.change * +a.currencyValuation < +b.change * +b.currencyValuation ? 1 : -1).filter((item, i) => i < TOP_BY_CHANGE);
                default:
                    return currentData;
            }
        } else {
            return currentData;
        }
    }

    private handleChangeSortType = (currentField: string) => {
        const { sortItems } = this.state;

        this.setState({
            sortItems: {
                field: currentField,
                type: (sortItems.field.length && currentField !== sortItems.field) ? 1 : (sortItems.type === 2) ? 0 : (sortItems.type + 1) ,
            },
        });
    }

    private handleRedirectToTrading = (market: Market) => {
        this.props.setCurrentMarket(market);
        this.props.history.push(`/trading/${market.id}`);
    }

    private handleSetCurrentBidUnit = (currentBidUnit: string) => {
        this.setState({
            currentBidUnit,
        });
    }

    private handleSetMarketListTab = (currentMaketsListTab: number) => {
        this.setState({ currentMaketsListTab });
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currencies: selectCurrencies(state),
    currenciesLoading: selectCurrenciesLoading(state),
    markets: selectMarkets(state),
    marketsLoading: selectMarketsLoading(state),
    marketTickers: selectMarketTickers(state),
    currentMarket: selectCurrentMarket(state),
    historyList: selectHistory(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    fetchCurrencies: () => dispatch(currenciesFetch()),
    fetchMarkets: () => dispatch(marketsFetch()),
    rangerConnect: (payload: RangerConnectFetch['payload']) => dispatch(rangerConnectFetch(payload)),
    setCurrentMarket: (market: Market) => dispatch(setCurrentMarket(market)),
    tickers: () => dispatch(marketsTickersFetch()),
});

// tslint:disable-next-line:no-any
export const MarketsTab = injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(MarketsTabComponent) as any));


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/MarketsTab/index.tsx
