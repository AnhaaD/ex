import classnames from 'classnames';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import {
    changeColorTheme,
    changeLanguage,
    RootState,
    selectCurrentColorTheme,
    selectCurrentLanguage,
} from '../../../modules';
import { CloseIcon, OpenIcon } from '../../assets/images/NavBarIcons';
import { Logo } from '../../assets/images/StreamexLogo';
import { NavBar } from '../NavBar';
import moon = require('../NavBar/moon.svg');
import sun = require('../NavBar/sun.svg');

interface ReduxProps {
    colorTheme: string;
    lang: string;
}

interface DispatchProps {
    changeColorTheme: typeof changeColorTheme;
    changeLanguage: typeof changeLanguage;
}

interface OwnProps {
    location: {
        pathname: string;
    };
}

interface HeaderState {
    isActive: boolean;
    isOpenLanguage: boolean;
}

type Props = OwnProps & ReduxProps & DispatchProps;

// tslint:disable jsx-no-multiline-js
class Head extends React.Component<Props, HeaderState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isActive: false,
            isOpenLanguage: false,
        };
    }

    public render() {
        const { colorTheme, lang } = this.props;
        const { isActive, isOpenLanguage } = this.state;

        const languageName = this.getLanguageName(lang);
        const languageClassName = classnames('dropdown-menu-language-field', {
            'dropdown-menu-language-field-active': isOpenLanguage,
        });

        return (
            <React.Fragment>
                {!['/confirm'].some(r => location.pathname.includes(r)) &&
                    <header className={`pg-header ${isActive ? 'pg-header--active' : ''}`}>
                        <div className="pg-container pg-header__content">
                            <Link to="/wallets" onClick={() => this.handleRemoveLightMode()} className="pg-header__logo">
                                <div className="pg-logo">
                                    {colorTheme === 'light' ? <Logo fillColor="#2f2854"/> : <Logo fillColor="white"/>}
                                </div>
                            </Link>
                            <NavBar onLinkChange={this.closeMenu}/>
                            <div
                                onClick={this.toogleMenu}
                                className="pg-header__toggler"
                            >
                                <span className="pg-header__toggler-item"/>
                                <span className="pg-header__toggler-item"/>
                                <span className="pg-header__toggler-item"/>
                            </div>
                            <div className="pg-header__mobile-menu">
                                <div className="pg-navbar__content__switcher d-inline-block">
                                    {this.getLightDarkMode()}
                                </div>
                                <div className="btn-group pg-navbar__header-settings__account-dropdown dropdown-toggle dropdown-menu-language-container d-inline-block">
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
                    </header>
                }
            </React.Fragment>
        );
    }

    private getLanguageName = (lang: string) => {
        switch (lang) {
            case 'en':
                return 'English';
            case 'ru':
                return 'Russian';
            default:
                return 'English';
        }
    };

    private toggleLanguageMenu = () => {
        this.setState({
            isOpenLanguage: !this.state.isOpenLanguage,
            isActive: false,
        }, () => {
            if (this.state.isOpenLanguage) {
                document.addEventListener('click', this.closeLanguageMenu);
            } else {
                document.removeEventListener('click', this.closeLanguageMenu);
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

    private getLanguageMenu = () => {
        return (
            <div className="dropdown-menu dropdown-menu-language" role="menu">
                <div className="dropdown-menu-item-lang" onClick={e => this.handleChangeLanguage('en')}>
                    English
                </div>
                <div className="dropdown-menu-item-lang" onClick={e => this.handleChangeLanguage('ru')}>
                    Russian
                </div>
            </div>
        );
    };

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

    private handleRemoveLightMode = () => {
        const rootElement = document.getElementsByTagName('body')[0];
        rootElement && rootElement.classList.remove('light-mode');
    };

    private handleChangeLanguage = (language: string) => {
        this.props.changeLanguage(language);
    };

    private toogleMenu = () => {
        this.setState(prev => ({
            isActive: !prev.isActive,
        }));
    };

    private closeMenu = () => {
        this.setState({
            isActive: false,
        });
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
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (state: RootState): ReduxProps => ({
    colorTheme: selectCurrentColorTheme(state),
    lang: selectCurrentLanguage(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    changeColorTheme: payload => dispatch(changeColorTheme(payload)),
    changeLanguage: payload => dispatch(changeLanguage(payload)),
});

// tslint:disable-next-line:no-any
const Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(Head) as any) as any;

export {
    HeaderState,
    Header,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Header/index.tsx
