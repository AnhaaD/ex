// tslint:disable
import {
    Button,
    Decimal,
    Input,
} from '../../../openware';
import * as React from 'react';
import { WalletItemProps } from '../../../components/WalletItem';
import { Market } from '../../../modules';
import { WalletIcon } from './WalletIcon';

export interface OrderFormProps {
    orderType: string;
    priceBuy: string;
    priceSell: string;
    walletBase?: WalletItemProps;
    walletQuote?: WalletItemProps;
    totalBuy: string;
    totalSell: string;
    amountBuy: string;
    amountSell: string;
    handleChangeAmountBuy: (value: string) => void;
    handleChangeAmountSell: (value: string) => void;
    handleChangePriceBuy: (value: string) => void;
    handleChangePriceSell: (value: string) => void;
    handleCreateOrder: (type: string) => void;
    currentMarket?: Market;
    marketPrice: string;
}

class OrderForm extends React.Component<OrderFormProps> {
    public render() {
        const {
          priceBuy,
          priceSell,
          walletBase,
          walletQuote,
          amountBuy,
          amountSell,
          orderType,
          currentMarket,
          marketPrice,
        } = this.props;

        return (
            <div className="pg-order-container">
                <div className="pg-order-container__block">
                    <div className="pg-order-container__block-body">
                        <div className="pg-order-container__block-body-available">
                            <div className="pg-order-container__block-body-available-text">
                                <div className="pg-order-container__block-body-available-text-image">
                                    <WalletIcon/>
                                </div>
                            </div>
                            <div className="pg-order-container__block-body-available-text pg-order-container__block-body-available-text-value">
                                Available
                            </div>
                            <div className="pg-order-container__block-body-available-text  pg-order-container__block-body-available-text-result">
                                {walletQuote ? walletQuote.balance : '0'}
                            </div>
                        </div>
                        <div className="pg-order-container__block-body-input-block">
                            {/* tslint:disable:jsx-no-multiline-js jsx-no-lambda */}
                            {orderType === 'limit' ? (
                                <React.Fragment>
                                    <div className="pg-order-container__block-body-input-block-label pg-order-container__text">
                                        Price
                                    </div>
                                    <div className="pg-order-container__block-body-input-block-input">
                                        <Input
                                            type="number"
                                            value={priceBuy}
                                            onChangeValue={this.props.handleChangePriceBuy}
                                        />
                                        <div className="pg-order-container__block-body-input-block-input-currency">
                                            {walletQuote ? walletQuote.currency.toUpperCase() : null}
                                        </div>
                                    </div>
                                </React.Fragment>) : (
                                <React.Fragment>
                                    <div className="pg-order-container__block-body-input-block-label pg-order-container__text__disabled">
                                        Price
                                    </div>
                                    <div className="pg-order-container__block-body-input-block-input  pg-order-container__disabled">
                                        <Input
                                            type="string"
                                            value={marketPrice}
                                            onChangeValue={e => {return;}}
                                        />
                                        <div className="pg-order-container__block-body-input-block-input-currency">
                                            {walletQuote ? walletQuote.currency.toUpperCase() : null}
                                        </div>
                                    </div>
                                </React.Fragment>)
                            }
                            {/* tslint:enable */}
                        </div>
                        <div className="pg-order-container__block-body-input-block">
                            <div className="pg-order-container__block-body-input-block-label">
                                Amount
                            </div>
                            <div className="pg-order-container__block-body-input-block-custom">
                                <Input
                                    type="number"
                                    value={amountBuy}
                                    onChangeValue={this.props.handleChangeAmountBuy}
                                />
                                <div className="pg-order-container__block-body-input-block-input-currency">
                                    {walletBase ? walletBase.currency.toUpperCase() : null}
                                </div>
                            </div>
                        </div>
                        <div className="pg-order-container__block-body-result">
                            <div className="pg-order-container__block-body-result-total">
                                <div className="pg-order-container__block-body-result-total-item-text">
                                    Total
                                </div>
                                <div className="pg-order-container__block-body-result-total-item-text">
                                    <Decimal fixed={currentMarket && currentMarket.bid_precision || 4}>{this.getTotalBuy()}</Decimal>
                                </div>
                            </div>
                        </div>
                        <div className="pg-order-container__block-body-button pg-order-container__block-body-button-buy">
                            {/* tslint:disable:jsx-no-lambda */}
                            <Button
                                label={`Buy ${walletBase && walletBase.currency || ''}`}
                                onClick={e => this.props.handleCreateOrder('buy')}
                            />
                            {/* tslint:enable*/}
                        </div>
                    </div>
                </div>
                <div className="pg-order-container__block">
                    <div className="pg-order-container__block-body">
                        <div className="pg-order-container__block-body-available">
                            <div className="pg-order-container__block-body-available-text">
                                <div className="pg-order-container__block-body-available-text-image">
                                    <WalletIcon/>
                                </div>
                            </div>
                            <div className="pg-order-container__block-body-available-text pg-order-container__block-body-available-text-value">
                                Available
                            </div>
                            <div className="pg-order-container__block-body-available-text  pg-order-container__block-body-available-text-result">
                                {walletBase ? walletBase.balance : '0'}
                            </div>
                        </div>
                        <div className="pg-order-container__block-body-input-block">
                            {/* tslint:disable:jsx-no-multiline-js jsx-no-lambda */}
                            {orderType === 'limit' ? (
                                <React.Fragment>
                                    <div className="pg-order-container__block-body-input-block-label pg-order-container__text">
                                        Price
                                    </div>
                                    <div className="pg-order-container__block-body-input-block-input">
                                        <Input
                                            type="number"
                                            value={priceSell}
                                            onChangeValue={this.props.handleChangePriceSell}
                                        />
                                        <div className="pg-order-container__block-body-input-block-input-currency">
                                            {walletQuote ? walletQuote.currency.toUpperCase() : null}
                                        </div>
                                    </div>
                                </React.Fragment>) : (
                                <React.Fragment>
                                    <div className="pg-order-container__block-body-input-block-label pg-order-container__text__disabled">
                                        Price
                                    </div>
                                    <div className="pg-order-container__block-body-input-block-input pg-order-container__disabled">
                                        <Input
                                            type="string"
                                            value={marketPrice}
                                            onChangeValue={e => {return;}}
                                        />
                                        <div className="pg-order-container__block-body-input-block-input-currency">
                                            {walletQuote ? walletQuote.currency.toUpperCase() : null}
                                        </div>
                                    </div>
                                </React.Fragment>)
                            }
                            {/* tslint:enable */}
                        </div>
                        <div className="pg-order-container__block-body-input-block">
                            <div className="pg-order-container__block-body-input-block-label">
                                Amount
                            </div>
                            <div className="pg-order-container__block-body-input-block-custom">
                                <Input
                                    type="number"
                                    value={amountSell}
                                    onChangeValue={this.props.handleChangeAmountSell}
                                />
                                <div className="pg-order-container__block-body-input-block-input-currency">
                                    {walletBase ? walletBase.currency.toUpperCase() : null}
                                </div>
                            </div>
                        </div>
                        <div className="pg-order-container__block-body-result">
                            <div className="pg-order-container__block-body-result-total">
                                <div className="pg-order-container__block-body-result-total-item-text">
                                    Total
                                </div>
                                <div className="pg-order-container__block-body-result-total-item-text">
                                    <Decimal fixed={currentMarket && currentMarket.ask_precision || 4}>{this.getTotalSell()}</Decimal>
                                </div>
                            </div>
                        </div>
                        <div className="pg-order-container__block-body-button pg-order-container__block-body-button-sell">
                            {/* tslint:disable:jsx-no-lambda */}
                            <Button
                                label={`Sell ${walletBase && walletBase.currency || ''}`}
                                onClick={e => this.props.handleCreateOrder('sell')}
                            />
                            {/* tslint:enable*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private getTotalBuy = (): number => {
        const {
            orderType,
            marketPrice,
            amountBuy,
            priceBuy,
        } = this.props;
        if (orderType === 'market') {
            return (marketPrice && amountBuy) ? parseFloat(marketPrice) * parseFloat(amountBuy) : 0;
        }

        return priceBuy && amountBuy ? parseFloat(priceBuy) * parseFloat(amountBuy) : 0;
    };

    private getTotalSell = (): number => {
        const {
            orderType,
            marketPrice,
            amountSell,
            priceSell,
        } = this.props;
        if (orderType === 'market') {
            return (marketPrice && amountSell) ? parseFloat(marketPrice) * parseFloat(amountSell) : 0;
        }

        return priceSell && amountSell ? parseFloat(priceSell) * parseFloat(amountSell) : 0;
    };
}

export const OrderComponent = OrderForm;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/OrderForm/index.tsx
