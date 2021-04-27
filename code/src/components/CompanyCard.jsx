import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
  }),
};

const defaultProps = {
  company: {
    name: 'test',
    picture: '',
    description: 'test',
    country: '',
  },
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '10px',
  },
});

export default function CompanyCard({ company }) {
  const classes = useStyles();

  const { name, picture, description, country } = company;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={`${name}, ${country}`}
          height="140"
          image={picture}
          title={`${name}, ${country}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CompanyCard.propTypes = propTypes;
CompanyCard.defaultProps = defaultProps;
