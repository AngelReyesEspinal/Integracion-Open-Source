import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';

import post, { postCustom } from '../../services/post'
import get from '../../services/get'
import LinearIndeterminate from '../Loading'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const Swal = require('sweetalert2')

const title = {
  color: 'black'
}

const mt15 = {
  marginTop: 15,
}

const alignBtnSend = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const padding = {
  padding: '10px 10px 10px 10px',
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
}));

let rows = [];

const SingleStudent = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const { register, handleSubmit, errors } = useForm()
  const classes = useStyles();

  useEffect( () => {
    get('estudiantes').then(data => {
      setTableData(data.data)
    })
  }, [])

  async function onSubmit(data) {
    debugger;
    setIsLoading(true)
    let r = await postCustom('estudiantes/creditos/'+data.matricula)
    console.log(r)
    setIsLoading(false)

    Swal.fire(
        'El estudiante: ' + data.matricula,
        `Puede tomar ${r.data.creditos} créditos`,
        'success'
      )
  }

  return (
    <div>

      <Paper className={classes.paper}>
        <div style={padding}>
          <Typography variant="h5" gutterBottom>
            <span style={title}>
              <strong> CONSULTA ESTUDIANTE 👨‍🎓 </strong>
            </span>
          </Typography>

          {isLoading && <LinearIndeterminate />}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={mt15}>

              <Grid item xs={12}>
                <TextField
                  name="matricula"
                  error={errors.matricula ? true : false}
                  helperText={errors.matricula && errors.matricula.message}
                  inputRef={register({ required: "La matrícula es obligatoria" })}
                  fullWidth
                  type="number"
                  label="Matrícula"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <div style={alignBtnSend}>
                  <Button type="submit" variant="contained" color="primary">
                    CONSULTAR CREDITOS 
                  </Button>
                </div>
              </Grid>

            </Grid>
          </form>
        </div>
      </Paper>

    </div>
  )
}

export default SingleStudent;