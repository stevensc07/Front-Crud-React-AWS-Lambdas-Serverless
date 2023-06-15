import React, { useContext } from 'react';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { Button, Chip, Avatar } from '@mui/material';
import { InventoryOutlined, BusinessOutlined } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppContext from '../context/AppContext';
import Toolbar from '@mui/material/Toolbar';

function DrawerComponent(props) {
  const { role, setRole, setIsLogged } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (path) => {
    navigate(path, { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setIsLogged(false);
    setRole(null);
    navigate("", { replace: true });
  };

  return (
    <div className='Div_Drawer_content'>
      <div>
        <Toolbar />
        <div className='Logo_drawer'></div>
        <List className='Div_list'>
          <ListItem className='List_item' disablePadding>
            <ListItemButton onClick={() => handleLogin("")}>
              <ListItemIcon className='List_icon'>
                <BusinessOutlined />
              </ListItemIcon>
              <ListItemText primary={"Compañías"} />
            </ListItemButton>
          </ListItem>

          <ListItem className='List_item' disablePadding>
            <ListItemButton onClick={() => handleLogin("../home/inventory")}>
              <ListItemIcon className='List_icon'>
                <InventoryOutlined />
              </ListItemIcon>
              <ListItemText primary={"Inventario"} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>

      <div className='Div_drawer_footer'>
        <Chip
          className='Chip_user'
          variant="outlined"
          avatar={<Avatar>{role === "admin" ? 'A' : 'U'}</Avatar>}
          label={role === "admin" ? "Admin" : "Externo"}
        />
        <Divider className='Divider' />
        <Button onClick={handleLogout} color='primary' variant="text">
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export default DrawerComponent;
