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

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
];

export default function UserForm(props) {
  const {
    initialValues,
    handleSubmit,
  } = props;

  const classes = useStyles();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      {({
        values,
        handleChange,
      }) => (
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
                id="companyId-selector"
                name="companyId-selector"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="companyId"
                    name="companyId"
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
                id="editableCompanies-selector"
                name="editableCompanies-selector"
                options={top100Films}
                onChange={handleChange}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="editableCompanies"
                    name="editableCompanies"
                    variant="standard"
                    label="Empresas que puede editar"
                    placeholder="Favorites"
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
      )}
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
  },
  companies: [],
  certificates: [],
  handleSubmit: () => {},
}
