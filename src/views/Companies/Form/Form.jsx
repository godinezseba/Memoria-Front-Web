import React, { Fragment } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray } from 'formik';

import { LoadingButton } from '$atoms';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function CompanyForm(props) {
  const {
    initialValues,
    handleSubmit,
  } = props;

  const classes = useStyles();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
          .finally(() => setSubmitting(false));
      }}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Información de la Empresa
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label="Empresa"
                fullWidth
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12}>
              <Typography variant="h6">
                Emisiones
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="carbonFootPrint"
                name="carbonFootPrint"
                label="Huella de Carbono"
                fullWidth
                value={values.carbonFootPrint}
                onChange={handleChange}
                helperText="Considere todos los gases emitidos durante todo el año."
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12}>
              <Typography variant="h6">
                Acciones
              </Typography>
              <Typography variant="body2" align="center" paragraph>
                A continuación ingrese las acciones que realiza la empresa para
                disminuir las distintas emisiones generadas.
              </Typography>
            </Grid>
            <FieldArray name="actions">
              {({ remove, push }) => (
                <>
                  <Grid item xs={12}>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => push({ name: '', description: '' })}
                    >
                      Agregar
                    </Button>
                  </Grid>
                  {values.actions?.map((action, key) => {
                    const { name, file, description } = action;
                    const actionKeyName = `${name}-${key}`;
                    return (
                      <Fragment key={actionKeyName}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id={`actions.${key}.name`}
                            name={`actions.${key}.name`}
                            label="Nombre"
                            fullWidth
                            value={name}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} justify="center" container>
                          {!file ? (
                            <Button component="label" variant="outlined" color="primary">
                              Adjuntar Archivo
                              <input
                                id={`actions.${key}.file`}
                                name={`actions.${key}.file`}
                                type="file"
                                value={file}
                                onChange={({ currentTarget }) => setFieldValue(`actions.${key}.file`, currentTarget.files[0])}
                                hidden
                              />
                            </Button>
                          ) : (
                            <Button component="label" variant="outlined" onClick={() => remove(key)}>
                              Eliminar Archivo
                            </Button>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id={`actions.${key}.description`}
                            name={`actions.${key}.description`}
                            label="Descripción"
                            fullWidth
                            value={description}
                            onChange={handleChange}
                            multiline
                          />
                        </Grid>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </FieldArray>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Acreditación de la Información
              </Typography>
              <Typography variant="body2" align="center" paragraph>
                ¿Los datos de sus productos estan acreditados? Agrega los archivos correspondientes
                para que los usuarios puedan corroborar la veracidad de los datos.
              </Typography>
            </Grid>
            <FieldArray name="certificates">
              {({ remove, push }) => (
                <>
                  <Grid item xs={12}>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => push({ name: '' })}
                    >
                      Agregar
                    </Button>
                  </Grid>
                  {values.certificates?.map((certificate, key) => {
                    const { name, file } = certificate;
                    const certificateKeyName = `${name}-${key}`;
                    return (
                      <Fragment key={certificateKeyName}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            id={`certificates.${key}.name`}
                            name={`certificates.${key}.name`}
                            label="Nombre"
                            fullWidth
                            value={name}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} justify="center" container>
                          {!file ? (
                            <Button component="label" variant="outlined" color="primary">
                              Adjuntar Archivo
                              <input
                                id={`certificates.${key}.file`}
                                name={`certificates.${key}.file`}
                                type="file"
                                value={file}
                                onChange={({ currentTarget }) => setFieldValue(`certificates.${key}.file`, currentTarget.files[0])}
                                hidden
                              />
                            </Button>
                          ) : (
                            <Button component="label" variant="outlined" onClick={() => remove(key)}>
                              Eliminar Archivo
                            </Button>
                          )}
                        </Grid>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </FieldArray>
            <Grid item xs={12}>
              <div className={classes.buttons}>
                <LoadingButton
                  id="submit"
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={isSubmitting}
                  className={classes.button}
                >
                  Subir
                </LoadingButton>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

CompanyForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    carbonFootPrint: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      file: PropTypes.shape({}),
      description: PropTypes.string,
    })),
    certificates: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      file: PropTypes.shape({}),
    }))
  }),
  handleSubmit: PropTypes.func,
}

CompanyForm.defaultProps = {
  initialValues: {
    name: '',
    carbonFootPrint: '',
    actions: [],
    certificates: [],
  },
  handleSubmit: () => { },
}
