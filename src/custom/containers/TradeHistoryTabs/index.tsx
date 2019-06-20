import classnames from 'classnames';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { WalletItemProps } from '../../../components';
import {
    Market,
    marketsFetch,
    ordersCancelAllFetch,
    RootState,
    selectCancelAllFetching,
    selectCurrentMarket,
    selectCurrentPrice,
    selectOpenOrdersList,
    selectUserLoggedIn,
    selectWallets,
    selectWalletsLoading,
    setCurrentPrice,
    walletsData,
    walletsFetch,
} from '../../../modules';
import { OrderCommon } from '../../../modules/types';
import { TabPanel } from '../../../openware';
import move = require('../../assets/images/Move.svg');
import { FundsTab } from './Funds';
import { OpenOrdersTab } from './OpenOrders';
import { TradeTab } from './TradeHistory';

interface ReduxProps {
    currentMarket: Market | undefined;
    currentPrice: string;
    userLoggedIn: boolean;
    list: OrderCommon[];
    wallets: WalletItemProps[];
    walletsLoading?: boolean;
    cancelAllFetching: boolean;
}

interface DispatchProps {
    marketsFetch: typeof marketsFetch;
    setCurrentPrice: typeof setCurrentPrice;
    clearWallets: () => void;
    fetchWallets: typeof walletsFetch;
    ordersCancelAll: typeof ordersCancelAllFetch;
}

interface State {
    tab: string;
}

type Props = DispatchProps & ReduxProps & InjectedIntlProps;

class TradeHistoryContainer extends React.Component<Props, State> {
    public state = { tab: 'open' };

    public tabMapping = ['open', 'trade history', 'funds'];

    public render() {
        const className = classnames({
            'cr-table__noData': !this.props.list.length,
        });

        const cn = classnames('pg-trade-history', {
            'pg-trade-history-unlogged': !this.props.userLoggedIn,
        });

        return (
            <div className={className}>
                <div className={cn}>
                    {this.renderContent()}
                    <div className="cr-table-footer"/>
                </div>
            </div>
        );
    }

    private renderContent = () => {
        return (
            <TabPanel
                panels={this.renderTabs()}
                onTabChange={this.handleMakeRequest}
                optionalHead={<img className="cr-title-component__move" src={move} />}
            />
        );
    }

    private renderTabs = () => {
        const { tab } = this.state;
        const { wallets, clearWallets, fetchWallets, walletsLoading } = this.props;

        const formattedWallets = wallets.map((wallet: WalletItemProps) => ({
            ...wallet,
            currency: wallet.currency.toUpperCase(),
        }));

        return [
            {
                content: tab === 'open' ? (
                    <OpenOrdersTab
                        ordersCancelAll={this.props.ordersCancelAll}
                        cancelAllFetching={this.props.cancelAllFetching}
                        handleCancelAll={this.handleCancelAll}
                    />)
                : null,
                label: `${this.props.intl.formatMessage({ id: 'page.body.trade.header.openOrders' })} (${this.props.list.length})`,
            },
            {
                content: tab === 'trade history' ? <TradeTab /> : null,
                label: this.props.intl.formatMessage({ id: 'page.body.trade.header.tradeHistory' }),
            },
            {
                content: tab === 'funds' ? (
                    <FundsTab
                        wallets={formattedWallets}
                        clearWallets={clearWallets}
                        fetchWallets={fetchWallets}
                        walletsLoading={walletsLoading}
                    />)
                : null,
                label: this.props.intl.formatMessage({ id: 'page.body.trade.header.funds' }),
            },
        ];
    }

    private handleMakeRequest = (index: number) => {
        if (this.state.tab === this.tabMapping[index]) {
            return;
        }

        this.setState({ tab: this.tabMapping[index] });
    };

    private handleCancelAll = () => this.props.ordersCancelAll(this.state);
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
    userLoggedIn: selectUserLoggedIn(state),
    list: selectOpenOrdersList(state),
    wallets: selectWallets(state),
    walletsLoading: selectWalletsLoading(state),
    cancelAllFetching: selectCancelAllFetching(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    fetchWallets: () => dispatch(walletsFetch()),
    clearWallets: () => dispatch(walletsData([])),
    ordersCancelAll: payload => dispatch(ordersCancelAllFetch(payload)),
});

export const TradeHistoryComponent = injectIntl(connect(mapStateToProps, mapDispatchToProps)(TradeHistoryContainer));


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/TradeHistoryTabs/index.tsx
