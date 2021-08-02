
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(5),
    },
  },
}));

export default (props) => {

  const classes = useStyles();
  return (
    <div style={{display:"flex",marginTop:"100px", minHeight:"600px",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
      <div><CircularProgress color={'primary'} size={200} style={{'color': 'gray'}}/></div>
    </div>
  );
};
