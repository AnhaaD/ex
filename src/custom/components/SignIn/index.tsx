import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { CustomInput } from '../';
import { EMAIL_REGEX } from '../../../helpers';
import { Button } from '../../../openware';

interface SignInProps {
    labelSignIn?: string;
    labelSignUp?: string;
    emailLabel?: string;
    passwordLabel?: string;
    receiveConfirmationLabel?: string;
    forgotPasswordLabel?: string;
    isLoading?: boolean;
    title?: string;
    onForgotPassword: (email?: string) => void;
    onConfirmationResend?: (email?: string) => void;
    onSignUp: () => void;
    onSignIn: () => void;
    className?: string;
    image?: string;
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    emailFocused: boolean;
    emailPlaceholder: string;
    passwordFocused: boolean;
    passwordPlaceholder: string;
    isFormValid: () => void;
    refreshError: () => void;
    handleChangeFocusField: (value: string) => void;
    changePassword: (value: string) => void;
    changeEmail: (value: string) => void;
    recaptchaOnChange: () => void;
    siteKey: string;
    recaptchaChecked: boolean;
}

class SignInComponent extends React.Component<SignInProps> {
    public render() {
        const {
            email,
            emailError,
            emailPlaceholder,
            password,
            passwordError,
            passwordPlaceholder,
            isLoading,
            onForgotPassword,
            labelSignIn,
            emailLabel,
            passwordLabel,
            forgotPasswordLabel,
            siteKey,
            recaptchaChecked,
        } = this.props;

        // tslint:disable:jsx-no-lambda
        return (
            <form>
                <div className="cr-sign-in-form">
                    <span className={'cr-sign-in-form__headline'}>Log in with your account</span>
                    <div className="cr-sign-in-form__form-content">
                        <div className="cr-sign-in-form__group">
                            <CustomInput
                                type="email"
                                label={emailLabel || 'Email'}
                                placeholder={emailPlaceholder}
                                defaultLabel="Email"
                                handleChangeInput={this.handleChangeEmail}
                                inputValue={email}
                                handleFocusInput={() => this.handleFieldFocus('email')}
                                classNameLabel="cr-sign-in-form__label"
                                classNameInput="cr-sign-in-form__input"
                                autoFocus={true}
                            />
                            {emailError && <div className={'cr-sign-in-form__error'}>{emailError}</div>}
                        </div>
                        <div className="cr-sign-in-form__group">
                            <CustomInput
                                type="password"
                                label={passwordLabel || 'Password'}
                                placeholder={passwordPlaceholder}
                                defaultLabel="Password"
                                handleChangeInput={this.handleChangePassword}
                                inputValue={password}
                                handleFocusInput={() => this.handleFieldFocus('password')}
                                classNameLabel="cr-sign-in-form__label"
                                classNameInput="cr-sign-in-form__input"
                                autoFocus={false}
                            />
                            {passwordError && <div className={'cr-sign-in-form__error'}>{passwordError}</div>}
                        </div>
                        <div className="cr-sign-in-form__bottom-section">
                            <div
                                className="cr-sign-in-form__bottom-section-password"
                                onClick={() => onForgotPassword(email)}
                            >
                                {forgotPasswordLabel ? forgotPasswordLabel : 'Forgot your password?'}
                            </div>
                        </div>
                        <div className="cr-sign-in-form__recaptcha">
                            <ReCAPTCHA
                                sitekey={siteKey ? siteKey : 'sitekey'}
                                onChange={this.props.recaptchaOnChange}
                                className="cr-sign-in-form__recaptcha-item"
                            />
                        </div>
                        <div className="cr-sign-in-form__button-wrapper">
                            <Button
                                label={isLoading ? 'Loading...' : (labelSignIn ? labelSignIn : 'Login')}
                                type="submit"
                                className={'cr-sign-in-form__button'}
                                disabled={isLoading || !email.match(EMAIL_REGEX) || !password || !recaptchaChecked}
                                onClick={this.handleClick}
                            />
                        </div>
                    </div>
                </div>
            </form>
        );
        // tslint:enable:jsx-no-lambda
    }

    private handleChangeEmail = (value: string) => {
        this.props.changeEmail(value);
    };

    private handleChangePassword = (value: string) => {
        this.props.changePassword(value);
    };

    private handleFieldFocus = (field: string) => {
        this.props.handleChangeFocusField(field);
    };

    private handleSubmitForm = () => {
        this.props.refreshError();
        this.props.onSignIn();
    };

    private isValidForm = () => {
        const { email, password } = this.props;
        const isEmailValid = email.match(EMAIL_REGEX);

        return email && isEmailValid && password;
    };

    private handleValidateForm = () => {
        this.props.isFormValid();
    };

    private handleClick = (label?: string, e?: React.FormEvent<HTMLInputElement>) => {
        if (e) {
            e.preventDefault();
        }
        if (!this.isValidForm()) {
            this.handleValidateForm();
        } else {
            this.handleSubmitForm();
        }
    };
}

export {
    SignInComponent,
    SignInProps,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/SignIn/index.tsx
