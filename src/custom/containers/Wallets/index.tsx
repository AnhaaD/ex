import { History } from 'history';
import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { WalletItemProps } from '../../../components';
import {
    RootState,
    selectHistory,
    selectUserInfo,
    User,
    WalletHistoryList,
} from '../../../modules';
import {
    CommonError,
} from '../../../modules/types';
import {
    selectWallets,
    selectWalletsAddressError,
    selectWalletsLoading,
    selectWithdrawSuccess,
    walletsData,
    walletsFetch,
    walletsWithdrawCcyFetch,
} from '../../../modules/user/wallets';
import { TwoFactorAuth } from '../../components';
import { ModalWithdrawConfirmation } from '../ModalWithdrawConfirmation';
import { WalletListElement } from './WalletList';


interface ReduxProps {
    addressDepositError?: CommonError;
    historyList: WalletHistoryList;
    user: User;
    wallets: WalletItemProps[];
    walletsLoading?: boolean;
    withdrawSuccess: boolean;
}

interface DispatchProps {
    clearWallets: () => void;
    fetchWallets: typeof walletsFetch;
    walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
}

interface HistoryProps {
    history: History;
}

interface WalletsState {
    amount: number;
    codeFocused: boolean;
    currency: string;
    filteredWallets?: WalletItemProps[] | null;
    rid: string;
    otpCode: string;
    selectedWalletIndex: number;
    total: string;
    withdraw2FAModal: boolean;
    withdrawConfirmModal: boolean;
    withdrawDone: boolean;
}

const MAX_KYC_LEVEL = 3;

type Props = HistoryProps & ReduxProps & DispatchProps & RouterProps & InjectedIntlProps;

// tslint:disable member-ordering jsx-no-multiline-js jsx-no-lambda

class WalletsComponent extends React.Component<Props, WalletsState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            amount: 0,
            codeFocused: false,
            currency: '',
            otpCode: '',
            rid: '',
            selectedWalletIndex: -1,
            total: '',
            withdraw2FAModal: false,
            withdrawConfirmModal: false,
            withdrawDone: false,
        };
    }

    public translate = (id: string) => this.props.intl.formatMessage({ id });

    public componentDidMount() {
        if (this.props.wallets.length === 0) {
            this.props.fetchWallets();
        }

        if (this.state.selectedWalletIndex === -1 && this.props.wallets.length) {
            this.setState({
                selectedWalletIndex: 0,
            });
        }
    }

    public componentWillUnmount() {
        this.props.clearWallets();
    }

    public componentWillReceiveProps(next: Props) {
        if (this.props.wallets.length === 0 && next.wallets.length > 0) {
            this.setState({
                selectedWalletIndex: 0,
            });
        }
    }

    public render() {
        const { wallets } = this.props;
        const {
            currency,
            filteredWallets,
            rid,
            total,
            withdraw2FAModal,
            withdrawConfirmModal,
            withdrawDone,
        } = this.state;

        const formattedWallets = wallets.map((wallet: WalletItemProps) => ({
            ...wallet,
            currency: wallet.currency.toUpperCase(),
        }));

        return (
            <div className="pg-wallet">
                <WalletListElement
                    handleSetWithdrawalData={this.handleSetWithdrawalData}
                    history={this.props.history}
                    isTwoFactorAuthRequired={this.isTwoFactorAuthRequired()}
                    userCanIncreaseLimit={this.userCanIncreaseLimit()}
                    walletItems={filteredWallets || formattedWallets}
                    withdrawDone={withdrawDone}
                />
                <ModalWithdrawConfirmation
                    currency={currency}
                    onSubmit={this.handleWithdrawalConfirmationSubmit}
                    onDismiss={this.handleWithdrawalConfirmationDismiss}
                    rid={rid}
                    show={withdrawConfirmModal}
                    total={total}
                />
                {withdraw2FAModal ? (
                    <TwoFactorAuth
                        onSubmit={this.handleSubmit2FA}
                        title={this.props.intl.formatMessage({ id: 'page.password2fa' })}
                        label={this.props.intl.formatMessage({ id: 'page.body.wallets.withdraw.content.code2fa' })}
                        buttonLabel={this.props.intl.formatMessage({ id: 'page.header.wallets' })}
                        message={this.props.intl.formatMessage({ id: 'page.password2fa.message' })}
                        codeFocused={this.state.codeFocused}
                        otpCode={this.state.otpCode}
                        error={'Please enter 2fa code'}
                        handleOtpCodeChange={this.handleChangeInputOtpCode}
                        handleChangeFocusField={this.handle2faFocus}
                        handleClose2fa={this.toggle2FAModal}
                    />
                ) : null}
            </div>
        );
    }

    private handle2faFocus = () => {
        this.setState(prev => ({
            codeFocused: !prev.codeFocused,
        }));
    };

    private handleChangeInputOtpCode = (otpCode: string) => {
        this.setState({ otpCode });
    };

    private handleSetWithdrawalData = (amount?: number, currency?: string, rid?: string, total?: string) => {
        this.setState({
            amount: amount || 0,
            currency: currency || '',
            rid: rid || '',
            total: total || '',
            withdrawDone: false,
        });
        this.toggleConfirmModal();
    }

    private handleSubmit2FA = () => {
        this.toggle2FAModal();
        this.handleWithdraw();
        this.setState({
            withdrawDone: true,
        });
    }

    private handleWithdrawalConfirmationSubmit = () => {
        this.toggleConfirmModal();
        this.toggle2FAModal();
    }

    private handleWithdrawalConfirmationDismiss = () => {
        this.toggleConfirmModal();
    }

    private handleWithdraw = () => {
        const {
            amount,
            currency,
            otpCode,
            rid,
            selectedWalletIndex,
        } = this.state;

        if (selectedWalletIndex === -1) {
            return;
        }

        const withdrawRequest = {
            amount,
            currency,
            otp: otpCode,
            rid,
        };
        this.props.walletsWithdrawCcy(withdrawRequest);
    };

    private isTwoFactorAuthRequired = () => {
        const { user: { level, otp }} = this.props;
        return level > 0 && otp;
    }

    private toggle2FAModal = () => {
        this.setState({
            otpCode: '',
            withdraw2FAModal: !this.state.withdraw2FAModal,
        });
    };

    private toggleConfirmModal = () => {
        this.setState({
            withdrawConfirmModal: !this.state.withdrawConfirmModal,
        });
    }

    private userCanIncreaseLimit = () => {
        const { user } = this.props;
        return user.level < MAX_KYC_LEVEL;
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
    wallets: selectWallets(state),
    walletsLoading: selectWalletsLoading(state),
    addressDepositError: selectWalletsAddressError(state),
    withdrawSuccess: selectWithdrawSuccess(state),
    historyList: selectHistory(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    fetchWallets: () => dispatch(walletsFetch()),
    walletsWithdrawCcy: params => dispatch(walletsWithdrawCcyFetch(params)),
    clearWallets: () => dispatch(walletsData([])),
});

// tslint:disable-next-line:no-any
export const Wallets = injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsComponent) as any));


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Wallets/index.tsx
