import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

const propTypes = {
  initialValues: PropTypes.shape({
    company: PropTypes.shape({}),
    fileType: PropTypes.string,
    separator: PropTypes.string,
    nameColumn: PropTypes.string,
    barCodeColumn: PropTypes.string,
    idColumn: PropTypes.string,
    co2Column: PropTypes.number,
    waterColumn: PropTypes.number,
  }),
  handleSubmit: PropTypes.func,
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
  }),
}

const defaultProps = {
  initialValues: {
    company: {},
    separator: ',',
  },
  companies: [],
  handleSubmit: () => {},
  classes: {},
}

export default function FileForm(props) {
  const {
    initialValues,
    handleSubmit,
    companies,
    classes,
  } = props;
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      {({
        values,
        handleChange,
        setFieldValue,
      }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Información del Archivo
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="company"
                name="company"
                options={companies}
                onChange={(e, value) => setFieldValue('company', value || initialValues.company)}
                value={values.company}
                getOptionLabel={(option) => option?.name || ''}
                renderInput={(params) => <TextField {...params} id="company-input" name="company-input" label="Empresa" required />}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
          { !!values.company.id && (
            <>
              <Grid item xs={12}>
                <Typography variant="body2" align="center" paragraph>
                  Este formulario solo acepta archivos tipo CSV y Excel. Para esto es necesario especificar que atributos vienen en
                  el archivo y el nombre de estos:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="fileType-label" required>Tipo de Archivo</InputLabel>
                  <Select
                    required
                    labelId="fileType"
                    id="fileType"
                    name="fileType"
                    label="Tipo de Archivo"
                    value={values.fileType}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="CSV">CSV</MenuItem>
                    <MenuItem value="Excel">Excel</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {values.fileType === 'CSV' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="separator"
                    name="separator"
                    label="Separador"
                    fullWidth
                    value={values.separator}
                    onChange={handleChange}
                    helperText="Simbolo utilizado para separar columnas en el archivo CSV."
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="h6">
                  Nombre de las Columnas
                </Typography>
                <Typography variant="subtitle2" gutterBottom color="secondary" style={{fontWeight: 'bold'}}>
                  Considere mayusculas y minusculas!
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="nameColumn"
                  name="nameColumn"
                  label="Nombres"
                  fullWidth
                  value={values.nameColumn}
                  onChange={handleChange}
                  helperText="Nombre del Producto"
                />
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="barCodeColumn"
                  name="barCodeColumn"
                  label="Código de Barras del Producto"
                  fullWidth
                  value={values.barCodeColumn}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="co2Column"
                  name="co2Column"
                  label="Huella de Carbono"
                  fullWidth
                  value={values.co2Column}
                  onChange={handleChange}
                  helperText="Considerando la producción de mil productos."
                />
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="waterColumn"
                  name="waterColumn"
                  label="Huella Hídrica"
                  fullWidth
                  value={values.waterColumn}
                  onChange={handleChange}
                  helperText="Considerando la producción de mil productos."
                />
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="idColumn"
                  name="idColumn"
                  label="Identificador único"
                  fullWidth
                  value={values.idColumn}
                  onChange={handleChange}
                  helperText="Identificador utilizado para este producto (opcional)."
                />
              </Grid>
              <Grid item xs={6}/>
            </>
          )}
            <Grid item xs={12}>
              <div className={classes.buttons}>
                <Button
                  id="submit"
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Siguiente
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

FileForm.propTypes = propTypes;
FileForm.defaultProps = defaultProps;
