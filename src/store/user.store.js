import Store from '.';
import { usersService } from '$services';

export default function useUser() {
  const [{ user }, setState] = Store.useStore();

  const create = (values) => {
    setState(draft => {
      draft.user.isLoading = true;
    });
    return usersService.create(values)
      .then(({ data }) => {
        setState(draft => {
          draft.company.one = data;
          draft.company.isLoading = false;
        });
      });
  }

  return [
    user,
    {
      create,
    }
  ];
}
