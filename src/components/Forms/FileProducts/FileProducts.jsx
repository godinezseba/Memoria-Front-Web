import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import FileForm from './FileForm';
import LoadFile from './LoadFile';
import CertificateForm from './CertificateForm';

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

const steps = [
  { name: 'Sobre el archivo' },
  { name: 'Subir el Archivo' },
  { name: 'Certificados', optional: (<Typography variant="caption">Opcional</Typography>) },
];

export default function FileProduct({ companies }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [metaData, setMetaData] = useState({});

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmitParams = (value) => {
    setMetaData(value);
    handleNext();
  }

  const submitProductsData = (data) => {
    const { file: { type } } = data;
    const { fileType } = metaData;

    if (type.includes(fileType) ) {
      handleNext();
    }
  }

  const submitCertificateData = (data) => {
    console.log(data);
  }

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <FileForm
            initialValues={metaData}
            companies={companies}
            classes={classes}
            handleSubmit={handleSubmitParams}
          />);
      case 1:
        return (
          <LoadFile
            classes={classes}
            handleBack={handleBack}
            handleSubmit={submitProductsData}
          />);
      case 2:
        return (
          <CertificateForm
            classes={classes}
            handleSubmit={submitCertificateData}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label.name}>
            <StepLabel optional={label.optional}>{label.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent()}
    </>
  )
}

FileProduct.propTypes = propTypes;
FileProduct.defaultProps = defaultProps;
