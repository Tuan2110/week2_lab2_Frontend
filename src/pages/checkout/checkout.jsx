import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context'
import payment from '../../assets/payment.png'
import { PRODUCTS } from '../../products'
import PayPal from './paypal'
import './checkout.css'

const Checkout = () => {
    const { cartItems, getTotalAmount } = useContext(ShopContext);
    const totalAmount = getTotalAmount();
    return (
        <div>
            <img src={payment} alt="Payment" />
            <div className="cartItems">
                <table>
                    <tr>
                        <th style={{ color: 'black' }}>Name</th>
                        <th style={{ color: 'black' }}>Quantity</th>
                        <th style={{ color: 'black' }}>Price</th>
                        <th style={{ color: 'black' }}>Total</th>
                    </tr>
                {PRODUCTS.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return (
                            <tr>
                                <td>{product.productName}</td>
                                <td>{cartItems[product.id]}</td>
                                <td>{product.price}</td>
                                <td>{cartItems[product.id] * product.price}</td>
                            </tr>
                        )
                    }
                })}
                </table>
                <h3>Total Amount : ${totalAmount}</h3>
            </div>
            {/* <p>your address</p> */}
            <div id="pay">{<PayPal
            payload={{PRODUCTS,cartItems,totalAmount}}
            amount={totalAmount}/>}</div>
        </div>
    )
}

export default Checkout
