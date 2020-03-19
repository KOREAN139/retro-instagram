const { ipcRenderer } = window;

export const signIn = async (
  username: string,
  password: string
): Promise<number> => {
  const res = await ipcRenderer.callMain('sign-in', { username, password });
  return res.pk;
};

export const getUserInfo = async (
  userPk: number
): Promise<any> => {
  const res = await ipcRenderer.callMain('get-user-info', userPk);
  return res;
};
