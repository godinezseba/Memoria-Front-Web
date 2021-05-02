import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

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

const useStyles = makeStyles((theme) => ({
  fileDropArea: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  fakeButton: {
    flexShrink: 0,
    backgroundColor: 'red',
    border: '1px solid red',
    borderRadius: '3px',
    padding: '8px 15px',
    marginRight: '10px',
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  bottomText: {
    fontSize: 'small',
    fontWeight: 300,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  fileInput: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    opacity: 0,
  },
})); 

export default function LoadFile({ classes, handleSubmit, handleBack }) {
  const internalClasses = useStyles();
  return (
    <>
      <div className={internalClasses.fileDropArea}>
        <span className={internalClasses.fakeButton}>Seleccione un archivo</span>
        <span className={internalClasses.bottomText}>
          {/* {values.file ? values.file.name : 'o arrastrelo y sueltelo hasta aquí.'} */}
          hola mundo
        </span>
        <input
          id="file"
          name="file"
          className={internalClasses.fileInput}
          type="file"
          // onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
        />
      </div>
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
    </>
  );
}

LoadFile.propTypes = propTypes;
LoadFile.defaultProps = defaultProps;
