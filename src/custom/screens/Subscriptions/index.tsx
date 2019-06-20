import * as React from 'react';
import { SubscriptionsContainer } from '../../containers';

export class SubscriptionsScreen extends React.Component {
    public render() {
        return (
            <div className="pg-subscriptions-screen container">
                <div className="row mt-5">
                    <div className="pg-subscriptions-screen__title col-12 mt-5">
                        Subscriptions
                    </div>
                    <div  className="pg-subscriptions-screen__subtitle col-12">
                        List of Traders you are following
                    </div>
                </div>
                <SubscriptionsContainer />
            </div>
        );
    }
}


// WEBPACK FOOTER //
// src/drone/src/src/custom/screens/Subscriptions/index.tsx
