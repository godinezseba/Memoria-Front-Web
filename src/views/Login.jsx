import React from 'react';
import { Button, TextField, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import { Formik, Form } from 'formik';

import { DividerWithText } from '../atoms';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" style={{ height: '100vh' }}>
      <div className={classes.paper}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(() => setSubmitting(false), 1000)
          }}
          className={classes.form}
        >
          {({
            values,
            handleChange,
            isSubmitting,
            setSubmitting,
          }) => (
            <Form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Iniciar Sesión
              </Button>
              <DividerWithText>tambien puedes</DividerWithText>
              <GoogleLogin
                clientId="787505940274-srotvj1sh4mba7o8htl5dk1d825u1v1v.apps.googleusercontent.com"
                buttonText="Ingresar con Google"
                theme="dark"
                cookiePolicy="single_host_origin"
                onSuccess={(value) => console.log(value)}
                onRequest={() => setSubmitting(true)}
                onFailure={(value) => console.log(value)}
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
