import cx from 'classnames';
import { History } from 'history';
import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { captchaType, siteKey } from '../../../api';
import { Modal } from '../../../components';
import { setDocumentTitle } from '../../../custom/helpers/setDocumentTitle';
import {
    EMAIL_REGEX,
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_PASSWORD,
    ERROR_PASSWORD_CONFIRMATION,
    PASSWORD_REGEX,
} from '../../../helpers';
import {
    RootState,
    selectCurrentLanguage,
    selectSignUpRequireVerification,
    signUp,
} from '../../../modules';
import { SignUpForm } from '../../components';

interface ReduxProps {
    requireVerification?: boolean;
    loading?: boolean;
}

interface DispatchProps {
    signUp: typeof signUp;
}

interface RouterProps {
    location: {
        search: string;
    };
    history: History;
}

type Props = ReduxProps & DispatchProps & RouterProps & InjectedIntlProps;

class SignUpComponent extends React.Component<Props> {
    public readonly state = {
        showModal: false,
        email: '',
        password: '',
        confirmPassword: '',
        recaptcha_response: '',
        recaptchaConfirmed: false,
        refId: '',
        hasConfirmed: false,
        emailError: '',
        passwordError: this.props.intl.formatMessage({ id: ERROR_INVALID_PASSWORD }),
        confirmationError: '',
        emailFocused: false,
        passwordFocused: false,
        confirmPasswordFocused: false,
        refIdOpened: false,
    };

    public componentDidMount() {
        setDocumentTitle('Register');
        const referralCode = this.extractRefID(this.props.location.search) || '';
        this.setState({
            refId: referralCode,
        });
    }

    public componentWillReceiveProps(props: Props) {
        if (props.requireVerification) {
            props.history.push('/email-verification', {email: this.state.email});
        }
    }

    public render() {
        const {
            email,
            password,
            confirmPassword,
            refId,
            recaptcha_response,
            recaptchaConfirmed,
            emailError,
            passwordError,
            confirmationError,
            emailFocused,
            passwordFocused,
            confirmPasswordFocused,
            refIdOpened,
        } = this.state;
        const { loading } = this.props;

        const className = cx('pg-sign-up-screen__container', { loading });
        return (
            <div className="pg-sign-up-screen">
                <div className={className}>
                    <SignUpForm
                        labelSignIn={this.props.intl.formatMessage({ id: 'page.header.signIn'})}
                        labelSignUp={this.props.intl.formatMessage({ id: 'page.header.navbar.register'})}
                        emailLabel={this.props.intl.formatMessage({ id: 'page.header.signUp.email'})}
                        passwordLabel={this.props.intl.formatMessage({ id: 'page.header.signUp.password'})}
                        confirmPasswordLabel={this.props.intl.formatMessage({ id: 'page.header.signUp.confirmPassword'})}
                        referalCodeLabel={this.props.intl.formatMessage({ id: 'page.header.signUp.referalCode'})}
                        termsMessage={this.props.intl.formatMessage({ id: 'page.header.signUp.terms'})}
                        refId={refId}
                        handleChangeRefId={this.handleChangeRefId}
                        isLoading={loading}
                        onSignIn={this.handleSignIn}
                        onSignUp={this.showModal}
                        siteKey={siteKey()}
                        captchaType={captchaType()}
                        email={email}
                        handleChangeEmail={this.handleChangeEmail}
                        password={password}
                        handleChangePassword={this.handleChangePassword}
                        confirmPassword={confirmPassword}
                        handleChangeConfirmPassword={this.handleChangeConfirmPassword}
                        recaptchaConfirmed={recaptchaConfirmed}
                        recaptcha_response={recaptcha_response}
                        recaptchaOnChange={this.onChange}
                        clickCheckBox={this.handleCheckboxClick}
                        validateForm={this.handleValidateForm}
                        emailError={emailError}
                        passwordError={passwordError}
                        confirmationError={confirmationError}
                        confirmPasswordFocused={confirmPasswordFocused}
                        refIdOpened={refIdOpened}
                        emailFocused={emailFocused}
                        passwordFocused={passwordFocused}
                        handleFocusEmail={this.handleFocusEmail}
                        handleFocusPassword={this.handleFocusPassword}
                        handleFocusConfirmPassword={this.handleFocusConfirmPassword}
                        handleOpenRefId={this.handleOpenRefId}
                    />
                    <Modal
                        show={this.state.showModal}
                        header={this.renderModalHeader()}
                        content={this.renderModalBody()}
                        footer={this.renderModalFooter()}
                    />
                </div>
            </div>
        );
    }

    private showModal = () => {
        this.setState({ showModal: true });
    };

    private handleCheckboxClick = () => {
        this.setState({
            hasConfirmed: !this.state.hasConfirmed,
        });
    };

    private onChange = (value: string) => {
        this.setState({
            recaptchaConfirmed: true,
            recaptcha_response: value,
        });
        this.closeModal();
    };

    private handleChangeEmail = (value: string) => {
        this.setState({
            email: value,
        });
    };

    private handleChangePassword = (value: string) => {
        this.setState({
            password: value,
        });
    };

    private handleChangeConfirmPassword = (value: string) => {
        this.setState({
            confirmPassword: value,
        });
    };

    private handleChangeRefId = (value: string) => {
        this.setState({
            refId: value,
        });
    };

    private handleFocusEmail = () => {
        this.setState({
            emailFocused: !this.state.emailFocused,
        });
    };

    private handleFocusPassword = () => {
        this.setState({
            passwordFocused: !this.state.passwordFocused,
        });
    };

    private handleFocusConfirmPassword = () => {
        this.setState({
            confirmPasswordFocused: !this.state.confirmPasswordFocused,
        });
    };

    private handleOpenRefId = () => {
        this.setState({
            refIdOpened: !this.state.refIdOpened,
        });
    };

    private handleSignIn = () => {
        this.props.history.push('/signin');
    };

    private handleSignUp = () => {
        const {
            email,
            password,
            recaptcha_response,
            refId,
        } = this.state;

        const { i18n } = this.props;
        if (refId) {
            switch (captchaType()) {
                case 'none':
                    this.props.signUp({
                        email,
                        password,
                        refid: refId,
                        lang: i18n.toUpperCase(),
                    });
                    break;
                case 'recaptcha':
                case 'geetest':
                default:
                    this.props.signUp({
                        email,
                        password,
                        recaptcha_response,
                        refid: refId,
                        lang: i18n.toUpperCase(),
                    });
                    break;
            }
        } else {
            switch (captchaType()) {
                case 'none':
                    this.props.signUp({
                        email,
                        password,
                        lang: i18n.toUpperCase(),
                    });
                    break;
                case 'recaptcha':
                case 'geetest':
                default:
                    this.props.signUp({
                        email,
                        password,
                        recaptcha_response,
                        lang: i18n.toUpperCase(),
                    });
                    break;
            }
        }
    };

    private renderModalHeader = () => {
        return (
            <svg onClick={this.closeModal} style={{ textAlign: 'right' }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.7" fillRule="evenodd" clipRule="evenodd" d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.097631 0.683417 -0.097631 1.31658 0.292893 1.70711L4.53553 5.94975L0.292894 10.1924C-0.0976307 10.5829 -0.0976307 11.2161 0.292894 11.6066C0.683418 11.9971 1.31658 11.9971 1.70711 11.6066L5.94975 7.36396L10.1924 11.6066C10.5829 11.9971 11.2161 11.9971 11.6066 11.6066C11.9971 11.2161 11.9971 10.5829 11.6066 10.1924L7.36396 5.94975L11.6066 1.70711C11.9971 1.31658 11.9971 0.683417 11.6066 0.292893C11.2161 -0.0976311 10.5829 -0.0976311 10.1924 0.292893L5.94975 4.53553L1.70711 0.292893Z" fill="#71717F"/>
            </svg>
        );
    };

    private renderModalBody = () => {
        return (
            <div className="cr-sign-up-form__recaptcha">
                <span>Verification</span>
            </div>
        );
    };

    private renderModalFooter = () => {
        return (
            <div className="cr-sign-up-form__recaptcha">
                <ReCAPTCHA
                    sitekey={siteKey()}
                    onChange={this.onChange}
                />
            </div>
        );
    };

    private closeModal = () => {
        this.setState({ showModal: false });
        if (this.state.recaptchaConfirmed) {
            this.handleSignUp();
        }
    };

    private extractRefID = (url: string) => new URLSearchParams(url).get('refid');

    private handleValidateForm = () => {
        const {email, password, confirmPassword} = this.state;
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        if (!isEmailValid && !isPasswordValid) {
            this.setState({
                confirmationError: '',
                emailError: this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }),
                passwordError: this.props.intl.formatMessage({ id: ERROR_INVALID_PASSWORD }),
                hasConfirmed: false,
            });
            return;
        }

        if (!isEmailValid) {
            this.setState({
                confirmationError: '',
                emailError: this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }),
                passwordError: '',
                hasConfirmed: false,
            });
            return;
        }

        if (!isPasswordValid) {
            this.setState({
                confirmationError: '',
                emailError: '',
                passwordError: this.props.intl.formatMessage({ id: ERROR_INVALID_PASSWORD }),
                hasConfirmed: false,
            });
            return;
        }

        if (!isConfirmPasswordValid) {
            this.setState({
                confirmationError: this.props.intl.formatMessage({ id: ERROR_PASSWORD_CONFIRMATION }),
                emailError: '',
                passwordError: '',
                hasConfirmed: false,
            });
            return;
        }
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    requireVerification: selectSignUpRequireVerification(state),
    i18n: selectCurrentLanguage(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        signUp: credentials => dispatch(signUp(credentials)),
    });

// tslint:disable-next-line:no-any
const SignUpScreen = injectIntl(withRouter(connect(mapStateToProps, mapDispatchProps)(SignUpComponent) as any));

export {
    SignUpScreen,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/SignUpScreen/index.tsx
