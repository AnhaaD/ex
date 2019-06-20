import classnames from 'classnames';
import * as React from 'react';
import { Ticker } from '../../../modules';
import { Decimal } from '../../../openware';
import move = require('../../assets/images/Move.svg');
import { CryptoIcon } from '../../containers';
import { ResetLayoutIcon } from './resetLayoutIcon';

interface CurrentMarketInfoProps {
    currentMarket: string;
    data: Ticker[];
    volumeTranslate: string;
    highTranslate: string;
    lowTranslate: string;
    coinCode: string;
    handleResetLayout: () => void;
}

class CurrentMarketInfo extends React.Component<CurrentMarketInfoProps> {
    constructor(props: CurrentMarketInfoProps) {
        super(props);
    }

    public render() {
        const { currentMarket, data, lowTranslate, highTranslate, volumeTranslate, coinCode} = this.props;
        const vol = 'vol';
        const last = 'last';
        const high = 'high';
        const low = 'low';
        const priceChangePercent = 'price_change_percent';
        return (
            <div className="cr-market-info">
                <div className="cr-market-info__row row">
                    <div className="cr-market-info__row__column col-2">
                        <div className="cr-market-info__row__column__icon">
                            <CryptoIcon className="cr-market-info__row__column__icon-crypto" code={coinCode && coinCode.toUpperCase()}/>
                        </div>
                    </div>
                    <div className="cr-market-info__row__column col-5">
                        <h2 className="cr-market-info__row__column__name">{currentMarket}</h2>
                        <p className="cr-market-info__row__column__content">{volumeTranslate} <span className="cr-market-info__row__column__content__value">{data && data[vol]}</span></p>
                        <div className="cr-market-info__row__column__content">{data && this.renderChange(data[priceChangePercent], data[vol])}</div>
                    </div>
                    <div className="cr-market-info__row__column col-5">
                        <h2 className="cr-market-info__row__column__last">{data && data[last]}</h2>
                        <p className="cr-market-info__row__column__content">{highTranslate} <span className="cr-market-info__row__column__content__value">{data && data[high]}</span></p>
                        <p className="cr-market-info__row__column__content">{lowTranslate}  <span className="cr-market-info__row__column__content__value">{data && data[low]}</span></p>
                    </div>
                    <img src={move} className="cr-market-info__row__column__move cr-table-header__content"/>
                    <span className="reset-icon" onClick={this.props.handleResetLayout}>
                        <ResetLayoutIcon/>
                    </span>
                </div>
            </div>
        );
    }

    private renderChange(cell: string, vol: string) {
        const isItChangeValue = (c: string) => {
            return c.search('\\+') ? 'negative' : 'positive';
        };

        if (cell) {
            const className = classnames('', {
                'cr-market-info__row__column__content__positive': isItChangeValue(cell) === 'positive',
                'cr-market-info__row__column__content__negative': isItChangeValue(cell) === 'negative',
            });
            const result = cell.substr(1);

            return <div className={className}><div className="triangle"/>&nbsp;<span className="value"><Decimal fixed={2}>{(parseFloat(result) / 100) * parseFloat(vol)}</Decimal> ({result})</span></div>;
        }
        return null;
    }
}

export {
    CurrentMarketInfo,
    CurrentMarketInfoProps,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/CurrentMarketInfo/index.tsx
