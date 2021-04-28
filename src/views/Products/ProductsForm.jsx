import React, { useState } from 'react';
import { Typography, Paper, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { OneProductForm, FileProducts } from '../../components/Forms';
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
  const [formSelected, setFormSelected] = useState(0);

  const handleChange = (_, newValue) => {
    setFormSelected(newValue);
  }

  return (
    <>
      <Typography component="h1" variant="h4">Formulario de ingreso de Datos</Typography>
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Tabs
            value={formSelected}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            variant="fullWidth"
          >
            <Tab label="Ingreso masivo" />
            <Tab label="Ingreso Individual" />
          </Tabs>
          { formSelected === 0 ? (
            <FileProducts companies={CompaniesDummyList} />
          ) : (
            <OneProductForm />
          )}
        </Paper>
      </div>
    </>
  );
}
