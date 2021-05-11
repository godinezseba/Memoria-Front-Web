import Store from '.';
import { usersService } from '../services';

export default function useUser() {
  const [{ user }, setState] = Store.useStore();

  const getDataByToken = async ({ token = '' }) => {
    await usersService.getUser({ token })
      .then((response) => {
        const {
          email,
          family_name: familyName,
          given_name: givenName,
        } = response;
        setState(draft => {
          const { user: { user } } = draft;
          draft.user.isLoading = false;
          draft.user.user = {
            ...user,
            email,
            familyName,
            givenName,
          };
        });
      });
    return usersService.getUserValues({ token })
      .then((response) => console.log(response));
  }

  const getByAppID = () => {
    setState(draft => {
      draft.user.isLoading = true;
    });
    return usersService.AppIDLogin()
      .then((response) => {
        console.log(response)
        const { accessToken } = response;
        setState(draft => {
          draft.user.isLoading = false;
          draft.user.user = {
            token: accessToken,
            createdAt: Date.now(),
          };
        });
        window.localStorage.setItem('userToken', accessToken);
        return accessToken;
      })
      .then((token) => getDataByToken({ token }))
      .catch((err) => console.log(err));
  };

  return [
    user,
    {
      getByAppID,
      getDataByToken,
    }
  ];
}
