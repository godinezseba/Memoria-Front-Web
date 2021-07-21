import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

export default function UserForm(props) {
  const {
    initialValues,
    handleSubmit,
    companies,
    certifiers,
  } = props;

  const classes = useStyles();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit({ variables: { values } })
          .finally(() => setSubmitting(false));
      }}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        isSubmitting,
      }) => {
        // set the array to show
        const getCompanyTypeArray = () => values.companyType === 'company' ? companies : certifiers;

        // because we only save the id, we need to generate an array with all the info
        const getCompaniesThatCanBeEdit = () =>
          companies.filter(({ id }) =>
            values.editableCompanies.includes(id));

        // only get the ids
        const setCompaniesThatCanBeEdit = (e, value) =>
          setFieldValue('editableCompanies', value.map((option) => option.id));

        return (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Información básica del Usuario
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Nombre"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Primer Apellido"
                  fullWidth
                  value={values.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Correo Electronico"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} />
              <Grid item xs={12}>
                <Typography variant="h6">
                  Sobre su rol
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="companyType-label" required>Rubro donde trabaja</InputLabel>
                  <Select
                    required
                    labelId="companyType"
                    id="companyType"
                    name="companyType"
                    label="Rubro donde trabaja"
                    value={values.companyType}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="company">Productora de Alimentos</MenuItem>
                    <MenuItem value="certifier">Certificadora de Datos</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  id="companyId"
                  name="companyId"
                  value={getCompanyTypeArray().find((option) => option.id === values.companyId)}
                  options={getCompanyTypeArray()}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => setFieldValue('companyId', value.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="companyId-textField"
                      name="companyId-textField"
                      variant="standard"
                      label="Empresa donde trabaja"
                      placeholder="Favorites"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  multiple
                  id="editableCompanies"
                  name="editableCompanies"
                  options={companies}
                  value={getCompaniesThatCanBeEdit()}
                  onChange={setCompaniesThatCanBeEdit}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="editableCompanies-textField"
                      name="editableCompanies-textField"
                      variant="standard"
                      label="Empresas que puede editar"
                      placeholder="Empresas"
                    />
                  )}
                />
              </Grid>
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
        )
      }}
    </Formik>
  );
}

UserForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    companyType: PropTypes.string,
    companyId: PropTypes.shape({}),
    editableCompanies: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  companies: PropTypes.arrayOf(PropTypes.shape({})),
  certifiers: PropTypes.arrayOf(PropTypes.shape({})),
  handleSubmit: PropTypes.func,
}

UserForm.defaultProps = {
  initialValues: {
    editableCompanies: [],
    companyId: {},
  },
  companies: [],
  certifiers: [],
  handleSubmit: () => { },
}
