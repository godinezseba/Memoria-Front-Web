import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray } from 'formik';
import {
  Button,
  Typography,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemSecondaryAction,
  Divider,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { gql, useQuery } from '@apollo/client';
import { useToast } from '@chakra-ui/toast';

import { Loading } from '$atoms';

const GETCOMPANY = gql`
query GetCompany($id: ID!){
  company(id: $id){
    id
    certificates{
      name
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
    handleSubmit,
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
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        setFieldValue,
        handleChange,
      }) => {
        const handleAddFile = (event) => {
          const newValues = Array.from(event.currentTarget.files).map((file) => ({ file }));
          setFieldValue('certificates', [...values.certificates, ...newValues]);
        };
        return (
          <Form>
            <HeadSection />
            <Button
              id="file"
              name="file"
              component="label"
              color="secondary"
              variant="outlined"
            >
              Agregar
              <input type="file" onChange={handleAddFile} hidden multiple/>
            </Button>
            <FieldArray name="certificates">
              {({ remove }) => (
                <List>
                  <Divider />
                  {values.certificates?.map((certificate, index) => {
                    const { file, name } = certificate;
                    const keyName = `${name}-${index}`;
                    return (
                      <>
                        <ListItem key={keyName}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <TextField
                              label="Nombre del Certificado"
                              id={`certificates.${index}.name`}
                              name={`certificates.${index}.name`}
                              onChange={handleChange}
                              value={name}
                            />
                            <TextField
                              label="Archivo"
                              defaultValue={name}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </div>
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              id={`certificates.${index}`}
                              name={`certificates.${index}`}
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </>
                    );
                  })}
                </List>
              )}
            </FieldArray>
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
        );
      }}
    </Formik>
  );
}

CertificateForm.propTypes = {
  handleSubmit: PropTypes.func,
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
  }),
  companyID: PropTypes.string,
}

CertificateForm.defaultProps = {
  handleSubmit: () => {},
  classes: {},
  companyID: '',
}
