import React, { useContext } from 'react';
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

import { AuthContext } from '$store/makeUserContext';
import { Loading } from '$atoms';

const COMPANIES = gql`
{
  companies(onlyEditable: true){
    id
    name
    country
  }
}
`;

export default function CompaniesList() {
  const toast = useToast();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const { data: { isAdmin } = {} } = currentUser || {};

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
      { isAdmin && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push('/companies/new')}
        >
          Agregar Empresa
        </Button>
      )}
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
            ) : data.companies.map(({id, name}) => (
              <Tr key={id} role={currentUser && 'button'} onClick={() => currentUser && history.push(`/companies/${id}`)}>
                <Td>{name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
