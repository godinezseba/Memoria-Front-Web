import Store from '.';
import { companiesService } from '$services';

export default function useCompany() {
  const [{ company }, setState] = Store.useStore();

  const getAll = () => {
    setState(draft => {
      draft.company.isLoading = true;
    });
    return companiesService.getAll()
      .then(({ data }) => {
        setState(draft => {
          draft.company.many = data;
          draft.company.isLoading = false;
        });
      });
  };

  const create = (newCompany) => {
    setState(draft => {
      draft.company.isLoading = true;
    });
    return companiesService.create(newCompany)
      .then(({ data }) => {
        const newCompanies = [...company.many, data];
        setState(draft => {
          draft.company.many = newCompanies;
          draft.company.isLoading = false;
        });
      });
  }

  return [
    company,
    {
      getAll,
      create,
    }
  ];
}
