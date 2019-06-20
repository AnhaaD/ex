/* tslint:disable jsx-no-lambda  jsx-no-multiline-js */
import { History } from 'history';
import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal } from '../../../components';
import { RootState } from '../../../modules';
import { alertPush } from '../../../modules/public/alert';
import { selectUserInfo, User } from '../../../modules/user/profile';
import { Button } from '../../../openware';

import failureIcon = require('../../assets/images/failure.svg');
import successIcon = require('../../assets/images/success.svg');

interface ReduxProps {
    user: User;
}

interface RouterProps {
    history: History;
}

interface DispatchProps {
    fetchSuccess: typeof alertPush;
}


type Props = ReduxProps & RouterProps & DispatchProps;


interface ProfileTwoFactorAuthState {
    is2faEnabled: boolean;
    showModal: boolean;
}

class ProfileTwoFactorAuthComponent extends React.Component<Props, ProfileTwoFactorAuthState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            is2faEnabled: this.props.user.otp,
            showModal: false,
        };
    }

    public render() {
        const { is2faEnabled } = this.state;

        return (
            <div className="pg-profile-page__authentification">
                <div className="pg-profile-page-header">
                    <h2 className="pg-profile-page__authentification-header">
                        <b><FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication" /></b>
                    </h2>
                </div>
                <div className="pg-profile-page__authentification-box">
                    <div className="pg-profile-page__authentification-box__google-auth">
                        {this.getIcon(is2faEnabled)}
                        <div className="pg-profile-page__authentification-box__google-auth-name">
                            <div>Google Authentificator</div>
                            <div>-</div>
                        </div>
                        <div className="pg-profile-page__authentification-box__google-auth-description">
                            Used to login, withdraw, retrieve password, change security settings and for verification while managing API.
                        </div>
                        <div className="pg-profile-page__authentification-box__google-auth-button-wrapper">
                            <Button
                                className="pg-profile-page__btn-secondary-change"
                                label={is2faEnabled ? 'Turn off' : 'Link'}
                                disabled={false}
                                onClick={() => this.handleToggle2fa(is2faEnabled)}
                            />
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.showModal}
                    header={this.renderModalHeader()}
                    content={this.renderModalBody()}
                    footer={this.renderModalFooter()}
                />
            </div>
        );
    }

    private handleToggle2fa = (enable2fa: boolean) => {
        if (enable2fa) {
            this.setState({
                showModal: !this.state.showModal,
            });
        } else {
            this.props.history.push('/security/2fa', { enable2fa: true });
        }
    }

    private getIcon(otp: boolean) {
        return otp ? (
            <img src={successIcon} />
        ) : (
            <img src={failureIcon} />
        );
    }

    private renderModalHeader = () => {
        return (
            <div className="pg-exchange-modal-submit-header">
                <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.modalHeader"/>
            </div>
        );
    }

    private renderModalBody = () => {
        return (
            <div className="pg-exchange-modal-submit-body">
                <h2>
                    <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.modalBody"/>
                </h2>
            </div>
        );
    }

    private renderModalFooter = () => {
        return (
            <div className="pg-exchange-modal-submit-footer">
                <Button
                    className="pg-exchange-modal-submit-footer__button-inverse"
                    label="OK"
                    onClick={this.closeModal}
                />
            </div>
        );
    }


    private closeModal = () => {
        this.setState({
            showModal: false,
        });
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    fetchSuccess: payload => dispatch(alertPush(payload)),
});
// tslint:disable-next-line:no-any
export const ProfileTwoFactorAuth = withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProfileTwoFactorAuthComponent)) as any);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/ProfileTwoFactorAuth/index.tsx
