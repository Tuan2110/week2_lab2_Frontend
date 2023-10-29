import React from 'react'
import { useState } from 'react';
import { Menu } from './menu'
import axios from 'axios';
import { API_BASE_PATH } from '../properties';
import './order.css'

export const Order = () => {
    const [order, setOrder] = useState('date');
    const [date, setDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [empId, setEmpId] = useState('');
    const [tableData, setTableData] = useState([]);

    const fetchData = () => {
        if (order === "date") {
            axios.get(`${API_BASE_PATH}/orders/date?date=${date}`)
                .then(response => setTableData(response.data))
                .catch(error => console.error('Error fetching data:', error));
        } else if (order === "period") {
            axios.get(`${API_BASE_PATH}/orders/period?fromDate=${fromDate}&toDate=${toDate}`)
                .then(response => setTableData(response.data))
                .catch(error => console.error('Error fetching data:', error));
        } else if (order === "empPeriod") {
            axios.get(`${API_BASE_PATH}/orders/empPeriod?empId=${empId}&fromDate=${fromDate}&toDate=${toDate}`)
                .then(response => setTableData(response.data))
                .catch(error => console.error('Error fetching data:', error));
        } else {
            setTableData([]);
        }
    }

    const viewInput = () => {
        if (order === "date") {
            return (
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
            )
        } else if (order === "period") {
            return (
                <div>
                    <label htmlFor="fromDate">From Date:</label>
                    <input type="date" id="fromDate" name="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    <label htmlFor="toDate">To Date:</label>
                    <input type="date" id="toDate" name="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
            )
        } else if (order === "empPeriod") {
            return (
                <div>
                    <label htmlFor="empId">Employee Id:</label>
                    <input type="text" id="empId" name="empId" value={empId} onChange={(e) => setEmpId(e.target.value)} />
                    <label htmlFor="fromDate">From Date:</label>
                    <input type="date" id="fromDate" name="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    <label htmlFor="toDate">To Date:</label>
                    <input type="date" id="toDate" name="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
            )
        }
    }

    return (
        <div>
            <h1>Management</h1>
            <Menu />
            <br />
            <h1>Order</h1>
            <select name="order" id="order" value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="date">Date</option>
                <option value="period">Period</option>
                <option value="empPeriod">Employee Period</option>
            </select>
            <div id='input'>{viewInput()}</div>
            <br />
            <button id='btn' onClick={fetchData}>
                View
            </button>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Customer</th>
                        <th>Address</th>
                        <th>Total Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((element, index) => (
                        <tr key={index}>
                            <td>{element.employeeName}</td>
                            <td>{element.customerName}</td>
                            <td>{element.address}</td>
                            <td>{element.totalQuantity}</td>
                            <td>{element.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
