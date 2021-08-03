
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Preloader = (props) => {
  return (
    <div style={{display:"flex",marginTop:"100px", minHeight:"600px",alignItems:"center",alignContent:"center",justifyContent:"center"}}>
      <div><CircularProgress color={'primary'} size={200} style={{'color': 'gray'}}/></div>
    </div>
  );
};

export default Preloader
