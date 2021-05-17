import React, { useMemo, useContext, createContext } from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.shape({}).isRequired,
}

export default function makeStore() {
  const context = createContext();

  const Provider = ({ children, initialState }) => {
    const [state, setState] = useImmer(initialState);

    const contextValue = useMemo(() => [state, setState], [state]);

    return <context.Provider value={contextValue}>{children}</context.Provider>
  };

  Provider.propTypes = propTypes;

  const useStore = () => useContext(context);

  return {
    Provider,
    useStore,
  }
}
