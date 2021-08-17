import React from 'react';
import {
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

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
        isSubmitting,
      }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading size="lg">Información de la Certificadora</Heading>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label="Nombre"
                fullWidth
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
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
  }),
  handleSubmit: PropTypes.func,
}

CompanyForm.defaultProps = {
  initialValues: {
    name: '',
  },
  handleSubmit: () => { },
}
