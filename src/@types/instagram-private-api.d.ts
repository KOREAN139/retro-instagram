/* eslint-disable */
import * as Instagram from 'instagram-private-api';

declare module 'instagram-private-api' {
  type SignInResponse = Instagram.AccountRepositoryLoginResponseLogged_in_user;

  type GetUserInfoResponse = Instagram.UserRepositoryInfoResponseUser;

  interface GetUserFeedResponse {
    moreAvailable: boolean;
    posts: Instagram.UserFeedResponseItemsItem[];
  }

  interface GetTimelineResponse {
    moreAvailable: boolean;
    posts: Instagram.TimelineFeedResponseMedia_or_ad[];
  }

  type GetNewsResponse = Instagram.NewsRepositoryInboxResponseRootObject;
}
