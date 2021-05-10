import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppID from 'ibmcloud-appid-js';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
}));

export default function Login() {
  const classes = useStyles();

  const appId = new AppID();

  const login = async () => {
    try {
      const token = await appId.signin();
      console.log(token);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    ( async () =>  {
      try {
        await appId.init({
          clientId: 'd6c47e1c-d540-4ea1-a00b-f642da77d426',
          discoveryEndpoint: 'https://us-south.appid.cloud.ibm.com/oauth/v4/463ecc77-cba1-432f-a5ac-a62a9e795cca/.well-known/openid-configuration',
        })
      } catch (e) {
        console.log(e)
      }
    })()
      .then(() => login())
      .catch((error) => console.log(error));
  });

  return (
    <Container maxWidth="xs" style={{ height: '100vh' }}>
      <div className={classes.paper}>
        Esta siendo redirigido al sistema de inicio de sesión App ID.
        <button onClick={login}>Iniciar Sesión</button>
      </div>
    </Container>
  );
}
