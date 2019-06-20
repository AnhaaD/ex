export interface PostUserProfilePayloadInterface {
  upload?: any;
  nickname?: any;
  subscription_price?: string;
  facebook_url?: string;
  twitter_url?: string;
  telegram_url?: string;
}

export interface SocialUserMeInterface {
  incognito: any;
  nickname: any;
  facebook_url: any;
  twitter_url: any;
  telegram_url: any;
  subscription_price: any;
  country: any;
  image: any;
}

export interface SubscribedUserProfileInterface {
  nickname: any;
  country: any;
  subscribers: any;
  facebook_url: any;
  twitter_url: any;
  telegram_url: any;
  performances: any;
  recent_trades: any;
  portfolio: any;
  subscription_price: any;
}

