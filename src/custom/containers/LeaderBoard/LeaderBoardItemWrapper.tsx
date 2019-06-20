import * as React from 'react';
import { LeaderBoardUserItem } from '../../components';
import { UserLeaderBoard } from '../../modules';

export interface LeaderBoardWrapperProps {
    user: UserLeaderBoard;
    index: number;
    onClickTraderProfile: (nickname: string) => void;
}

interface LeaderBoardWrapperState {
    open: boolean;
}

class LeaderBoard extends React.Component<LeaderBoardWrapperProps, LeaderBoardWrapperState> {
    constructor(props: LeaderBoardWrapperProps) {
        super(props);

        this.state = {
            open: false,
        };
    }

    public render() {
        const {
            user,
            index,
            onClickTraderProfile,
        } = this.props;
        const { open } = this.state;

        return (
            <LeaderBoardUserItem
                user={user}
                index={index}
                open={open}
                handleToggleUser={this.handleToggle}
                onClickTraderProfile={onClickTraderProfile}
            />
        );
    }

    private handleToggle = () => {
        this.setState(prev => ({
            open: !prev.open,
        }));
    };
}

export const LeaderBoardWrapper = LeaderBoard;


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/LeaderBoard/LeaderBoardItemWrapper.tsx
