import { ipcMain } from 'electron-better-ipc';
import { IgApiClient } from 'instagram-private-api';

interface userInfo {
  username: string
  password: string
}

const ig = new IgApiClient();
let userFeed = null;

ipcMain.answerRenderer('sign-in', async (data: userInfo) => {
  const { username, password } = data;
  ig.state.generateDevice(username);
  await ig.simulate.preLoginFlow();
  const user = await ig.account.login(username, password);
  await ig.simulate.postLoginFlow();
  return user;
});

ipcMain.answerRenderer('get-user-info', async (userPk: string) => {
  return await ig.user.info(userPk);
});
