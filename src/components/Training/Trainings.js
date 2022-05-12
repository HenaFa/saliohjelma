import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import dayjs from "dayjs";


function Trainings()
{
    const [trainings, setTrainings] = useState([]);

    useEffect(() =>
    {
        fetchTrainings();
    }, []);

    const SERVER_URL = "https://customerrest.herokuapp.com/api";
    const fetchTrainings = () =>
    {
        fetch(SERVER_URL + "/trainings")
            .then(response => response.json())
            .then(data => setTrainings(data.content))
    }

    const deleteTraining = (link) =>
    {
        if (window.confirm('Are you sure'))
        {
            fetch(link, { method: 'DELETE' })
                .then(response =>
                {
                    if (response.ok)
                    {
                        fetchTrainings();
                    } else
                    {
                        alert("Something went wrong");
                    }
                })
        }
    }

    const addTraining = (training) =>
    {
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response =>
            {
                if (response.ok)
                {
                    fetchTrainings();
                } else
                {
                    alert("Something went wrong!")
                }
            })
            .catch(err => console.error(err))
    }


    const columns = [
        { field: 'activity', sortable: true, filter: true },
        { field: 'duration', sortable: true, filter: true },
        {
            field: 'date', sortable: true, filter: true, cellRenderer: (data) =>
            {
                return dayjs(data.value).format('DD.MM.YYYY')
            }
        },

        {
            headerName: '',
            width: 100,
            field: 'links[1].href',
            cellRenderer: params =>
                <IconButton color='error' onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]

    return (
        <>

            <div className="ag-theme-material" style={{ height: 400, width: '90%' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellFocus={true}
                />
            </div>
        </>
    )
}

export default Trainings;