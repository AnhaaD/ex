import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { RootState } from '../../../modules';
import image = require('../../assets/images/default.png');
import edit = require('../../assets/images/edit.svg');
import { IncognitoIcon } from '../../assets/images/IncognitoIcon';
import { SocialMyProfileContainer } from '../../containers';
import {
    getProfileMe,
    postUserProfile,
    selectSocialLoading,
    selectSocialUsersMe,
    SocialUserMeInterface,
} from '../../modules';

interface SocialMyProfileScreenState {
    incognito: boolean;
    updatedUser: {
        nickname: string;
        facebook: string;
        twitter: string;
        telegram: string;
        subscriptionFee: string;
    };
    avatar?: File;
}

interface ReduxProps {
    user?: SocialUserMeInterface;
    loading: boolean;
}

interface DispatchProps {
    getProfileMe: typeof getProfileMe;
    updateUserProfile: typeof postUserProfile;
}

export type SocialMyProfileScreenProps = ReduxProps & DispatchProps;

class SocialMyProfileScreen extends React.Component<SocialMyProfileScreenProps, SocialMyProfileScreenState> {
    constructor(props: SocialMyProfileScreenProps) {
        super(props);

        this.state = {
            incognito: props.user ? props.user.incognito : false,
            updatedUser: {
                nickname: '',
                facebook: '',
                twitter: '',
                telegram: '',
                subscriptionFee: '',
            },
        };
    }

    public componentDidMount() {
        this.props.getProfileMe();
    }

    public componentWillReceiveProps(next: SocialMyProfileScreenProps) {
        if (next.user) {
            this.setState({
                incognito: next.user.incognito,
            });
        }
    }

    //tslint:disable jsx-no-multiline-js
    public render() {
        const { user } = this.props;
        const payloadUser = {
            nickname: user ? user.nickname : '',
            facebook: user ? user.facebook_url : '',
            twitter: user ? user.twitter_url : '',
            telegram: user ? user.telegram_url : '',
            subscriptionFee: user ? user.subscription_price : '',
            country: user ? user.country : '',
        };

        return (
            <div className="pg-social-my-profile-screen container">
                <div className="pg-social-my-profile-screen__form mt-5">
                    <div className="pg-social-my-profile-screen__form-header">
                        <div className="col-12 pg-social-my-profile-screen__form-header-title py-5">
                            My Profile
                        </div>
                        <div className="col-12 pg-social-my-profile-screen__form-header-image pb-2">
                            <input
                                name="file"
                                type="file"
                                id="file"
                                onChange={this.handleUploadImage}
                            />
                            <div>
                                <label htmlFor="file">
                                    <img src={user && user.image && user.image.url || image}/>
                                </label>
                            </div>
                        </div>
                        <label htmlFor="file">
                            <img src={edit} className="pg-social-my-profile-screen__form-header-edit"/>
                        </label>
                        <div className="col-12 pg-social-my-profile-screen__form-header-incognito py-3">
                            <div className="py-2 d-inline-block">
                                <IncognitoIcon/>
                            </div>
                            <div className="pl-3 d-inline-block">
                                Stay incognito
                            </div>
                            <div className="d-inline-block pl-3">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        onChange={this.handleChangeIncognito}
                                        checked={this.state.incognito}
                                    />
                                    <span className="slider" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="pg-social-my-profile-screen__form-content py-3">
                        <SocialMyProfileContainer user={payloadUser} updateUser={this.updateUser} />
                    </div>
                </div>
            </div>
        );
    }

    public updateUser = updatedUser => {
        this.setState({updatedUser}, () => {
            const { avatar } = this.state;
            const { nickname, facebook, twitter, telegram, subscriptionFee } = this.state.updatedUser;
            if (avatar) {
                const upload = new FormData();

                upload.append('profile[upload]', avatar);
                upload.append('profile[nickname]', nickname);
                (facebook || '').includes('facebook.com') && upload.append('profile[facebook_url]', facebook);
                (twitter || '').includes('twitter.com') && upload.append('profile[twitter_url]', twitter);
                (telegram || '').includes('t.me') && upload.append('profile[telegram_url]', telegram);
                upload.append('profile[subscription_price]', subscriptionFee);
                this.props.updateUserProfile({nickname, upload});
            } else {
                this.props.updateUserProfile({
                    nickname: nickname,
                    subscription_price: subscriptionFee,
                    facebook_url: facebook,
                    twitter_url: twitter,
                    telegram_url: telegram,
                });
            }
        });
    }

    private handleUploadImage = event => {
      const profileImage: File = event.target.files[0];

      if (profileImage) {
          this.setState({avatar: profileImage});
      }
  };

    private handleChangeIncognito = () => {
        const { user } = this.props;

        if (user) {
            const payloadUser = {
                nickname: user.nickname,
                incognito: !user.incognito,
            };
            this.props.updateUserProfile(payloadUser);
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (state: RootState): ReduxProps => ({
    user: selectSocialUsersMe(state),
    loading: selectSocialLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getProfileMe: () => dispatch(getProfileMe()),
    updateUserProfile: payload => dispatch(postUserProfile(payload)),
});

export const SocialMyProfile = connect(mapStateToProps, mapDispatchToProps)(SocialMyProfileScreen);


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/SocialMyProfileScreen/index.tsx
