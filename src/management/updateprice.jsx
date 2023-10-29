import React from 'react'
import axios from 'axios';
import { API_BASE_PATH } from '../properties';
import './updateprice.css'
import { useNavigate } from 'react-router-dom';

export const UpdatePrice = () => {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('=') + 1);
  const navigate = useNavigate();

  const handleUpdate = () => {
    var productPrice = {
      product: { id: id },
      price: document.getElementById("new-price").value,
      priceDateTime: new Date().toISOString().slice(0, 10),
      note: document.getElementById("note").value
    }

    axios.post(`${API_BASE_PATH}/product-price`, productPrice)
      .then(response => {
        var socket = new WebSocket("ws://localhost:8080/week2/productWebSocket/" + id);
        socket.addEventListener('open', function (event) {
          var newPrice = productPrice.price;
          socket.send(newPrice);
        });
        alert("Update price successfully");
        navigate('/mng-product');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating price:', error);
      });
  }

  return (
    <div className="update-price-container">
      <label className="label" htmlFor="new-price">New Price:</label>
      <input className="input-field" id='new-price' name='new-price' type='text' /> <br />
      <label className="label" htmlFor="note">Note:</label>
      <input className="input-field" id='note' name='note' type='text' /> <br />
      <button className="button" onClick={handleUpdate}>Update</button>
    </div>
  )
}
