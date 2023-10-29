import React from 'react'
import { PRODUCTS } from '../../products'

export const Test = () => {
    var socket;

    function connect(id) {
        socket = new WebSocket("ws://localhost:8080/week2/api/v1/productWebSocket/" + id);
    }

    function updatePrice() {
        var newPrice = document.getElementById("newPrice").value;
        socket.send(newPrice);
    }
    function init(){
        alert("init");
        PRODUCTS.forEach(function (product) {
            document.getElementById("id").innerHTML += "<option value='" + product.id + "'>" + product.productName + "</option>";
        });
    }
    return (
        <div  onLoad={()=>init()} >
            <h1 onClick={()=>init()}>Edit Product Price</h1>
            <select  id="id" onChange={(e)=>connect(e.target.value)}>
            </select>
            <input type="text" id="newPrice" placeholder="New Price" />
            <button onClick={()=>updatePrice()}>Update Price</button>
        </div>
    )
}

