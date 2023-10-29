import React from 'react'
import { Link } from 'react-router-dom'

export const Menu = () => {
    return (
        <div>
            <Link to="/mng-product"><button>Product</button></Link>
            <Link to="/mng-order"><button>Order</button></Link>
        </div>
    )
}
