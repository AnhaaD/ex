// tslint:disable jsx-no-multiline-js
import classnames from 'classnames';
import { History } from 'history';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import {
    changeColorTheme,
    changeLanguage,
    logoutFetch,
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentLanguage,
    selectCurrentMarket,
    selectUserInfo,
    selectUserLoggedIn,
    User,
    walletsReset,
} from '../../../modules';
import {
    CloseAvatar,
    CloseIcon,
    OpenAvatar,
    OpenIcon,
} from '../../assets/images/NavBarIcons';
import { pgRoutes } from '../../constants';
import moon = require('./moon.svg');
import sun = require('./sun.svg');

export interface ReduxProps {
    address: string;
    colorTheme: string;
    currentMarket: Market | undefined;
    isLoggedIn: boolean;
    lang: string;
    success?: boolean;
    user: User;
}

interface DispatchProps {
    changeColorTheme: typeof changeColorTheme;
    changeLanguage: typeof changeLanguage;
    logout: typeof logoutFetch;
    walletsReset: typeof walletsReset;
}

export interface OwnProps {
    onLinkChange?: () => void;
    history: History;
}

type NavbarProps = OwnProps & ReduxProps & RouteProps & DispatchProps;

const shouldUnderline = (address: string, url: string): boolean =>
    (url === '/trading' && address.includes('/trading')) || address === url;

interface NavbarState {
    isOpen: boolean;
    isOpenLanguage: boolean;
    isOpenSocialMenu: boolean;
    email: string;
    message: string;
    name: string;
    recaptchaResponse: string;
    errorModal: boolean;
}

class NavBarComponent extends React.Component<NavbarProps, NavbarState> {
    public readonly state = {
        isOpen: false,
        isOpenLanguage: false,
        isOpenSocialMenu: false,
        email: '',
        name: '',
        message: '',
        recaptchaResponse: '',
        errorModal: false,
    };

    public navItem = (address: string, onLinkChange?: () => void) => (values: string[], index: number) => {
        const {
            colorTheme,
            isLoggedIn,
            currentMarket,
        } = this.props;
        const { isOpenSocialMenu } = this.state;
        const [name, url] = values;

        const cx = classnames('pg-navbar__content-item', {
            'pg-navbar__content-item--active': shouldUnderline(address, url),
            'pg-navbar__content-item-logging': isLoggedIn,
        });

        const socialMenuOpenClassName = classnames('pg-navbar__content-item__dropdown__label', {
            'pg-navbar__content-item__dropdown__label--active': isOpenSocialMenu || (address === '/subscriptions' || address === '/social/me' && url === '/social/me'),
        });

        const handleLinkChange = () => {
            if (onLinkChange) {
                onLinkChange();
                this.handleToggleCurrentStyleModeClass('dark');
            }
        };

        const path = url.includes('/trading') && currentMarket ? `/trading/${currentMarket.id}` : url;

        return (
            <li key={index}>
                {name !== 'page.header.navbar.social' ? (
                    <Link className={cx} to={path} onClick={handleLinkChange}>
                        <FormattedMessage id={name} />
                    </Link>
                ) : (
                    <div
                        onClick={this.toggleSocialMenu}
                        className="pg-navbar__content-item__dropdown pg-navbar__header-settings__account-dropdown"
                    >
                        <span className={socialMenuOpenClassName}>
                            <FormattedMessage id={'page.header.navbar.social'}/>
                        </span>
                        {colorTheme === 'light' ? (
                            isOpenSocialMenu ? (
                                <span className="icon">
                                    <OpenIcon fillColor="#6e6987" />
                                </span>
                            ) : (
                                <span className="icon">
                                    <CloseIcon fillColor="#657395" />
                                </span>
                            )
                        ) : (
                            isOpenSocialMenu ? (
                                <span className="icon">
                                    <OpenIcon fillColor="white" />
                                </span>
                            ) : (
                                <span className="icon">
                                    <CloseIcon fillColor="#657395" />
                                </span>
                            )
                        )}
                        {isOpenSocialMenu && this.getSocialMenu()}
                    </div>
                )}
            </li>
        );
    };

    public render() {
        const {
            colorTheme,
            location,
            lang,
            user,
        } = this.props;
        const { isOpenLanguage } = this.state;

        const address = location ? location.pathname : '';
        const languageName = this.getLanguageName(lang);
        const languageClassName = classnames('dropdown-menu-language-field', {
            'dropdown-menu-language-field-active': isOpenLanguage,
        });

        const routes = pgRoutes(!!user.email);
        this.handleToggleCurrentStyleModeClass(colorTheme);

        return (
            <React.Fragment>
                <div className="pg-navbar">
                    <ul className="pg-navbar__content">
                        <div className="pg-navbar__content-routes pl-4">
                            {routes[0].map(this.navItem(address, this.props.onLinkChange))}
                        </div>
                        <div className="pg-navbar__content-routes">
                            {routes[1].map(this.navItem(address, this.props.onLinkChange))}
                            <div className="pg-navbar__content__switcher">
                                {this.getLightDarkMode()}
                            </div>
                            <div className="pg-navbar__header-settings">
                                {user.email ? this.getUserEmailMenu() : null}
                                <div className="btn-group pg-navbar__header-settings__account-dropdown dropdown-toggle dropdown-menu-language-container">
                                    <div onClick={this.toggleLanguageMenu} className={languageClassName}>
                                        {languageName}
                                        {colorTheme === 'light' ? (
                                            isOpenLanguage ? <span className="icon"><OpenIcon fillColor="#6e6987" /></span> : <span className="icon"><CloseIcon fillColor="#657395" /></span>
                                        ) : (
                                            isOpenLanguage ? <span className="icon"><OpenIcon fillColor="white" /></span> : <span className="icon"><CloseIcon fillColor="#657395" /></span>
                                        )}
                                    </div>
                                    {isOpenLanguage ? this.getLanguageMenu() : null}
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="pg-navbar-mobile">
                    <div className="pg-navbar-mobile__content">
                        {routes[0].map(this.mobileNavItem(address, this.props.onLinkChange))}
                        {routes[1].map(this.mobileNavItem(address, this.props.onLinkChange))}
                        {user.email ? this.getMobileUserEmailMenu() : null}
                    </div>
                </div>
            </React.Fragment>
        );
    }


    public mobileNavItem = (address: string, onLinkChange?: () => void) => (values: string[], index: number) => {
        const {
            isLoggedIn,
            currentMarket,
        } = this.props;
        const { isOpenSocialMenu } = this.state;
        const [name, url] = values;

        const cx = classnames('pg-navbar__content-item', {
            'pg-navbar__content-item--active': shouldUnderline(address, url),
            'pg-navbar__content-item-logging': isLoggedIn,
        });

        const socialMenuOpenClassName = classnames('pg-navbar__content-item pg-navbar__content-item__dropdown__label', {
            'pg-navbar__content-item__dropdown__label--active': (address === '/subscriptions' || address === '/social/me' && url === '/social/me'),
        });

        const handleLinkChange = () => {
            if (onLinkChange) {
                onLinkChange();
                this.handleToggleCurrentStyleModeClass('dark');
            }
        };

        const path = url.includes('/trading') && currentMarket ? `/trading/${currentMarket.id}` : url;

        return (
            <div key={index}>
                {name !== 'page.header.navbar.social' ? (
                    <Link className={cx} to={path} onClick={handleLinkChange}>
                        <FormattedMessage id={name} />
                    </Link>
                ) : (
                    <div
                        onClick={this.toggleSocialMenu}
                    >
                        <a className={socialMenuOpenClassName}>
                            <FormattedMessage id={'page.header.navbar.social'}/>
                        </a>
                        {isOpenSocialMenu && this.getMobileSocialMenu()}
                    </div>
                )}
            </div>
        );
    };

    private getMobileUserEmailMenu = () => {
        const address = location ? location.pathname : '';
        const cx = classnames('pg-navbar__content-item pg-navbar__content-item-logging', {
            'pg-navbar__content-item--active': (address === '/profile'),
        });

        return (
            <React.Fragment>
                <div>
                    <Link
                        to="/profile"
                        onClick={this.props.onLinkChange}
                        className={cx}
                    >
                        <span>Profile</span>
                    </Link>
                </div>
                <div>
                    <Link
                        className="pg-navbar__content-item pg-navbar__content-item-logging"
                        onClick={this.handleLogOut}
                        to="/"
                    >
                        <FormattedMessage id={'page.header.navbar.logout'} />
                    </Link>
                </div>
            </React.Fragment>
        );
    };

    private getMobileSocialMenu = () => {
        return (
            <React.Fragment>
                <div className="pl-3">
                    <Link
                        className="pg-navbar__content-item"
                        to="/subscriptions"
                        onClick={this.props.onLinkChange}
                    >
                        <FormattedMessage id={'page.header.navbar.subscriptions'} />
                    </Link>
                </div>
                <div className="pl-3">
                    <Link
                        className="pg-navbar__content-item"
                        to="/social/me"
                        onClick={this.props.onLinkChange}
                    >
                        <FormattedMessage id={'page.header.navbar.myProfile'} />
                    </Link>
                </div>
            </React.Fragment>
        );
    }

    private getLightDarkMode = () => {
        const {
            colorTheme,
        } = this.props;

        if (colorTheme === 'dark') {
            return (
                <div className="pg-navbar__content__switcher-item" onClick={e => this.handleChangeCurrentStyleMode('light')}>
                    <img src={moon} />
                </div>
            );
        }

        return (
            <div className="pg-navbar__content__switcher-item" onClick={e => this.handleChangeCurrentStyleMode('dark')}>
                <img src={sun} />
            </div>
        );
    };

    private getSocialMenu = () => {
        return (
            <div className="dropdown-menu dropdown-menu-social" role="menu">
                <div className="dropdown-menu-item-social">
                    <Link
                        className="dropdown-menu-item-social__link"
                        to="/subscriptions"
                    >
                        <FormattedMessage id={'page.header.navbar.subscriptions'} />
                    </Link>
                </div>
                <div className="dropdown-menu-item-social">
                    <Link
                        className="dropdown-menu-item-social__link"
                        to="/social/me"
                    >
                        <FormattedMessage id={'page.header.navbar.myProfile'} />
                    </Link>
                </div>
            </div>
        );
    }

    private getLanguageName = (lang: string) => {
        switch (lang) {
            case 'en':
                return 'English';
            case 'ru':
                return 'Russian';
            case 'ko':
                return 'Korean';
            case 'pt':
                return 'Portuguese';
            case 'ja':
                return 'Japanese';
            default:
                return 'English';
        }
    };

    private getLanguageMenu = () => {
        return (
            <div className="dropdown-menu dropdown-menu-language" role="menu">
                <div className="dropdown-menu-item-lang" onClick={e => this.handleChangeLanguage('en')}>
                    EN
                </div>
                <div className="dropdown-menu-item-lang" onClick={e => this.handleChangeLanguage('ja')}>
                    JA
                </div>
                <div className="dropdown-menu-item-lang" onClick={e => this.handleChangeLanguage('ko')}>
                    KO
                </div>
                <div className="dropdown-menu-item-lang" onClick={e => this.handleChangeLanguage('pt')}>
                    POR
                </div>
                <div className="dropdown-menu-item-lang" onClick={e => this.handleChangeLanguage('ru')}>
                    RU
                </div>
            </div>
        );
    };

    private getUserEmailMenu = () => {
        const { colorTheme } = this.props;
        const { isOpen } = this.state;
        const userClassName = classnames('navbar-user-menu', {
            'navbar-user-menu-active': isOpen,
        });

        return (
            <div className="btn-group pg-navbar__header-settings__account-dropdown dropdown-toggle">
                <div onClick={this.openMenu} className={userClassName}>
                    {colorTheme === 'light' ? (
                        isOpen ? (
                            <React.Fragment>
                                <OpenAvatar fillColor="#6e6987"/>
                                <span className="icon"><OpenIcon fillColor="#6e6987"/></span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <CloseAvatar fillColor="#737F92"/>
                                <span className="icon"><CloseIcon fillColor="#657395"/></span>
                            </React.Fragment>
                        )
                    ) : (
                        isOpen ? (
                            <React.Fragment>
                                <OpenAvatar fillColor="white"/>
                                <span className="icon"><OpenIcon fillColor="white"/></span>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <CloseAvatar fillColor="#737F92"/>
                                <span className="icon"><CloseIcon fillColor="#657395"/></span>
                            </React.Fragment>
                        )
                    )}
                </div>
                {isOpen ? this.getUserMenu() : null}
            </div>
        );
    };

    private getUserMenu = () => {
        return (
            <div className="dropdown-menu dropdown-menu-user" role="menu">
                <div className="dropdown-menu-item-user">
                    <Link
                        className="pg-navbar__admin-logout"
                        to="/profile"
                    >
                        Account & Security
                    </Link>
                </div>
                <div className="dropdown-menu-item-user">
                    <a className="pg-navbar__admin-logout" onClick={this.handleLogOut}>
                        <FormattedMessage id={'page.header.navbar.logout'} />
                    </a>
                </div>
            </div>
        );
    };

    private handleChangeCurrentStyleMode = (value: string) => {
        this.props.changeColorTheme(value);
        this.handleToggleCurrentStyleModeClass(value);
    };

    private handleToggleCurrentStyleModeClass = (value: string) => {
        const rootElement = document.getElementsByTagName('body')[0];
        if (value === 'light') {
            rootElement && rootElement.classList.add('light-mode');
        } else {
            rootElement && rootElement.classList.remove('light-mode');
        }
    };

    private handleLogOut = () => {
        this.setState({ isOpen: false }, () => {
            this.props.logout();
        });
    };

    private closeMenu = () => {
        this.setState({
            isOpen: false,
        }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    };

    private openMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        }, () => {
            if (this.state.isOpen) {
                document.addEventListener('click', this.closeMenu);
            } else {
                document.removeEventListener('click', this.closeMenu);
            }
        });
    };

    private closeLanguageMenu = () => {
        this.setState({
            isOpenLanguage: false,
        }, () => {
            document.removeEventListener('click', this.closeLanguageMenu);
        });
    };

    private toggleLanguageMenu = () => {
        this.setState({
            isOpenLanguage: !this.state.isOpenLanguage,
        }, () => {
            if (this.state.isOpenLanguage) {
                document.addEventListener('click', this.closeLanguageMenu);
            } else {
                document.removeEventListener('click', this.closeLanguageMenu);
            }
        });
    };

    private closeSocialMenu = () => {
        this.setState({
            isOpenSocialMenu: false,
        }, () => {
            document.removeEventListener('click', this.closeSocialMenu);
        });
    };

    private toggleSocialMenu = () => {
        this.setState({
            isOpenSocialMenu: !this.state.isOpenSocialMenu,
        }, () => {
            if (this.state.isOpenSocialMenu) {
                document.addEventListener('click', this.closeSocialMenu);
            } else {
                document.removeEventListener('click', this.closeSocialMenu);
            }
        });
    };

    private handleChangeLanguage = (language: string) => {
        this.props.changeLanguage(language);
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> =
    (state: RootState): ReduxProps => ({
        address: '',
        colorTheme: selectCurrentColorTheme(state),
        currentMarket: selectCurrentMarket(state),
        lang: selectCurrentLanguage(state),
        user: selectUserInfo(state),
        isLoggedIn: selectUserLoggedIn(state),
    });

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        changeColorTheme: payload => dispatch(changeColorTheme(payload)),
        changeLanguage: payload => dispatch(changeLanguage(payload)),
        logout: () => dispatch(logoutFetch()),
        walletsReset: () => dispatch(walletsReset()),
    });

// tslint:disable-next-line:no-any
const NavBar = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarComponent) as any) as any;

export {
    NavBar,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/NavBar/index.tsx
