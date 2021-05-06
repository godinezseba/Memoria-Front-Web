import makeStore from '../utils/makeStore';

export const initialState = {
  company: {
    isLoading: false,
    isError: false,
    one: {},
    many: [],  
  },
};

export default makeStore();
