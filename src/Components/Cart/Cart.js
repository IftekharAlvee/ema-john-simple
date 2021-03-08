import React from 'react';

const Cart = (props) => {

    const cart = props.cart;
    // console.log(cart);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price*product.quantity;
    }

    let tax = 0;
    tax = total/10;
    tax = Math.round(tax);

    let shipping = 0;
    if (total>0){
        shipping = 12.99;
    }
    else if(total>15){
        shipping = 4.99;
    }
    else if(total>35){
        shipping = 0;
    }

    let grandTotal = total + tax + shipping;
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Item Ordered {cart.length}</p>
            <p>Product Price:{total}</p>
            <p>shipping cost: {shipping}</p>
            <p>Tax: {tax}</p>
            <p>grandTotal: {grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;