import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { Modal } from '../../../components';

interface ModalUnsubscribeConfirmationProps {
    onSubmit: () => void;
    onDismiss: () => void;
}

type Props = ModalUnsubscribeConfirmationProps & InjectedIntlProps;

class ModalUnsubscribe extends React.Component<Props> {
    public translate = (e: string) => {
        return this.props.intl.formatMessage({id: e});
    };

    public render() {
        const { show } = this.props;
        return (
            <Modal
                className="pg-unsubscribe-modal-confirm"
                show={show}
                header={this.renderHeader()}
                content={null}
                footer={this.renderFooter()}
            />
        );
    }

    private renderHeader = () => {
        return (
            <div className="pg-unsubscribe-modal-confirm__header">
                {this.translate('page.body.subscriptions.unsubscribe.modal.confirmation')}
            </div>
        );
    };

    private renderFooter = () => {
        return (
            <div className="pg-unsubscribe-modal-confirm__footer">
                <span onClick={this.props.onSubmit} className="pg-unsubscribe-modal-confirm__footer__button pg-unsubscribe-modal-confirm__footer__button--accept">
                    {this.translate('page.body.subscriptions.unsubscribe.modal.button.accept')}
                </span>
                <span onClick={this.props.onDismiss} className="pg-unsubscribe-modal-confirm__footer__button pg-unsubscribe-modal-confirm__footer__button--dismiss">
                    {this.translate('page.body.subscriptions.unsubscribe.modal.button.dismiss')}
                </span>
            </div>
        );
    };
}

export const ModalUnsubscribeConfirmation = injectIntl(ModalUnsubscribe);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/ModalUnsubscribeConfirmation/index.tsx
