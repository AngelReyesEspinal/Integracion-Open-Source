import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import SingleStudent from '../../components/SingleStudent'
import TssDocument from '../../components/TssDocument'



const padding = {
  padding: '10px 10px 10px 10px',
}

const Downlaod = () => {
  
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TssDocument />
        </Grid>
      </Grid>
    </div>
  )
}

export default Downlaod;
