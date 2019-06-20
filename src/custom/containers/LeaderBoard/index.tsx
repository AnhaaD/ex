import { History } from 'history';
import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RootState, selectUserLoggedIn } from '../../../modules';
import {
    getLeaderBoard,
    selectLeaderBoardUsers,
    selectLeaderBoardUsersLoading,
    UserLeaderBoard,
} from '../../modules';
import { LeaderBoardWrapper } from './LeaderBoardItemWrapper';

interface ReduxProps {
    users: UserLeaderBoard[];
    usersLoading: boolean;
    isLoggedIn: boolean;
}

interface DispatchProps {
    getLeaderBoard: typeof getLeaderBoard;
}

interface HistoryProps {
    history: History;
}

export type LeaderBoardContainerProps = ReduxProps & DispatchProps & HistoryProps;

class LeaderBoard extends React.Component<LeaderBoardContainerProps> {
    public componentDidMount() {
        this.props.getLeaderBoard();
    }

    public render() {
        const {
            users,
            usersLoading,
        } = this.props;

        return (
            <div className="col-12 pg-leaderboard-screen__content">
                {usersLoading && !users.length ? 'Loading...' : this.getUsersList()}
            </div>
        );
    }

    private getUsersList = () => {
        const { users } = this.props;

        return users.map((user: UserLeaderBoard, i: number) =>
            <LeaderBoardWrapper key={i} index={i} user={user} onClickTraderProfile={this.onClickTraderProfile}/>);
    };

    private onClickTraderProfile = (nickname: string) => {
        const { isLoggedIn, history } = this.props;
        if (!isLoggedIn) {
            history.push('/signin');
        } else {
            history.push(`/social/users/${nickname}`);
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (state: RootState): ReduxProps => ({
    users: selectLeaderBoardUsers(state),
    usersLoading: selectLeaderBoardUsersLoading(state),
    isLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getLeaderBoard: () => dispatch(getLeaderBoard()),
});

// tslint:disable-next-line no-any
export const LeaderBoardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LeaderBoard) as any) as any;


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/LeaderBoard/index.tsx
