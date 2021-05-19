import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

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
    certificates,
  } = props;

  const classes = useStyles();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleSubmit(values)
          .then((value) => console.log(value))
          .catch((error) => console.log(error))
          .finally(() => actions.setSubmitting(false));
      }}
    >
      {({
        values,
        handleChange,
        setFieldValue,
      }) => {
        // set the array to show
        const getCompanyTypeArray = () => values.companyType === 'company' ? companies : certificates;

        // because we only save the id, we need to generate an array with all the info
        const getCompaniesThatCanBeEdit = () =>
          companies.filter(({ _id }) =>
            values.editableCompanies.includes(_id));

        // only get the ids
        const setCompaniesThatCanBeEdit = (e, value) =>
          setFieldValue('editableCompanies', value.map((option) => option._id));

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
              <Grid item xs={12} sm={6}/>
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
                  value={getCompanyTypeArray().find((option) => option._id === values.companyId)}
                  options={getCompanyTypeArray()}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => setFieldValue('companyId', value._id)}
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
  certificates: PropTypes.arrayOf(PropTypes.shape({})),
  handleSubmit: PropTypes.func,
}

UserForm.defaultProps = {
  initialValues: {
    editableCompanies: [],
    companyId: {},
  },
  companies: [],
  certificates: [],
  handleSubmit: () => {},
}
