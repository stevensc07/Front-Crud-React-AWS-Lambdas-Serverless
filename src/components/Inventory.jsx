
import React, { useContext } from 'react';
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
import { InputLabel } from '@mui/material';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { Edit, Add, Search, Download } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import companyService from '../services/company';
import inventoryService from '../services/inventory';
import AppContext from '../context/AppContext';



function Inventory(props) {
    const { role } = useContext(AppContext)
    const [selectedCompany, setSelectedCompany] = React.useState();
    const [formValidation, setFormValidation] = React.useState({})
    const [dialogTitle, setDialogTitle] = React.useState(false);
    const [companies, setCompanies] = React.useState([]);
    const [inventory, setInventory] = React.useState({});
    const [data, setData] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [isLoad, setIsload] = React.useState(false)
    const [isDisabled, setIsDisabled] = React.useState(false)



    React.useEffect(() => {
        // Este efecto se ejecutará solo una vez, al cargar el componente.
        async function fetchData() {
            const response = await companyService.getCompaniesService()
            setCompanies(response);
        }
        fetchData();

    }, []);


    const handleClickOpen = () => {
        setDialogTitle("Agregar")
        setOpen(true);
        setIsDisabled(false);
        setInventory({})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = async (event) => {
        setSelectedCompany(event.target.value);
    };

    const handleChangeInventory = (event) => {
        setInventory({ ...inventory, [event.target.name]: event.target.value })
        setFormValidation({ ...formValidation, [event.target.name]: !event.target.value })

    }
    const handleClickInventory = async () => {
        setData([])
        setIsload(true);
        const response = await inventoryService.getInventory({ nit: selectedCompany })
        setData(response);
        setIsload(false);

    };

    const handleEdit = (data) => {
        setOpen(true);
        setDialogTitle("Editar");
        setIsDisabled(true);
        setInventory({ nit: selectedCompany, fullName: data.fullName, quantity: data.quantity, description: data.description })
    }

    const handleCreate = async () => {
        setIsload(true);
        handleClose()
        await inventoryService.createOrUpdateInventoryService(
            { nit: selectedCompany, fullName: inventory.fullName, quantity: Number(inventory.quantity), description: inventory.description })
        handleClickInventory()
        setIsload(false);

    };

    const handleSendEmail = () => {
        Swal.fire({
            title: 'Ingresa el correo electronico destino',
            input: 'email',
            inputAttributes: {
                autocapitalize: 'off'
            },
            confirmButtonColor: '#fee804',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                return inventoryService.pdfService({ nit: selectedCompany, email: email })
                    .then(response => {
                        if (!response.message) {
                            throw new Error("error")
                        }
                        return email
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: `PDF generado y enviado al correo: ${result.value}`,
                    icon: 'success',
                    confirmButtonColor: '#fee804'
                })
            }
        })
    }

    const handleDelete = async (data) => {
        setIsload(true);
        await inventoryService.deleteInventoryService({ nit: selectedCompany, fullName: data.fullName })
        handleClickInventory()
        setIsload(false);

    }

    return (

        <div className='Div_Inventory_principal'>

            <Loader isLoad={isLoad} onclose={() => { setIsload(false) }}></Loader>

            <div className='Div_header'>
                <h1>Inventario</h1>
                {
                    role === "admin" &&
                    <div>
                        <Button disabled={!data} sx={{ mr: 2 }} onClick={handleClickOpen} color="secondary" variant="outlined" startIcon={<Add />}>
                            Agregar
                        </Button>
                        <Button color="secondary" disabled={!data} onClick={handleSendEmail} variant="outlined" startIcon={<Download />}>
                            Enviar archivo
                        </Button>
                    </div>
                }


            </div>


            <FormControl variant="standard" className='Select_company' >
                <InputLabel sx={{ color: 'white', pl: 3 }}>Seleccione la compañía</InputLabel>
                {companies.length !== 0 && <Select
                    className='select'
                    getByTestId="select_value"
                    value={selectedCompany}
                    onChange={handleChange}
                    variant='outlined' sx={{
                        '.MuiSelect-icon': {
                            color: 'white'
                        },
                        ".MuiSelect-outlined": {
                            color: 'white',
                            borderColor: 'white'
                        }
                    }}
                >
                    {companies.map((name) => (
                        <MenuItem
                            key={name.SK}
                            value={name.nit}
                        >
                            {name.fullName}
                        </MenuItem>
                    ))}
                </Select>
                }

                <Button className='button' disabled={!selectedCompany} dense="true" onClick={() => handleClickInventory()} color="secondary" variant='contained' startIcon={<Search />}>
                    Buscar
                </Button>
            </FormControl>
            <div className='Div_table'>
                <TableContainer className='Table_container' component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className='Table_head'>
                                <TableCell className='Cell_item'>Nombre</TableCell>
                                <TableCell className='Cell_item' align="center">Descripción</TableCell>
                                <TableCell className='Cell_item' align="center">Cantidad</TableCell>
                                {
                                    role === "admin" &&
                                    <TableCell className='Cell_item' align="center">Acción</TableCell>
                                }

                            </TableRow>
                        </TableHead>
                        {data?.length !== 0 && <TableBody>
                            {data?.map((row) => (
                                <TableRow
                                    className='Table_row'
                                    key={row.SK}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell className='Cell_item' component="th" scope="row">
                                        {row.fullName}
                                    </TableCell>
                                    <TableCell className='Cell_item' align="center">{row.description}</TableCell>
                                    <TableCell className='Cell_item' align="center">{row.quantity}</TableCell>
                                    {
                                        role === "admin" &&
                                        <TableCell className='Cell_item' align="center">
                                            <IconButton onClick={() => handleEdit(row)} className='Button_icon' aria-label="edit" size="large">
                                                <Edit fontSize="inherit"></Edit>
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(row)} className='Button_icon' aria-label="delete" size="large">
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>}

                    </Table>
                </TableContainer>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className='Dialog_title'><center> {dialogTitle} Compañía</center></DialogTitle>
                <DialogContent className='Dialog_container'>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: { xs: 1, sm: 3 }, width: { xs: '100%', sm: '41%' } }, '& .MuiFormControl-fullWidth': { width: '90%' } }}
                        autoComplete="off">
                        <TextField
                            id="outlined-error"
                            data-testid="input-fullname"
                            label="Nombre"
                            disabled={isDisabled}
                            name='fullName'
                            required
                            error={formValidation.fullName}
                            helperText={formValidation.fullName && "Requerido"}
                            value={inventory.fullName}
                            onChange={handleChangeInventory}
                        />
                        <TextField
                            type="number"
                            data-testid="input-quantity"
                            label="Cantidad"
                            name='quantity'
                            value={inventory.quantity}
                            required
                            error={formValidation.quantity}
                            helperText={formValidation.quantity && "Requerido"}
                            onChange={handleChangeInventory}
                        />
                        <TextField
                            fullWidth
                            data-testid="input-description"
                            label="Descripción"
                            name='description'
                            value={inventory.description}
                            onChange={handleChangeInventory}
                            multiline
                            rows={3}
                        />
                    </Box>
                </DialogContent>
                <DialogActions className='Div_button_container'>
                    <Button variant='outlined' className='Button cancel' onClick={handleClose}>Cancelar</Button>
                    <Button disabled={formValidation.fullName || formValidation.quantity} className='Button Add' onClick={handleCreate}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



export default Inventory;