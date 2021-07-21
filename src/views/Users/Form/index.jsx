import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useToast } from '@chakra-ui/react';

import UserForm from './Form';
import { Loading } from '$atoms';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const CREATE_USER = gql`
mutation CreateUser($values: UserInput!){
  createUser(values: $values){
    id
  }
}
`;

const COMPANIES = gql`
{
  certifiers {
    id
    name
  }
  companies{
    id
    name
  }
}
`;

export default function CompaniesForm() {
  const classes = useStyles();
  const toast = useToast();
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      toast({
        title: 'Usuario creado con éxito',
        status: 'success',
        isClosable: true,
      });
    },
    onError: ({ message }) => {
      toast({
        title: 'Error en la creación del usuario',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
  });
  const { loading, data } = useQuery(COMPANIES, {
    onError: ({ message }) => {
      toast({
        title: 'Error en la obtención de las empresas/certificadoras',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
  });

  if (loading) {
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Loading />
        </Paper>
      </div>
    );
  }

  const { companies, certifiers } = data;

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <UserForm
          companies={companies || []}
          certifiers={certifiers || []}
          handleSubmit={createUser}
        />
      </Paper>
    </div>
  );
}
