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
    isError: false,
    many: {},
    one: {},
  }
};

export default makeStore();
