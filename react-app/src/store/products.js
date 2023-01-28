/* ------------------ Redux Action Variables ------------------ */

const LOAD_ALL_PRODUCTS = "products/loadallproducts";
const LOAD_ONE_PRODUCT = "products/loadoneproduct";
const CREATE_PRODUCT = "products/createproduct";
const ADD_PRODUCT_IMG = "products/addproductimg";
const UPDATE_PRODUCT = "products/updateproduct";
const REMOVE_PRODUCT = "products/deleteproduct";
const MY_PRODUCTS = "products/myproduct";
const RESET_PRODUCTS = "products/RESET_PRODUCTS";
const SEARCH_PRODUCTS = 'products/searchedProducts';



/* ------------------ Regular Actions ------------------ */

export const resetProducts = () => {
  return { type: RESET_PRODUCTS };
};

const loadAllProducts = (products) => ({
  type: LOAD_ALL_PRODUCTS,
  products,
});

const loadOneProduct = (product) => {
  return {
    type: LOAD_ONE_PRODUCT,
    product,
  };
};

const createOneProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

const addProductImg = (imgData) => {
  return {
    type: ADD_PRODUCT_IMG,
    imgData,
  };
};

const updateOneProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

const removeProduct = (productId) => {
  return {
    type: REMOVE_PRODUCT,
    productId,
  };
};

const loadMyProducts = (products) => {
  return {
    type: MY_PRODUCTS,
    products,
  };
};


const loadSearchProducts = (products) => {
  return {
      type: SEARCH_PRODUCTS,
      products
  }
}

/* ------------------ Thunk Actions ------------------ */

export const getAllProductsThunk = () => async (dispatch) => {
  const response = await fetch("/api/products");

  if (response.ok) {
    const products = await response.json();
    dispatch(loadAllProducts(products));
    return products;
  }
};

export const getOneProductThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`);

  if (response.ok) {
    const product = await response.json();
    dispatch(loadOneProduct(product));
    return product;
  }
};

export const createProductThunk = (product) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      const newProduct = await response.json();
      dispatch(createOneProduct(newProduct));
      return newProduct;
    }
  } catch (error) {
    throw error;
  }
};

export const addProductImgThunk = (url, productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  });

  if (response.ok) {
    const newImg = await response.json();
    dispatch(addProductImg(newImg));
    return newImg;
  }
};

export const editProductThunk = (product, productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const newProduct = await response.json();
      dispatch(updateOneProduct(newProduct));
      return newProduct;
    }
  } catch (error) {
    throw error;
  }
};

export const removeProductThunk = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeProduct(productId));
  }
};

export const loadMyProductsThunk = () => async (dispatch) => {
  const response = await fetch("/api/products/current");
  if (response.ok) {
    const products = await response.json();
    dispatch(loadMyProducts(products));
  }
};


export const loadProductsBySearchThunk = (keyword) => async (dispatch) => {
  const response = await fetch(`/api/products/search/${keyword}`);
  if (response.ok) {
      const products = await response.json();
      dispatch(loadSearchProducts(products));
      return products;
  }
}


/* ------------------ Main Reducer Function ------------------ */

const initialState = {
  allProducts: {},
  singleProduct: {},
  searchedProducts: {},
};

const products = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    
    case LOAD_ALL_PRODUCTS:
      newState = { ...state, allProducts: { ...state.allProducts } };
      action.products.Products.forEach((product) => {
        newState.allProducts[product.id] = product;
      });
      newState.singleProduct = {};
      return newState;

    case LOAD_ONE_PRODUCT:
      newState = { ...state, singleProduct: { ...action.product } };
      return newState;

    case CREATE_PRODUCT:
      newState = {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.product.id]: action.product,
        },
      };
      return newState;
    case ADD_PRODUCT_IMG:
      newState = {
        ...state,
        singleProduct: {
          ...state.singleProduct,
          productImages: [action.imgData],
        },
      };
      return newState;
    case UPDATE_PRODUCT:
      newState = {
        ...state,
        allProducts: {
          ...state.allProducts,
          [action.product.id]: action.product,
        },
      };
      return newState;

    case REMOVE_PRODUCT:
      newState = { ...state };
      newState.allProducts = { ...state.allProducts };
      newState.singleProduct = { ...state.singleProduct };
      delete newState.allProducts[action.productId];
      if (newState.singleProduct.id === action.productId)
        newState.singleProduct = {};
      return newState;

    case MY_PRODUCTS:
      newState = { ...state };
      const normalizedProducts = {};
      action.products.Products.forEach(
        (product) => (normalizedProducts[product.id] = product)
      );
      newState.allProducts = normalizedProducts;
      // newState.singleProduct = {}
      return newState;

    case RESET_PRODUCTS:
      newState = { ...state };
      newState.allProducts = {};
      newState.singleProduct = {};
      return newState;

    case SEARCH_PRODUCTS:
      newState = {...state, searchedProducts: {}};
      action.products.Products.forEach(product => {
          newState.searchedProducts[product.id] = product
      })
      return newState

    default:
      return state;
  }
};

export default products;
