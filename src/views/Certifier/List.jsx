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

const CERTIFIERS = gql`
{
  certifiers{
    id
    name
  }
}
`;

export default function CompaniesList() {
  const toast = useToast();
  const history = useHistory();
  const { loading, error, data } = useQuery(CERTIFIERS, {
    onError: ({ message }) => {
      toast({
        title: 'Error en la obtención de las empresas certificadoras',
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
        onClick={() => history.push('/certifiers/new')}
      >
        Agregar Certificadora
      </Button>
      <Box borderWidth="1px" borderRadius="10px" marginTop="5">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
            </Tr>
          </Thead>
          <Tbody>
            { (loading || error) ? (
              <Loading />
            ) : data.certifiers.map(({ id, name }) => (
              <Tr key={id}>
                <Td>{name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
