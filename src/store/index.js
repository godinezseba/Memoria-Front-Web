import makeStore from './makeStore';

export const initialState = {
  company: {
    isLoading: false,
    isError: false,
    one: {},
    many: [],  
  },
  user: {
    isLoading: false,
    user: {},
  }
};

export default makeStore();
