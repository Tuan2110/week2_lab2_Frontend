import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'
import { PRODUCTS } from '../../products'

export const Product = (props) => {
    const {id,productName,price,productImage} = props.data;
    const {addToCart,cartItems} = useContext(ShopContext);
    const cartItemAmount = cartItems[id];
    var sockets = {};
    function connect(id) {
    sockets[id] = new WebSocket("ws://localhost:8080/week2/productWebSocket/" + id);

    sockets[id].onmessage = function (event) {
            var productPrice = document.getElementById(id);
            productPrice.innerHTML = "$" + event.data;
        };
    }
    function init() {
        PRODUCTS.forEach(function (product) {
            connect(product.id);
        });
    }
    return (
        <div onLoad={()=>init()} className='product'>
            <img src={productImage} alt={productName}/>
            <div className='description'>
                <p>
                    <b>{productName}</b>
                </p>
                <p id={id}> 
                </p>
            </div>
            <button className='addToCartBttn' onClick={()=>addToCart(id)}>Add to Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}</button>
        </div>
    )
}
