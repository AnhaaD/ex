// tslint:disable jsx-no-lambda
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { WalletItemProps } from '../../../components/WalletItem';
import {
    Market,
    orderExecuteFetch,
    RootState,
    selectCurrentMarket,
    selectCurrentPrice,
    selectMarketTickers,
    selectWallets,
} from '../../../modules';
import { OrderSide } from '../../../modules/types';
import { Decimal } from '../../../openware';
import move = require('../../assets/images/Move.svg');
import {
    OrderComponent,
    OrderSingleComponent,
} from '../../components';

interface OrderContainerState {
    currentOrderType: string;
    priceBuy: string;
    priceSell: string;
    amountBuy: string;
    amountSell: string;
    walletBase?: WalletItemProps;
    walletQuote?: WalletItemProps;
    price: string;
    amount: string;
    width: number;
}

interface ReduxProps {
    currentMarket?: Market;
    currentPrice?: number;
    marketTickers: {
        [key: string]: {
            last: string;
        },
    };
    wallets: WalletItemProps[];
}

interface DispatchProps {
    orderExecute: typeof orderExecuteFetch;
}

export type OrderProps = ReduxProps & DispatchProps;

class OrderContainer extends React.Component<OrderProps, OrderContainerState> {
    constructor(props: OrderProps) {
        super(props);

        this.state = {
            currentOrderType: 'market',
            priceBuy: '',
            priceSell: '',
            amountBuy: '',
            amountSell: '',
            price: '',
            amount: '',
            width: 0,
        };

        this.orderRef = React.createRef();
    }

    private orderRef;
    private splitBorder = 449;

    public componentDidUpdate() {
        if (this.orderRef.current && this.state.width !== this.orderRef.current.clientWidth) {
            this.setState({
                width: this.orderRef.current.clientWidth,
            });
        }
    }

    public componentWillReceiveProps(next: OrderProps) {
        if (next.currentMarket && next.wallets && ((next.currentMarket !== this.props.currentMarket) || (next.wallets !== this.props.wallets))) {
            this.setState({
                walletBase: this.getWallet(next.currentMarket.ask_unit, next.wallets),
                walletQuote: this.getWallet(next.currentMarket.bid_unit, next.wallets),
            });
        }

        if (next.currentPrice && next.currentPrice !== +this.state.price) {
            if (next.currentMarket && next.currentMarket !== this.props.currentMarket) {
                this.setState({
                    price: Decimal.format(next.currentPrice || 0, next.currentMarket && next.currentMarket.bid_precision || 4),
                });
            } else if (this.props.currentMarket) {
                this.setState({
                    price: Decimal.format(next.currentPrice || 0, this.props.currentMarket && this.props.currentMarket.bid_precision || 4),
                });
            }
        }
    }

    public render() {
        const {
            currentOrderType,
            width,
        } = this.state;

        const marketLabelClassNames = classnames({
            'pg-order-container__switcher-item': currentOrderType !== 'market',
            'pg-order-container__switcher-item-active': currentOrderType === 'market',
        });

        const limitLabelClassNames = classnames({
            'pg-order-container__switcher-item': currentOrderType !== 'limit',
            'pg-order-container__switcher-item-active': currentOrderType === 'limit',
        });

        return (
            <div className="pg-order-container">
                <div className="cr-table-header__content">
                    <div className="pg-order-container__switcher">
                        <div className={marketLabelClassNames} onClick={e => this.changeCurrentOrderType('market')}>
                            Market
                        </div>
                        <div className={limitLabelClassNames} onClick={e => this.changeCurrentOrderType('limit')}>
                            Limit
                        </div>
                    </div>
                    <img className="cr-title-component__move" src={move} />
                </div>
                <div ref={this.orderRef}>
                    {width > this.splitBorder ? this.commonOrderForm() : this.singleOrderForm()}
                </div>
                <div className="cr-table-footer"/>
            </div>
        );
    }

    private singleOrderForm = () => {
        const {
            currentMarket,
            marketTickers,
        } = this.props;

        const {
            currentOrderType,
            walletBase,
            walletQuote,
            price,
            amount,
        } = this.state;

        const marketPrice = currentMarket && currentMarket.id && marketTickers[currentMarket.id] && marketTickers[currentMarket.id].last || '0';
        return (
            <OrderSingleComponent
                orderType={currentOrderType}
                price={price}
                walletBase={walletBase}
                walletQuote={walletQuote}
                amount={amount}
                handleChangeAmount={this.handleChangeAmount}
                handleChangePrice={this.handleChangePrice}
                handleCreateOrder={this.handleCreateOrderSingle}
                currentMarket={currentMarket}
                marketPrice={marketPrice}
            />
        );
    };

    private commonOrderForm = () => {
        const {
            currentMarket,
            marketTickers,
        } = this.props;

        const {
            currentOrderType,
            priceBuy,
            priceSell,
            amountBuy,
            amountSell,
            walletBase,
            walletQuote,
        } = this.state;

        const totalBuy = this.getTotalBuy(currentOrderType);
        const totalSell = this.getTotalSell(currentOrderType);

        return (
            <OrderComponent
                orderType={currentOrderType}
                priceBuy={priceBuy}
                priceSell={priceSell}
                walletBase={walletBase}
                walletQuote={walletQuote}
                totalBuy={totalBuy}
                totalSell={totalSell}
                amountBuy={amountBuy}
                amountSell={amountSell}
                handleChangeAmountBuy={this.handleChangeAmountBuy}
                handleChangeAmountSell={this.handleChangeAmountSell}
                handleChangePriceBuy={this.handleChangePriceBuy}
                handleChangePriceSell={this.handleChangePriceSell}
                handleCreateOrder={this.handleCreateAnOrder}
                currentMarket={currentMarket}
                marketPrice={currentMarket && currentMarket.id && marketTickers[currentMarket.id] && marketTickers[currentMarket.id].last || '0'}
            />
        );
    };

    private getTotalBuy = (orderType: string): string => {
        const {
            currentMarket,
            marketTickers,
        } = this.props;
        const {
            priceBuy,
            amountBuy,
        } = this.state;

        if (orderType === 'market') {
            const price = currentMarket && currentMarket.id && marketTickers[currentMarket.id] && marketTickers[currentMarket.id].last || '0';
            return (amountBuy && currentMarket) ? String(parseFloat(price) * parseFloat(amountBuy) - parseFloat(price) * parseFloat(amountBuy) * parseFloat(currentMarket.bid_fee)) : '0';
        }

        return (priceBuy && amountBuy && currentMarket) ? String(parseFloat(priceBuy) * parseFloat(amountBuy) - parseFloat(currentMarket.bid_fee)) : '0';
    };

    private getTotalSell = (orderType: string): string => {
        const {
            currentMarket,
            marketTickers,
        } = this.props;
        const {
            priceSell,
            amountSell,
        } = this.state;

        if (orderType === 'market') {
            const price = currentMarket && currentMarket.id && marketTickers[currentMarket.id] && marketTickers[currentMarket.id].last || '0';
            const totalSell = (amountSell && currentMarket) ? String(parseFloat(price) * parseFloat(amountSell) - parseFloat(price) * parseFloat(amountSell) * parseFloat(currentMarket.ask_fee)) : '0';
            return totalSell ? totalSell : '0';
        }

        return (priceSell && amountSell && currentMarket) ? String(parseFloat(priceSell) * parseFloat(amountSell) - parseFloat(currentMarket.ask_fee)) : '0';
    };

    private handleChangeAmount = (value: string) => {
        this.setState({
            amount: value,
        });
    };

    private handleChangePrice = (value: string) => {
        this.setState({
            price: value,
        });
    };

    private handleCreateOrderSingle = (type: string) => {
        if (!this.props.currentMarket) {
            return;
        }
        const {
            amount,
            currentOrderType,
            price,
        } = this.state;
        const resultData = {
            market: this.props.currentMarket.id,
            side: type as OrderSide,
            volume: amount,
            ord_type: (currentOrderType as string).toLowerCase(),
        };
        const order = currentOrderType === 'limit' ? {...resultData, price: price} : resultData;
        this.props.orderExecute(order);
        this.handleChangePrice('');
        this.handleChangeAmount('');
    };

    private handleChangeAmountBuy = (value: string) => {
        this.setState({
            amountBuy: value,
        });
    };

    private handleChangeAmountSell = (value: string) => {
        this.setState({
            amountSell: value,
        });
    };

    private handleChangePriceBuy = (value: string) => {
        this.setState({
            priceBuy: value,
        });
    };

    private handleChangePriceSell = (value: string) => {
        this.setState({
            priceSell: value,
        });
    };

    private changeCurrentOrderType = (value: string) => {
        this.setState({
            currentOrderType: value,
        });
    };

    private handleCreateAnOrder = (type: string) => {
        if (!this.props.currentMarket) {
            return;
        }
        const {
            priceBuy,
            amountBuy,
            priceSell,
            amountSell,
            currentOrderType,
        } = this.state;
        if (type === 'buy') {
            const resultData = {
                market: this.props.currentMarket.id,
                side: type as OrderSide,
                volume: amountBuy,
                ord_type: currentOrderType.toLowerCase(),
            };
            const order = currentOrderType === 'limit' ? {...resultData, price: priceBuy} : resultData;
            this.props.orderExecute(order);
            this.handleChangePriceBuy('');
            this.handleChangeAmountBuy('');
        } else {
            const resultData = {
                market: this.props.currentMarket.id,
                side: type as OrderSide,
                volume: amountSell,
                ord_type: currentOrderType.toLowerCase(),
            };
            const order = currentOrderType === 'limit' ? {...resultData, price: priceSell} : resultData;
            this.props.orderExecute(order);
            this.handleChangePriceSell('');
            this.handleChangeAmountSell('');
        }
    };

    private getWallet(currency: string, wallets: WalletItemProps[]): WalletItemProps | undefined {
        const currencyLower = currency.toLowerCase();
        return wallets ? wallets.find(w => w.currency === currencyLower) : undefined;
    }
}

const mapStateToProps = (state: RootState) => ({
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
    marketTickers: selectMarketTickers(state),
    wallets: selectWallets(state),
});

const mapDispatchToProps = dispatch => ({
    orderExecute: payload => dispatch(orderExecuteFetch(payload)),
});

// tslint:disable-next-line no-any
export const Order = connect(mapStateToProps, mapDispatchToProps)(OrderContainer as any);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/CustomOrder/index.tsx
