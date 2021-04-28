import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import FileForm from './FileForm';

const propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({})),
}

const defaultProps = {
  companies: [],
}

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Sobre el archivo', 'Subir el Archivo', 'Revisar Producto'];

export default function FileProduct({ companies }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (<FileForm companies={companies} />);
      case 1:
        return (<h1>hola 2</h1>);
      case 2:
        return (<h1>hola 3</h1>);
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <div className={classes.buttons}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} className={classes.button}>
            Atras
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={activeStep === steps.length - 1 ? null : handleNext}
          className={classes.button}
          type={activeStep === steps.length - 1 ? 'submit' : ''}
        >
          {activeStep === steps.length - 1 ? 'Subir' : 'Siguiente'}
        </Button>
      </div>
    </>
  )
}

FileProduct.propTypes = propTypes;
FileProduct.defaultProps = defaultProps;
