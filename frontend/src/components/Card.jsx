import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    fontWeight:'bold',
    color:'white'
  },
  pos: {
    marginBottom: -20,
    color:'white'
  },
});

export default function BasicCard(props) {
  const {name,count=0,bgcolor,color,clickhandler} =props
  
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} style={{backgroundColor:bgcolor,color:color}} onClick={clickhandler}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {count}
        </Typography>
        <Typography variant="h5" component="h2">
          <span style={{fontWeight:'bolder'}}>{name}</span>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Click to view {'>>>>'}
        </Typography>
      </CardContent>
    </Card>
  );
}
