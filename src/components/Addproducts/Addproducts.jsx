import React, { useState } from "react";
import './Addproducts.css';
import Upload from '../../assets/upload_area.svg';

const Addproducts = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        new_price: '',
        old_price: '',
        category: 'women',
        description: '',
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const addProduct = async () => {
        const formdata = new FormData();
        formdata.append("name", productDetails.name);
        formdata.append("new_price", productDetails.new_price);
        formdata.append("old_price", productDetails.old_price);
        formdata.append("category", productDetails.category);
        formdata.append("description", productDetails.description);
        formdata.append("image", image);

        await fetch('https://shopper-backend-nine.vercel.app/addproduct', {
            method: 'POST',
            body: formdata
        })
        .then((resp) => resp.json())
        .then((data) => {
            data.success ? alert("Product added") : alert("Product not added");
        })
        .catch((err) => console.log(err));
    };

    return (
        <div className="addproducts">
            <div className="addproducts-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
            </div>
            <div className="addproduct-price">
                <div className="addproducts-itemfield">
                    <p>Product price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
                </div>
                <div className="addproducts-itemfield">
                    <p>Offer price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
                </div>
                <div className="addproducts-itemfield">
                    <p>Product description</p>
                    <input value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder="Type here" />
                </div>
            </div>
            <div className="addproducts-itemfield">
                <p>Product category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="addproducts-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproducts-itemfield">
                <p>Product image</p>
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : Upload} className="addproduct-thumbnailimage" alt="Upload" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={addProduct} className="addproducts-button">
                Add product
            </button>
        </div>
    );
};

export default Addproducts;
