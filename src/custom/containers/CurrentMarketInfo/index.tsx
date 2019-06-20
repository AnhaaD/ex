import classnames from 'classnames';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
    RootState,
    selectUserInfo,
    User,
} from '../../../modules';
import { resetLayouts } from '../../../modules/public/gridLayout';
import {
    Market,
    marketsTickersFetch,
    selectCurrentMarket,
    selectMarketsLoading,
    selectMarketTickers,
    Ticker,
} from '../../../modules/public/markets';
import { Loader } from '../../../openware';
import { CurrentMarketInfo } from '../../components';

interface ReduxProps {
    userData: User;
    marketsLoading?: boolean;
    marketTickers: {
        [key: string]: Ticker,
    };
    currentMarket: Market | undefined;
}

interface DispatchProps {
    tickers: typeof marketsTickersFetch;
    resetLayouts: typeof resetLayouts;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

class CurrentMarketInfoContainer extends React.Component<Props> {
    public render() {
        const { marketsLoading } = this.props;
        const className = classnames('pg-market-info', {
            'pg-markets--loading': marketsLoading,
        });
        return (
            <div className={className}>
                {marketsLoading ? <Loader /> : this.market()}
                <div className="pg-market-info__no-resize"/>
            </div>
        );
    }

    private market = () => {
        const { currentMarket, marketTickers } = this.props;
        const name = currentMarket && currentMarket.name;
        const id = currentMarket && currentMarket.id;
        const coinCode = currentMarket && currentMarket.ask_unit;
        return (
            <CurrentMarketInfo
                currentMarket={name}
                data={marketTickers[id]}
                volumeTranslate={this.props.intl.formatMessage({id: 'page.body.trade.market.info.content.vol'})}
                highTranslate={this.props.intl.formatMessage({id: 'page.body.trade.market.info.content.high'})}
                lowTranslate={this.props.intl.formatMessage({id: 'page.body.trade.market.info.content.low'})}
                coinCode={coinCode}
                handleResetLayout={this.handleResetLayout}
            />
        );
    };

    private handleResetLayout = () => {
        this.props.resetLayouts({key: 'layouts'});
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    userData: selectUserInfo(state),
    marketsLoading: selectMarketsLoading(state),
    marketTickers: selectMarketTickers(state),
    currentMarket: selectCurrentMarket(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        tickers: () => dispatch(marketsTickersFetch()),
        resetLayouts: payload => dispatch(resetLayouts(payload)),
    });

export const CurrentMarketInfoComponent = injectIntl(connect(mapStateToProps, mapDispatchToProps)(CurrentMarketInfoContainer));


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/CurrentMarketInfo/index.tsx
