import * as React from 'react';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { ProfileAccountActivity } from '../ProfileAccountActivity';
import { ProfileApiKeys } from '../ProfileApiKeys';
import { ProfileAuthDetails } from '../ProfileAuthDetails';
import { ProfileTwoFactorAuth } from '../ProfileTwoFactorAuth';
import { ProfileVerification } from '../ProfileVerification';
import { ReferralProgram } from '../ReferralProgram';

class ProfileComponent extends React.Component<RouterProps> {
    public goBack = () => {
        this.props.history.goBack();
    };

    public render() {
        return (
            <div className="pg-container pg-profile-page">
                <div className="pg-profile-page__details">
                    <ProfileAuthDetails/>
                    <ReferralProgram/>
                </div>
                <ProfileVerification/>
                <ProfileTwoFactorAuth/>
                <ProfileApiKeys/>
                <ProfileAccountActivity/>
            </div>
        );
    }
}

// tslint:disable-next-line:no-any
const Profile = withRouter(ProfileComponent as any);

export {
    Profile,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Profile/index.tsx
