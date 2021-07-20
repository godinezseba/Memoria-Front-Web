import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Button, makeStyles, Typography, LinearProgress } from '@material-ui/core';

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
  const [hasError, setHasError] = useState('');

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
          .catch(({ response: { data } }) => setHasError(data.message))
          .finally(() => setSubmitting(false));
      }}
    >
      {({
        values,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <div className={internalClasses.fileDropArea}>
            <Button
              variant="outlined"
              className={internalClasses.fakeButton}
            >
              Seleccione un archivo
            </Button>
            <Typography variant="caption">
              {values.file?.name || 'o arrastrelo y sueltelo hasta aquí.'}
            </Typography>
            <input
              id="file"
              name="file"
              className={internalClasses.fileInput}
              type="file"
              onChange={({ currentTarget }) => setFieldValue('file', currentTarget.files[0])}
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
              disabled={isSubmitting}
            >
              Subir
            </Button>
          </div>
          {hasError && (
            <Typography variant="body1" color="secondary">
              Error: {hasError}
            </Typography>
          )}
          {isSubmitting && (
            <LinearProgress />
          )}
        </Form>
      )}
    </Formik>
  );
}

LoadFile.propTypes = {
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

LoadFile.defaultProps = {
  handleSubmit: () => { },
  handleBack: () => { },
  classes: {},
  initialValues: {},
}
