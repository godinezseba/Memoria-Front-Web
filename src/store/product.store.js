import Store from '.';
import { productsService } from '../services';

export default function useCompany() {
  const [{ product }, setState] = Store.useStore();

  const create = (newProducts) => {
    setState(draft => {
      draft.product.isLoading = true;
    });
    return productsService.create(newProducts)
      .then(({ data }) => {
        setState(draft => {
          draft.product.isLoading = false;
        });
        return data;
      });
  }

  return [
    product,
    {
      create,
    }
  ];
}
