import { languageMap } from '../../translations';
import { monthsNames } from './months';

export const en = {
    ...languageMap.en,
    'page.header.navbar.home': 'Home',
    'page.header.navbar.markets': 'Markets',
    'page.header.navbar.exchange': 'Exchange',
    'page.header.navbar.signIn': 'Login',
    'page.header.navbar.signUp': 'Register',
    'page.header.navbar.signUp.title': 'Create your account',
    'page.header.navbar.signUp.invationCode': 'Have an Invitation code?',
    'page.header.navbar.signUp.agreement': 'By clicking “Register”, you agree to the',
    'page.header.navbar.signUp.termsAndConditions': 'Terms & Conditions',
    'page.header.navbar.register': 'Register',
    'page.header.navbar.social': 'Social',
    'page.header.navbar.leaderboards': 'Leaderboard',
    'page.header.navbar.subscriptions': 'Subscriptions',
    'page.header.navbar.myProfile': 'My Profile',
    'page.header.navbar.balances': 'Balances',
    'page.header.navbar.orders': 'Orders',

    'page.header.navbar.kyc': 'KYC',

    'page.body.subscriptions.unsubscribe.modal.confirmation': 'Are you sure you want to unsubscribe ?',
    'page.body.subscriptions.unsubscribe.modal.button.dismiss': 'Cancel',
    'page.body.subscriptions.unsubscribe.modal.button.accept': 'Unsubscribe',

    'page.body.trade.header.pin': 'Favorites',
    'page.body.trade.header.markets.content.name': 'Name',
    'page.body.trade.header.markets.content.last': 'Last',
    'page.body.trade.header.markets.content.24h': '24h',
    'page.body.trade.header.markets.content.currency': 'Vol',

    'page.body.trade.header.orderbook': 'Order Book',
    'page.body.trade.orderbook.header.volume': 'Size',

    'page.body.trade.header.recentTrades': 'Market Trades',

    'page.body.trade.header.openOrders.content.pair': 'Pair',
    'page.body.trade.header.openOrders.content.type': 'Type',
    'page.body.trade.header.openOrders.content.side': 'Side',
    'page.body.trade.header.openOrders.content.action': 'Action',
    'page.body.trade.header.openOrders.content.state.wait': 'wait',
    'page.body.trade.header.openOrders.content.total': 'Total',
    'page.body.trade.header.openOrders.content.filled': 'Filled%',
    'page.body.trade.header.openOrders.content.ask': 'Ask',
    'page.body.trade.header.openOrders.content.bid': 'Bid',
    'page.body.trade.header.openOrders.content.sl': 'S/L',
    'page.body.trade.header.openOrders.content.tp': 'TP',
    'page.body.trade.header.openOrders.content.cancel': 'Cancel',
    'page.body.trade.header.openOrders.content.cancelAll': 'Cancel All',

    'page.body.wallets.tabs.deposit.ccy.message.success': 'Address copied',

    'page.body.trade.header.tradeHistory': 'Trade History',

    'page.body.trade.header.funds': 'Funds',
    'page.body.trade.header.funds.content.coin': 'Coin',
    'page.body.trade.header.funds.content.total': 'Total Balance',
    'page.body.trade.header.funds.content.available': 'Available Balance',
    'page.body.trade.header.funds.content.inOrder': 'In order',
    'page.body.trade.header.funds.content.value': 'Value',

    'page.header.wallets': 'Confirm',
    'page.body.trade.market.info.content.vol': 'Vol',
    'page.body.trade.market.info.content.high': 'High',
    'page.body.trade.market.info.content.low': 'Low',

    'page.body.markets.favorites': 'Favorites',
    'page.body.markets.all': 'All',
    'page.body.markets.main': 'Main',
    'page.body.markets.topPerformances': 'Top Performances',
    'page.body.markets.newestListed': 'Newest Listed',
    'page.body.markets.table.sort.pair': 'Pair',
    'page.body.markets.table.sort.lastPrice': 'Last Price',
    'page.body.markets.table.sort.high': 'High',
    'page.body.markets.table.sort.low': 'Low',
    'page.body.markets.table.sort.vol': '24 Vol',
    'page.body.markets.table.sort.change': 'Change',

    'page.body.wallets.deposit': 'Deposit',
    'page.body.wallets.deposit.ccy.message.submit': 'Submit a deposit using the following address or QR code. Your deposit will be reflected in your account after 6 confirmations',
    'page.body.wallets.deposit.ccy.message.address': 'Deposit Address',
    'page.body.wallets.deposit.ccy.message.button': 'COPY',
    'page.body.wallets.deposit.ccy.message.success': 'Address copied',
    'page.body.wallets.deposit.ccy.message.error': 'Generating deposit address',
    'page.body.wallets.deposit.ccy.title.first': 'Deposit Address',
    'page.body.wallets.deposit.ccy.title.second': 'View Deposit History to track status',
    'page.body.wallets.deposit.ccy.title.third': 'Tips',
    'page.body.wallets.deposit.ccy.list.item.first.part.one': 'Please don’t deposit any other digital assets except',
    'page.body.wallets.deposit.ccy.list.item.first.part.two': 'to the above address, or you will loose your assets permanently.',
    'page.body.wallets.deposit.ccy.list.item.second': 'Depositing the above address requires confirmations of the entire network, and it will be available to withdraw after enough confirmations',
    'page.body.wallets.deposit.ccy.list.item.third.part.one': 'Minimum deposit amount:',
    'page.body.wallets.deposit.ccy.list.item.third.part.two': '. Any deposits less than minimum will not be credited or refunded.',
    'page.body.wallets.deposit.ccy.list.item.fourth': 'Your deposit address won’t change often. If there are any changes, we will notify you via announcement or email.',
    'page.body.wallets.deposit.ccy.list.item.fifth': 'Please make sure that your computer and browser are secure and your information is protected from tampered or leaked.',
    'page.body.wallets.deposit.usdt.message1': 'Only ERC20 USDT token is supported. Do not deposit OMNI version to this wallet.',
    'page.body.wallets.withdraw.usdt.message1': 'This is ERC20 USDT token - do not withdraw to OMNI wallet!',

    'page.body.wallets.deposit.fiat.message1': 'Deposit using bank transfer',
    'page.body.wallets.deposit.fiat.message2': 'Please use the following credentials to initiate your bank transfer. Your deposit will be reflected in your account within 2 business days.',
    'page.body.wallets.deposit.fiat.bankName': 'Bank Name',
    'page.body.wallets.deposit.fiat.accountNumber': 'Account number',
    'page.body.wallets.deposit.fiat.accountName': 'Account name',
    'page.body.wallets.deposit.fiat.phoneNumber': 'Phone Number',
    'page.body.wallets.deposit.fiat.referenceCode': 'Your reference code',
    'page.body.wallets.table.pending': 'Pending',
    'page.body.wallets.deposit.fiat.admin': ' To initiate a fiat withdrawal, please contact administrator!',

    'page.body.wallets.withdraw': 'Withdraw',
    'page.body.wallets.withdraw.content.address': 'Address',
    'page.body.wallets.withdraw.content.amount': 'Amount',
    'page.body.wallets.withdraw.content.available': 'Available:',
    'page.body.wallets.withdraw.content.button': 'Withdraw',
    'page.body.wallets.withdraw.content.code2fa': '2FA code',
    'page.body.wallets.withdraw.content.fee': 'Fee',
    'page.body.wallets.withdraw.content.increaseLimit': 'Increase limit',
    'page.body.wallets.withdraw.content.limit': 'Limit:',
    'page.body.wallets.withdraw.content.list.first': 'To ensure the safety of your funds, your withdrawal request will be manually reviewed if your security strategy or password is changed. Please wait for phone calls or emails from our staff.',
    'page.body.wallets.withdraw.content.list.second': 'Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked.',
    'page.body.wallets.withdraw.content.title': 'Tips',
    'page.body.wallets.withdraw.content.total': 'Recieve Amount',

    'page.body.wallets.withdraw.modal.confirmation': 'Confirmation',
    'page.body.wallets.withdraw.modal.message1': 'You will receive ',
    'page.body.wallets.withdraw.modal.message2': ' on address',
    'page.body.wallets.withdraw.modal.button.cancel': 'Cancel',
    'page.body.wallets.withdraw.modal.button.withdraw': 'Withdraw',

    'page.body.wallets.withdraw.content.enable2fa': 'To withdraw you have to enable 2FA',
    'page.body.wallets.withdraw.content.enable2faButton': 'Enable 2FA',

    'page.body.openOrders.tab.all': 'All Orders',
    'page.body.openOrders.tab.open': 'Open Orders',
    'page.body.openOrders.header.orderType': 'Order Type',
    'page.body.openOrders.header.orderType.buy.market': 'Buy/Market',
    'page.body.openOrders.header.orderType.buy.limit': 'Buy/Limit',
    'page.body.openOrders.header.orderType.sell.market': 'Sell/Market',
    'page.body.openOrders.header.orderType.sell.limit': 'Sell/Limit',
    'page.body.openOrders.content.status.done': 'Filled',
    'page.body.openOrders.content.status.cancel': 'Canceled',
    'page.body.openOrders.header.button.cancelAll': 'Cancel all',

    'page.body.history.deposit.header.txid': 'TxId',

    'page.body.history.withdraw': 'Withdraw History',

    'page.body.profile.header.account': 'Basic Information',

    'page.body.profile.header.account.content.email': 'Account email',

    'page.body.profile.header.account.content.twoFactorAuthentication': 'Two-factor authentication',
    'page.body.profile.header.account.content.twoFactorAuthentication.header': 'Enable 2FA',
    'page.body.profile.header.account.content.twoFactorAuthentication.subHeader': '2FA code',
    'page.body.profile.header.account.content.twoFactorAuthentication.enable': 'ENABLE 2FA',
    'page.body.profile.header.account.content.twoFactorAuthentication.info': 'Save this secret code in a secure location. This code can be used to gain 2FA access from a different device.',

    'page.body.profile.header.account.profile.email.message.enabled': 'Deposit enabled',
    'page.body.profile.header.account.profile.limitWithdraw': 'Limit withdraw per 24h: 2 BTC',
    'page.body.profile.header.account.profile.limitWithdraw.identity': 'Limit withdraw per 24h: 25 BTC',
    'page.body.profile.header.account.profile.email.message.disabled': 'Deposit disabled',
    'page.body.profile.header.account.profile.phone.unverified.title': 'Phone not verified',
    'page.body.profile.header.account.profile.phone.message.enabled': 'Trade enabled',
    'page.body.profile.header.account.profile.phone.message.disabled': 'Trade disabled',
    'page.body.profile.header.account.profile.identity.unverified.title': 'Identity not verified',
    'page.body.profile.header.account.profile.identity.message.enabled': 'Withdraw enabled',
    'page.body.profile.header.account.profile.identity.message.disabled': 'Withdraw disabled',

    'page.body.profile.apiKeys.modal.label': '2FA Code',
    'page.body.profile.apiKeys.modal.placeholder': 'Enter code from the app',

    'page.body.profile.content.action.passwordChange': 'Password change',
    'page.body.kyc.phone.enterCode': 'Enter SMS code',
    'page.body.kyc.identity.dateOfBirth': 'Date of Birth',
    'page.body.kyc.identity.nationality': 'Select Nationality',
    'page.body.kyc.identity.day': 'Day',
    'page.body.kyc.identity.month': 'Month',
    'page.body.kyc.identity.year': 'Year',
    'page.body.kyc.documents.selectIdType': 'Select ID Type',
    'page.body.kyc.documents.expiryDate': 'Expiration Date',
    'page.body.kyc.documents.dateType': 'DD/MM/YYYY',
    'page.body.kyc.documents.idNumber': 'ID Number',
    'page.body.kyc.documents.idType': 'ID Type',

    'page.body.kyc.head.phone': '1. Phone Verification',
    'page.body.kyc.head.identity': '2. Identity Verification',
    'page.body.kyc.head.document': '3. Document Verification',

    'page.footer.language': 'Language',

    'page.header.signIn': 'Login',
    'page.header.signIn.resetPassword.title': 'New password',
    'page.header.signIn.resetPassword.button': 'Submit',
    'page.header.signIn.createAccount': 'Create an account?',

    'page.header.signUp': 'Register',
    'page.header.signUp.email': 'Email Account',
    'page.header.signUp.modal.header': 'Email verification',
    'page.header.signUp.modal.body': 'To complete your registration, check for an email' +
                                     ' in your inbox with further instruction. If you ' +
                                     'cannot find the email, please check your spam folder',

    'page.forgotPassword': 'Reset password',
    'page.forgotPassword.message': 'Account',
    'page.password2fa.inputText': '2FA code',
    'page.forgotPassword.send': 'Submit',

    // success messages
    'success.withdraw.action': 'Withdraw request was received',

    // error messages
    'totp.error': 'OTP code is invalid',

    ...monthsNames,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/translations/en.ts
