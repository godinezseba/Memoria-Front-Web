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

export default function CertificateForm(props) {
  const {
    initialValues,
    handleSubmit,
    classes,
  } = props;

  return(
    <Formik
      enableReinitialize
      initialValues={initialValues}
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
          setFieldValue('files', [...values.files, ...newValues]);
        };
        return (
          <Form>
            <Typography variant="h6" gutterBottom>
              Acreditación de la Información
            </Typography>
            <Typography variant="body2" align="center" paragraph>
              ¿Los datos de estos productos estan acreditados? Agrega los archivos correspondientes
              para que los usuarios puedan corroborar la veracidad de los datos.
            </Typography>
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
            <FieldArray name="files">
              {({ remove }) => (
                <List>
                  <Divider />
                  {values.files?.map((certificate, index) => {
                    const { file: { name }, nameFile } = certificate;
                    const keyName = `${name}-${index}`;
                    return (
                      <>
                        <ListItem key={keyName}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <TextField
                              label="Nombre del Certificado"
                              id={`files.${index}.nameFile`}
                              name={`files.${index}.nameFile`}
                              onChange={handleChange}
                              value={nameFile}
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
                              id={`files.${index}`}
                              name={`files.${index}`}
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
  initialValues: PropTypes.shape({
    files: PropTypes.arrayOf(PropTypes.shape({})),
  }),
}

CertificateForm.defaultProps = {
  handleSubmit: () => {},
  classes: {},
  initialValues: {
    files: [],
  },
}
