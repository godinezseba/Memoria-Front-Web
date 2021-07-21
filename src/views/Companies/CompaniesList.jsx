import React from 'react';
import { Box } from '@material-ui/core';

import CompanyCard from '$components/CompanyCard';
import CompaniesDummyList from '../../dummyData/dummy';

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
