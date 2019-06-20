import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { QRCode } from '../../../openware';
import { CopyableTextField } from '../../components';
import { VALUATION_CURRENCY } from '../../constants';

export interface DepositCryptoProps {
    data: string;
    error: string;
    dimensions?: number;
    copyButtonText?: string;
    handleOnCopy: () => void;
    currency: () => string;
    withdrawMinimalAmount: string;
    subtitle?: string;
}

interface DepositCryptoState {
    displayQRCode: boolean;
}

type CopyTypes = HTMLInputElement | null;

const copy = (id: string) => {
    const copyText: CopyTypes = document.querySelector(`#${id}`);

    if (copyText) {
        copyText.select();

        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
};

type Props = DepositCryptoProps & InjectedIntlProps;

class DepositCrypto extends React.Component<Props, DepositCryptoState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            displayQRCode: false,
        };
    }

    private QR_SIZE = 118;

    public render() {
        const {
            data,
            dimensions,
            error,
            copyButtonText,
            handleOnCopy,
            currency,
            withdrawMinimalAmount,
        } = this.props;

        const size = dimensions || this.QR_SIZE;
        const doCopy = () => {
          copy('copy_deposit_1');
          handleOnCopy();
        };

        //tslint:disable jsx-no-multiline-js
        return (
            <div className="cr-deposit-crypto">
                <span className="cr-deposit-crypto__title">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.title.first' })}</span>
                {currency.toLowerCase() === VALUATION_CURRENCY.toLowerCase() && <p className="cr-deposit-crypto__message-usdt">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.usdt.message1' })}</p>}
                { data ? (
                    <div className="cr-deposit-crypto__copyable">
                        <CopyableTextField
                            className={'cr-deposit-crypto__copyable__text'}
                            value={data}
                            fieldId={'copy_deposit_1'}
                        />
                        <div className="cr-deposit-crypto__copyable__button" onClick={doCopy}>
                            {copyButtonText ? copyButtonText : 'Copy'}
                        </div>
                        <span className="cr-deposit-crypto__copyable__button" onMouseOver={this.handleDisplayQRCode} onMouseOut={this.handleDisplayQRCode}>QR Code</span>
                        {this.state.displayQRCode ? (
                            <div className="cr-deposit-crypto__copyable__qr-code" onClick={doCopy}>
                                <QRCode
                                    dimensions={size}
                                    data={data}
                                />
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className="cr-deposit-crypto__copyable">
                        <CopyableTextField
                            className={'cr-deposit-crypto__copyable__text'}
                            fieldId={'copy_deposit_2'}
                            value={error}
                        />
                    </div>
                )}
                <span className="cr-deposit-crypto__title">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.title.second' })}</span>
                <span className="cr-deposit-crypto__title">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.title.third' })}</span>
                <ul className="cr-deposit-crypto__list">
                    <li className="cr-deposit-crypto__list__item">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.list.item.first.part.one' })} {`${currency}`} {this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.list.item.first.part.two' })}</li>
                    <li className="cr-deposit-crypto__list__item">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.list.item.second' })}</li>
                    <li className="cr-deposit-crypto__list__item">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.list.item.third.part.one' })} {`${withdrawMinimalAmount} ${currency}`} {this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.list.item.third.part.two' })}</li>
                    <li className="cr-deposit-crypto__list__item">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.list.item.fourth' })}</li>
                    <li className="cr-deposit-crypto__list__item">{this.props.intl.formatMessage({ id: 'page.body.wallets.deposit.ccy.list.item.fifth' })}</li>
                </ul>
            </div>
        );
    }

    private handleDisplayQRCode = () => {
        this.setState({
            displayQRCode: !this.state.displayQRCode,
        });
    }
}

export const DepositCryptoElement = injectIntl(DepositCrypto);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/DepositCrypto/index.tsx
