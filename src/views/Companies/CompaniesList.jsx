import React from 'react';
import { Box } from '@material-ui/core';

import CompanyCard from '../../components/CompanyCard';

const CompaniesDummyList = [
  {
    name: 'Coca-Cola',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    picture: 'https://www.micoca-cola.cl/assets/logo-coke.png',
    country: 'Chile',
  },
  {
    name: 'Nestlé',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    picture: 'https://tentulogo.com/wp-content/uploads/2017/08/nestle-logo.jpg',
    country: 'Chile',
  },
  {
    name: 'Coca-Cola',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    picture: 'https://www.micoca-cola.cl/assets/logo-coke.png',
    country: 'Chile',
  },
  {
    name: 'Nestlé',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    picture: 'https://tentulogo.com/wp-content/uploads/2017/08/nestle-logo.jpg',
    country: 'Chile',
  },
  {
    name: 'Coca-Cola',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    picture: 'https://www.micoca-cola.cl/assets/logo-coke.png',
    country: 'Chile',
  },
  {
    name: 'Nestlé',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    picture: 'https://tentulogo.com/wp-content/uploads/2017/08/nestle-logo.jpg',
    country: 'Chile',
  },
];

const CompaniesList = () => (
  <>
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
      flexWrap="wrap"
      alignContent="space-between"
    >
      {CompaniesDummyList.map((company, key) => {
        const keyName = `${company.name}-${company.country}-${key}`;
        return <CompanyCard key={keyName} company={company} />;
      })}
    </Box>
  </>
);

export default CompaniesList;
