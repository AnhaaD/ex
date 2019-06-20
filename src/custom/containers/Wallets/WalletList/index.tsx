import { History } from 'history';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
    currenciesFetch,
    Currency,
    Market,
    marketsFetch,
    marketsTickersFetch,
    RootState,
    selectCurrencies,
    selectMarkets,
    selectMarketsLoading,
    selectMarketTickers,
    selectUserLoggedIn,
    Ticker,
} from '../../../../modules';
import { rangerConnectFetch, RangerConnectFetch } from '../../../../modules/public/ranger';
import { RangerState } from '../../../../modules/public/ranger/reducer';
import { selectRanger } from '../../../../modules/public/ranger/selectors';
import {
    Checkbox,
    FilterInput,
} from '../../../../openware';
import { SortAsc, SortDefault, SortDesc } from '../../../assets/images/SortIcons';
import {
    DEFAULT_WALLET_PRECISION,
    VALUATION_CURRENCY,
} from '../../../constants';
import {
    consist,
    handleCCYPrecision,
    handleGetMinWithdrawAmount,
} from '../../../helpers';
import {
    estimateUnitValue,
    estimateValue,
    getWalletTotal,
} from '../../../helpers/estimateValue';
import { TipIcon } from '../TipIcon';
import { WalletItemElement, WalletItemProps } from '../WalletItem';

interface WalletListProps {
    handleSetWithdrawalData: () => void;
    history: History;
    isTwoFactorAuthRequired: boolean;
    userCanIncreaseLimit: boolean;
    walletItems: WalletItemProps[];
    withdrawDone: boolean;
}

interface ReduxProps {
    currencies: Currency[];
    marketsLoading?: boolean;
    marketTickers: {
        [key: string]: Ticker,
    };
    marketsData: Market[];
    rangerState: RangerState;
    userLoggedIn: boolean;
}

interface DispatchProps {
    fetchCurrencies: typeof currenciesFetch;
    fetchMarkets: typeof marketsFetch;
    rangerConnect: typeof rangerConnectFetch;
    tickers: typeof marketsTickersFetch;
}

interface WalletListState {
    action: string;
    activeCurrency: string;
    hideSmallBalance: boolean;
    filteredData: WalletItemProps[] | number;
    showTip: boolean;
    sortItems: {
        field: string;
        type: number;
    };
}

type Props = WalletListProps & ReduxProps & DispatchProps;

const CCY_VALUATION_LIMIT = 0.01;

const filter = (wallet, term) => consist(wallet.currency, term);

const marketsByCurrency = (currency: string, markets: Market[]) => {
    const lowerCaseCurrency = currency.toLowerCase();

    return markets.filter(market =>
        market.ask_unit === lowerCaseCurrency || market.bid_unit === lowerCaseCurrency);
};

// tslint:disable jsx-no-multiline-js
export class WalletList extends React.Component<Props, WalletListState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            action: '',
            activeCurrency: '',
            hideSmallBalance: false,
            filteredData: -1,
            showTip: false,
            sortItems: {
                field: '',
                type: 0,
            },
        };
    }

    public componentDidMount() {
        const {
            currencies,
            fetchCurrencies,
            marketsData,
            rangerState: { connected },
            tickers,
            userLoggedIn,
        } = this.props;

        if (marketsData.length === 0) {
            this.props.fetchMarkets();
            tickers();
        }

        if (currencies.length === 0) {
            fetchCurrencies();
        }

        if (!connected) {
            this.props.rangerConnect({withAuth: userLoggedIn});
        }
    }

    public componentWillReceiveProps(next: Props) {
        const {
            currencies,
            fetchCurrencies,
            tickers,
            marketsData,
        } = this.props;

        if (next.marketsData.length === 0 && next.marketsData !== marketsData) {
            tickers();
        }

        if (next.currencies.length === 0 && next.currencies !== currencies) {
            fetchCurrencies();
        }
    }

    public itemState = (currency: string) => {
        return this.state.activeCurrency === currency;
    };

    public render() {
        const {
            currencies,
            handleSetWithdrawalData,
            history,
            isTwoFactorAuthRequired,
            marketTickers,
            marketsData,
            userCanIncreaseLimit,
            walletItems,
            withdrawDone,
        } = this.props;

        const {
            filteredData,
            hideSmallBalance,
        } = this.state;

        const valuationWallet = walletItems.find(item => (item.currency === VALUATION_CURRENCY)) || walletItems.find(item => (item.type === 'fiat'));
        const valuationCurrency = valuationWallet ? valuationWallet.currency : '';
        let filtredWalletItems = walletItems;

        if (filteredData !== -1) {
            filtredWalletItems = filteredData as WalletItemProps[];
        }

        const formattedWalletItems = filtredWalletItems.map((wallet: WalletItemProps) => ({
            ...wallet,
            markets: marketsByCurrency(wallet.currency, marketsData),
            valuation: estimateUnitValue(valuationCurrency, wallet.currency, getWalletTotal(wallet), currencies, marketsData, marketTickers),
            min_withdraw_amount: handleGetMinWithdrawAmount(currencies, wallet.currency),
            precision: handleCCYPrecision(currencies, wallet.currency, DEFAULT_WALLET_PRECISION),
        }));

        const visibleWalletItems = hideSmallBalance ? (
            formattedWalletItems.filter(wallet => +wallet.valuation >= CCY_VALUATION_LIMIT)
        ) : formattedWalletItems;

        const sortedWalletItems = this.handleSortItems(visibleWalletItems);

        return (
            <div className="cr-wallet">
                <div className="cr-wallet-title">
                    <div className="cr-wallet-title__balances">Balances</div>
                    <div className="cr-wallet-title__exchange-account">Exchange Account</div>
                </div>
                {this.renderHeader(valuationCurrency, walletItems, estimateValue(valuationCurrency, currencies, sortedWalletItems, marketsData, marketTickers))}
                <div className="cr-wallet-list">
                    <div className="cr-wallet-list__header">
                        <div className="cr-wallet-item">
                            <span className="cr-wallet-item-cell" onClick={() => this.handleChangeSortType('currency')}>
                                Coin
                                <span className="cr-wallet-item-cell__sort-icon">
                                    {this.handleSortIcon('currency')}
                                </span>
                            </span>
                            <span className="cr-wallet-item-cell">Available</span>
                            <span className="cr-wallet-item-cell">On Orders</span>
                            <span className="cr-wallet-item-cell" onClick={() => this.handleChangeSortType('currencyValuation')}>
                                {formattedWalletItems.length && valuationCurrency} Valuation
                                <span className="cr-wallet-item-cell__sort-icon">
                                    {this.handleSortIcon('currencyValuation')}
                                </span>
                            </span>
                            <span className="cr-wallet-item-cell">Lock Position</span>
                            <span className="cr-wallet-item-cell">Action</span>
                        </div>
                    </div>
                    <div className="cr-wallet-list__body">
                        {sortedWalletItems.map((item, i) => (
                            this.itemState(item.currency) ?
                            <WalletItemElement
                                key={i}
                                active={true}
                                handleSetWithdrawalData={handleSetWithdrawalData}
                                handleClick={value => this.handleClick(value, item.currency)}
                                history={history}
                                isTwoFactorAuthRequired={isTwoFactorAuthRequired}
                                userCanIncreaseLimit={userCanIncreaseLimit}
                                withdrawDone={withdrawDone}
                                currencies={currencies}
                                {...item}
                            /> :
                            <WalletItemElement
                                key={i}
                                active={false}
                                handleClick={value => this.handleClick(value, item.currency)}
                                history={history}
                                isTwoFactorAuthRequired={isTwoFactorAuthRequired}
                                toggleConfirmModal={handleSetWithdrawalData}
                                userCanIncreaseLimit={userCanIncreaseLimit}
                                withdrawDone={withdrawDone}
                                currencies={currencies}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    public handleClick = (value: string, currency: string) => {
        if (value && this.state.activeCurrency === currency) {
            this.setState({ activeCurrency: '' });
        } else {
            this.setState({ activeCurrency: currency });
        }
    };

    public renderHeader = (firstFIAT: string, walletItems: WalletItemProps[], valuation: string) => {
        const {
            hideSmallBalance,
            showTip,
        } = this.state;
        return (
            <div className="cr-wallet-header">
                <div className="cr-wallet-header-cell cr-wallet-header__estimated-value">
                    <span className="cr-wallet-header__estimated-value__label">Estimated&nbsp;Value: </span>
                    <span className="cr-wallet-header__estimated-value__ccy">{valuation}&nbsp;{firstFIAT}</span>
                </div>
                <div className="cr-wallet-header-cell cr-wallet-header__hide-small-balances">
                    <Checkbox
                        checked={hideSmallBalance}
                        className=""
                        onChange={() => this.handleHideSmallBalanceWallets()}
                        label={'Hide Small Balances'}
                    />
                    <div className="cr-wallet-header__hide-small-balances__tip" onMouseOver={() => this.handleShowTip()} onMouseOut={() => this.handleShowTip()}>
                        <div className="cr-wallet-header__hide-small-balances__tip__icon">
                            <TipIcon/>
                        </div>
                        {showTip ? (
                            <div className="cr-wallet-header__hide-small-balances__tip__text">
                                <span>Below {CCY_VALUATION_LIMIT} {firstFIAT}</span>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="cr-wallet-header-cell cr-wallet-header__search-bar">
                    <FilterInput
                        data={walletItems}
                        onFilter={this.handleFilter}
                        filter={filter}
                        placeholder={' '}
                    />
                </div>
                <div className="cr-wallet-header-cell cr-wallet-header__history-redirect">
                    <span onClick={() => this.handleNavigateToHistory()}>History</span>
                </div>
            </div>
        );
    };

    // tslint:disable-next-line:no-any
    public handleFilter = (result: any) => {
        this.setState({
            activeCurrency: '',
            filteredData: result,
        });
    };

    public handleSortItems = (items: WalletItemProps[]) => {
        const { sortItems } = this.state;
        switch (sortItems.type) {
            case 1:
                if (sortItems.field === 'currencyValuation') {
                    return items.sort((a, b) => a.valuation < b.valuation ? 1 : -1);
                } else {
                    return items.sort((a, b) => a[sortItems.field] > b[sortItems.field] ? 1 : -1);
                }
            case 2:
                if (sortItems.field === 'currencyValuation') {
                    return items.sort((a, b) => a.valuation > b.valuation ? 1 : -1);
                } else {
                    return items.sort((a, b) => a[sortItems.field] < b[sortItems.field] ? 1 : -1);
                }
            default:
                return items;
        }
    };

    public handleSortIcon = (currentField: string) => {
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
    };

    private handleChangeSortType = (currentField: string) => {
        const { sortItems } = this.state;

        this.setState({
            sortItems: {
                field: currentField,
                type: (sortItems.field.length && currentField !== sortItems.field) ? 1 : (sortItems.type === 2) ? 0 : (sortItems.type + 1) ,
            },
        });
    };

    private handleHideSmallBalanceWallets() {
        this.setState(prev => ({
            activeCurrency: '',
            hideSmallBalance: !prev.hideSmallBalance,
        }));
    }

    private handleNavigateToHistory = () => {
        this.props.history.push('/history');
    };

    private handleShowTip = () => {
        this.setState({
            showTip: !this.state.showTip,
        });
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currencies: selectCurrencies(state),
    marketsData: selectMarkets(state),
    marketsLoading: selectMarketsLoading(state),
    marketTickers: selectMarketTickers(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        fetchCurrencies: () => dispatch(currenciesFetch()),
        fetchMarkets: () => dispatch(marketsFetch()),
        tickers: () => dispatch(marketsTickersFetch()),
        rangerConnect: (payload: RangerConnectFetch['payload']) => dispatch(rangerConnectFetch(payload)),
    });

const WalletListElement = connect(mapStateToProps, mapDispatchToProps)(WalletList);

export {
    WalletListElement,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Wallets/WalletList/index.tsx
