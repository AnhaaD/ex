import * as React from 'react';
import { LeaderBoardContainer } from '../../containers';

class LeaderBoardScreen extends React.Component {
    public render() {
        return (
            <div className="pg-leaderboard-screen container">
                <div className="row mt-5">
                    <div className="pg-leaderboard-screen__title col-12 mt-5">
                        Leaderboard
                    </div>
                    <div  className="pg-leaderboard-screen__subtitle col-12">
                        One and Only real Cryptocurrency Trading Leaderboard
                    </div>
                </div>
                <div className="row col-12">
                    <LeaderBoardContainer />
                </div>
            </div>
        );
    }
}

export const LeaderBoard = LeaderBoardScreen;


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/LeaderBoard/index.tsx
