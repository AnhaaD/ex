import * as React from 'react';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
} from 'react-redux';
import {
    RootState,
    selectCurrentColorTheme,
    unsubscribeSubscription,
} from '../../../modules';
import { FilterInput } from '../../../openware';
import { SubscriptionsUserItem } from '../../components';
import { consist } from '../../helpers/checkConsistency';
import {
    getSubscriptions,
    selectSubscriptionsCurrentPage,
    selectSubscriptionsLoading,
    selectSubscriptionsPageCount,
    selectSubscriptionsTotalNumber,
    selectSubscriptionsUsers,
    UserSubscriptions,
} from '../../modules';

interface ReduxProps {
    colorTheme: string;
    page: number;
    pageCount: number;
    total: number;
    users: UserSubscriptions[];
    usersLoading: boolean;
}

interface DispatchProps {
    getSubscriptions: typeof getSubscriptions;
    unsubscribeSubscription: typeof unsubscribeSubscription;
}

interface SubscriptionsState {
    filterSearchKey: string;
    filteredData: object[] | number;
    currentPage: number;
    currentUsers: UserSubscriptions[];
}

const paginationLimit = 25;

export type SubscriptionsContainerProps = ReduxProps & DispatchProps;

class Subscriptions extends React.Component<SubscriptionsContainerProps, SubscriptionsState> {
    constructor(props: SubscriptionsContainerProps) {
        super(props);

        this.state = {
            filterSearchKey: '',
            filteredData: -1,
            currentPage: 0,
            currentUsers: [],
        };
    }

    public componentDidMount() {
        this.loadMoreItems();
        window.onscroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
                this.loadMoreItems();
            }
        };
    }

    public componentWillReceiveProps(next: SubscriptionsContainerProps) {
        const { currentPage } = this.state;
        if (next.users.length && next.users !== this.props.users) {
            if (currentPage <= next.pageCount + 1) {
                this.setState(prev => ({
                    currentUsers: prev.currentUsers.concat(next.users),
                }));
            }
        }
    }

    public loadMoreItems() {
        const {
            pageCount,
            usersLoading,
        } = this.props;
        const { currentPage } = this.state;

        if (currentPage <= pageCount && !usersLoading) {
            this.props.getSubscriptions({ page: currentPage, limit: paginationLimit });
            this.handleIncreaseCurrentPage();
        }
    }

    public render() {
        const { usersLoading } = this.props;
        const { currentUsers } = this.state;

        return (
            <div className="col-12 pg-subscriptions-screen__content">
                {usersLoading && !currentUsers.length ? <span className="pg-subscriptions-screen__content__error">Loading...</span> : this.getUsersList()}
                {!usersLoading && !currentUsers.length && <span className="pg-subscriptions-screen__content__error">No subscriptions</span>}
            </div>
        );
    }

    private getUsersList = () => {
        const { usersLoading, colorTheme } = this.props;

        const {
            currentUsers,
            filterSearchKey,
            filteredData,
        } = this.state;

        const lightMode = colorTheme === 'light';
        let filtredUsers = currentUsers;

        if (filterSearchKey && filteredData !== -1) {
            filtredUsers = currentUsers.filter(user => consist(user.nickname, filterSearchKey));

            if (!usersLoading && currentUsers && filtredUsers.length < 10) {
                this.loadMoreItems();
            }
        }

        return (
            <React.Fragment>
                <div className={lightMode ? 'pg-subscriptions-screen__content__search pg-subscriptions-screen__content__search--light' : 'pg-subscriptions-screen__content__search'}>
                    <FilterInput
                        data={currentUsers}
                        onFilter={this.handleOnFilter}
                        filter={this.handleFilter}
                        placeholder={'Search Member by Name'}
                    />
                </div>
                {this.renderSubscriptionsUserItem(filtredUsers)}
                {filterSearchKey && currentUsers.length && !filtredUsers.length && <span className="pg-subscriptions-screen__content__error">No members with name: {filterSearchKey}</span>}
            </React.Fragment>
        );
    };

    // tslint:disable:jsx-no-lambda
    private renderSubscriptionsUserItem = (filtredUsers: UserSubscriptions[]) => {
        return (
            filtredUsers && filtredUsers.map((user: UserSubscriptions, i: number) => (
                <SubscriptionsUserItem key={i} user={user} index={i} unsubscribe={value => this.props.unsubscribeSubscription({nickname: value})}/>
            ))
        );
    }

    private handleOnFilter = (result: object[]) => {
        this.setState({
            filteredData: result,
        });
    }

    private handleFilter = (user, term) => {
        this.setState({
            filterSearchKey: term,
        });
        return !term || consist(user && user.nickname, term);
    };

    private handleIncreaseCurrentPage = () => {
        this.setState(prev => ({
            currentPage: prev.currentPage + 1,
        }));
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (state: RootState): ReduxProps => ({
    colorTheme: selectCurrentColorTheme(state),
    users: selectSubscriptionsUsers(state),
    usersLoading: selectSubscriptionsLoading(state),
    total: selectSubscriptionsTotalNumber(state),
    page: selectSubscriptionsCurrentPage(state),
    pageCount: selectSubscriptionsPageCount(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    getSubscriptions: params => dispatch(getSubscriptions(params)),
    unsubscribeSubscription: payload => dispatch(unsubscribeSubscription(payload)),
});

export const SubscriptionsContainer = connect(mapStateToProps, mapDispatchToProps)(Subscriptions);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Subscriptions/index.tsx
