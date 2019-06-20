import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, MapStateToProps } from 'react-redux';
import {
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectDepthAsks,
    selectDepthBids,
} from '../../../modules';
import { Decimal, MarketDepths } from '../../../openware';
import { Spread } from '../../components';

interface ReduxProps {
    asksItems: string[][];
    bidsItems: string[][];
    colorTheme: string;
    currentMarket: Market | undefined;
}

type Props = ReduxProps;

class MarketDepthContainer extends React.Component<Props> {
    public componentWillReceiveProps(next: Props) {
        const { currentMarket } = next;
        const { currentMarket: prevCurrentMarket} = this.props;

        if (currentMarket && currentMarket !== prevCurrentMarket) {
            this.forceUpdate();
        }
    }

    public shouldComponentUpdate(prev, next) {
        const { asksItems, bidsItems } = prev;
        const ordersLength = Number(asksItems.length) + Number(bidsItems.length);

        return ordersLength !== (this.props.asksItems.length + this.props.bidsItems.length);
    }

    public render() {
        const { asksItems, bidsItems } = this.props;

        const colors = {
            fillAreaAsk: 'rgba(209, 82, 86, 0.25)',
            fillAreaBid: 'rgba(5, 170, 129, 0.25)',
            gridBackgroundStart: '#1a243b',
            gridBackgroundEnd: '#1a243b',
            strokeAreaAsk: '#fa5252',
            strokeAreaBid: '#12b886',
            strokeGrid: ' #B8E9F5',
            strokeAxis: '#cccccc',
        };
        return (
            <div className="pg-market-depth-container">
                {(asksItems.length && bidsItems.length) ? this.renderMarketDepth(colors) : null}
                {(asksItems.length || bidsItems.length) ? this.renderSpread() : null}
            </div>
        );
    }

    private renderMarketDepth(colors) {
        // tslint:disable-next-line:no-any
        const marketDepthsItem = document.getElementsByClassName('react-grid-item')[2] as any;
        const height = marketDepthsItem && marketDepthsItem.style.height ? parseInt(marketDepthsItem.style.height, 10) - 40 : 600;

        const settings = {
            tooltip: true,
            dataKeyX: 'price',
            dataKeyY: 'cumulativeVolume',
            height: height,
            activeDot: {
                stroke: '#1feded',
                strokeWidth: 2,
                r: 5,
                fill: this.props.colorTheme === 'light' ? '#fff' : '#1F1942',
            },
        };

        return (
            <MarketDepths
                settings={settings}
                className={'pg-market-depth'}
                colors={colors}
                data={this.convertToDepthFormat()}
                hideCartesianGrid={true}
                intervalX="preserveStartEnd"
                intervalY="preserveStartEnd"
                chartType="linear"
                orientation="right"
                gradientHide={true}
            />);
    }

    private renderSpread = () => {
        const { currentMarket, bidsItems, asksItems } = this.props;
        const bidPrice = () => (bidsItems[0] ? +bidsItems[0][0] : 0);
        const askPrice = () => (asksItems[0] ? +asksItems[0][0] : 0);
        return (
            <Spread
                askPrice={askPrice()}
                bidPrice={bidPrice()}
                askPrecision={currentMarket && currentMarket.ask_precision}
                bidPrecision={currentMarket && currentMarket.bid_precision}
            />
        );
    };

    private convertToCumulative = (data, type) => {
        const { currentMarket } = this.props;

        if (!currentMarket) {
            return;
        }

        const [askCurrency, bidCurrency] = [currentMarket.ask_unit.toUpperCase(), currentMarket.bid_unit.toUpperCase()];
        const tipLayout = ({ volume, price, cumulativeVolume, cumulativePrice }) => (
            <span className={'pg-market-depth__tooltip'}>
                <span><FormattedMessage id="page.body.trade.header.marketDepths.content.price" /> {Decimal.format(price, currentMarket.bid_precision)} {bidCurrency}</span>
                <span><FormattedMessage id="page.body.trade.header.marketDepths.content.cumulativeVolume" /> {Decimal.format(cumulativeVolume, currentMarket.ask_precision)} {askCurrency}</span>
            </span>
        );

        let cumulativeVolumeData = 0;
        let cumulativePriceData = 0;

        const cumulative = data.map((item, index) => {
            const [price, volume] = item;
            const numberVolume = Decimal.format(volume, currentMarket.ask_precision);
            const numberPrice = Decimal.format(price, currentMarket.bid_precision);
            cumulativeVolumeData = +numberVolume + cumulativeVolumeData;
            cumulativePriceData = cumulativePriceData + (+numberPrice * +numberVolume);
            return {
                [type]: Decimal.format(cumulativeVolumeData, currentMarket.ask_precision),
                cumulativePrice: Decimal.format(cumulativePriceData, currentMarket.bid_precision),
                cumulativeVolume: Decimal.format(cumulativeVolumeData, currentMarket.ask_precision),
                volume: Decimal.format(+volume, currentMarket.ask_precision),
                price: Decimal.format(+numberPrice, currentMarket.bid_precision),
                name: tipLayout({ volume, price, cumulativeVolume: cumulativeVolumeData, cumulativePrice: cumulativePriceData }),
            };
        });

        return type === 'bid' ? cumulative.sort((a, b) => b.bid - a.bid)
            : cumulative.sort((a, b) => a.ask - b.ask);
    };

    private convertToDepthFormat() {
        const { asksItems, bidsItems } = this.props;
        const asksItemsLength = asksItems.length;
        const bidsItemsLength = bidsItems.length;

        const resultLength = asksItemsLength > bidsItemsLength ? bidsItemsLength : asksItemsLength;
        const asks = asksItems.slice(0, resultLength);
        const bids = bidsItems.slice(0, resultLength);

        const asksVolume = this.convertToCumulative(asks, 'ask');
        const bidsVolume = this.convertToCumulative(bids, 'bid');

        return [...bidsVolume, ...asksVolume];
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    asksItems: selectDepthAsks(state),
    bidsItems: selectDepthBids(state),
    currentMarket: selectCurrentMarket(state),
    colorTheme: selectCurrentColorTheme(state),
});

export const MarketDepthsComponent = connect(mapStateToProps)(MarketDepthContainer);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/MarketDepth/index.tsx
