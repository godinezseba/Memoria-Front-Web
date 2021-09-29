import React from 'react';
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { Text, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

import { LoadingButton } from '$atoms';
import { FileSection } from '$components/Form/FileSection';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function CompanyForm(props) {
  const {
    initialValues,
    handleSubmit,
  } = props;

  const classes = useStyles();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
          .finally(() => setSubmitting(false));
      }}
    >
      {({
        values,
        handleChange,
        setFieldValue,
        isSubmitting,
      }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading size="lg">Información de la Empresa</Heading>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label="Empresa"
                fullWidth
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12}>
              <Heading size="md">Emisiones</Heading>
              <Text
                align="center"
              >
                Estas huellas corresponden a los valores generales emitidos por la empresa.
              </Text>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="rating.CO2"
                name="rating.CO2"
                label="Huella de Carbono"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={values.rating.CO2}
                onChange={handleChange}
                helperText="Considerando la emisión por Kilogramo producido."
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="rating.water"
                name="rating.water"
                label="Huella Hídrica"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={values.rating.water}
                onChange={handleChange}
                helperText="Considerando el agua gastada por Kilogramo producido."
              />
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  id="rating.deforestation-label"
                  required
                >
                  Huella Forestal
                </InputLabel>
                <Select
                  required
                  labelId="fileType"
                  id="rating.deforestation"
                  name="rating.deforestation"
                  label="Tipo de Archivo"
                  value={values.rating.deforestation}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="1">No afecta</MenuItem>
                  <MenuItem value="2">Afecta pero esta acreditada</MenuItem>
                  <MenuItem value="3">Afecta y no esta acreditada</MenuItem>
                </Select>
                <FormHelperText>Considerando si la producción de cualquiera de sus productos influye en la deforestación.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12} sm={6} />
            <Grid item xs={12}>
              <Heading size="md">Acciones</Heading>
              <Text
                align="center"
              >
                A continuación ingrese las acciones que realiza la empresa para
                disminuir las distintas emisiones generadas
              </Text>
            </Grid>
            <FileSection
              field="actions"
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              withDescription
            />
            <Grid item xs={12}>
              <Heading size="md">Acreditación de la Información</Heading>
              <Text
                align="center"
              >
                ¿Los datos de sus productos estan acreditados? Agrega los archivos correspondientes
                para que los usuarios puedan corroborar la veracidad de los datos.
              </Text>
            </Grid>
            <FileSection
              field="certificates"
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
            <Grid item xs={12}>
              <div className={classes.buttons}>
                <LoadingButton
                  id="submit"
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={isSubmitting}
                  className={classes.button}
                >
                  Subir
                </LoadingButton>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

CompanyForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.shape({
      CO2: PropTypes.number,
      water: PropTypes.number,
      deforestation: PropTypes.string,
    }),
    actions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      file: PropTypes.shape({}),
      description: PropTypes.string,
    })),
    certificates: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      file: PropTypes.shape({}),
    }))
  }),
  handleSubmit: PropTypes.func,
}

CompanyForm.defaultProps = {
  initialValues: {
    name: '',
    rating: {
      CO2: 0,
      water: 0,
      deforestation: '1',
    },
    actions: [],
    certificates: [],
  },
  handleSubmit: () => { },
}
