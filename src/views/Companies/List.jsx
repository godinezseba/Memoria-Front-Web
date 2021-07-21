import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from '@chakra-ui/react';

import { Loading } from '$atoms';

const COMPANIES = gql`
{
  companies{
    id
    name
    country
  }
}
`;

export default function CompaniesList() {
  const toast = useToast();
  const history = useHistory();
  const { loading, error, data } = useQuery(COMPANIES, {
    onError: ({ message }) => {
      toast({
        title: 'Error en la obtención de las empresas',
        description: `Detalle: ${message}`,
        status: 'error',
        isClosable: true,
      });
    },
  });

  return (
    <Box p={5} shadow="base" borderWidth="1px" borderRadius="10px">
      <Button
        colorScheme="teal"
        marginBottom="5"
        onClick={() => history.push('/companies/new')}
      >
        Agregar Empresa
      </Button>
      <Box borderWidth="1px" borderRadius="10px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>País</Th>
            </Tr>
          </Thead>
          <Tbody>
            { (loading || error) ? (
              <Loading />
            ) : data.companies.map(({id, name, country}) => (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>{country}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
