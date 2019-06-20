import * as React from 'react';
import { WalletItemProps } from '../../../components/WalletItem';
import { Market } from '../../../modules';
import {
    Button,
    Decimal,
    Input,
} from '../../../openware';
import { WalletIcon } from '../OrderForm/WalletIcon';

export interface OrderSingleFormProps {
    orderType: string;
    price: string;
    walletBase?: WalletItemProps;
    walletQuote?: WalletItemProps;
    amount: string;
    handleChangeAmount: (value: string) => void;
    handleChangePrice: (value: string) => void;
    handleCreateOrder: (type: string) => void;
    currentMarket?: Market;
    marketPrice: string;
}

class OrderSingleForm extends React.Component<OrderSingleFormProps> {
    public render() {
        const {
          price,
          walletBase,
          walletQuote,
          amount,
          currentMarket,
          marketPrice,
          orderType,
        } = this.props;
        const buttonLabelBuy = walletBase ? `Buy ${walletBase.currency.toUpperCase()}` : 'Buy';
        const buttonLabelSell = walletBase ? `Sell ${walletBase.currency.toUpperCase()}` : 'Sell';

        return (
            <div className="pg-order-container">
                <div className="pg-order-container__block-single">
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
                                <div>
                                    {walletBase ? `${walletBase.balance} ${walletBase.currency.toUpperCase()}` : '0'}
                                </div>
                                <div>
                                    {walletQuote ? `${walletQuote.balance} ${walletQuote.currency.toUpperCase()}` : '0'}
                                </div>
                            </div>
                        </div>
                        <div className="pg-order-container__block-body-input-block">
                            {/* tslint:disable:jsx-no-multiline-js jsx-no-lambda */}
                            {orderType === 'limit' ? (
                                <React.Fragment>
                                    <div className="pg-order-container__block-body-input-block-label pg-order-container__text">
                                        Price
                                    </div>
                                    <div className="pg-order-container__block-body-input-block-input pg-order-container__disable">
                                        <Input
                                            type="number"
                                            value={price}
                                            onChangeValue={this.props.handleChangePrice}
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
                                    value={amount}
                                    onChangeValue={this.props.handleChangeAmount}
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
                                    <Decimal fixed={currentMarket && currentMarket.ask_precision || 4}>{this.getTotal()}</Decimal>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pg-order-container__block-body-button">
                        {/* tslint:disable:jsx-no-lambda */}
                        <div className="pg-order-container__block-body-button-buy">
                            <Button
                                label={buttonLabelBuy}
                                onClick={e => this.props.handleCreateOrder('buy')}
                            />
                        </div>
                        <div className="pg-order-container__block-body-button-sell">
                            <Button
                                label={buttonLabelSell}
                                onClick={e => this.props.handleCreateOrder('sell')}
                            />
                        </div>
                        {/* tslint:enable */}
                    </div>
                </div>
            </div>
        );
    }

    private getTotal = (): number => {
        const {
            orderType,
            price,
            amount,
            marketPrice,
        } = this.props;
        if (orderType === 'limit') {
            return (price && amount) ? parseFloat(price) * parseFloat(amount) : 0;
        }

        return (marketPrice && amount) ? parseFloat(marketPrice) * parseFloat(amount) : 0;
    };
}

export const OrderSingleComponent = OrderSingleForm;


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/OrderSingleForm/index.tsx
