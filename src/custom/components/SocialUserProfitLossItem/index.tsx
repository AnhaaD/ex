import * as React from 'react';

export interface SocialProfitLossItemProps {
    profit: number;
    loss: number;
    top: number;
}

class SocialProfitLossItemComponent extends React.Component<SocialProfitLossItemProps> {
    public render() {
        const { profit, loss, top } = this.props;

        const itemProfitHeight = {
            height: `${profit}px`,
            top: `${top - profit}px`,
        };

        const itemLossHeight = {
            height: `${loss}px`,
        };

        const profitStyles = {
            height: `${top}px`,
        };

        return (
            <div className="pg-profit-loss__content-chart-item">
                <div className="pg-profit-loss__content-chart-item-profit" style={profitStyles}>
                    <div className="pg-profit-loss__content-chart-item-profit-value" style={itemProfitHeight} />
                </div>
                <div className="pg-profit-loss__content-chart-item-loss">
                    <div className="pg-profit-loss__content-chart-item-loss-value" style={itemLossHeight} />
                </div>
            </div>
        );
    }
}

export const SocialProfitLossItem = SocialProfitLossItemComponent;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/SocialUserProfitLossItem/index.tsx
