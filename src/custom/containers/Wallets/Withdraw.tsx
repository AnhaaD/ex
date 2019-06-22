// tslint:disable:jsx-no-lambda
import classnames from 'classnames';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import {
    Button,
    Decimal,
    Input,
} from '../../../openware';
import { VALUATION_CURRENCY } from '../../constants';

interface WithdrawProps {
    available: string;
    className?: string;
    currency: string;
    fee: number;
    fixed: number;
    history: History;
    limit: number;
    handleSetWithdrawalData: (amount: number, currency: string, rid: string, total: string) => void;
    userCanIncreaseLimit: boolean;
    withdrawDone: boolean;
}

interface WithdrawState {
    amount: string;
    rid: string;
    total: string;
    withdrawAddressFocused: boolean;
    withdrawAmountFocused: boolean;
}

const cleanPositiveFloatInput = (text: string) => {
    let cleanInput = text
        .replace(',', '.')
        .replace(/-+/, '')
        .replace(/^0+/, '0')
        .replace(/\.+/, '.')
        .replace(/^0+([1-9])/, '$1');

    if (cleanInput[0] === '.') {
        cleanInput = `0${cleanInput}`;
    }
    return cleanInput;
};

type Props = WithdrawProps & InjectedIntlProps;

// tslint:disable jsx-no-multiline-js
class Withdraw extends React.Component<Props, WithdrawState> {
    public state = {
        amount: '',
        rid: '',
        total: '',
        withdrawAddressFocused: false,
        withdrawAmountFocused: false,
    };

    public componentWillReceiveProps(nextProps) {
        if (this.props.currency !== nextProps.currency || nextProps.withdrawDone) {
            this.setState({
                amount: '',
                rid: '',
                total: '',
            });
        }
    }

    public render() {
        const {
            available,
            className,
            currency,
            fee,
            fixed,
            intl,
            limit,
            userCanIncreaseLimit,
        } = this.props;

        const {
            amount,
            rid,
            total,
            withdrawAddressFocused,
            withdrawAmountFocused,
        } = this.state;

        const cx = classnames('cr-withdraw', className);

        const withdrawAddressClass = classnames('cr-withdraw__address', {
          'cr-withdraw__address--focused': withdrawAddressFocused,
        });

        const withdrawAmountClass = classnames('cr-withdraw__amount', {
          'cr-withdraw__amount--focused': withdrawAmountFocused,
        });

        return (
            <div className={cx}>
                {currency.toLowerCase() === VALUATION_CURRENCY.toLowerCase() && <p className="cr-withdraw__message-usdt">{this.props.intl.formatMessage({ id: 'page.body.wallets.withdraw.usdt.message1' })}</p>}
                <span className="cr-withdraw__address-title">{intl.formatMessage({ id: 'page.body.wallets.withdraw.content.address' }) || 'Address'}</span>
                <div className={withdrawAddressClass}>
                    <Input
                        type="text"
                        value={rid}
                        className="cr-withdraw__address-input"
                        onFocus={() => this.handleAddressFocus}
                        onBlur={() => this.handleAddressFocus}
                        onChangeValue={this.handleChangeInputAddress}
                    />
                </div>
                <div className="cr-withdraw__row">
                    <div className="cr-withdraw__row-left">
                        <span className="cr-withdraw__amount-title">
                            {intl.formatMessage({ id: 'page.body.wallets.withdraw.content.amount' }) || 'Amount'}
                        </span>
                    </div>
                    <div className="cr-withdraw__row-right">
                        <span className="cr-withdraw__available-title">
                            {intl.formatMessage({ id: 'page.body.wallets.withdraw.content.available' }) || 'Available:'}
                        </span>
                        <span className="cr-withdraw__available-value" onClick={() => this.handleChangeInputAmount(Decimal.format(available, fixed))}>
                            <Decimal fixed={fixed}>{available}</Decimal>
                        </span>
                        <span className="cr-withdraw__limit-title">
                            {intl.formatMessage({ id: 'page.body.wallets.withdraw.content.limit' }) || 'Limit:'}
                        </span>
                        <span className="cr-withdraw__limit-value">
                            <Decimal fixed={fixed}>{limit}</Decimal>
                        </span>
                        {userCanIncreaseLimit && (
                            <span className="cr-withdraw__increase-limit" onClick={this.redirectToKYC}>
                                {intl.formatMessage({ id: 'page.body.wallets.withdraw.content.increaseLimit' }) || 'Increase'}
                            </span>
                        )}
                    </div>
                </div>
                <div className={withdrawAmountClass}>
                    <Input
                        type="text"
                        value={amount || ''}
                        className="cr-withdraw__amount__input"
                        onFocus={() => this.handleAmountFocus}
                        onBlur={() => this.handleAmountFocus}
                        onChangeValue={this.handleChangeInputAmount}
                    />
                </div>
                <div className="cr-withdraw__row">
                    <div className="cr-withdraw__fee cr-withdraw__row-left">
                        <span className="cr-withdraw__fee-title">{intl.formatMessage({ id: 'page.body.wallets.withdraw.content.fee' }) || 'Fee'}</span>
                        <div className="cr-withdraw__fee__value">
                            <span className="cr-withdraw__fee__value__number"><Decimal fixed={fixed}>{fee}</Decimal></span>
                            <span className="cr-withdraw__fee__value__currency">{currency}</span>
                        </div>
                    </div>
                    <div className="cr-withdraw__total cr-withdraw__row-right">
                        <span className="cr-withdraw__total-title">{intl.formatMessage({ id: 'page.body.wallets.withdraw.content.total' }) || 'Total'}</span>
                        <div className="cr-withdraw__total__value">
                            <span className="cr-withdraw__total__value__number"><Decimal fixed={fixed}>{+total > 0 ? total : 0}</Decimal></span>
                            <span className="cr-withdraw__total__value__currency">{currency}</span>
                        </div>
                    </div>
                </div>
                <div className="cr-withdraw__row">
                    <div className="cr-withdraw__content cr-withdraw__row-left">
                        <span className="cr-withdraw__content-title">{intl.formatMessage({ id: 'page.body.wallets.withdraw.content.title' })}</span>
                        <ul className="cr-withdraw__content__list">
                            <li className="cr-withdraw__content__list__item">{intl.formatMessage({ id: 'page.body.wallets.withdraw.content.list.first' })}</li>
                            <li className="cr-withdraw__content__list__item">{intl.formatMessage({ id: 'page.body.wallets.withdraw.content.list.second' })}</li>
                        </ul>
                    </div>
                    <div className="cr-withdraw__content cr-withdraw__row-right">
                        <Button
                            className="cr-withdraw__button"
                            label={intl.formatMessage({ id: 'page.body.wallets.withdraw.content.button' }) || 'WITHDRAW'}
                            onClick={this.handleClick}
                            disabled={!rid.length || +total <= 0 || +amount > +available}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private handleAddressFocus = () => {
        this.setState({
            withdrawAddressFocused: !this.state.withdrawAddressFocused,
        });
    };

    private handleAmountFocus = () => {
        this.setState({
            withdrawAmountFocused: !this.state.withdrawAmountFocused,
        });
    };

    private handleChangeInputAddress = (text: string) => {
        this.setState({ rid: text });
    };

    private handleChangeInputAmount = (value: string) => {
        const {
            fee,
            fixed,
        } = this.props;
        const convertedValue = cleanPositiveFloatInput(value);
        const condition = new RegExp(`^(?:[\\d-]*\\.?[\\d-]{0,${fixed}}|[\\d-]*\\.[\\d-])$`);
        if (convertedValue.match(condition)) {
            this.setState({
                amount: convertedValue,
                total: (+convertedValue - fee).toFixed(fixed),
            });
        }
    };

    private handleClick = () => this.props.handleSetWithdrawalData(
        +this.state.amount,
        this.props.currency.toLowerCase(),
        this.state.rid,
        this.state.total,
    );

    private redirectToKYC = () => {
        this.props.history.push('/confirm');
    };
}

const WithdrawElement = injectIntl(Withdraw);

export {
    WithdrawElement,
    WithdrawProps,
    WithdrawState,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Wallets/Withdraw.tsx
