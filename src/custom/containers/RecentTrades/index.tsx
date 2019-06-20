import classnames from 'classnames';
import * as React from 'react';
import {
    FormattedMessage,
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { localeDate, setTradeColor } from '../../../helpers';
import {
    Market,
    PublicTrade,
    RootState,
    selectCurrentMarket,
    selectCurrentPrice,
    setCurrentPrice,
} from '../../../modules';
import { recentTradesFetch, selectRecentTradesOfCurrentMarket } from '../../../modules/public/recentTrades';
import { Decimal, Table } from '../../../openware';
import move = require('../../assets/images/Move.svg');

interface ReduxProps {
    recentTrades: PublicTrade[];
    currentMarket: Market | undefined;
    currentPrice: string;
}

interface DispatchProps {
    tradesFetch: typeof recentTradesFetch;
    setCurrentPrice: typeof setCurrentPrice;
}

type Props = DispatchProps & ReduxProps & InjectedIntlProps;

class RecentTradesComponent extends React.Component<Props> {
    public componentWillReceiveProps(next: Props) {
        if (next.currentMarket && this.props.currentMarket !== next.currentMarket) {
          this.props.tradesFetch(next.currentMarket);
        }
    }

    public componentDidMount() {
        if (this.props.currentMarket){
          this.props.tradesFetch(this.props.currentMarket);
        }
    }

    public render() {
        const { currentMarket, recentTrades } = this.props;
        const className = classnames({
            'cr-table__noData' : !recentTrades.length,
        });

        return (
            <div className={className}>
                <div className="pg-recent-trades">
                    <div className="cr-table-header__content">
                        <div className="cr-title-component">
                            <FormattedMessage id="page.body.trade.header.recentTrades" />  <span className="cr-title-component__market">{currentMarket && currentMarket.name}</span><img className="cr-title-component__move" src={move}/>
                        </div>
                    </div>
                    <Table
                        data={this.getTrades(recentTrades)}
                        header={this.getHeaders()}
                        onSelect={this.handleOnSelect}
                    />
                    <div className="cr-table-footer"/>
                </div>
            </div>
        );
    }

    private getHeaders = () => {
        const {
            currentMarket,
        } = this.props;
        return [
            <span key={0}>{this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.price'})} ({currentMarket && currentMarket.bid_unit.toUpperCase()})</span>,
            <span key={0}>{this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.amount'})} ({currentMarket && currentMarket.ask_unit.toUpperCase()})</span>,
            this.props.intl.formatMessage({ id: 'page.body.trade.header.recentTrades.content.time'}),
        ];
    };

    private getTrades(trades: PublicTrade[]) {
        const priceFixed = this.props.currentMarket ? this.props.currentMarket.bid_precision : 0;
        const amountFixed = this.props.currentMarket ? this.props.currentMarket.ask_precision : 0;

        const renderRow = item => {
            const { id, created_at, taker_type, price, volume } = item;
            return [
                <span style={{ color: setTradeColor(taker_type).color }} key={id}><Decimal fixed={priceFixed}>{price}</Decimal></span>,
                <span key={id}><Decimal fixed={amountFixed}>{volume}</Decimal></span>,
                <span key={id}>{localeDate(created_at, 'time')}</span>,
            ];
        };
        return (trades.length > 0)
            ? trades.map(renderRow)
            : [[[''], this.props.intl.formatMessage({ id: 'page.noDataToShow'}), ['']]];
    }

    private handleOnSelect = (index: string) => {
        const { recentTrades, currentPrice } = this.props;
        const priceToSet = recentTrades[Number(index)] ? recentTrades[Number(index)].price : '';

        if (currentPrice !== priceToSet) {
            this.props.setCurrentPrice(priceToSet);
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    recentTrades: selectRecentTradesOfCurrentMarket(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    tradesFetch: market => dispatch(recentTradesFetch(market)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});


export const RecentTrades = injectIntl(connect(mapStateToProps, mapDispatchToProps)(RecentTradesComponent));


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/RecentTrades/index.tsx
