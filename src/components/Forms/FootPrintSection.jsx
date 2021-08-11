import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
} from '@material-ui/core';

export default function FootPrintSection(props) {
  const {
    handleChange,
    values,
    prefix,
  } = props;

  const prefixText = (value) => prefix ? `${prefix}.${value}` : value;

  const prefixValues = (value) => prefix ? values[prefix][value] : values[value];

  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id={prefixText('CO2')}
          name={prefixText('CO2')}
          label="Huella de Carbono"
          fullWidth
          value={prefixValues('CO2')}
          onChange={handleChange}
          helperText="Considerando la emisión por Kilogramo producido."
        />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id={prefixText('water')}
          name={prefixText('water')}
          label="Huella Hídrica"
          fullWidth
          value={prefixValues('water')}
          onChange={handleChange}
          helperText="Considerando el agua gastada por Kilogramo producido."
        />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id={prefixText('forest')}
          name={prefixText('forest')}
          label="Huella Forestal"
          fullWidth
          value={prefixValues('forest')}
          onChange={handleChange}
          helperText="Considerando si la producción del producto influye en la deforestación."
        />
      </Grid>
      <Grid item xs={6} />
    </>
  );
}

FootPrintSection.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    columns: PropTypes.shape({
      forest: PropTypes.string,
      water: PropTypes.string,
      CO2: PropTypes.string,
    })
  }).isRequired,
  prefix: PropTypes.string,
}

FootPrintSection.defaultProps = {
  prefix: '',
}