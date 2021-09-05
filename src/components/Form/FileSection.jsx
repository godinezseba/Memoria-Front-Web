import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  IconButton,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { FieldArray } from 'formik';
import { Divider } from '@chakra-ui/layout';

export function FileSection(props) {
  const {
    field,
    values,
    handleChange,
    setFieldValue,
    withDescription,
  } = props;

  const handleAddFile = (event) => {
    const newValues = Array.from(event.currentTarget.files).map((file) => ({ file, name: file.name }));
    setFieldValue(field, [...values[field], ...newValues]);
  };

  return(
    <>
      <Grid item xs={12}>
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
      </Grid>
      <FieldArray name={field}>
        {({ remove }) => (
          <>
            <Divider colorScheme="blue"/>
            {values[field]?.map((fileObject, key) => {
              const { name, fileId, description } = fileObject;
              const keyName = `${field}-${key}`;
              return (
                <Fragment key={keyName}>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      id={`${field}.${key}.name`}
                      name={`${field}.${key}.name`}
                      label="Nombre"
                      fullWidth
                      value={name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} alignItems="center">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      id={`${field}.${key}`}
                      name={`${field}.${key}`}
                      onClick={() => remove(key)}
                      disabled={fileId}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                  { withDescription && (
                    <Grid item xs={12}>
                      <TextField
                        id={`${field}.${key}.description`}
                        name={`${field}.${key}.description`}
                        label="Descripción"
                        fullWidth
                        value={description}
                        onChange={handleChange}
                        multiline
                      />
                    </Grid>
                  )}
                  <Divider />
                </Fragment>
              );
            })}
          </>
        )
         }
      </FieldArray>
    </>
  );
}

FileSection.propTypes = {
  field: PropTypes.string.isRequired,
  values: PropTypes.shape.isRequired,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  withDescription: PropTypes.bool,
}

FileSection.defaultProps = {
  handleChange: () => {},
  setFieldValue: () => {},
  withDescription: false,
}
