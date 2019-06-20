export interface Config {
    api: {
        authUrl: string;
        tradeUrl: string;
        applogicUrl: string;
        rangerUrl: string;
    };
    minutesUntilAutoLogout: string;
    rangerReconnectPeriod: string;
    withCredentials: boolean;
    captcha: {
        captchaType: 'recaptcha' | 'geetest' | 'none';
        siteKey: string;
    };
    storage: {
        defaultStorageLimit?: number;
    };
    msAlertDisplayTime: string;
}

