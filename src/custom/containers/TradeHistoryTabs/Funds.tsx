import classnames from 'classnames';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
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
    Ticker,
    walletsFetch,
} from '../../../modules';
import {
    Decimal,
    Loader,
    Table,
} from '../../../openware';
import {
    DEFAULT_WALLET_PRECISION,
    VALUATION_CURRENCY,
} from '../../constants';
import { handleCCYPrecision } from '../../helpers';
import {
    estimateUnitValue,
    getWalletTotal,
} from '../../helpers/estimateValue';
import { WalletItemProps } from '../Wallets/WalletItem';

interface ReduxProps {
    currencies: Currency[];
    marketsLoading?: boolean;
    marketTickers: {
        [key: string]: Ticker,
    };
    marketsData: Market[];
}

interface DispatchProps {
    fetchCurrencies: typeof currenciesFetch;
    fetchMarkets: typeof marketsFetch;
    tickers: typeof marketsTickersFetch;
}

interface FundsProps {
    wallets: WalletItemProps[];
    walletsLoading?: boolean;
    clearWallets: () => void;
    fetchWallets: typeof walletsFetch;
}

type Props = FundsProps & ReduxProps & DispatchProps & InjectedIntlProps;

class FundsComponent extends React.Component<Props> {

    public translate = (id: string) => this.props.intl.formatMessage({ id });

    public componentDidMount() {
        const {
            currencies,
            fetchCurrencies,
            fetchMarkets,
            fetchWallets,
            marketsData,
            tickers,
            wallets,
        } = this.props;

        if (wallets.length === 0) {
            fetchWallets();
        }

        if (marketsData.length === 0) {
            fetchMarkets();
            tickers();
        }

        if (currencies.length === 0) {
            fetchCurrencies();
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

    public render() {
        const { wallets, walletsLoading } = this.props;
        const className = classnames('cr-funds', {
            'cr-tab-content__noData': wallets.length === 0,
        });
        const classNameEmpty = classnames({
            'cr-table__noData': !wallets.length,
        });
        return (
            <div className={classNameEmpty}>
                <div className={className}>
                    {walletsLoading ? <Loader /> : this.renderContent()}
                </div>
            </div>
        );
    }

    private renderContent = () => {
        return (
            <React.Fragment>
                <Table
                    header={this.getHeaders()}
                    data={this.getData()}
                    colSpan={5}
                />
            </React.Fragment>
        );
    };

    private getHeaders = () => {
        const { wallets } = this.props;
        const firstWalletFIAT = wallets.find(item => (item.currency === VALUATION_CURRENCY)) || wallets.find(item => (item.type === 'fiat'));

        const firstFIAT = firstWalletFIAT ? firstWalletFIAT.currency : '';
        return [
            this.translate('page.body.trade.header.funds.content.coin'),
            this.translate('page.body.trade.header.funds.content.total'),
            this.translate('page.body.trade.header.funds.content.available'),
            this.translate('page.body.trade.header.funds.content.inOrder'),
            <span key={4}>{firstFIAT} {this.translate('page.body.trade.header.funds.content.value')}</span>,
        ];
    };

    private getData = () => {
        const {
            currencies,
            marketsData,
            marketTickers,
            wallets,
        } = this.props;

        const valuationWallet = wallets.find(item => (item.currency === VALUATION_CURRENCY)) || wallets.find(item => (item.type === 'fiat'));
        const valuationCurrency = valuationWallet ? valuationWallet.currency : '';

        const formattedWallets = wallets.map((wallet: WalletItemProps) => ({
            ...wallet,
            currency: wallet.currency.toUpperCase(),
            valuation: estimateUnitValue(valuationCurrency, wallet.currency, getWalletTotal(wallet), currencies, marketsData, marketTickers),
            walletPrecision: handleCCYPrecision(currencies, wallet.currency, DEFAULT_WALLET_PRECISION),
        }));

        return [...formattedWallets].length > 0
            ? [...formattedWallets].map(this.renderRow)
            : [[this.translate('page.noDataToShow')]];
    };

    private renderRow = (item, id) => {
        const {
            balance,
            currency,
            locked,
            valuation,
            walletPrecision,
        } = item;

        const available = balance - locked;

        return [
            <span key={id}>{currency}</span>,
            <span key={id}>{balance}</span>,
            <span key={id}><Decimal fixed={walletPrecision}>{available.toString()}</Decimal></span>,
            <span key={id}><Decimal fixed={walletPrecision}>{locked.toString()}</Decimal></span>,
            <span key={id}>{valuation}</span>,
        ];
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currencies: selectCurrencies(state),
    marketsData: selectMarkets(state),
    marketsLoading: selectMarketsLoading(state),
    marketTickers: selectMarketTickers(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        fetchCurrencies: () => dispatch(currenciesFetch()),
        fetchMarkets: () => dispatch(marketsFetch()),
        tickers: () => dispatch(marketsTickersFetch()),
    });

export const FundsTab = injectIntl(connect(mapStateToProps, mapDispatchToProps)(FundsComponent));


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/TradeHistoryTabs/Funds.tsx
