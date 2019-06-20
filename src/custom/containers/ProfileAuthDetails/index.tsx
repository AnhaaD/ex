import cr from 'classnames';
import * as React from 'react';
import {
    FormattedMessage,
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    PASSWORD_REGEX,
} from '../../../helpers';
import {
    RootState,
    selectUserInfo,
    User,
} from '../../../modules';
import {
    changePasswordFetch,
    selectChangePasswordSuccess,
} from '../../../modules/user/profile';
import {
    Button,
} from '../../../openware';
import successIcon = require('../../assets/images/success.svg');
import { CustomInput } from '../../components';

interface ReduxProps {
    user: User;
    passwordChangeSuccess?: boolean;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface DispatchProps {
    changePassword: typeof changePasswordFetch;
    clearPasswordChangeError: () => void;
}

interface ProfileProps {
    showModal: boolean;
}

interface State {
    showChangeModal: boolean;
    showModal: boolean;
    oldPassword: string;
    newPassword: string;
    confirmationPassword: string;
    oldPasswordFocus: boolean;
    newPasswordFocus: boolean;
    confirmPasswordFocus: boolean;
}

type Props = ReduxProps & DispatchProps & ProfileProps & InjectedIntlProps & OnChangeEvent;

class ProfileAuthDetailsComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showChangeModal: false,
            showModal: false,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
            oldPasswordFocus: false,
            newPasswordFocus: false,
            confirmPasswordFocus: false,
        };
    }

    public componentWillReceiveProps(next: Props) {
        if (next.passwordChangeSuccess) {
            this.setState({
                showChangeModal: false,
                oldPassword: '',
                newPassword: '',
                confirmationPassword: '',
            });
        }
    }

    public render() {
        const {
            user,
        } = this.props;
        const {
            oldPasswordFocus,
            newPasswordFocus,
            confirmationPassword,
            oldPassword,
            newPassword,
            confirmPasswordFocus,
        } = this.state;

        const oldPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': oldPasswordFocus,
        });

        const newPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': newPasswordFocus,
        });

        const confirmPasswordClass = cr('cr-email-form__group', {
            'cr-email-form__group--focused': confirmPasswordFocus,
        });

        const passwordRegexClass = cr({
            'cr-email-form__check--success': newPassword.match(PASSWORD_REGEX),
        });

        const passwordCharactersAmountClass = cr({
            'cr-email-form__check--success': newPassword.length > 7 && newPassword.length < 21,
        });

        const changeModalBody = (
            <div className="cr-email-form__form-content">
                <div className={oldPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.old'})}
                        placeholder={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.old'})}
                        defaultLabel="Old password"
                        handleChangeInput={this.handleOldPassword}
                        inputValue={oldPassword}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                    />
                </div>
                <div className={newPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.new'})}
                        placeholder={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.new'})}
                        defaultLabel="New password"
                        handleChangeInput={this.handleNewPassword}
                        inputValue={newPassword}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                    />
                </div>
                <div className="cr-email-form__check">
                    <div id="characters-amount" className={passwordCharactersAmountClass}>
                        <img src={successIcon} />
                        <div className="cr-email-form__check-item"> 8-20 characters</div>
                    </div>
                    <div id="regex" className={passwordRegexClass}>
                        <img src={successIcon} />
                        <div className="cr-email-form__check-item">Use at least one uppercase and lowercase letter and number</div>
                    </div>
                </div>
                <div className={confirmPasswordClass}>
                    <CustomInput
                        type="password"
                        label={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.conf'})}
                        placeholder={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.conf'})}
                        defaultLabel="Password confirmation"
                        handleChangeInput={this.handleConfPassword}
                        inputValue={confirmationPassword}
                        classNameLabel="cr-email-form__label"
                        classNameInput="cr-email-form__input"
                    />
                </div>
                <div className="cr-email-form__button-wrapper">
                    <Button
                        label={this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.password.button.change'})}
                        className={this.isValidForm() ? 'cr-email-form__button' : 'cr-email-form__button cr-email-form__button--disabled'}
                        disabled={!this.isValidForm()}
                        onClick={this.handleChangePassword}
                    />
                </div>
            </div>
        );

        const modal = this.state.showChangeModal ? (
            <div className="cr-modal pg-change-password">
              <div className="cr-email-form">
                <div className="pg-change-password-screen">
                  {this.renderChangeModalHeader()}
                  {changeModalBody}
                </div>
              </div>
            </div>
        ) : null;

        return (
            <div className="pg-profile-page__details-box pt-5">
                <div className="pg-profile-page__left-col">
                    <div className="pg-profile-page__element pg-profile-page-header">
                        <h2 className="pg-profile-page__text-purple">
                            <b><FormattedMessage id="page.body.profile.header.account"/></b>
                        </h2>
                    </div>
                    <div className="pg-profile-page__element">
                        <div>
                            <div className="pg-profile-page__element-title">
                                UID
                            </div>
                            <div className="pg-profile-page__element-text">
                                {user.uid}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pg-profile-page__right-col">
                    <div className="pg-profile-page__element">
                        <div>
                            <div className="pg-profile-page__element-title">
                                {this.props.intl.formatMessage({id: 'page.body.profile.header.account.content.email'})}
                            </div>
                            <div className="pg-profile-page__element-text">
                                {user.email.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <div className="pg-profile-page__element">
                        <div>
                            <div className="pg-profile-page__element-title">
                                {this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password'})}
                            </div>
                            <div className="pg-profile-page__element-text">
                                ************
                            </div>
                        </div>
                        <Button
                            className="pg-profile-page__btn-secondary-change"
                            onClick={this.showChangeModal}
                            label={this.props.intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change'})}
                        />
                        {modal}
                    </div>
                </div>
            </div>
        );
    }

    private renderChangeModalHeader = () => (
        <div className="cr-email-form__options-group">
            <div className="cr-email-form__option">
              <div className="cr-email-form__option-inner">
                  <FormattedMessage id="page.body.profile.header.account.content.password.change"/>
                  <div className="cr-email-form__cros-icon" onClick={this.handleCancel}>
                      <img src={require('./close.svg')}/>
                  </div>
              </div>
            </div>
        </div>
    );

    private handleChangePassword = () => {
        this.props.changePassword({
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            confirm_password: this.state.confirmationPassword,
        });
    };

    private showChangeModal = () => {
        this.setState({
            showChangeModal: true,
        });
    }

    private handleOldPassword = (value: string) => {
        this.setState({
            oldPassword: value,
        });
    }

    private handleConfPassword = (value: string) => {
        this.setState({
            confirmationPassword: value,
        });
    }

    private handleNewPassword = (value: string) => {
        this.setState({
            newPassword: value,
        });
    }

    private handleCancel = () => {
        this.setState({
            showChangeModal: false,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
        });
    }

    private isValidForm() {
        const {
            confirmationPassword,
            oldPassword,
            newPassword,
        } = this.state;
        const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = newPassword === confirmationPassword;

        return oldPassword && isNewPasswordValid && isConfirmPasswordValid;
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
    passwordChangeSuccess: selectChangePasswordSuccess(state),
});

const mapDispatchToProps = dispatch => ({
    changePassword: ({ old_password, new_password, confirm_password }) =>
        dispatch(changePasswordFetch({ old_password, new_password, confirm_password })),
});

const ProfileAuthDetailsConnected = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProfileAuthDetailsComponent));
// tslint:disable-next-line:no-any
const ProfileAuthDetails = withRouter(ProfileAuthDetailsConnected as any);

export {
    ProfileAuthDetails,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/ProfileAuthDetails/index.tsx
