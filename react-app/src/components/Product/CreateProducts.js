import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProductThunk, loadMyProductsThunk } from "../../store/products";
import AddProductImages from "./AddProductImages";
import "./Product.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = [
    "Valentine",
    "Wedding & Party",
    "Home & Living",
    "Clothing & Shoes",
    "Gifts & Gift Cards",
    "Art & Collectibles",
  ];
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productId, setProductId] = useState();
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

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
    if (description.length > 20000)
      errors.push("Description: Description cannot exceed 20000 characters");
    if (isNaN(price)) errors.push("Price: Price must be a number");
    if (price <= 0.1) errors.push("Price: Price must be greater than $1.00 ");
    if (price > 1000000) errors.push("Price: Price exceeds $1000 limit");
    if (!Number.isInteger(+stock) || stock < 1)
      errors.push("Stock: Stock must be an integer more than 0");
    if (stock > 10000) errors.push("Stock: Stcok must be less than 1000");
    setErrors(errors);
  }, [name, category, price, description, stock]);

  const createSubmit = async (e) => {
    e.preventDefault();
    if (errors.length > 0) {
      return;
    }
    const payload = { name, category, description, price, stock };

    const response = await dispatch(createProductThunk(payload));
    if (response) {
      setProductId(response.id);
      setPage(1);
    }
  };

  if (!user) {
    history.push("/");
  }

  return (
    <div className="createproduct-total">
      {page === 0 && (
        <>
          <div className="createproduct-wrapper">
            <h1 className="createproduct-form-title">Create Product</h1>
            <form className="createproduct-form" onSubmit={createSubmit}>
              <div style={{ color: "red" }} className="createproduct-errors">
                <ul>
                  {errors && errors.map((err) => <li key={err}>{err}</li>)}
                </ul>
              </div>
              <div className="createproduct-content">
                <label className="createproduct-label">
                  <span className="createproduct-title">Name </span>

                  <br></br>

                  <input
                    className="createproduct-input"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <br></br>
                <label className="createproduct-label">
                  <span className="createproduct-title">Category </span>

                  <br></br>

                  <select
                    htmlFor="category"
                    name="category"
                    className="createproduct-input-select"
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
                <label className="createproduct-label">
                  <span className="createproduct-title">Price </span>

                  <br></br>

                  <input
                    className="createproduct-input"
                    type="text"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </label>
                <br></br>
                <label className="createproduct-label">
                  <span className="createproduct-title">Stock </span>

                  <br></br>

                  <input
                    className="createproduct-input"
                    type="text"
                    value={stock}
                    required
                    onChange={(e) => setStock(e.target.value)}
                  />
                </label>
                <br></br>
                <label className="createproduct-label">
                  <span className="createproduct-title">Description </span>

                  <br></br>

                  <textarea
                    className="createproduct-input-description"
                    type="text"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <br></br>
                <button className="createproduct-button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {page === 1 && (
        <div className="main-shop-outer">
          <AddProductImages productId={productId} />
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
