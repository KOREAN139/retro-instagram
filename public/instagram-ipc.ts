import { ipcMain } from 'electron-better-ipc';
import { IgApiClient, UserFeed, TimelineFeed } from 'instagram-private-api';

interface userInfo {
  username: string
  password: string
}

const ig = new IgApiClient();
let userFeed: UserFeed | null = null;
let timelineFeed: TimelineFeed | null = null;

ipcMain.answerRenderer('sign-in', async (data: userInfo) => {
  const { username, password } = data;
  ig.state.generateDevice(username);
  await ig.simulate.preLoginFlow();
  const user = await ig.account.login(username, password);
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  return user;
});

ipcMain.answerRenderer('get-user-info', async (userPk: string) => {
  return await ig.user.info(userPk);
});

ipcMain.answerRenderer('get-user-posts', async (userPk: string) => {
  if (!userFeed) {
    userFeed = ig.feed.user(userPk);
  }

  const posts = await userFeed.items();
  const moreAvailable = userFeed.isMoreAvailable();
  return { moreAvailable, posts };
});

ipcMain.answerRenderer('get-timeline', async () => {
  if (!timelineFeed) {
    timelineFeed = ig.feed.timeline();
  }

  const posts = await timelineFeed.items();
  const moreAvailable = timelineFeed.isMoreAvailable();
  return { moreAvailable, posts };
});

ipcMain.answerRenderer('get-news', async () => {
  return await ig.news.inbox();
});
