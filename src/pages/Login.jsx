import { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import AppContext from '../context/AppContext';
import Waves from '../components/waves';
// Components
import Loader from '../components/Loader';

import loginService from '../services/user';

const Login = () => {
  const { setRole, setIsLogged } = useContext(AppContext);
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const getRole = (token) => {
    const decoded = jwt_decode(token);
    setRole(decoded.profile);
    localStorage.setItem("profile", decoded.profile);
  };

  const handleLogin = async () => {
    setIsLoad(true);
    const response = await loginService(data);
    if (response.message === "Success") {
      localStorage.setItem("token", response.token);
      getRole(response.token);
      setIsLogged(true);
      setIsLoad(false);
      navigate("home");
    } else {
      setIsLoad(false);
      Swal.fire({
        icon: 'error!',
        title: 'Oops...',
        confirmButtonColor: '#fee804',
        text: 'Algo salió mal, inténtalo nuevamente',
      });
    }
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div className='Div_Login' data-testid="login">
      <Loader isLoad={isLoad} onclose={() => { setIsLoad(false) }}></Loader>
      <Waves className='Waves' />
      <div className='Div_form_container'>
      <div className='Div_logo'></div>
        <div className='Div_center'>
          <div className='Div_form'>
            <h1>Inicia sesión</h1>
            <TextField className='textField' id="outlined-email" label="Email" name="email" value={data.email} variant="filled" onChange={handleChange} />
            <TextField className='textField' type="password" id="outlined-password" label="Contraseña" name="password" value={data.password}  variant="filled" onChange={handleChange} />
            <Button onClick={handleLogin} className='button' variant="contained">Entrar</Button>
          </div>
        </div>
       
      </div>
     
    </div>
  );
};

export default Login;
