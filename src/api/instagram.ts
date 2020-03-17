const { ipcRenderer } = window;

export const signIn = async (
  username: string,
  password: string
): Promise<void> => {
  const res = await ipcRenderer.callMain('sign-in', { username, password });
  console.log(res);
};
