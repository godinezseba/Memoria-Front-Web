import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const propTypes = {
  values: PropTypes.shape({
    energy: PropTypes.number,
    co2: PropTypes.number,
    water: PropTypes.number,
  }),
  handleChange: PropTypes.func,
}

const defaultProps = {
  values: {},
  handleChange: () => {},
}

export default function EnergyForm({ values, handleChange }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Indicadores Energéticos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="C02"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="Agua"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
      </Grid>
    </>
  );
}

EnergyForm.propTypes = propTypes;
EnergyForm.defaultProps = defaultProps;
