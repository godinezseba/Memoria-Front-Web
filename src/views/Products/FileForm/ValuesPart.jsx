import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useToast, Text, Heading, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { Formik, Form, FieldArray } from 'formik';

import { Loading } from '$atoms';

const COMPANIES = gql`
{
  companies{
    id
    name
  }
}
`;

export default function FileForm(props) {
  const {
    initialValues,
    handleSubmit,
    classes,
  } = props;
  const toast = useToast();
  const { loading, data, error } = useQuery(COMPANIES, {
    onError: ({ message }) => {
      toast({
        title: 'Error en la obtención de las empresas',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
  });

  if (loading || error) {
    return (
      <Loading />
    );
  }

  const { companies } = data;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        handleChange,
        setFieldValue,
      }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading size="lg">Información del Archivo</Heading>
              <Heading size="md">Empresa</Heading>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="companyId"
                name="companyId"
                options={companies}
                onChange={(e, value) => setFieldValue('companyId', value?.id)}
                value={companies.find(({ id }) => id === values.companyId)}
                getOptionLabel={(option) => option?.name || ''}
                renderInput={(params) => <TextField {...params} id="companyId-input" name="companyId-input" label="Empresa" required />}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12}>
              <Heading size="md">Tipo de archivo</Heading>
              <Text
                align="center"
              >
                Este formulario solo acepta archivos tipo CSV y Excel.
                Para esto es necesario especificar que atributos vienen en
                el archivo y el nombre de estos:
              </Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="fileType-label" required>Tipo de Archivo</InputLabel>
                <Select
                  required
                  labelId="fileType"
                  id="fileType"
                  name="fileType"
                  label="Tipo de Archivo"
                  value={values.fileType}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="csv">CSV</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {values.fileType === 'csv' && (
              <Grid item xs={12} sm={6}>
                <TextField
                  id="separator"
                  name="separator"
                  label="Separador"
                  fullWidth
                  value={values.separator}
                  onChange={handleChange}
                  helperText="Simbolo utilizado para separar columnas en el archivo CSV."
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Heading size="md">Columnas obligatorias</Heading>
              <Heading color="red" size="xs">Considere mayusculas y minusculas!</Heading>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="columns.name"
                name="columns.name"
                label="Nombre"
                fullWidth
                value={values.columns.name}
                onChange={handleChange}
                helperText="Nombre de los productos"
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="columns.category"
                name="columns.category"
                label="Categoria"
                fullWidth
                value={values.columns.category}
                onChange={handleChange}
                helperText="Clasificación de los alimentos"
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="columns.barCode"
                name="columns.barCode"
                label="Código de barras"
                fullWidth
                value={values.columns.barCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="columns.barCodeType"
                name="columns.barCodeType"
                label="Tipo de código de barras"
                fullWidth
                value={values.columns.barCodeType}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="columns.CO2"
                name="columns.CO2"
                label="Huella de Carbono"
                fullWidth
                value={values.columns.CO2}
                onChange={handleChange}
                helperText="Considerando la emisión por Kilogramo producido."
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="columns.water"
                name="columns.water"
                label="Huella Hídrica"
                fullWidth
                value={values.columns.water}
                onChange={handleChange}
                helperText="Considerando el agua gastada por Kilogramo producido."
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="columns.forest"
                name="columns.forest"
                label="Huella Forestal"
                fullWidth
                value={values.columns.forest}
                onChange={handleChange}
                helperText="Considerando si la producción del producto influye en la deforestación."
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12}>
              <Heading size="md">Columnas extras</Heading>
              <Text
                align="center"
              >
                Las siguientes columnas no seran consideradas en el calculo de
                la clasificación de los productos, sin embargo, pueden ser relevantes
                en un futuro.
              </Text>
            </Grid>
            <FieldArray name="otherColumns">
              {({ remove, push }) => (
                <>
                  <Grid item xs={12}>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => push('')}
                    >
                      Agregar
                    </Button>
                  </Grid>
                  {values.otherColumns?.map((column, key) => {
                    const columnKeyName = `${column}-${key}`;
                    return (
                      <Fragment key={columnKeyName}>
                        <Grid item sm={6}>
                          <TextField
                            id={`otherColumns.${key}`}
                            name={`otherColumns.${key}`}
                            label="Nombre de la columna"
                            fullWidth
                            value={column}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <IconButton
                            aria-label="remove column name"
                            icon={<DeleteIcon />}
                            variant="unstyled"
                            onClick={() => remove(key)}
                          />
                        </Grid>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </FieldArray>
            <Grid item xs={12}>
              <div className={classes.buttons}>
                <Button
                  id="submit"
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  Siguiente
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

FileForm.propTypes = {
  initialValues: PropTypes.shape({
    companyId: PropTypes.string,
    fileType: PropTypes.string,
    separator: PropTypes.string,
    columns: PropTypes.shape({
      name: PropTypes.string,
      category: PropTypes.string,
      barCode: PropTypes.string,
      barCodeType: PropTypes.string,
      externalId: PropTypes.string,
      CO2: PropTypes.string,
      water: PropTypes.string,
      forest: PropTypes.string,
    }),
    otherColumns: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleSubmit: PropTypes.func,
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  classes: PropTypes.shape({
    buttons: PropTypes.string,
    button: PropTypes.string,
  }),
}

FileForm.defaultProps = {
  companies: [],
  handleSubmit: () => { },
  classes: {},
}
