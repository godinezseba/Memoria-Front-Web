import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from '@chakra-ui/react';
import Button from '@material-ui/core/Button';

import { Loading } from '$atoms';

const USERS = gql`
 {
  users{
    id
    name
		lastName
    isAdmin
    companyType
  }
}
`;

const companyHash = {
  'company': 'Empresa',
  'certifier': 'Certificadora',
}

export default function CompaniesList() {
  const toast = useToast();
  const history = useHistory();
  const { loading, error, data } = useQuery(USERS, {
    onError: ({ message }) => {
      toast({
        title: 'Error en la obtención de los usuarios',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
  });

  return (
    <Box p={5} shadow="base" borderWidth="1px" borderRadius="10px">
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push('/users/new')}
      >
        Agregar Usuario
      </Button>
      <Box borderWidth="1px" borderRadius="10px" marginTop="5">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Apellidos</Th>
              <Th>Administrador</Th>
              <Th>Tipo de Empresa</Th>
            </Tr>
          </Thead>
          <Tbody>
            { (loading || error) ? (
              <Loading />
            ) : data.users.map(({id, name, lastName, isAdmin, companyType}) => (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>{lastName}</Td>
                <Td>{isAdmin ? 'Si' : 'No'}</Td>
                <Td>{companyHash[companyType]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
