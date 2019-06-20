import { History } from 'history';
import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { minutesUntilAutoLogout } from '../../api';
import { pgRoutes } from '../../custom/constants';
import {
    ChangeForgottenPasswordScreen,
    ConfirmScreen,
    EmailVerificationScreen,
    ForgotPasswordScreen,
    HistoryScreen,
    HomeScreen,
    LeaderBoard,
    MarketsTabScreen,
    OrdersTabScreen,
    PrivacyPolicyScreen,
    ProfileScreen,
    ProfileTwoFactorAuthScreen,
    SignInScreen,
    SignUpScreen,
    SocialMyProfile,
    SocialUserProfile,
    SubscriptionsScreen,
    TermsAndConditionsScreen,
    TradingScreen,
    WalletsScreen,
} from '../../custom/screens';
import {
    logoutFetch,
    Market,
    RootState,
    selectCurrentMarket,
    selectUserFetching,
    selectUserInfo,
    selectUserLoggedIn,
    User,
    userFetch,
    walletsReset,
} from '../../modules';
import { Loader } from '../../openware';
import { VerificationScreen } from '../../screens';

interface ReduxProps {
    currentMarket: Market | undefined;
    user: User;
    isLoggedIn: boolean;
    userLoading?: boolean;
}

interface DispatchProps {
    logout: typeof logoutFetch;
    userFetch: typeof userFetch;
    walletsReset: typeof walletsReset;
}

interface OwnProps {
    history: History;
}

export type LayoutProps = ReduxProps & DispatchProps & OwnProps;

const renderLoader = () => (
    <div className="pg-loader-container">
        <Loader />
    </div>
);

const CHECK_INTERVAL = 15000;
const STORE_KEY = 'lastAction';

//tslint:disable-next-line no-any
const PrivateRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }
    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged) {
        return <Route {...rest} render={renderCustomerComponent} />;
    }

    return (
        <Route {...rest}>
            <Redirect to={'/signin'} />
        </Route>
    );
};

//tslint:disable-next-line no-any
const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }

    if (isLogged) {
        return <Route {...rest}><Redirect to={'/wallets'} /></Route>;
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;
    return <Route {...rest} render={renderCustomerComponent} />;
};

class LayoutComponent extends React.Component<LayoutProps> {
    public static eventsListen = [
        'click',
        'keydown',
        'scroll',
        'resize',
        'mousemove',
        'TabSelect',
        'TabHide',
    ];

    public timer;

    constructor(props: LayoutProps) {
        super(props);
        this.initListener();
    }

    public componentDidMount() {
        const { isLoggedIn, history } = this.props;
        this.props.userFetch();

        if (!isLoggedIn) {
            if (history.location.pathname === '/trading') {
                history.push('/home');
            }
        }

        this.initInterval();
        this.check();
    }

    public componentDidUpdate(prev: LayoutProps) {
        const { isLoggedIn, history } = this.props;
        if (!isLoggedIn && prev.isLoggedIn) {
            this.props.walletsReset();
            if (!pgRoutes(isLoggedIn)[0].some(route => !history.location.pathname.includes(route[1]))) {
                history.push('/trading/');
            }
        }
    }

    public componentWillUnmount() {
        for (const type of LayoutComponent.eventsListen) {
            document.body.removeEventListener(type, this.reset);
        }
        clearInterval(this.timer);
    }

    public render() {
        const { isLoggedIn, userLoading } = this.props;
        return (
            <div className="container-fluid pg-layout">
                <Switch>
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signin" component={SignInScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/confirmation" component={VerificationScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signup" component={SignUpScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/forgot_password" component={ForgotPasswordScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/password_reset" component={ChangeForgottenPasswordScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/email-verification" component={EmailVerificationScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/home" component={HomeScreen} />
                    <Route loading={userLoading} isLogged={isLoggedIn} path="/leaderboard" component={LeaderBoard} />
                    <Route exact={true} path="/privacy-policy" component={PrivacyPolicyScreen} />
                    <Route exact={true} path="/terms-and-conditions" component={TermsAndConditionsScreen} />
                    <Route exact={true} path="/trading/:market?" component={TradingScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/markets" component={MarketsTabScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/orders" component={OrdersTabScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/history" component={HistoryScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/confirm" component={ConfirmScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile" component={ProfileScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets" component={WalletsScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/security/2fa" component={ProfileTwoFactorAuthScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/subscriptions" component={SubscriptionsScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/social/users/:nickname" component={SocialUserProfile} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/social/me" component={SocialMyProfile} />
                    <Route path="**"><Redirect to="/trading" /></Route>
                </Switch>
            </div>
        );
    }

    private getLastAction = () => {
        return localStorage.getItem(STORE_KEY) !== null ? parseInt(localStorage.getItem(STORE_KEY) || '0', 10) : 0;
    };

    private setLastAction = (lastAction: number) => {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    }

    private initListener = () => {
        this.reset();
        for (const type of LayoutComponent.eventsListen) {
            document.body.addEventListener(type, this.reset);
        }
    }

    private reset = () => {
        this.setLastAction(Date.now());
    }

    private initInterval = () => {
        this.timer = setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    }

    private check = () => {
        const { user } = this.props;
        const now = Date.now();
        const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        if (isTimeout && user.email) {
            this.props.logout();
        }
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    currentMarket: selectCurrentMarket(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
    userLoading: selectUserFetching(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    logout: () => dispatch(logoutFetch()),
    userFetch: () => dispatch(userFetch()),
    walletsReset: () => dispatch(walletsReset()),
});

// tslint:disable-next-line no-any
const Layout = withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutComponent) as any) as any;

export {
    Layout,
};


// WEBPACK FOOTER //
// src/drone/src/src/routes/Layout/index.tsx
