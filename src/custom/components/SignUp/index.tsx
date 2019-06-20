import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { Link } from 'react-router-dom';
import { CustomInput } from '../';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../helpers';
import { Button } from '../../../openware';

interface SignUpFormProps {
    siteKey?: string;
    isLoading?: boolean;
    title?: string;
    onSignUp: () => void;
    onSignIn?: () => void;
    className?: string;
    image?: string;
    captchaType: 'recaptcha' | 'geetest' | 'none';
    labelSignIn?: string;
    labelSignUp?: string;
    emailLabel?: string;
    passwordLabel?: string;
    confirmPasswordLabel?: string;
    referalCodeLabel?: string;
    termsMessage?: string;
    refId: string;
    password: string;
    email: string;
    confirmPassword: string;
    recaptcha_response: string;
    recaptchaConfirmed: boolean;
    recaptchaOnChange: (value: string) => void;
    handleChangeEmail: (value: string) => void;
    handleChangePassword: (value: string) => void;
    handleChangeConfirmPassword: (value: string) => void;
    handleChangeRefId: (value: string) => void;
    hasConfirmed?: boolean;
    clickCheckBox: () => void;
    validateForm: () => void;
    emailError: string;
    passwordError: string;
    confirmationError: string;
    handleFocusEmail: () => void;
    handleFocusPassword: () => void;
    handleFocusConfirmPassword: () => void;
    handleOpenRefId: () => void;
    confirmPasswordFocused: boolean;
    refIdOpened: boolean;
    emailFocused: boolean;
    passwordFocused: boolean;
}

type Props = SignUpFormProps & InjectedIntlProps;

class SignUpFormComponent extends React.Component<Props> {
    public render() {
        const {
            confirmationError,
            confirmPassword,
            confirmPasswordLabel,
            email,
            emailError,
            emailLabel,
            intl,
            isLoading,
            labelSignUp,
            password,
            passwordError,
            passwordLabel,
            referalCodeLabel,
            refId,
            refIdOpened,
        } = this.props;

        return (
            <form>
                <div className="cr-sign-up-form">
                    <span className={'cr-sign-up-form__headline'}>{intl.formatMessage({id: 'page.header.navbar.signUp.title'})}</span>
                    <div className="cr-sign-up-form__form-content" style={{ height: refIdOpened ? 490 : 360 }}>
                        <div className="cr-sign-up-form__group">
                            <CustomInput
                                type="email"
                                label={emailLabel || 'Email'}
                                placeholder={emailLabel || 'Email'}
                                defaultLabel="Email"
                                handleChangeInput={this.props.handleChangeEmail}
                                inputValue={email}
                                handleFocusInput={this.props.handleFocusEmail}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={true}
                            />
                            {emailError && <div className="cr-sign-up-form__error">{emailError}</div>}
                        </div>
                        <div className="cr-sign-up-form__group">
                            <CustomInput
                                type="password"
                                label={passwordLabel || 'Password'}
                                placeholder={passwordLabel || 'Password'}
                                defaultLabel="Password"
                                handleChangeInput={this.props.handleChangePassword}
                                inputValue={password}
                                handleFocusInput={this.props.handleFocusPassword}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={false}
                            />
                            <div className={'cr-sign-up-form__error'}>{passwordError}</div>
                        </div>
                        <div className="cr-sign-up-form__group">
                            <CustomInput
                                type="password"
                                label={confirmPasswordLabel || 'Confirm Password'}
                                placeholder={confirmPasswordLabel || 'Confirm Password'}
                                defaultLabel="Confirm Password"
                                handleChangeInput={this.props.handleChangeConfirmPassword}
                                inputValue={confirmPassword}
                                handleFocusInput={this.props.handleFocusConfirmPassword}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={false}
                            />
                            {confirmationError && <div className="cr-sign-up-form__error">{confirmationError}</div>}
                        </div>
                        <div className="cr-sign-up-form__ref" onClick={this.props.handleOpenRefId}>
                            {intl.formatMessage({id: 'page.header.navbar.signUp.invationCode'})}
                            <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M1.20711 1.20711C0.761653 0.761653 1.07714 0 1.70711 0H8.29289C8.92286 0 9.23835 0.761654 8.79289 1.20711L5.5 4.5C5.22386 4.77614 4.77614 4.77614 4.5 4.5L1.20711 1.20711Z" fill="white"/>
                            </svg>
                        </div>
                        <div className="cr-sign-up-form__group" style={{ display: refIdOpened ? 'block' : 'none' }}>
                            <CustomInput
                                type="text"
                                label={referalCodeLabel || 'Referral code'}
                                placeholder={referalCodeLabel || 'Referral code'}
                                defaultLabel="Referral code"
                                handleChangeInput={this.props.handleChangeRefId}
                                inputValue={refId}
                                classNameLabel="cr-sign-up-form__label"
                                classNameInput="cr-sign-up-form__input"
                                autoFocus={false}
                            />
                        </div>
                        <div className="cr-sign-up-form__button-wrapper">
                            <Button
                                type="button"
                                className="cr-sign-up-form__button"
                                label={isLoading ? 'Loading...' : (labelSignUp ? labelSignUp : 'Register')}
                                disabled={this.disableButton()}
                                onClick={this.handleClick}
                            />
                        </div>
                        <div className="cr-sign-up-form__footer">
                            <span>{intl.formatMessage({id: 'page.header.navbar.signUp.agreement'})}&nbsp;</span>
                            <Link to="/terms-and-conditions">{intl.formatMessage({id: 'page.header.navbar.signUp.termsAndConditions'})}</Link>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    private disableButton = (): boolean => {
        const {
            email,
            password,
            confirmPassword,
            isLoading,
        } = this.props;

        return (isLoading || !email.match(EMAIL_REGEX) || !password || !confirmPassword) ? true : false;
    };

    private handleSubmitForm() {
        this.props.onSignUp();
    }

    private isValidForm() {
        const { email, password, confirmPassword } = this.props;
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        return (email && isEmailValid) &&
            (password && isPasswordValid) &&
            (confirmPassword && isConfirmPasswordValid);
    }

    private handleClick = (label?: string, e?: React.FormEvent<HTMLInputElement>) => {
        if (e) {
            e.preventDefault();
        }

        if (!this.isValidForm()) {
            this.props.validateForm();
        } else {
            this.handleSubmitForm();
        }
    };
}

const SignUpForm = injectIntl(SignUpFormComponent);

export {
    SignUpForm,
    SignUpFormComponent,
    SignUpFormProps,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/SignUp/index.tsx
