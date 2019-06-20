import * as React from 'react';
import {
    FormattedMessage,
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
    marketsFetch,
    ordersCancelAllFetch,
    RootState,
    selectOrdersHistory,
} from '../../../modules';
import { OrderCommon } from '../../../modules/types';
import { TabPanel } from '../../../openware';
import { OrdersElement } from './OrdersElement';

interface ReduxProps {
    list: OrderCommon[];
}

interface DispatchProps {
    marketsFetch: typeof marketsFetch;
    ordersCancelAll: typeof ordersCancelAllFetch;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

interface State {
    tab: string;
}

class Orders extends React.PureComponent<Props, State> {
    public state = { tab: 'all' };

    public tabMapping = ['all', 'open'];

    public componentDidMount() {
        this.props.marketsFetch();
    }

    public render() {
        const cancelAll = this.props.list.length ? (
            <React.Fragment>
                <span className="cr-tab-panel__optinal-head__cancel-button" onClick={this.handleCancelAll}>
                    <FormattedMessage id="page.body.openOrders.header.button.cancelAll" />
                </span>
            </React.Fragment>
        ) : null;

        return (
            <div className="pg-orders-tab pg-container">
                <div className="pg-orders-tab__tabs-content">
                    <TabPanel
                        panels={this.renderTabs()}
                        onTabChange={this.handleMakeRequest}
                        optionalHead={cancelAll}
                    />
                </div>
            </div>
        );
    }

    private handleMakeRequest = (index: number) => {
        this.renderTabs();
        if (this.state.tab === this.tabMapping[index]) {
            return;
        }
        this.setState({ tab: this.tabMapping[index] });
    };

    private renderTabs = () => {
        const { tab } = this.state;
        return [
            {
                content: tab === 'all' ? <OrdersElement type="all" /> : null,
                label: this.props.intl.formatMessage({ id: 'page.body.openOrders.tab.all'}),
            },
            {
                content: tab === 'open' ? <OrdersElement type="open"/> : null,
                label: this.props.intl.formatMessage({ id: 'page.body.openOrders.tab.open'}),
            },
        ];
    };

    private handleCancelAll = () => this.props.ordersCancelAll(this.state);
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    list: selectOrdersHistory(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        marketsFetch: () => dispatch(marketsFetch()),
        ordersCancelAll: payload => dispatch(ordersCancelAllFetch(payload)),
    });

const OrdersTab = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Orders));

export {
    OrdersTab,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/OrdersTab/index.tsx
