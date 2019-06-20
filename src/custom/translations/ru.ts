import { LangType } from '.';
import { languageMap } from '../../translations';
import { monthsNames } from './months';

export const ru: LangType = {
    ...languageMap.ru,
    'page.header.navbar.home': 'Главная',
    'page.header.navbar.markets': 'Рынок',
    'page.header.navbar.exchange': 'Биржа',
    'page.header.navbar.signUp': 'Зарегистрироваться',
    'page.header.navbar.signUp.title': 'Создайте свой аккаунт',
    'page.header.navbar.signUp.invationCode': 'Есть код приглашения?',
    'page.header.navbar.signUp.agreement': 'Нажимая «Зарегистрироваться», вы соглашаетесь с',
    'page.header.navbar.signUp.termsAndConditions': 'Условиями использования',
    'page.header.navbar.register': 'Зарегистрироваться',
    'page.header.navbar.balances': 'Кошельки',
    'page.header.navbar.orders': 'Ордера',
    'page.header.navbar.social': 'Социальные',
    'page.header.navbar.leaderboards': 'Лидеры',
    'page.header.navbar.subscriptions': 'Подписки',
    'page.header.navbar.myProfile': 'Мой Профиль',

    'page.header.navbar.kyc': 'Верификация',

    'page.body.subscriptions.unsubscribe.modal.confirmation': 'Вы уверенны что хотите отписаться ?',
    'page.body.subscriptions.unsubscribe.modal.button.dismiss': 'Отменить',
    'page.body.subscriptions.unsubscribe.modal.button.accept': 'Отписаться',

    'page.body.trade.header.pin': 'Рынки',
    'page.body.trade.header.markets.content.name': 'Рыночная пара',
    'page.body.trade.header.markets.content.last': 'Последние',
    'page.body.trade.header.markets.content.24h': 'Изменение цены за 24ч',
    'page.body.trade.header.markets.content.currency': 'Vol',

    'page.body.trade.header.newOrder': 'Создать новую сделку',
    'page.body.trade.header.newOrder.content.orderType': 'Тип запроса',
    'page.body.trade.header.newOrder.content.estimatedFee': 'Расчетная плата',

    'page.body.trade.header.asks': 'Запросы на продажу',
    'page.body.trade.header.bids': 'Запросы на покупку',
    'page.body.trade.header.orderbook': 'Запросы на сделку',
    'page.body.trade.orderbook.header.volume': 'Размер',

    'page.body.trade.header.recentTrades': 'Последние завершенные сделки ',

    'page.body.trade.header.openOrders': 'Активные запросы на сделку',
    'page.body.trade.header.openOrders.content.action': 'Действие',
    'page.body.trade.header.openOrders.content.state.wait': 'Ожидается',
    'page.body.trade.header.openOrders.content.ask': 'Запрошено',
    'page.body.trade.header.openOrders.content.bid': 'Предложено',
    'page.body.trade.header.openOrders.content.cancel': 'Cancel',
    'page.body.trade.header.openOrders.content.cancelAll': 'Cancel All',

    'page.body.wallets.tabs.deposit.ccy.message.success': 'Адрес скопирован',

    'page.body.trade.header.tradeHistory': 'Trade History',

    'page.body.trade.header.funds': 'Funds',
    'page.body.trade.header.funds.content.coin': 'Coin',
    'page.body.trade.header.funds.content.total': 'Total Balance',
    'page.body.trade.header.funds.content.available': 'Available Balance',
    'page.body.trade.header.funds.content.inOrder': 'In order',
    'page.body.trade.header.funds.content.value': 'Value',

    'page.header.wallets': 'Подтвердить',
    'page.body.trade.market.info.content.vol': 'Vol',
    'page.body.trade.market.info.content.high': 'High',
    'page.body.trade.market.info.content.low': 'Low',

    'page.body.markets.favorites': 'Фавориты',
    'page.body.markets.all': 'Все',
    'page.body.markets.main': 'Главные',
    'page.body.markets.topPerformances': 'Эффективные',
    'page.body.markets.newestListed': 'Новые',
    'page.body.markets.table.sort.pair': 'Пара',
    'page.body.markets.table.sort.lastPrice': 'Цена',
    'page.body.markets.table.sort.high': 'Макс.',
    'page.body.markets.table.sort.low': 'Мин.',
    'page.body.markets.table.sort.vol': '24 Объём',
    'page.body.markets.table.sort.change': 'Изменение',

    'page.body.wallets.locked': 'Зафиксировано',
    'page.body.wallets.deposit': 'Пополнить',
    'page.body.wallets.deposit.ccy.message.submit': 'Пожалуйста, внесите депозитный платеж. Ваш депозит будет доступен после 6 подтверждений',
    'page.body.wallets.deposit.ccy.message.address': 'Пополнить на кошелек',
    'page.body.wallets.deposit.ccy.message.button': 'Скопировать',
    'page.body.wallets.deposit.ccy.message.success': 'Адрес скопирован',
    'page.body.wallets.deposit.ccy.title.first': 'Deposit Address',
    'page.body.wallets.deposit.ccy.title.second': 'View Deposit History to track status',
    'page.body.wallets.deposit.ccy.title.third': 'Подсказки',
    'page.body.wallets.deposit.ccy.list.item.first.part.one': 'Please don’t deposit any other digital assets except',
    'page.body.wallets.deposit.ccy.list.item.first.part.two': 'to the above address, or you will loose your assets permanently.',
    'page.body.wallets.deposit.ccy.list.item.second': 'Depositing the above address requires confirmations of the entire network, and it will be available to withdraw after enough confirmations',
    'page.body.wallets.deposit.ccy.list.item.third.part.one': 'Minimum deposit amount:',
    'page.body.wallets.deposit.ccy.list.item.third.part.two': '. Any deposits less than minimum will not be credited or refunded.',
    'page.body.wallets.deposit.ccy.list.item.fourth': 'Your deposit address won’t change often. If there are any changes, we will notify you via announcement or email.',
    'page.body.wallets.deposit.ccy.list.item.fifth': 'Please make sure that your computer and browser are secure and your information is protected from tampered or leaked.',
    'page.body.wallets.deposit.usdt.message1': 'Only ERC20 USDT token is supported. Do not deposit OMNI version to this wallet.',
    'page.body.wallets.withdraw.usdt.message1': 'This is ERC20 USDT token - do not withdraw to OMNI wallet!',

    'page.body.wallets.deposit.ccy.message.error': 'Генерация адреса',

    'page.body.wallets.deposit.fiat.message1': 'Вы можете внести депозит в банке, используя следующие реквизиты',
    'page.body.wallets.deposit.fiat.message2': 'Пожалуйста, используйте предоставленную информацию для завершения банковского платежа. Ваш депозит станет доступным на протяжении 2х рабочих дней.',
    'page.body.wallets.deposit.fiat.bankName': 'Название банка',
    'page.body.wallets.deposit.fiat.accountNumber': 'Номер счета',
    'page.body.wallets.deposit.fiat.accountName': 'Имя счета',
    'page.body.wallets.deposit.fiat.phoneNumber': 'Номер телефона',
    'page.body.wallets.deposit.fiat.referenceCode': 'Ваш ссылочный код',
    'page.body.wallets.deposit.fiat.admin': 'Для того, чтобы вывести эту валюту, обратитесь к администратору!',

    'page.body.wallets.withdraw': 'Вывод',
    'page.body.wallets.withdraw.content.address': 'Адрес',
    'page.body.wallets.withdraw.content.amount': 'Сумма',
    'page.body.wallets.withdraw.content.available': 'Доступно:',
    'page.body.wallets.withdraw.content.button': 'Вывести',
    'page.body.wallets.withdraw.content.code2fa': '6-ти значный GAuthenticator код',
    'page.body.wallets.withdraw.content.fee': 'Налог',
    'page.body.wallets.withdraw.content.increaseLimit': 'Повысить лимит',
    'page.body.wallets.withdraw.content.limit': 'Лимит:',
    'page.body.wallets.withdraw.content.list.first': 'To ensure the safety of your funds, your withdrawal request will be manually reviewed if your security strategy or password is changed. Please wait for phone calls or emails from our staff.',
    'page.body.wallets.withdraw.content.list.second': 'Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked.',
    'page.body.wallets.withdraw.content.title': 'Подсказки',
    'page.body.wallets.withdraw.content.total': 'Общая сумма вывода',

    'page.body.wallets.withdraw.modal.confirmation': 'Подтверждение',
    'page.body.wallets.withdraw.modal.message1': 'Вы выводите ',
    'page.body.wallets.withdraw.modal.message2': ' на кошелек',
    'page.body.wallets.withdraw.modal.button.cancel': 'Отменить',
    'page.body.wallets.withdraw.modal.button.withdraw': 'Вывести',

    'page.body.wallets.withdraw.content.enable2fa': 'Вам нужно активировать 2FA, чтобы получить возможность выводить Ваши валюты!',
    'page.body.wallets.withdraw.content.enable2faButton': 'Активировать 2FA',

    'page.body.openOrders.header.orderType': 'Тип сделаки',
    'page.body.openOrders.header.orderType.buy.market': 'Купить / Рынок',
    'page.body.openOrders.header.orderType.buy.limit': 'Купить / Лимит',
    'page.body.openOrders.header.orderType.sell.market': 'Продать / Рынок',
    'page.body.openOrders.header.orderType.sell.limit': 'Продать / Лимит',
    'page.body.openOrders.header.pair': 'Рыночная пара',
    'page.body.openOrders.header.executed': 'Выполнено',
    'page.body.openOrders.content.status.done': 'Совершен',
    'page.body.openOrders.content.status.wait': 'Ожидание',

    'page.body.history.deposit.header.txid': 'TxId',
    'page.body.trade.header.openOrders.content.pair': 'Pair',
    'page.body.trade.header.openOrders.content.type': 'Type',
    'page.body.trade.header.openOrders.content.side': 'Side',
    'page.body.history.deposit.content.status.collected': 'Собран',
    'page.body.trade.header.openOrders.content.sl': 'S/L',
    'page.body.trade.header.openOrders.content.tp': 'TP',

    'page.body.history.withdraw.header.address': 'Адресс',
    'page.body.history.withdraw.header.fee': 'Налог',
    'page.body.history.withdraw.content.status.succeed': 'Успешно',
    'page.body.history.withdraw.content.status.failed': 'Неуспешно',
    'page.body.history.withdraw.content.status.confirming': 'Подверждается',

    'page.body.history.trade': 'История сделок',
    'page.body.history.trade.header.side': 'Сторона',

    'page.body.history.trade.content.side.buy': 'Купить',
    'page.body.history.trade.content.side.sell': 'Продать',

    'page.body.history.trade.header.funds': 'Капитал',

    'page.body.profile.header.account.content.email': 'Электронная почта',
    'page.body.profile.header.account.content.password.change.success': 'Успех!',

    'page.body.profile.header.account.content.twoFactorAuthentication.header': 'Включить двухфакторную аутентификацию',
    'page.body.profile.header.account.content.twoFactorAuthentication.enable': 'ВКЛЮЧИТЬ 2FA',
    'page.body.profile.header.account.content.twoFactorAuthentication.disable': 'ОТКЛЮЧЕНА 2FA',
    'page.body.profile.header.account.content.twoFactorAuthentication.modalBody': 'Пожалуйста, обратитесь с администратором, чтобы отключить еe.',
    'page.body.profile.header.account.content.twoFactorAuthentication.modalHeader': 'Двухфакторная аутентификация включена.',
    'page.body.profile.header.account.content.twoFactorAuthentication.info': 'Это ваш секретный код, который можно использовать для получения доступа к Вашему ' +
                                                                              '2fa-коду с разных устройств и для восстановления доступа в случае потери вашего устройства. ' +
                                                                              'Обязательно сохраните код',

    'page.body.profile.header.account.profile.email.message.enabled': 'Депозит разрешен',
    'page.body.profile.header.account.profile.email.message.disabled': 'Депозит не разрешен',
    'page.body.profile.header.account.profile.limitWithdraw': 'Лимит вывода за 24ч: 2 BTC',
    'page.body.profile.header.account.profile.limitWithdraw.identity': 'Лимит вывода за 24ч: 25 BTC',
    'page.body.profile.header.account.profile.phone.message.enabled': 'Торги разрешены',
    'page.body.profile.header.account.profile.phone.message.disabled': 'Торги не разрешены',
    'page.body.profile.header.account.profile.identity.message.enabled': 'Вывод средств разрешен',
    'page.body.profile.header.account.profile.identity.message.disabled': 'Вывод средств не разрешен',

    'page.body.profile.apiKeys.header': 'My API Keys',
    'page.body.profile.apiKeys.header.create': 'Create new',

    'page.body.profile.apiKeys.noOtp': 'Please enable Two-factor authentication',
    'page.body.profile.apiKeys.show': 'Show',
    'page.body.profile.apiKeys.noKeys': 'You have no API keys',

    'page.body.profile.apiKeys.modal.btn.show': 'Show',
    'page.body.profile.apiKeys.modal.btn.create': 'Confirm',
    'page.body.profile.apiKeys.modal.btn.copy': 'Copy',
    'page.body.profile.apiKeys.modal.btn.activate': 'Activate',
    'page.body.profile.apiKeys.modal.btn.disabled': 'Disable',
    'page.body.profile.apiKeys.modal.btn.delete': 'Delete',
    'page.body.profile.apiKeys.modal.header': '2FA Verification',
    'page.body.profile.apiKeys.modal.created_header': 'Created',
    'page.body.profile.apiKeys.modal.access_key': 'Access Key',
    'page.body.profile.apiKeys.modal.secret_key': 'Secret Key',
    'page.body.profile.apiKeys.modal.secret_key_info': 'This information will be shown only once and cannot be retrieved once lost.',
    'page.body.profile.apiKeys.modal.secret_key_store': 'Please store it properly.',
    'page.body.profile.apiKeys.modal.note': 'Note',
    'page.body.profile.apiKeys.modal.note_content': `To avoid asset loss, please do not tell your Secret Key and Private Key to others.\
 If you forget you Secret Key, please delete it and apply for a new Secret Key pair.`,
    'page.body.profile.apiKeys.modal.title': 'Enter 2fa code from the app',
    'page.body.profile.apiKeys.modal.label': '6-digit Google Authenticator code',
    'page.body.profile.apiKeys.modal.placeholder': 'Enter Code',

    'page.body.profile.apiKeys.table.header.algorithm': 'Algorithm',
    'page.body.profile.apiKeys.table.header.state': 'State',
    'page.body.profile.apiKeys.table.header.created': 'Created',
    'page.body.profile.apiKeys.table.header.updated': 'Updated',

    'success.api_keys.fetched': 'Successfully fetched API keys',
    'success.api_keys.created': 'API key was created',
    'success.api_keys.copied.access': 'Access key was copied',
    'success.api_keys.copied.secret': 'Secret key was copied',
    'success.api_keys.updated': 'API key was updated',
    'success.api_keys.deleted': 'API key was deleted',

    'page.body.profile.header.accountActivity.content.userAgent': 'Пользовательский Агент',

    'page.body.profile.content.action.logout': 'Выход из системы',
    'page.body.profile.content.action.passwordChange': 'Смена пароля',

    'page.body.kyc.phone.head': 'Давайте проверим ваш телефон',
    'page.body.kyc.identity.dateOfBirth': 'Дата рождения',
    'page.body.kyc.identity.day': 'День',
    'page.body.kyc.identity.month': 'Месяц',
    'page.body.kyc.identity.year': 'Год',
    'page.body.kyc.documents.expiryDate': 'Действителен до',
    'page.body.kyc.documents.dateType': 'DD/MM/YYYY',
    'page.body.kyc.documents.idNumber': 'Номер документа',
    'page.body.kyc.documents.idType': 'Тип документа',
    'page.body.kyc.documents.selectIdType': 'Тип документа',
    'page.body.kyc.documents.maxFile': 'Максимальный размер 20MB',

    'page.body.kyc.documents.select.utilityBill': 'Счет за коммунальные услуги',

    'page.body.kyc.head.phone': '1. Верификация телефона',
    'page.body.kyc.head.identity': '2. Верификация личности',
    'page.body.kyc.head.document': '3. Верификация документов',

    'page.footer.language': 'Язык',

    'page.header.signIn.resetPassword.error': 'Fields are empty or don`t matches',
    'page.header.signIn.createAccount': 'Создать аккаунт?',

    'page.password2fa.inputText': '6-ти значный GAuthenticator код',

    'page.modal.withdraw.success': 'Успех!',

    // success messages
    'success.otp.enabled': '2фа успешно активирован',
    'success.password.forgot': 'Ссылка для спроса пароля была отправлена на вашу почту',
    'success.email.confirmed': 'Емейл был успешно подтвержден',

    // error messages
    // barong
    'totp.error': 'Код 2FA неверен',

    'account.withdraw.non_integer_otp': 'Значение Otp не может быть проанализировано в тип Integer',
    'account.withdraw.empty_otp': 'Оtp отсутствует, otp пуст',
    'account.deposit.not_permitted': 'Deposits allows after phone verification',
    'account.withdraw.invalid_otp': 'Неверный отп',

    ...monthsNames,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/translations/ru.ts
