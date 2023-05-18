import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit, Add } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import companyService from '../services/company';
import Loader from './Loader';
import Swal from 'sweetalert2';
import AppContext from '../context/AppContext';

const errorAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    confirmButtonColor: '#fee804',
    text: 'Algo salió  mal!, intentalo nuevamente',
  });
};

function Company(props) {
  const { role } = useContext(AppContext);
  const [isLoad, setIsload] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(false);
  const [data, setData] = useState([]);
  const [formValidation, setFormValidation] = useState({});
  const [company, setCompany] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Este efecto se ejecutará solo una vez, al cargar el componente.
    async function fetchData() {
      setIsload(true);
      try {
        const response = await companyService.getCompaniesService();
        if (response) {
          setData(response);
          setIsload(false);
        } else {
          setIsload(false);
          errorAlert();
        }
      } catch (e) {
        setIsload(false);
        errorAlert();
      }
    }
    fetchData();
  }, []);

  async function fetchGetCompanies() {
    setData([]);
    const response = await companyService.getCompaniesService();
    setData(response);
    setIsload(false);
  }

  const handleClickOpen = () => {
    setDialogTitle('Agregar');
    setIsDisabled(false);
    setOpen(true);
    setCompany({});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (data) => {
    setOpen(true);
    setDialogTitle('Editar');
    setIsDisabled(true);
    setCompany({ fullName: data.fullName, nit: data.nit, address: data.address, phone: data.phone });
  };

  const handleDelete = async (data) => {
    setIsload(true);
    try {
      await companyService.deleteCompanyService({ nit: data.nit });
      fetchGetCompanies();
      setIsload(false);
    } catch (e) {
      setIsload(false);
      errorAlert();
    }
  };

  const handleChange = (event) => {
    setCompany({ ...company, [event.target.name]: event.target.value });
    setFormValidation({ ...formValidation, [event.target.name]: !event.target.value });
  };

  const handleCreate = async () => {
    handleClose();
    setIsload(true);
    try {
      await companyService.createOrUpdateCompanyService(company);
      fetchGetCompanies();
      setIsload(false);
    } catch (e) {
      setIsload(false);
      errorAlert();
    }
  };

  return (
    <div className="Div_Company_principal">
      <Loader isLoad={isLoad} onclose={() => { setIsload(false) }}></Loader>
      <div className="Div_header">
        <h1>Compañías </h1>
        {role === 'admin' && (
          <Button onClick={handleClickOpen} color="secondary" variant="outlined" startIcon={<Add />}>
            Agregar
          </Button>
        )}
      </div>
      <div className="Div_table">
        <TableContainer className="Table_container" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="Table_head">
                <TableCell className="Cell_item">Nombre</TableCell>
                <TableCell className="Cell_item" align="center">
                  NIT
                </TableCell>
                <TableCell className="Cell_item" align="center">
                  Dirección
                </TableCell>
                <TableCell className="Cell_item" align="center">
                  Telefono
                </TableCell>
                <TableCell className="Cell_item" align="center">
                  Fecha creación
                </TableCell>
                {role === 'admin' && <TableCell className="Cell_item" align="center">Acción</TableCell>}
              </TableRow>
            </TableHead>
            {data?.length !== 0 && (
              <TableBody>
                {data?.map((row) => (
                  <TableRow className="Table_row" key={row.SK} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell className="Cell_item" component="th" scope="row">
                      {row.fullName}
                    </TableCell>
                    <TableCell className="Cell_item" align="center">{row.nit}</TableCell>
                    <TableCell className="Cell_item" align="center">{row.address}</TableCell>
                    <TableCell className="Cell_item" align="center">{row.phone}</TableCell>
                    <TableCell className="Cell_item" align="center">{row.creationDate}</TableCell>
                    {role === 'admin' && (
                      <TableCell className="Cell_item" align="center">
                        <IconButton onClick={() => handleEdit(row)} className="Button_icon" aria-label="edit" size="large">
                          <Edit fontSize="inherit"></Edit>
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row)} className="Button_icon" aria-label="delete" size="large">
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="Dialog_title">
          <center> {dialogTitle} Compañía</center>
        </DialogTitle>
        <DialogContent className="Dialog_container">
          <Box
            component="form"
            noValidate
            sx={{
              '& .MuiTextField-root': { m: { xs: 1, sm: 3 }, width: { xs: '100%', sm: '41%' } },
            }}
            autoComplete="off"
          >
            <TextField
              id="outlined-error"
              label="Nombre"
              name="fullName"
              required
              error={formValidation.fullName}
              helperText={formValidation.fullName && 'Requerido'}
              value={company.fullName}
              onChange={handleChange}
            />
            <TextField
              label="NIT"
              name="nit"
              disabled={isDisabled}
              type="number"
              value={company.nit}
              required
              error={formValidation.nit}
              helperText={formValidation.nit && 'Requerido'}
              onChange={handleChange}
            />
            <TextField
              id="outlined-error"
              label="Dirección"
              name="address"
              error={formValidation.address}
              required
              helperText={formValidation.address && 'Requerido'}
              value={company.address}
              onChange={handleChange}
            />
            <TextField
              label="Teléfono"
              name="phone"
              inputProps={{ maxLength: 10 }}
              error={formValidation.phone}
              required
              helperText={formValidation.phone && 'Requerido'}
              value={company.phone}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions className="Div_button_container">
          <Button variant="outlined" className="Button cancel" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            className="Button Add"
            disabled={formValidation.fullName || formValidation.nit || formValidation.address || formValidation.phone}
            onClick={handleCreate}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Company;
