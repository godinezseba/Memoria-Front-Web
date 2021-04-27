import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.string,
    barcodeId: PropTypes.string,
  }),
  handleChange: PropTypes.func,
}

const defaultProps = {
  values: {},
  handleChange: () => {},
}

export default function ProductForm({ values, handleChange }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Información del Producto
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Nombre"
            fullWidth
            value={values.name}
            onChange={handleChange}
          />
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
      </Grid>  
    </>
  );
}

ProductForm.propTypes = propTypes;
ProductForm.defaultProps = defaultProps;
