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
import { Grid } from '../../../components/Grid';
import { setDocumentTitle } from '../../../custom/helpers/setDocumentTitle';
import { getUrlPart } from '../../../helpers';
import {
    RootState,
    selectCurrentMarket,
    selectUserInfo,
    selectUserLoggedIn,
    setCurrentMarket,
    setCurrentPrice,
    User,
} from '../../../modules';
import { GridLayoutState, saveLayouts, selectGridLayoutState } from '../../../modules/public/gridLayout';
import { Market, marketsFetch, selectMarkets } from '../../../modules/public/markets';
import { depthFetch } from '../../../modules/public/orderBook';
import { rangerConnectFetch, RangerConnectFetch } from '../../../modules/public/ranger';
import { RangerState } from '../../../modules/public/ranger/reducer';
import { selectRanger } from '../../../modules/public/ranger/selectors';
import { selectWallets, Wallet, walletsFetch } from '../../../modules/user/wallets';
import {
    ChartContainer,
    CurrentMarketInfoComponent,
    MarketsComponent,
    Order,
    OrderBook,
    RecentTrades,
    TradeHistoryComponent,
} from '../../containers';

const breakpoints = {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
};

const cols = {
    lg: 24,
    md: 24,
    sm: 12,
    xs: 12,
    xxs: 12,
};

const defaultGridItems = [
    {
        i: 0,
        render: () => <MarketsComponent/>,
    },
    {
        i: 1,
        render: () => <Order/>,
    },
    {
        i: 2,
        render: () => <ChartContainer/>,
    },
    {
        i: 3,
        render: () => <OrderBook/>,
    },
    {
        i: 4,
        render: () => <TradeHistoryComponent/>,
    },
    {
        i: 5,
        render: () => <RecentTrades/>,
    },
    {
        i: 6,
        render: () => <CurrentMarketInfoComponent/>,
    },
];

interface ReduxProps {
    currentMarket: Market | undefined;
    markets: Market[];
    wallets: Wallet[];
    user: User;
    rangerState: RangerState;
    userLoggedIn: boolean;
    rgl: GridLayoutState;
}

interface DispatchProps {
    depthFetch: typeof depthFetch;
    marketsFetch: typeof marketsFetch;
    accountWallets: typeof walletsFetch;
    rangerConnect: typeof rangerConnectFetch;
    setCurrentPrice: typeof setCurrentPrice;
    setCurrentMarket: typeof setCurrentMarket;
    saveLayouts: typeof saveLayouts;
}

type Props = DispatchProps & ReduxProps & InjectedIntlProps;

// tslint:disable:jsx-no-lambda
class Trading extends React.Component<Props> {
    public async componentDidMount() {
        setDocumentTitle('Trading');
        const {
            wallets,
            markets,
            currentMarket,
            userLoggedIn,
            rangerState: {connected},
        } = this.props;

        if (markets.length < 1) {
            this.props.marketsFetch();
        }
        if (!wallets || wallets.length === 0) {
            this.props.accountWallets();
        }
        if (currentMarket) {
            this.props.depthFetch(currentMarket);
        }
        if (!connected) {
            this.props.rangerConnect({withAuth: userLoggedIn});
        }
        if (!userLoggedIn && currentMarket) {
            this.props.history.replace(`/trading/${currentMarket.id}`);
        }
    }

    public componentWillUnmount() {
        this.props.setCurrentPrice('');
    }

    public componentWillReceiveProps(nextProps) {
        const {userLoggedIn, history, markets, currentMarket} = this.props;
        if (userLoggedIn !== nextProps.userLoggedIn) {
            this.props.rangerConnect({withAuth: nextProps.userLoggedIn});
        }
        if (markets.length !== nextProps.markets.length) {
            this.setMarketFromUrlIfExists(nextProps.markets);
        }
        if (nextProps.currentMarket && currentMarket !== nextProps.currentMarket) {
            history.replace(`/trading/${nextProps.currentMarket.id}`);
            this.props.depthFetch(nextProps.currentMarket);
        }
    }

    public translate = (e: string) => {
        return this.props.intl.formatMessage({id: e});
    };

    public render() {
        const rowHeight = 14;
        const allGridItems = defaultGridItems;
        const {rgl} = this.props;

        return (
            <div className="pg-trading-screen">
                <div className="pg-trading-wrap">
                    <Grid
                        breakpoints={breakpoints}
                        className="layout"
                        children={allGridItems}
                        cols={cols}
                        draggableHandle=".cr-table-header__content, .pg-trading-screen__tab-panel, .draggable-container"
                        layouts={rgl.layouts}
                        rowHeight={rowHeight}
                        onLayoutChange={(layout, layouts) => this.handleLayoutChange(layout, layouts)}
                    />
                </div>
            </div>
        );
    }

    private setMarketFromUrlIfExists = (markets: Market[]): void => {
        const urlMarket: string = getUrlPart(2, window.location.pathname);
        const market: Market | undefined = markets.find(item => item.id === urlMarket);
        // if part is existed market, set it as currentMarket, else select first one
        if (market) {
            this.props.setCurrentMarket(market);
        }
    };

    private handleLayoutChange = (layout, layouts) => {
        this.props.saveLayouts({key: 'layouts', layouts});
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    wallets: selectWallets(state),
    user: selectUserInfo(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
    rgl: selectGridLayoutState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    depthFetch: payload => dispatch(depthFetch(payload)),
    accountWallets: () => dispatch(walletsFetch()),
    rangerConnect: (payload: RangerConnectFetch['payload']) => dispatch(rangerConnectFetch(payload)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    setCurrentMarket: payload => dispatch(setCurrentMarket(payload)),
    saveLayouts: payload => dispatch(saveLayouts(payload)),
});

export const TradingScreen = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Trading));


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/TradingScreen/index.tsx
