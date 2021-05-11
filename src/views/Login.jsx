import React, { useEffect } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useUser from '../store/user.store';

const useStyles = makeStyles(() => ({
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

  const [user, { getByAppID }] = useUser();

  useEffect(() => getByAppID());

  return (
    <Container maxWidth="xs" style={{ height: '100vh' }}>
      <div className={classes.paper}>
        <Typography noWrap>
          Esta siendo redirigido al sistema de inicio de sesión App ID.
        </Typography>
        <Typography noWrap>
          Si no es asi, por favor haga click en el botón de abajo:
        </Typography>
        <Button onClick={getByAppID} variant="contained" color="primary">
          Iniciar Sesión
        </Button>
      </div>
    </Container>
  );
}
