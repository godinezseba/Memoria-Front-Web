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

const PRODUCTS = gql`
 {
  products{
    id
    name
		barCode
    company {
      name
    }
  }
}
`;

export default function CompaniesList() {
  const toast = useToast();
  const history = useHistory();
  const { loading, error, data } = useQuery(PRODUCTS, {
    onError: ({ message }) => {
      toast({
        title: 'Error en la obtención de los productos',
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
        onClick={() => history.push('/products/new-by-file')}
      >
        Agregar Productos
      </Button>
      <Box borderWidth="1px" borderRadius="10px" marginTop="5">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Código de Barras</Th>
              <Th>Empresa</Th>
            </Tr>
          </Thead>
          <Tbody>
            { (loading || error) ? (
              <Loading />
            ) : data.products.map(({id, name, barCode, company: { name: companyName}}) => (
              <Tr key={id}>
                <Td>{name}</Td>
                <Td>{barCode}</Td>
                <Td>{companyName}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
