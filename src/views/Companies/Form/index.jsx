import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { useToast } from '@chakra-ui/react';

import CompanyForm from './Form';
import { Loading } from '$atoms';

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

const GET_COMPANY = gql`
query GetCompany($id: ID!){
  company(id: $id){
    id
    name
    rating {
      CO2
      water
      deforestation
      otherData
    }
    actions {
      name
      fileId
      companyType
      companyId
      description
    }
    certificates {
      name
      fileId
      companyType
      companyId
    }
  }
}
`;

const CREATE_COMPANY = gql`
mutation CreateCompany($values: CompanyInput!){
  createCompany(values: $values){
    id
    name
    rating {
      CO2
      water
      deforestation
      otherData
    }
    actions {
      name
      companyType
      companyId
      description
    }
    certificates {
      name
      companyType
      companyId
    }
  }
}
`;

const UPDATE_COMPANY = gql`
mutation UpdateCompany($id: ID!, $values: CompanyInput!){
  updateCompany(id: $id, values: $values){
    id
    name
    rating {
      CO2
      water
      deforestation
      otherData
    }
    actions {
      name
      companyType
      companyId
      description
    }
    certificates {
      name
      companyType
      companyId
    }
  }
}
`;

export default function CompaniesForm() {
  const { id } = useParams();
  const classes = useStyles();
  const toast = useToast();
  const hasId = Boolean(id);

  const { loading, error, data } = useQuery(GET_COMPANY, { 
    variables: { id },
    onError: ({ message }) => {
      toast({
        title: 'Error en la obtención de la información de la empresa',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
    skip: !hasId
  });

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

  const [updateCompany] = useMutation(UPDATE_COMPANY, {
    onCompleted: () => {
      toast({
        title: 'Empresa editada con éxito',
        status: 'success',
        isClosable: true,
      });
    },
    onError: ({ message }) => {
      toast({
        title: 'Error en la edición de la empresa',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (values) => {
    const { id: _, ...newCompany} = values;
    const { actions, certificates } = values;

    newCompany.actions = await mapToBase64(actions);
    newCompany.certificates = await mapToBase64(certificates);
    if (id)
      return updateCompany({ variables: { id, values: newCompany } })
    return createCompany({ variables: { values: newCompany } });
  }

  if (loading || error)
  return (
    <>
      <Loading/>
    </>
  );

  const { company } = data || {};

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <CompanyForm handleSubmit={handleSubmit} initialValues={company} />
      </Paper>
    </div>
  );
}
