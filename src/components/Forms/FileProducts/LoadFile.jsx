import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Button, makeStyles } from '@material-ui/core';

const propTypes = {
  handleSubmit: PropTypes.func,
  handleBack: PropTypes.func,
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
  }),
  initialValues: PropTypes.shape({
    file: PropTypes.shape({}),
  }),
}

const defaultProps = {
  handleSubmit: () => {},
  handleBack: () => {},
  classes: {},
  initialValues: {},
}

const useStyles = makeStyles((theme) => (
  {
    fileDropArea: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: '25px',
      border: `dashed ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      transition: '0.2s',
      margin: '2% 0',
      '&:focus': {
        backgroundColor: `rgba(${theme.palette.primary.main} 0.4)`,
      },
    },
    fakeButton: {
      flexShrink: 0,
      marginRight: theme.spacing(1),
      fontSize: '12px',
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
      '&:focus': {
        outline: 'none',
      },
    },
  }
));

export default function LoadFile(props) {
  const { classes, handleSubmit, handleBack, initialValues } = props;
  const internalClasses = useStyles();
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        setFieldValue,
      }) => (
        <Form>
          <div className={internalClasses.fileDropArea}>
            <Button
              variant="outlined"
              className={internalClasses.fakeButton}
            >
              Seleccione un archivo
            </Button>
            <span className={internalClasses.bottomText}>
              {values.file?.name || 'o arrastrelo y sueltelo hasta aquí.'}
            </span>
            <input
              id="file"
              name="file"
              className={internalClasses.fileInput}
              type="file"
              onChange={(event) => setFieldValue('file', event.currentTarget.files[0])}
            />
          </div>
          <div className={classes.buttons}>
            <Button onClick={handleBack} className={classes.button}>
              Atras
            </Button>
            <Button
              id="submit"
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Subir
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

LoadFile.propTypes = propTypes;
LoadFile.defaultProps = defaultProps;
