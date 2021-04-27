import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

import ProductForm from './ProductForm';
import EnergyForm from './EnergyForm';
import ProductReviewForm from '../../ProductReviewCard';

const propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    company: PropTypes.string,
    barcodeId: PropTypes.string,
    ratingData: PropTypes.shape({
      energy: PropTypes.number,
      co2: PropTypes.number,
      water: PropTypes.number,
    })
  }),
}

const defaultProps = {
  initialValues: {
    ratingData: {},
  },
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

const steps = ['Información del Producto', 'Detalles Energeticos', 'Revisar Producto'];

export default function OneProduct({initialValues}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
    >
      {({
        values,
        handleChange,
      }) => {

        const getStepContent = (step) => {
          switch (step) {
            case 0:
              return <ProductForm initialValues={values} handleChange={handleChange} />;
            case 1:
              return <EnergyForm initialValues={values.ratingData} handleChange={handleChange} />;
            case 2:
              return <ProductReviewForm values={values} />;
            default:
              throw new Error('Unknown step');
          }
        };

        return (
          <Form>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
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
        </Form>
        )
      }}
    </Formik>
  );
}

OneProduct.propTypes = propTypes;
OneProduct.defaultProps = defaultProps;
