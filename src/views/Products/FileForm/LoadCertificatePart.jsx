import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/toast';

import { Loading } from '$atoms';
import { FileSection } from '$components/Form/FileSection';

import { mapToBase64 } from '$utils';

const GETCOMPANY = gql`
query GetCompany($id: ID!){
  company(id: $id){
    id
    name
    certificates{
      name
      fileId
      companyType
      companyId
    }
  }
}
`;

const UPDATE_COMPANY = gql`
mutation UpdateCompany($id: ID!, $values: CompanyInput!){
  updateCompany(id: $id, values: $values){
    id
    name
    actions {
      name
      companyType
      companyId
      description
    }
    certificates {
      name
      companyType
      companyId
    }
  }
}
`;

const HeadSection = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Acreditación de la Información
    </Typography>
    <Typography variant="body2" align="center" paragraph>
      ¿Los datos de estos productos estan acreditados? Agrega los archivos correspondientes
      para que los usuarios puedan corroborar la veracidad de los datos.
    </Typography>
  </>
)

export default function CertificateForm(props) {
  const {
    classes,
    companyID,
  } = props;
  const toast = useToast();
  const { loading, data, error } = useQuery(GETCOMPANY, { 
      variables: { id: companyID },
      onError: ({ message }) => {
        toast({
          title: 'Error en la obtención de la información de la empresa',
          description: `Detalle: ${message}`,
          status: 'error',
          isClosable: true,
        });
      },
    });

  const [updateCompany] = useMutation(UPDATE_COMPANY, {
    onCompleted: () => {
      toast({
        title: 'Empresa editada con éxito',
        status: 'success',
        isClosable: true,
      });
    },
    onError: ({ message }) => {
      toast({
        title: 'Error en la edición de la empresa',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
  });
  
  if (loading || error)
    return (
      <>
        <HeadSection />
        <Loading/>
      </>
    );

  const { company } = data;

  return(
    <Formik
      enableReinitialize
      initialValues={company}
      onSubmit={async(values) => {
        const { id: _, ...newCompany} = values;
        const { actions, certificates } = values;
    
        newCompany.actions = await mapToBase64(actions);
        newCompany.certificates = await mapToBase64(certificates);
        return updateCompany({ variables: { id: companyID, values: newCompany } })
      }}
    >
      {({
        values,
        setFieldValue,
        handleChange,
      }) => (
          <Form>
            <HeadSection />
            <Grid container spacing={3}>
              <FileSection
                field="certificates"
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            </Grid>
            <div className={classes.buttons}>
              <Button
                id="submit"
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Subir
              </Button>
            </div>
          </Form>
        )}
    </Formik>
  );
}

CertificateForm.propTypes = {
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
  }),
  companyID: PropTypes.string,
}

CertificateForm.defaultProps = {
  classes: {},
  companyID: '',
}
