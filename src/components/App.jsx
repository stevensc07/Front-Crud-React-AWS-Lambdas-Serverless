import Router from '../routes';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#718daa"
    },
    secondary:{
      main: "#0e2f57"
    }
  }
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
