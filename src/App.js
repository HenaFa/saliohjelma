import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Navigointi from './components/Navigointi';


function App()
{
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            My Saliohjelma
          </Typography>
        </Toolbar>
      </AppBar>
      <Navigointi />
    </div>
  );
}

export default App;
