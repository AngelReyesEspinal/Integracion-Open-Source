import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import post from '../../services/post'
import get from '../../services/get'
import LinearIndeterminate from '../Loading'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import operationSuccess from '../../notifications'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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

const initialValues = {
  matricula: "",
  indiceAcumulado: "",
  indiceCuatrimestral: ""
};

const TssDocument = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: { ...initialValues },
    mode: "onChange"
  })
  const classes = useStyles();

  useEffect( () => {
    get('estudiantes').then(data => {
      setTableData(data.data)
    })
  }, [])

  async function onSubmit(data) {
    data.indiceAcumulado = parseFloat(data.indiceAcumulado)
    data.indiceCuatrimestral = parseFloat(data.indiceCuatrimestral)
    setIsLoading(true)
    await post('estudiantes', data)
    setIsLoading(false)
    operationSuccess()
    const response = await get('estudiantes')
    setTableData(response.data) 
    reset(initialValues)
  }

  return (
    <div>

      <Paper className={classes.paper}>
        <div style={padding}>
          <Typography variant="h5" gutterBottom>
            <span style={title}>
              <strong> AGREGAR ESTUDIANTE ➕ </strong>
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
                <TextField
                  name="indiceAcumulado"
                  error={errors.indiceAcumulado ? true : false}
                  helperText={errors.indiceAcumulado && errors.indiceAcumulado.message}
                  inputRef={register({ required: "El índice acumulado es obligatoria" })}
                  fullWidth
                  type="text"
                  label="índice acumulado"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="indiceCuatrimestral"
                  error={errors.indiceCuatrimestral ? true : false}
                  helperText={errors.indiceCuatrimestral && errors.indiceCuatrimestral.message}
                  inputRef={register({ required: "El índice cuatrimestral es obligatoria" })}
                  fullWidth
                  type="text"
                  label="índice cuatrimestral"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <div style={alignBtnSend}>
                  <Button type="submit" variant="contained" color="primary">
                    Guardar información &nbsp; <CloudUploadIcon />
                  </Button>
                </div>
              </Grid>

            </Grid>
          </form>
        </div>
      </Paper>

      <br />

      <Paper className={classes.paper}>
        <div style={padding}>

          <Typography variant="h5" gutterBottom>
            <span style={title}>
              <strong> LISTADO ESTUDIANTES UNAPEC 👨‍🎓 </strong>
            </span>
          </Typography>

          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><strong> MATRICULAS </strong> </TableCell>
                  <TableCell align="center"><strong>INDICE ACADEMICO </strong> </TableCell>
                  <TableCell align="center"><strong>INDICE CUATRIMESTRAL </strong> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.matricula}</TableCell>
                    <TableCell align="center">{row.indiceAcumulado}</TableCell>
                    <TableCell align="center">{row.indiceCuatrimestral}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
      </Paper>
    </div>
  )
}

export default TssDocument;