import React from 'react';
import './App.css';
import Container from "./Container";
import {BrowserRouter} from 'react-router-dom'
import { useMediaQuery, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Container/>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
