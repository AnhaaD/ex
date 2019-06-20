import classnames from 'classnames';
import { History } from 'history';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setDocumentTitle } from '../../../custom/helpers/setDocumentTitle';
import {
    Label,
    labelFetch,
    RootState,
    selectLabelData,
    selectUserInfo,
    User,
} from '../../../modules';
import {
    Documents,
    Identity,
    Phone,
} from '../../containers';

interface ReduxProps {
    userData: User;
    labels: Label[];
}

interface HistoryProps {
    history: History;
}

interface ConfirmState {
    title: string;
    level: number;
}

interface DispatchProps {
    labelFetch: typeof labelFetch;
}

type Props = ReduxProps & HistoryProps & DispatchProps;

class ConfirmComponent extends React.Component<Props, ConfirmState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            title: '',
            level: 1,
        };
    }

    public componentDidMount() {
        setDocumentTitle('Confirm');
        this.props.labelFetch();
        const { userData } = this.props;
        this.setState({
            level: userData.level,
        });
    }

    public render() {
        const { userData, labels } = this.props;
        const isIdentity = labels.find(w => w.key === 'profile' && w.value === 'verified');
        const currentProfileLevel = userData.level;
        const kycProgress = this.progressLVL(currentProfileLevel);
        const cx = classnames('pg-confirm__progress-items', {
            'pg-confirm__progress-first': currentProfileLevel === 1,
            'pg-confirm__progress-second': currentProfileLevel === 2 && !isIdentity,
            'pg-confirm__progress-third': currentProfileLevel === 3 || isIdentity,
        });
        return (
          <div className="pg-confirm">
            <div className="pg-confirm-box">
                <div onClick={this.props.history.goBack} className="pg-confirm-box-close" />
                <div className="pg-confirm__progress">
                    <div className={cx}>
                        <div className="pg-confirm__progress-gradient">
                            <div className="pg-confirm__progress-item">
                                <div className={`pg-confirm__progress-loader ${kycProgress.cls}`}/>
                                    <p className="pg-confirm__progress-text"><FormattedMessage id={kycProgress.text}/></p>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="pg-confirm__content">
                    {this.renderContent(currentProfileLevel)}
                </div>
            </div>
          </div>
        );
    }

    private progressLVL(currentProfileLevel){
        const { labels } = this.props;
        const isIdentity = labels.find(w => w.key === 'profile' && w.value === 'verified');
        switch (currentProfileLevel) {
            case 1: return {cls: classnames('pg-confirm__progress-loader-width-1lvl'), text: 'page.body.kyc.head.phone'};
            case 2: return isIdentity ? {cls: classnames('pg-confirm__progress-loader-width-3lvl'), text: 'page.body.kyc.head.document'} : {cls: classnames('pg-confirm__progress-loader-width-2lvl'), text: 'page.body.kyc.head.identity'};
            case 3: return {cls: classnames('pg-confirm__progress-loader-width-3lvl'), text: 'page.body.kyc.head.document'};
            default: return {cls: null, text: null};
        }
    }

    private renderContent = (level: number) => {
        const { labels } = this.props;
        const isIdentity = labels.find(w => w.key === 'profile' && w.value === 'verified');
        switch (level) {
            case 1: return <Phone />;
            case 2: return isIdentity ? <Documents /> : <Identity />;
            case 3: return <Documents />;
            default: return 'Something went wrong';
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    userData: selectUserInfo(state),
    labels: selectLabelData(state),
});

const mapDispatchToProps = dispatch => ({
    labelFetch: () => dispatch(labelFetch()),
});

// tslint:disable-next-line
export const ConfirmScreen = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmComponent) as any);


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/ConfirmScreen/index.tsx
