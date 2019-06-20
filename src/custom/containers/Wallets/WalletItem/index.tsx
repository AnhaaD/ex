import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import {
    connect,
    MapDispatchToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    alertPush,
    Market,
    RootState,
    selectUserInfo,
    setCurrentMarket,
    User,
    walletsAddressFetch,
} from '../../../../modules';
import {
    Button,
    Decimal,
} from '../../../../openware';
import { DepositFiat } from '../../../components';
import { formatCCYAddress } from '../../../helpers';
import { CryptoIcon } from '../../CryptoIcon';
import { DepositCryptoElement } from '../../DepositCrypto';
import { WithdrawElement, WithdrawProps } from '../Withdraw';

interface WalletItemProps {
    action: boolean;
    address?: string;
    balance: number;
    currency: string;
    fee: number;
    fixed: number;
    handleClick: (value: boolean) => void;
    handleSetWithdrawalData: () => void;
    history: History;
    isTwoFactorAuthRequired: boolean;
    limit?: number;
    locked: number;
    markets: Market[];
    min_withdraw_amount: string;
    name: string;
    precision: number;
    type: 'fiat' | 'coin';
    userCanIncreaseLimit: boolean;
    valuation: string;
    withdrawDone: boolean;
}

interface DispatchProps {
    fetchAddress: typeof walletsAddressFetch;
    fetchSuccess: typeof alertPush;
    setCurrentMarket: typeof setCurrentMarket;
}

interface ReduxProps {
    user: User;
}

interface WalletItemState {
    action: string;
    showMarkets: boolean;
}

const DEFAULT_WALLET_PRECISION = 8;

type Props = WalletItemProps & DispatchProps & InjectedIntlProps & ReduxProps;

// tslint:disable member-ordering jsx-no-multiline-js
export class WalletItem extends React.Component<Props, WalletItemState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            action: '',
            showMarkets: false,
        };
    }

    public componentDidMount() {
        if (!this.props.address && this.props.type !== 'fiat') {
            this.props.fetchAddress({currency: this.props.currency});
        }
    }

    public componentWillReceiveProps(next: Props) {
        if (next.active === false) {
            this.handleRemoveAction();
        }

        if (!next.address && next.type !== 'fiat' && this.state.action === 'Deposit') {
            this.props.fetchAddress({currency: next.currency, timeout: true});
        }
    }

    public translate = (id: string) => this.props.intl.formatMessage({ id });

    public render() {
        const {
            balance,
            currency,
            locked,
            markets,
            precision,
            valuation,
        } = this.props;
        const {
            action,
            showMarkets,
        } = this.state;

        const available = balance;

        return (
            <React.Fragment>
                <div className="cr-wallet-item">
                    <span className="cr-wallet-item-cell cr-wallet-item__currency-icon"><CryptoIcon code={currency.toUpperCase()} /></span>
                    <span className="cr-wallet-item-cell cr-wallet-item__currency-label">{currency}</span>
                    <span className="cr-wallet-item-cell cr-wallet-item__available"><Decimal fixed={precision || DEFAULT_WALLET_PRECISION}>{available.toString()}</Decimal></span>
                    <span className=" cr-wallet-item-cell cr-wallet-item__on-orders"><Decimal fixed={precision || DEFAULT_WALLET_PRECISION}>{locked.toString()}</Decimal></span>
                    <span className="cr-wallet-item-cell cr-wallet-item__valuation__ccy">{valuation}&nbsp;&nbsp;</span>
                    <span className="cr-wallet-item-cell cr-wallet-item__lock-position"><Decimal fixed={precision || DEFAULT_WALLET_PRECISION}>0.0</Decimal></span>
                    <div className="cr-wallet-item-cell">
                        <span className="cr-wallet-item__action" onClick={() => this.handleSetAction('Deposit')}>Deposit</span>
                    </div>
                    <div className="cr-wallet-item-cell">
                        <span className="cr-wallet-item__action" onClick={() => this.handleSetAction('Withdraw')}>Withdraw</span>
                    </div>
                    <div className="cr-wallet-item-cell">
                        <div className="cr-wallet-item__action">
                            <span onMouseOver={() => this.handleExchangeAction()}>Exchange</span>
                            {showMarkets && markets && this.renderMarkets()}
                        </div>
                    </div>
                </div>
                {action === 'Deposit' && this.renderDeposit()}
                {action === 'Withdraw' && this.renderWithdraw()}
            </React.Fragment>
        );
    }

    private bankData = [
        {
            key: this.translate('page.body.wallets.deposit.fiat.bankName'),
            value: 'Diamant Bank',
        },
        {
            key: this.translate('page.body.wallets.deposit.fiat.accountNumber'),
            value: '10120212',
        },
        {
            key: this.translate('page.body.wallets.deposit.fiat.accountName'),
            value: 'name',
        },
        {
            key: this.translate('page.body.wallets.deposit.fiat.phoneNumber'),
            value: '+3 8093 1212 12 12',
        },
        {
            key: this.translate('page.body.wallets.deposit.fiat.referenceCode'),
            value: '8374982374',
        },
    ];

    private title = this.translate('page.body.wallets.deposit.fiat.message1');
    private description = this.translate('page.body.wallets.deposit.fiat.message2');

    private handleExchangeAction = () => {
        this.setState({
            showMarkets: !this.state.showMarkets,
        });
    }

    private handleRemoveAction = () => {
        this.setState({
            action: '',
        });
    }

    private handleSetAction = (currentAction: string) => {
        const {
            address,
            currency,
            fetchAddress,
            type,
        } = this.props;

        if (currentAction && currentAction !== this.state.action) {
            this.props.handleClick(false);
            this.setState({
                action: currentAction,
            });
            if (currentAction === 'Deposit' && !address && currency && type === 'coin') {
                fetchAddress({ currency: currency });
            }
        } else if (currentAction && currentAction === this.state.action) {
            this.props.handleClick(true);
            this.handleRemoveAction();
        }
    };

    private renderDeposit() {
        const {
            address,
            addressDepositError,
            currency,
            intl,
            min_withdraw_amount,
        } = this.props;

        const error = addressDepositError ?
            intl.formatMessage({id: addressDepositError.message}) :
            intl.formatMessage({id: 'page.body.wallets.deposit.ccy.message.error'});

        const walletAddress = formatCCYAddress(currency, address);

        if (this.props.type === 'coin') {
            return (
                <React.Fragment>
                    <DepositCryptoElement
                        data={walletAddress}
                        error={error}
                        copyButtonText={this.translate('page.body.wallets.deposit.ccy.message.button')}
                        handleOnCopy={this.handleOnCopy}
                        currency={currency}
                        withdrawMinimalAmount={min_withdraw_amount}
                    />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <DepositFiat title={this.title} description={this.description} data={this.bankData} />
                </React.Fragment>
            );
        }
    }

    private isOtpDisabled = () => {
            return (
                <div className="cr-enable-2fa">
                    <p className="cr-enable-2fa__message">
                        {this.translate('page.body.wallets.withdraw.content.enable2fa')}
                    </p>
                    <Button
                        className="cr-enable-2fa__button"
                        label={this.translate('page.body.wallets.withdraw.content.enable2faButton')}
                        onClick={() => this.redirectToEnable2fa()}
                    />
                </div>
            );
        };

    private redirectToEnable2fa = () => {
        this.props.history.push('/security/2fa', { enable2fa: true });
    };

    private renderWithdraw() {
        const {
            balance,
            currency,
            fee,
            handleSetWithdrawalData,
            history,
            limit,
            isTwoFactorAuthRequired,
            precision,
            type,
            userCanIncreaseLimit,
            withdrawDone,
        } = this.props;

        const withdrawProps: WithdrawProps = {
            available: balance,
            fixed: precision,
            currency,
            fee,
            history,
            limit: limit || 0,
            handleSetWithdrawalData,
            userCanIncreaseLimit,
            withdrawDone,
        };

        if (type === 'fiat') {
            return (
                <div className="cr-enable-2fa">
                    <p className="cr-enable-2fa__message">
                        {this.translate('page.body.wallets.deposit.fiat.admin')}
                    </p>
                </div>
            );
        }
        return (
            <React.Fragment>
                {isTwoFactorAuthRequired ? <WithdrawElement {...withdrawProps} /> : this.isOtpDisabled()}
            </React.Fragment>
        );
    }

    private renderMarkets() {
        const { markets } = this.props;

        return (
            <React.Fragment>
                <div className="cr-trades" onMouseLeave={() => this.handleExchangeAction()}>
                    <div className="cr-trades__list">
                        {markets.map((market, i) => (
                            <div key={i} onClick={() => this.redirectToExchange(market)} className="cr-trades__list__item">{market.name}</div>
                        ))}
                    </div>
                </div>
            </React.Fragment>
         );
    }

    private handleOnCopy = () => {
      this.props.fetchSuccess({ message: ['page.body.wallets.deposit.ccy.message.success'], type: 'success'});
    };

    private redirectToExchange(market: Market) {
        const {
            history,
        } = this.props;

        market && this.props.setCurrentMarket(market);
        history.push(market ? `/trading/${market.id}` : '/trading');
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
    fetchSuccess: payload => dispatch(alertPush(payload)),
    setCurrentMarket: (market: Market) => dispatch(setCurrentMarket(market)),
});

// tslint:disable-next-line:no-any
const WalletItemElement = injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletItem) as any));

export {
    WalletItemElement,
    WalletItemProps,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Wallets/WalletItem/index.tsx
