import cn from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { selectUserInfo, User } from '../../../modules';

interface ProfileVerificationProps {
    user: User;
}

class ProfileVerificationComponent extends React.Component<ProfileVerificationProps> {
    public render() {
        const { user } = this.props;
        const userLevel = user.level;
        return (
            <div className="pg-profile-page__verification">
                <div className="pg-profile-page-header">
                    <h2 className="pg-profile-page__verification-header">
                        <FormattedMessage id="page.body.profile.header.account.profile" />
                    </h2>
                </div>
                <div className="pg-profile-page__verification-box">
                    {this.renderFirstLevel(userLevel)}
                    {this.renderSecondLevel(userLevel)}
                    {this.renderThirdLevel(userLevel)}
                </div>
            </div>
        );
    }

    private renderFirstLevel(userLevel: number) {
        const targetLevel = 1;
        const titleClassName = cn('pg-profile-page__text-purple', 'pg-profile-page__ml-gap', 'pg-profile-page__text-success');

        return (
            <div className="pg-profile-page__row pg-profile-page__level-verification">
                <div className={titleClassName}>
                    {this.renderVerificationLevel('page.body.profile.header.account.profile.email', userLevel, targetLevel)}
                    <p className="pg-profile-page__level-verification__description"><FormattedMessage id="page.body.profile.header.account.profile.limitWithdraw" /></p>
                </div>
                {this.getIcon(userLevel, targetLevel)}
            </div>
        );
    }

    private renderSecondLevel(userLevel: number) {
        const targetLevel = 2;
        const titleClassName = cn('pg-profile-page__text-purple', 'pg-profile-page__ml-gap', 'pg-profile-page__text-success');

        return (
            <div className="pg-profile-page__row pg-profile-page__level-verification">
                <div className={titleClassName}>
                    {this.renderVerificationLevel('page.body.profile.header.account.profile.phone', userLevel, targetLevel)}
                    <p className="pg-profile-page__level-verification__description"><FormattedMessage id="page.body.profile.header.account.profile.limitWithdraw" /></p>
                </div>
                {this.getIcon(userLevel, targetLevel)}
            </div>
        );
    }

    private renderThirdLevel(userLevel: number) {
        const targetLevel = 3;
        const titleClassName = cn('pg-profile-page__text-purple', 'pg-profile-page__ml-gap', 'pg-profile-page__text-success');

        return (
            <div className="pg-profile-page__row pg-profile-page__level-verification">
                <div className={titleClassName}>
                    {this.renderVerificationLevel('page.body.profile.header.account.profile.identity', userLevel, targetLevel)}
                    <p className="pg-profile-page__level-verification__description"><FormattedMessage id="page.body.profile.header.account.profile.limitWithdraw.identity" /></p>
                </div>
                {this.getIcon(userLevel, targetLevel)}
            </div>
        );
    }

    private renderVerificationLevel(text: string, userLevel, targetLevel) {
        if (userLevel === (targetLevel - 1)) {
            return (
                <a href="/confirm" className="pg-profile-page__level-verification__url">
                    <FormattedMessage id={`${text}.unverified.title`}/>
                </a>
            );
        } else {
            if (userLevel < targetLevel) {
                return (
                    <p className="pg-profile-page__level-verification__name">
                        <FormattedMessage id={`${text}.unverified.title`}/>
                    </p>
                );
            } else {
                return (
                    <p className="pg-profile-page__level-verification__name">
                        <FormattedMessage id={`${text}.title`}/>
                    </p>
                );
            }
        }
    }

    private getIcon(currentLevel: number, targetLevel: number) {
        const levelSatisfied = currentLevel >= targetLevel;

        const success = (
            <svg width="20" height="45" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7 1.7L6.7 12.7C6.5 12.9 6.3 13 6 13C5.7 13 5.5 12.9 5.3 12.7L0.3 7.7C-0.1 7.3 -0.1 6.7 0.3 6.3C0.7 5.9 1.3 5.9 1.7 6.3L6 10.6L16.3 0.3C16.7 -0.1 17.3 -0.1 17.7 0.3C18.1 0.7 18.1 1.3 17.7 1.7Z" fill="#05AA81"/>
            </svg>
        );
        const failure = (
            <svg width="16" height="45" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.7 12.3C14.1 12.7 14.1 13.3 13.7 13.7C13.5 13.9 13.3 14 13 14C12.7 14 12.5 13.9 12.3 13.7L7 8.4L1.7 13.7C1.5 13.9 1.3 14 1 14C0.7 14 0.5 13.9 0.3 13.7C-0.1 13.3 -0.1 12.7 0.3 12.3L5.6 7L0.3 1.7C-0.1 1.3 -0.1 0.7 0.3 0.3C0.7 -0.1 1.3 -0.1 1.7 0.3L7 5.6L12.3 0.3C12.7 -0.1 13.3 -0.1 13.7 0.3C14.1 0.7 14.1 1.3 13.7 1.7L8.4 7L13.7 12.3Z" fill="red"/>
            </svg>
        );

        return levelSatisfied ? success : failure;
    }
}

const mapStateToProps = state => ({
    user: selectUserInfo(state),
});

const ProfileVerification = connect(mapStateToProps)(ProfileVerificationComponent);

export {
    ProfileVerification,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/ProfileVerification/index.tsx
