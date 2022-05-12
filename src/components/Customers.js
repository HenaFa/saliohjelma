import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";
import AddTraining from "./AddTraining";

function Customers()
{
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('')

    useEffect(() =>
    {
        fetchCustomers();
    }, []);

    const SERVER_URL = "https://customerrest.herokuapp.com/api";
    const fetchCustomers = () =>
    {
        fetch(SERVER_URL + "/customers")
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    const deleteCustomer = (link) =>
    {
        if (window.confirm('Are you sure'))
        {
            fetch(link, { method: 'DELETE' })
                .then(response =>
                {
                    if (response.ok)
                    {
                        setMsg('Customer Deleted')
                        setOpen(true);
                        fetchCustomers();
                    } else
                    {
                        alert("Something went wrong");
                    }
                })
        }
    }

    const addCustomer = (customer) =>
    {
        fetch(SERVER_URL + "/customers", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response =>
            {
                if (response.ok)
                {
                    fetchCustomers();
                } else
                {
                    alert("Something went wrong!")
                }
            })
            .catch(err => console.error(err))
    }

    const updateCustomer = (updatedCustomer, link) =>
    {
        console.log(link)
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response =>
            {
                if (response.ok)
                {
                    setMsg("Customer successfully edited")
                    setOpen(true)
                    fetchCustomers();
                } else
                {
                    alert("Something went wrong when editing customer");
                }
            })
            .catch(err => console.error(err))
    }

    const addTraining = (training) =>
    {
        fetch(SERVER_URL + "/trainings", {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response =>
            {
                if (response.ok)
                {
                    setMsg("Training Added");
                    setOpen(true);
                    fetchCustomers();
                } else
                {
                    alert("Something went wrong when adding training!")
                }
            })
            .catch(err => console.error(err))
    }
    const columns = [
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true, width: 120 },
        { field: 'city', sortable: true, filter: true, width: 120 },
        { field: 'email', sortable: true, filter: true, width: 120 },
        { field: 'phone', sortable: true, filter: true, width: 120 },
        {
            headerName: '',
            field: 'links',
            width: 150, cellRenderer: params =>
            {
                return <>
                    <AddTraining addTraining={addTraining} linkki={params.data.links[0].href} />
                </>
            }
        },
        {
            headerName: '',
            width: 100,
            field: 'links',
            cellRenderer: params => <Editcustomer updateCustomer={updateCustomer} params={params} linkki={params.data.links[0].href} />
        },
        {
            headerName: '',
            width: 100,
            field: 'links',
            cellRenderer: params =>
            {
                return <IconButton color='error' onClick={() => deleteCustomer(params.data.links[0].href)}>
                    <DeleteIcon />
                </IconButton>
            }
        }

    ]

    return (
        <>
            <Addcustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: 400, width: '90%' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellFocus={true}
                />
            </div>
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default Customers;