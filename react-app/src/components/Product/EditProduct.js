import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProductThunk, getAllProductsThunk } from "../../store/products";
// import "./editProduct.css"
import { loadMyProductsThunk } from "../../store/products";

const EditProduct = ({ productId, setShowEditForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.products.allProducts[productId]);
  const categories = [
    "Valentine",
    "Wedding & Party",
    "Home & Living",
    "Clothing & Shoes",
    "Gifts & Gift Cards",
    "Art & Collectibles",
  ];
  const [name, setName] = useState(product?.name);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [stock, setStock] = useState(product?.stock);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(loadMyProductsThunk());
    const errors = [];

    if (name.length < 10 || name.trim().length < 10)
      errors.push("Name: Name cannot be less than 10 characters");
    if (name.length > 250)
      errors.push("Name: Name cannot exceed 250 characters");
    if (category.length === 0)
      errors.push("Category: Category selection is required");
    if (description.length < 10 || description.trim().length < 10)
      errors.push("Description: Description cannot be less than 10 characters");
    if (description.length > 2000)
      errors.push("Description: Description cannot exceed 2000 characters");
    if (isNaN(price)) errors.push("Price: Price must be a number");
    if (price <= 0.1) errors.push("Price: Price must be greater than $1.00 ");
    if (price > 1000000) errors.push("Price: Price exceeds $1000 limit");
    if (!Number.isInteger(+stock) || stock < 1)
      errors.push("Stock: Stock must be an integer more than 0");
    if (stock > 10000) errors.push("Stock: Stcok must be less than 1000");

    setErrors(errors);
  }, [name, category, price, description, stock]);

  const editSubmit = async (e) => {
    e.preventDefault();
    if (errors.length > 0) return;

    const payload = { name, category, description, price, stock };

    const response = await dispatch(editProductThunk(payload, productId));
    if (response) setShowEditForm(false);
    // history.push(`/shop-manager`)
  };

  return (
    <div className="editproduct-wrapper">
      <div style={{color: 'grey', backgroundColor: 'white'}} className="editproduct-form-title">Edit Product</div>
      <form className="editproduct-form" onSubmit={editSubmit}>
        {/* <div className='eidtproduct-errors'>
                    <ul>
                        {errors && errors.map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div> */}
        <div className="editproduct-content">
          <label className="editproduct-label">
            <span className="editproduct-title">Name </span>

            <br></br>
            {errors?.map((error, i) => {
              if (error.split(":")[0] === "Name")
                return (
                  <div key={i} className="edit-product-errors">
                    •{error.split(":")[1]}
                  </div>
                );
            })}
            <input
              className="editproduct-input"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br></br>
          <label className="editproduct-label">
            <span className="editproduct-title">Category </span>

            <br></br>
            {errors?.map((error, i) => {
              if (error.split(":")[0] === "Category")
                return (
                  <div key={i} className="edit-product-errors">
                    •{error.split(":")[1]}
                  </div>
                );
            })}
            <select
              htmlFor="category"
              name="category"
              className="editproduct-input-select"
              required
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled selected value={category}>
                -- Select a Category --
              </option>
              {categories.map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </label>
          <br></br>
          <label className="editproduct-label">
            <span className="editproduct-title">Price </span>

            <br></br>
            {errors?.map((error, i) => {
              if (error.split(":")[0] === "Price")
                return (
                  <div key={i} className="edit-product-errors">
                    •{error.split(":")[1]}
                  </div>
                );
            })}
            <input
              className="editproduct-input"
              type="text"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <br></br>
          <label className="editproduct-label">
            <span className="editproduct-title">Stock </span>

            <br></br>
            {errors?.map((error, i) => {
              if (error.split(":")[0] === "Stock")
                return (
                  <div key={i} className="edit-product-errors">
                    •{error.split(":")[1]}
                  </div>
                );
            })}
            <input
              className="editproduct-input"
              type="text"
              value={stock}
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </label>
          <br></br>
          <label className="editproduct-label">
            <span className="editproduct-title">Description </span>

            <br></br>
            {errors?.map((error, i) => {
              if (error.split(":")[0] === "Description")
                return (
                  <div key={i} className="edit-product-errors">
                    •{error.split(":")[1]}
                  </div>
                );
            })}
            <textarea
              className="editproduct-input-description"
              type="text"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br></br>
          <button style={{color: 'red', backgroundColor: 'white'}} className="editproduct-button" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
