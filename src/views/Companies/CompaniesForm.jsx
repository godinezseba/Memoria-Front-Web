import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CompanyForm } from '../../components/Forms';

import useCompany from '../../store/company.store';
import { mapToBase64 } from '../../utils';

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

export default function CompaniesForm() {
  const classes = useStyles();
  const [company, { create }] = useCompany();

  const handleSubmit = async (values) => {
    const newCompany = values;
    const { actions, certificates } = values;
    newCompany.actions = await mapToBase64(actions);
    newCompany.certificates = await mapToBase64(certificates);
    console.log('submit', values);
    return create(values);
  }

  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <CompanyForm handleSubmit={handleSubmit} />
      </Paper>
    </div>
  );
}
