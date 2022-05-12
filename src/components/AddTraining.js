import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/lab';


function AddTraining({ addTraining, linkki })
{

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity: '',
        duration: '',
        date: '',
        customer: linkki
    })

    const handleClickOpen = () =>
    {
        setOpen(true);
    };

    const handleClose = () =>
    {
        setOpen(false);
    };

    const handleSave = () =>
    {
        addTraining(training);

    }

    const inputChanged = (event) =>
    {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddTaskIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Select Date"
                            value={training.date}
                            onChange={(newValue) =>
                            {
                                setTraining({ ...training, date: dayjs(newValue) });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        name="duration"
                        type="number"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default AddTraining;