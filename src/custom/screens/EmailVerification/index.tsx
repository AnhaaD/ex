import { History } from 'history';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setDocumentTitle } from '../../../custom/helpers/setDocumentTitle';
import {
    emailVerificationFetch,
    RootState,
    selectCurrentLanguage,
    selectSendEmailVerificationLoading,
} from '../../../modules';

interface OwnProps {
    history: History;
    location: {
        state: {
            email: string;
        };
    };
}

interface DispatchProps {
    emailVerificationFetch: typeof emailVerificationFetch;
}

interface ReduxProps {
    emailVerificationLoading: boolean;
}

type Props = DispatchProps & ReduxProps & OwnProps & InjectedIntlProps;

class EmailVerificationComponent extends React.Component<Props> {
    public readonly state = {
        timer: 60,
        code: '',
        isFocused: false,
    };

    public componentDidMount() {
        setDocumentTitle('Email verification');
        if (!this.props.location.state || !this.props.location.state.email) {
            this.props.history.push('/signin');
        }
    }

    public render() {
        const button = this.props.intl.formatMessage({ id: 'page.resendConfirmation' });
        const title = this.props.intl.formatMessage({ id: 'page.header.signUp.modal.header' });
        const text = this.props.intl.formatMessage({ id: 'page.header.signUp.modal.body' });

        return (
            <div className="pg-emailverification-container">
                <div className="pg-emailverification">
                    <div className="pg-emailverification-title">{title}</div>
                    <div className="pg-emailverification-body">
                        <div className="pg-emailverification-body-text-opacity">
                            {text}
                        </div>
                        <div className="pg-emailverification-body-container">
                            <button className="pg-emailverification-body-container-button" onClick={this.handleResendClick}>{button}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private handleResendClick = () => {
        this.props.emailVerificationFetch({
            email: this.props.location.state.email,
            lang: this.props.i18n.toLowerCase(),
        });
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    emailVerificationLoading: selectSendEmailVerificationLoading(state),
    i18n: selectCurrentLanguage(state),
});

const mapDispatchProps = {
    emailVerificationFetch,
};

//tslint:disable-next-line:no-any
export const EmailVerificationScreen = injectIntl(withRouter(connect(mapStateToProps, mapDispatchProps)(EmailVerificationComponent) as any));


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/EmailVerification/index.tsx
