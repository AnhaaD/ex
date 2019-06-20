import { getName } from 'country-list';
import * as React from 'react';
import ReactCountryFlag from 'react-country-flag';
import {
    connect,
    MapDispatchToPropsFunction,
} from 'react-redux';
import { Input } from '../../../openware';
import { CustomInput } from '../../components';
import { postUserProfile } from '../../modules';

interface SocialMyProfileState {
    nickname: string;
    facebook: string;
    twitter: string;
    telegram: string;
    subscriptionFee: string;
    profileTaken: boolean;
}

interface Props {
    user: {
        nickname: string;
        facebook: string;
        twitter: string;
        telegram: string;
        subscriptionFee: string;
        country: string;
    };
    updateUser: (payload) => void;
}

interface DispatchProps {
    updateUserProfile: typeof postUserProfile;
}

export type SocialMyProfileProps = Props & DispatchProps;

class SocialMyProfile extends React.Component<SocialMyProfileProps, SocialMyProfileState> {
    constructor(props: SocialMyProfileProps) {
        super(props);

        this.state = {
            nickname: props.user.nickname,
            facebook: props.user.facebook,
            twitter: props.user.twitter,
            telegram: props.user.telegram,
            subscriptionFee: props.user.subscriptionFee,
            profileTaken: false,
        };
    }

    public componentWillReceiveProps(next: SocialMyProfileProps) {
        if (next.user.nickname && !this.state.profileTaken) {
            this.setState({
                nickname: next.user.nickname,
                facebook: next.user.facebook,
                twitter: next.user.twitter,
                telegram: next.user.telegram,
                subscriptionFee: next.user.subscriptionFee,
                profileTaken: true,
            });
        }
    }

    public render() {
        const {
            nickname,
            facebook,
            twitter,
            telegram,
            subscriptionFee,
        } = this.state;
        const { user } = this.props;

        return (
            <div className="col-12 pg-social-my-profile-container py-3">
                <div className="col-12 pg-social-my-profile-container__block px-0">
                    <div className="col-12 pg-social-my-profile-container__block-title">
                        Basic Information
                    </div>
                    <div className="col-12 pg-social-my-profile-container__block-content py-3 pr-0">
                        <CustomInput
                            type="string"
                            label="Account nickname"
                            defaultLabel="Account nickname"
                            handleChangeInput={this.handleChangeNickname}
                            inputValue={nickname}
                            classNameLabel="pg-social-my-profile-container__block-content-label"
                            classNameInput="pg-social-my-profile-container__block-content-input"
                            placeholder=""
                        />
                    </div>
                    <div className="col-12 pg-social-my-profile-container__block-content py-3 pr-0">
                        <div className="col-12 px-0">
                            <div className="pg-social-my-profile-container__block-content-label">
                                Country
                            </div>
                            <div className="pg-social-my-profile-container__block-content-input">
                                <span className="pg-social-my-profile-container__block-content-input-text">
                                    {user.country ? (<ReactCountryFlag code={user.country.toLowerCase()} svg={true} />) : null}
                                    <span className="pl-3">
                                        {user.country ? getName(user.country.toUpperCase()) : ''}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 pg-social-my-profile-container__block px-0">
                    <div className="col-12 pt-3 pg-social-my-profile-container__block-title">
                        Social Media
                    </div>
                    <div className="col-12 pg-social-my-profile-container__block-content py-3 pr-0">
                        <CustomInput
                            type="string"
                            label="Facebook"
                            defaultLabel="Facebook"
                            handleChangeInput={this.handleChangeFacebookLink}
                            inputValue={facebook}
                            classNameLabel="pg-social-my-profile-container__block-content-label"
                            classNameInput="pg-social-my-profile-container__block-content-input"
                            placeholder=""
                        />
                    </div>
                    <div className="col-12 pg-social-my-profile-container__block-content py-3 pr-0">
                        <CustomInput
                            type="string"
                            label="Twitter"
                            defaultLabel="Twitter"
                            handleChangeInput={this.handleChangeTwitterLink}
                            inputValue={twitter}
                            classNameLabel="pg-social-my-profile-container__block-content-label"
                            classNameInput="pg-social-my-profile-container__block-content-input"
                            placeholder=""
                        />
                    </div>
                    <div className="col-12 pg-social-my-profile-container__block-content py-3 pr-0">
                        <CustomInput
                            type="string"
                            label="Telegram"
                            defaultLabel="Telegram"
                            handleChangeInput={this.handleChangeTelegramLink}
                            inputValue={telegram}
                            classNameLabel="pg-social-my-profile-container__block-content-label"
                            classNameInput="pg-social-my-profile-container__block-content-input"
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="col-12 pg-social-my-profile-container__block px-0">
                    <div className="col-12 pt-3 pg-social-my-profile-container__block-title">
                        Subscriptions
                    </div>
                    <div className="col-12 pg-social-my-profile-container__block-content py-3 pr-0">
                        <div className="col-12 px-0 pg-social-my-profile-container__block-content-fee">
                            <label className="pg-social-my-profile-container__block-content-label">
                                Subscription Fee
                            </label>
                            <div className="pg-social-my-profile-container__block-content-input py-2">
                                <Input
                                    type="number"
                                    value={subscriptionFee}
                                    className="pg-social-my-profile-container__block-content-fee-input"
                                    onChangeValue={this.handleChangeSubscriptionFee}
                                />
                                <span className="currency-name py-1">
                                    STE
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 pg-social-my-profile-container__block px-0">
                    <div className="col-12 pg-social-my-profile-container__block-content px-0">
                        <div className="col-12 pg-social-my-profile-container__block-content-label">
                            *Price how much other traders need to pay to see your trades and get alerts when you trade.
                        </div>
                    </div>
                </div>
                <div className="col-12 pg-social-my-profile-container__block px-0">
                    <div className="col-12 pg-social-my-profile-container__block-content px-0">
                        <div className="col-12 pg-social-my-profile-container__block-content-button">
                            <button
                                className="col-12 mt-5 mb-3 p-3"
                                onClick={this.handleSaveChanges}
                                type="button"
                            >
                                    Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleChangeNickname = (value: string) => {
        this.setState({
            nickname: value,
        });
    };

    private handleChangeFacebookLink = (value: string) => {
        this.setState({
            facebook: value,
        });
    };

    private handleChangeTwitterLink = (value: string) => {
        this.setState({
            twitter: value,
        });
    };

    private handleChangeTelegramLink = (value: string) => {
        this.setState({
            telegram: value,
        });
    };

    private handleChangeSubscriptionFee = (value: string) => {
        this.setState({
            subscriptionFee: value,
        });
    };

    private handleSaveChanges = () => {
        this.props.updateUser({
            nickname: this.state.nickname,
            subscriptionFee: this.state.subscriptionFee,
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            telegram: this.state.telegram,
        });
    };
}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    updateUserProfile: payload => dispatch(postUserProfile(payload)),
});

export const SocialMyProfileContainer = connect(null, mapDispatchToProps)(SocialMyProfile);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/SocialMyProfileContainer/index.tsx
