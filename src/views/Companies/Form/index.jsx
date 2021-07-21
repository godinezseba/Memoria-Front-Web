import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useToast } from '@chakra-ui/react';

import CompanyForm from './Form';

import { mapToBase64 } from '$utils';

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

const CREATE_COMPANY = gql`
mutation CreateCompany($values: CompanyInput!){
  createCompany(values: $values){
    id
  }
}
`;

export default function CompaniesForm() {
  const classes = useStyles();
  const toast = useToast();
  const [createCompany] = useMutation(CREATE_COMPANY, {
    onCompleted: () => {
      toast({
        title: 'Empresa creada con éxito',
        status: 'success',
        isClosable: true,
      });
    },
    onError: ({ message }) => {
      toast({
        title: 'Error en la creación de la empresa',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (values) => {
    const newCompany = values;
    const { actions, certificates } = values;

    newCompany.actions = await mapToBase64(actions);
    newCompany.certificates = await mapToBase64(certificates);
    return createCompany({ variables: { values } });
  }

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <CompanyForm handleSubmit={handleSubmit} />
      </Paper>
    </div>
  );
}
