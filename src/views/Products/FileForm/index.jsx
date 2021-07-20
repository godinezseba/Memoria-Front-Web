import React, { useEffect, useState } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CertificateForm from './LoadCertificatePart';
import LoadFile from './LoadFilePart';
import ValuesPart from './ValuesPart';
import { Loading } from '$atoms';

import useCompany from '$store/company.store';
import useProduct from '$store/product.store';
import { toBase64 } from '$utils';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
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

export default function ProductsForm() {
  const classes = useStyles();
  const [company, { getAll }] = useCompany();
  const [product, { create }] = useProduct();
  const [activeStep, setActiveStep] = useState(0);
  const [metaData, setMetaData] = useState({
    companyId: null,
    fileType: '',
    separator: ',',
    columns: {
      name: '',
      barCode: '',
      externalId: '',
      CO2: '',
      water: '',
    }
  });
  const { isLoading, many } = company;

  useEffect(() => {
    getAll();
  }, []);

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

  const submitProductsData = async (data) => {
    const { file } = data;
    const { type } = file;
    const { fileType } = metaData;

    if (type.includes(fileType)) {
      const newProducts = metaData;
      newProducts.file = await toBase64(file);
      return create(newProducts)
        .then((response) => {
          handleNext();
          return response;
        })
    }
  }

  const submitCertificateData = (data) => {
    console.log(data);
  }

  const stepContent = {
    0: (
      <ValuesPart
        initialValues={metaData}
        companies={many}
        classes={classes}
        handleSubmit={handleSubmitParams}
      />
    ),
    1: (
      <LoadFile
        classes={classes}
        handleBack={handleBack}
        handleSubmit={submitProductsData}
      />
    ),
    2: (
      <CertificateForm
        classes={classes}
        handleSubmit={submitCertificateData}
      />
    ),
  }

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label.name}>
                  <StepLabel optional={label.optional}>{label.name}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {stepContent[activeStep]}
          </>
        )}
      </Paper>
    </div>
  );
}
