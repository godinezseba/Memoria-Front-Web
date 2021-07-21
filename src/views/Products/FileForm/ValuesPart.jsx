import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

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
              <Typography variant="h6" gutterBottom>
                Información del Archivo
              </Typography>
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
            {!!values.companyId && (
              <>
                <Grid item xs={12}>
                  <Typography variant="body2" align="center" paragraph>
                    Este formulario solo acepta archivos tipo CSV y Excel. Para esto es necesario especificar que atributos vienen en
                    el archivo y el nombre de estos:
                  </Typography>
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
                  <Typography variant="h6">
                    Nombre de las Columnas
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom color="secondary" style={{ fontWeight: 'bold' }}>
                    Considere mayusculas y minusculas!
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="columns.name"
                    name="columns.name"
                    label="Nombres"
                    fullWidth
                    value={values.columns.name}
                    onChange={handleChange}
                    helperText="Nombre del Producto"
                  />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="columns.barCode"
                    name="columns.barCode"
                    label="Código de Barras del Producto"
                    fullWidth
                    value={values.columns.barCodeColumn}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="columns.CO2"
                    name="columns.CO2"
                    label="Huella de Carbono"
                    fullWidth
                    value={values.columns.CO2}
                    onChange={handleChange}
                    helperText="Considerando la producción de mil productos."
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
                    helperText="Considerando la producción de mil productos."
                  />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="columns.externalId"
                    name="columns.externalId"
                    label="Identificador único"
                    fullWidth
                    value={values.columns.externalId}
                    onChange={handleChange}
                    helperText="Identificador utilizado para este producto (opcional)."
                  />
                </Grid>
                <Grid item xs={6} />
              </>
            )}
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
      barCode: PropTypes.string,
      externalId: PropTypes.string,
      CO2: PropTypes.string,
      water: PropTypes.string,
    }),
  }),
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
  initialValues: {
    companyId: '',
    fileType: 'csv',
    separator: ',',
    columns: {
      name: '',
      barCode: '',
      externalId: '',
      CO2: '',
      water: '',
    }
  },
  companies: [],
  handleSubmit: () => { },
  classes: {},
}
