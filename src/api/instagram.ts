import {
  GetNewsResponse,
  GetTimelineResponse,
  GetUserFeedResponse,
  GetUserInfoResponse,
  SignInResponse,
} from 'instagram-private-api';

const { ipcRenderer } = window;

export const signIn = async (
  username: string,
  password: string
): Promise<SignInResponse> => {
  const res = await ipcRenderer.callMain('sign-in', { username, password });
  return res;
};

export const getUserInfo = async (
  userPk: number
): Promise<GetUserInfoResponse> => {
  const res = await ipcRenderer.callMain('get-user-info', userPk);
  return res;
};

export const getUserPosts = async (
  userPk: number
): Promise<GetUserFeedResponse> => {
  const res = await ipcRenderer.callMain('get-user-posts', userPk);
  return res;
};

export const getTimeline = async (): Promise<GetTimelineResponse> => {
  const res = await ipcRenderer.callMain('get-timeline');
  return res;
};

export const getNews = async (): Promise<GetNewsResponse> => {
  const res = await ipcRenderer.callMain('get-news');
  return res;
};

export const likeMedia = async (
  userPk: number,
  username: string,
  mediaId: string
): Promise<void> => {
  await ipcRenderer.callMain('like-post', { userPk, username, mediaId });
};

export const unlikeMedia = async (
  userPk: number,
  username: string,
  mediaId: string
): Promise<void> => {
  await ipcRenderer.callMain('unlike-post', { userPk, username, mediaId });
};
