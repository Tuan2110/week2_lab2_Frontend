
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { PRODUCTS } from "../../products";
import axios from "axios";
import { API_BASE_PATH } from "../../properties";
import { useNavigate } from 'react-router-dom';

// This value is from the props in the UI
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency,showSpinner,amount,payload }) => {
    const [{ isPending,options },dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,currency:currency
            },
        });
    }, [currency,showSpinner]);
    const navigate = useNavigate();
    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style,currency,amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    }).then((orderId) => orderId)}
                onApprove={(data,actions) =>
                    actions.order.capture().then(async(response) => {
                            console.log(response);
                            console.log(payload);
                            const orderDetails = []
                            PRODUCTS.map((product) => {
                                if (payload.cartItems[product.id] !== 0) {
                                    orderDetails.push({
                                        product: { id: product.id },
                                        quantity: payload.cartItems[product.id],
                                        price: product.price,
                                        note : ""
                                    })
                                }
                            })
                            const order = {
                                //format date : yyyy-MM-dd
                                "orderDate" : new Date().toISOString().slice(0,10),
                                "customer" : {"id": localStorage.getItem("customer_id")},
                                "employee" : {"id" : 2},
                                "orderDetails" : orderDetails,
                                "address" : "Da Nang"
                            }
                        //post order to server
                        await axios.post(`${API_BASE_PATH}/orders`,order)
                            .then(response => {
                                console.log(response);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                        //clear cart
                        payload.PRODUCTS.map((product) => {
                            payload.cartItems[product.id] = 0
                        })
                        if(response.status === "COMPLETED"){
                            alert("Payment success")
                            navigate('/home');
                        }
                            
                    })
                }
            />
        </>
    );
}

export default function PayPal({amount,payload}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}