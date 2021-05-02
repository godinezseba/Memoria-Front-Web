import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const propTypes = {
  handleSubmit: PropTypes.func,
  handleBack: PropTypes.func,
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
  }),
}

const defaultProps = {
  handleSubmit: () => {},
  handleBack: () => {},
  classes: {},
}

export default function LoadFile({ classes, handleSubmit, handleBack }) {
  return (
    <div className={classes.buttons}>
      <Button onClick={handleBack} className={classes.button}>
        Atras
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}
        className={classes.button}
      >
        Siguiente
      </Button>
    </div>
  );
}

LoadFile.propTypes = propTypes;
LoadFile.defaultProps = defaultProps;
