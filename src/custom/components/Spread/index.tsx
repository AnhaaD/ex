import * as React from 'react';
import { Decimal } from '../../../openware';

export interface SpreadProps {
    bidPrice: number;
    askPrice: number;
    askPrecision?: number;
    bidPrecision?: number;
}

const SpreadComponent: React.FunctionComponent<SpreadProps> = (props: SpreadProps) => {
    const { bidPrice, askPrice, bidPrecision, askPrecision } = props;
    const precisedBid = bidPrecision ? bidPrice * bidPrecision * 10 : bidPrice;
    const precisedAsk = askPrecision ? askPrice * askPrecision * 10 : askPrice;
    const spread = precisedAsk - precisedBid;
    const midValue = (precisedAsk + precisedBid) / 2;
    const midValuePrecised = (bidPrecision ? midValue / (bidPrecision * 10) : midValue);
    const spreadPrecised = bidPrecision ? spread / (bidPrecision * 10) : spread;
    return (
        <div className="cr-spread">
            <span className="cr-spread-bold">
                {Decimal.format(midValuePrecised, bidPrecision || 2)}
            </span>
            <span className="cr-spread-mute">
                Spread: {Decimal.format(spreadPrecised, bidPrecision || 2)}
            </span>
        </div>
    );
};

export const Spread = SpreadComponent;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/Spread/index.tsx
