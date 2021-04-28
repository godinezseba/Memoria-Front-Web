import React from 'react';
import { Grid, Typography, TextField, Select, MenuItem } from '@material-ui/core';
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
}

const defaultProps = {
  initialValues: {
    company: {},
    fileType: '',
    separator: '',
    nameColumn: '',
    barCodeColumn: '',
    idColumn: '',
    co2Column: -1,
    waterColumn: -1,
  },
  companies: [],
  handleSubmit: () => {},
}

export default function FileForm({ initialValues, handleSubmit, companies }) {
  return (
    <Formik
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
          {console.log(values)}
          <Typography variant="h6" gutterBottom>
            Información del Archivo
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                required
                id="company"
                name="company"
                options={companies}
                onChange={(e, value) => setFieldValue('company', value || initialValues.company)}
                value={values.company}
                getOptionLabel={(option) => option?.name || ''}
                renderInput={(params) => <TextField {...params} id="company-input" name="company-input" label="Empresa" />}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
          { !!values.company.id && (
            <>
              <Typography variant="body2">
                Este formulario solo acepta archivos tipo CSV y Excel. Para esto es necesario especificar que atributos vienen en
                el archivo y el nombre de estos:
              </Typography>
              <Grid item xs={12} sm={6}>
              <Select
                labelId="fileType"
                id="fileType"
                label="Tipo de Archivo"
                value={values.fileType}
                onChange={handleChange}
              >
                <MenuItem value="CSV">CSV</MenuItem>
                <MenuItem value="Excel">Excel</MenuItem>
              </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="Empresa"
                  name="company"
                  label="Fabricante"
                  fullWidth
                  value={values.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="barcode"
                  name="barcode"
                  label="Código de Barras"
                  fullWidth
                  value={values.barcodeId}
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

FileForm.propTypes = propTypes;
FileForm.defaultProps = defaultProps;
