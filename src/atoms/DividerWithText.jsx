import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  border: {
    borderBottom: "2px solid lightgray",
    width: "100%"
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 1000,
    color: "lightgray",
    whiteSpace: 'nowrap',
  }
}));

const DividerWithText = ({ children }) => {
 const classes = useStyles();
 return (
  <div className={classes.container}>
    <div className={classes.border} />
    {children !== '' && (<span className={classes.content}>{children}</span>)}
    <div className={classes.border} />
  </div>
 );
};

DividerWithText.propTypes = {
  children: PropTypes.string,
}

DividerWithText.defaultProps = {
  children: '',
}

export default DividerWithText;
