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
import LoadFile from './LoadFile';

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
  const [params, setParams] = useState({
    metaData: {},
    file: '',
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmitParams = (field, value) => {
    setParams(prevState => ({
      ...prevState,
      [field]: value,
    }));
    handleNext();
  }

  const getStepContent = () => {
    switch (activeStep) {
      case -1:
        return (
          <FileForm
            initialValues={params.metaData}
            companies={companies}
            classes={classes}
            handleSubmit={(data) => handleSubmitParams('metaData', data)}
          />);
      case 0:
        return (
          <LoadFile
            classes={classes}
            handleSubmit={(data) => handleSubmitParams('file', data)}
            handleBack={handleBack}
          />);
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
      {getStepContent()}
    </>
  )
}

FileProduct.propTypes = propTypes;
FileProduct.defaultProps = defaultProps;
