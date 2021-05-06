import Store from '.';
import { companiesService } from '../services';

export default function useCompany() {
  const [{ company }, setState] = Store.useStore();

  const getAll = () => {
    setState(draft => {
      draft.company.isLoading = true;
    });
    return companiesService.getAll()
      .then((response) => {
        setState(draft => {
          draft.company.many = response;
          draft.company.isLoading = false;
        });
      });
  };

  const create = () => {
    setState(draft => {
      draft.company.isLoading = true;
    });
    return companiesService.create()
      .then((response) => {
        const newCompanies = company.map((companyValue) => companyValue.id === response.id ? response : companyValue)
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
