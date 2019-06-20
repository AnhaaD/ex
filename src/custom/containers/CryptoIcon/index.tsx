import * as React from 'react';

import '@openware/cryptofont';
import cx from 'classnames';

interface CryptoIconProps {
    code: string;
    className?: string;
    customIcon?: React.ReactNode;
}

export const CR_CURRENCY_ICON_CLASS_NAME = 'cr-crypto-font';

const makeCryptoClass = (code: string) => `${CR_CURRENCY_ICON_CLASS_NAME}-${code}`;

const CryptoIcon: React.FunctionComponent<CryptoIconProps> = props => {
    const { code, className = '', customIcon } = props;
    const coins = [
        'AION',
        'AOA',
        'BAT',
        'BCH',
        'BTC',
        'DAI',
        'DASH',
        'ENJ',
        'EOS',
        'ETH',
        'HOT',
        'INB',
        'IOST',
        'LINK',
        'LTC',
        'MCO',
        'MKR',
        'NPXS',
        'NXT',
        'OMG',
        'PAX',
        'QBIT',
        'SNT',
        'STE',
        'THR',
        'USDC',
        'USDT',
        'WAX',
        'XIN',
        'XRP',
        'ZIL',
        'ZRX',
    ];
    return (
        <span className={!customIcon && coins.includes(code) ? cx('cr-crypto-icon--custom', className) : cx('cr-crypto-icon', className)}>
            {!customIcon && coins.includes(code) && <img src={require(`../../assets/images/crypto/${code}.svg`)}/>}
            {customIcon || !coins.includes(code) && <span className={makeCryptoClass(code)}> {customIcon}</span>}
        </span>
    );
};

export {
    CryptoIcon,
    CryptoIconProps,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/CryptoIcon/index.tsx
