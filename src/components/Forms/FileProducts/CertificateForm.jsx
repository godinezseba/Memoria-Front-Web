import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray } from 'formik';
import { Typography, Button } from '@material-ui/core';

const propTypes = {
  handleSubmit: PropTypes.func,
  handleBack: PropTypes.func,
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
  }),
  initialValues: PropTypes.shape({
    files: PropTypes.arrayOf(PropTypes.shape({})),
  }),
}

const defaultProps = {
  handleSubmit: () => {},
  handleBack: () => {},
  classes: {},
  initialValues: {
    files: [],
  },
}

export default function CertificateForm(props) {
  const {
    initialValues,
    handleSubmit,
    handleBack,
    classes,
  } = props;

  return(
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
      }) => {
        const handleAddFile = (event) => {
          setFieldValue('files', [...values.files, ...Array.from(event.currentTarget.files)]);
        };
        return (
          <Form>
            <Typography variant="h6" gutterBottom>
              Acreditación de la Información
            </Typography>
            <Typography variant="body2" align="center" paragraph>
              ¿Los datos de estos productos estan acreditados? Agrega los archivos correspondientes
              para que los usuarios puedan corroborar la veracidad de los datos.
            </Typography>
            <Button
              id="file"
              name="file"
              component="label"
              color="secondary"
              variant="outlined"
            >
              Agregar
              <input type="file" onChange={handleAddFile} hidden multiple/>
            </Button>
            <FieldArray name="files">
              {({ remove }) => (
                <>
                  {values.files?.map((certificate, key) => {
                    const keyName = `${certificate.name}-${key}`;
                    return (
                      <h1 key={keyName}>{certificate.name}</h1>
                    );
                  })}
                </>
              )}
            </FieldArray>
            <div className={classes.buttons}>
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
        );
      }}
    </Formik>
  );
}

CertificateForm.propTypes = propTypes;
CertificateForm.defaultProps = defaultProps;
