import '../App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Trainings from './Training/Trainings';
import Customers from './Customer/Customers';


function Navigointi()
{
    const [value, setValue] = useState('one');

    const handleChange = (event, value) =>
    {
        setValue(value);
    }
    return (
        <div className="App">
            <div>
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="one" label="Customers" />
                    <Tab value="two" label="Trainings" />
                </Tabs>
                {value === 'one' && <Customers />}
                {value === 'two' && < Trainings />}
            </div>
            <Router>
                <Routes>
                    <Route path='/Customers' element={<Customers />} />
                    <Route path='/Trainings' element={<Trainings />} />
                </Routes>
            </Router>
        </div>
    );
}

export default Navigointi;
