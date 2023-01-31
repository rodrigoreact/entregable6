import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      const products = action.payload;
      return products;
    }
  }
});

// export const getNewsThunk = () => (dispatch) => {
  export const getProductsThunk = () => (dispatch) => {  
  dispatch(setIsLoading(true));
  axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/products")

    .then((res) => dispatch(setProducts(res.data)))
    // .then((res) => dispatch(setNews(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

// export const filterNewsCategoryThunk = (id) => (dispatch) => {
  export const filterProductsCategoryThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    // .get(`https://news-app-api.academlo.tech/news/?category=${id}`)
    .get(`  https://e-commerce-api-v2.academlo.tech/api/v1/categories?category=${id}`)
  
    .then((res) => dispatch(setProducts(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterProductsThunk = (productsSearch) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      "https://e-commerce-api-v2.academlo.tech/api/v1/products?title=samsung" +
        productsSearch
    )
    .then((res) => dispatch(setProducts(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;