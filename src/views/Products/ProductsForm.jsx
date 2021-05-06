import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useCompany from '../../store/company.store';

import { FileProducts } from '../../components/Forms';
import CompaniesDummyList from '../../dummyData/dummy';

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

export default function ProductsForm() {
  const classes = useStyles();
  const [company, { getAll }] = useCompany();
  const { isLoading, many } = company;

  console.log(company)

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        { isLoading ? (
          <h1>cargando</h1>
        ) : (
          <FileProducts companies={many} />
        ) }
      </Paper>
    </div>
  );
}
