import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItem = (props) => {
    const {name, quantity, key} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        marginLeft: '100px'
    }
    const removeProduct = props.removeProduct;
    return (
        <div style={reviewItemStyle} >
            <h1 className="product-name"><Link>{name}</Link></h1>
            <p>Quantity : {quantity}</p>
            <br/>
            <button onClick={()=>removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;