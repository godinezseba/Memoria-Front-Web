import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useToast } from '@chakra-ui/react';

import { LoadingButton } from '$atoms';

import { toBase64 } from '$utils';

const CREATE_PRODUCTS = gql`
mutation CreateProducts($values: ProductFileInput!) {
  createProductsByFile(values: $values)
}
`;

const useStyles = makeStyles((theme) => (
  {
    fileDropArea: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: '25px',
      border: `dashed ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      transition: '0.2s',
      margin: '2% 0',
      '&:focus': {
        backgroundColor: `rgba(${theme.palette.primary.main} 0.4)`,
      },
    },
    fakeButton: {
      flexShrink: 0,
      marginRight: theme.spacing(1),
      fontSize: '12px',
    },
    fileInput: {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      cursor: 'pointer',
      opacity: 0,
      '&:focus': {
        outline: 'none',
      },
    },
  }
));

export default function LoadFile(props) {
  const {
    classes,
    handleNext,
    handleBack,
    initialValues,
    metaData,
  } = props;
  const internalClasses = useStyles();
  const toast = useToast();
  const [hasError, setHasError] = useState('');
  const [createProducts] = useMutation(CREATE_PRODUCTS, {
    onCompleted: () => {
      toast({
        title: 'Productos creados con éxito',
        description: 'La medición se vera reflejada en unos minutos',
        status: 'success',
        isClosable: true,
      });
      handleNext();
    },
    onError: ({ message }) => {
      const description = `Detalle: ${message}`;
      setHasError(description);
      toast({
        title: 'Error en la creación de los productos',
        description,
        status: 'error',
        isClosable: true,
      });
    },
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        const { file } = values;
        const { type } = file;
        const { fileType, ...newProducts } = metaData;
        // check type of file is the same as in metaData
        if (type.includes(fileType)) {
          newProducts.file = await toBase64(file);
          createProducts({ variables: { values: newProducts } })
            .finally(() => setSubmitting(false));
        } else {
          console.log({ file });
          toast({
            title: 'Error en la creación de los productos',
            description: 'El archivo no es un CSV',
            status: 'error',
            isClosable: true,
          });
        }
      }}
    >
      {({
        values,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <div className={internalClasses.fileDropArea}>
            <Button
              variant="outlined"
              className={internalClasses.fakeButton}
            >
              Seleccione un archivo
            </Button>
            <Typography variant="caption">
              {values.file?.name || 'o arrastrelo y sueltelo hasta aquí.'}
            </Typography>
            <input
              id="file"
              name="file"
              className={internalClasses.fileInput}
              type="file"
              onChange={({ currentTarget }) => setFieldValue('file', currentTarget.files[0])}
            />
          </div>
          <div className={classes.buttons}>
            <Button onClick={handleBack} className={classes.button}>
              Atras
            </Button>
            <LoadingButton
              id="submit"
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Subir
            </LoadingButton>
          </div>
          {hasError && (
            <Typography variant="body1" color="secondary">
              {hasError}
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
}

LoadFile.propTypes = {
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
  }),
  initialValues: PropTypes.shape({
    file: PropTypes.shape({}),
  }),
  metaData: PropTypes.shape({
    fileType: PropTypes.string,
  }).isRequired,
}

LoadFile.defaultProps = {
  handleNext: () => { },
  handleBack: () => { },
  classes: {},
  initialValues: {},
}
