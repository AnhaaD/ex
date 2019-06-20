import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { Modal } from '../../../components';
import { Button } from '../../../openware';

interface ModalWithdrawConfirmationProps {
    currency: string;
    onSubmit: () => void;
    onDismiss: () => void;
    rid: string;
    show: boolean;
    total: string;
}

type Props = ModalWithdrawConfirmationProps & InjectedIntlProps;

class ModalWithdraw extends React.Component<Props> {
    public translate = (e: string) => {
        return this.props.intl.formatMessage({id: e});
    };
    public render() {
        const { show } = this.props;
        return (
            <Modal
                show={show}
                header={this.renderHeader()}
                content={this.renderBody()}
                footer={this.renderFooter()}
            />
        );
    }

    private renderHeader = () => {
        return (
            <div className="pg-exchange-modal-submit__header">
                {this.translate('page.body.wallets.withdraw.modal.confirmation')}
            </div>
        );
    };

    private renderBody = () => {
        const {
            currency,
            rid,
            total,
        } = this.props;

        return (
            <div className="pg-exchange-modal-submit__body">
                <span>{this.translate('page.body.wallets.withdraw.modal.message1')} </span>
                <span className="pg-exchange-modal-submit__body__secondary">{total} </span>
                <span>{currency} </span>
                <span>{this.translate('page.body.wallets.withdraw.modal.message2')} </span>
                <span className="pg-exchange-modal-submit__body__secondary">{rid}</span>
            </div>
        );
    };

    private renderFooter = () => {
        return (
            <div className="pg-exchange-modal-submit__footer">
                <Button
                    className="pg-exchange-modal-submit__footer__button"
                    label={this.translate('page.body.wallets.withdraw.modal.button.cancel')}
                    onClick={this.props.onDismiss}
                />
                <Button
                    className="pg-exchange-modal-submit__footer__button"
                    label={this.translate('page.body.wallets.withdraw.modal.button.withdraw')}
                    onClick={this.props.onSubmit}
                />
            </div>
        );
    };
}

export const ModalWithdrawConfirmation = injectIntl(ModalWithdraw);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/ModalWithdrawConfirmation/index.tsx
