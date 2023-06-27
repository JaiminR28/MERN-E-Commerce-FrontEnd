import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	fetchAllProducts,
	fetchBrands,
	fetchCategories,
	fetchProductById,
	fetchProductsByFilter,
} from "./productAPI";

const initialState = {
	products: [],
	brands: [],
	categories: [],
	totalItems: 0,
	selectedProduct: null,
	status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
	"product/fetchAllProducts",
	async () => {
		const data = await fetchAllProducts();

		// The value we return becomes the `fulfilled` action payload
		return data;
	}
);
export const fetchProductByFilterAsync = createAsyncThunk(
	"product/fetchProductsByFilter",
	async ({ filter, sort, pagination }) => {
		const { data } = await fetchProductsByFilter(filter, sort, pagination);

		// The value we return becomes the `fulfilled` action payload
		return data;
	}
);
export const fetchCategoriesAsync = createAsyncThunk(
	"product/fetchCategories",
	async () => {
		const response = await fetchCategories();
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);
export const fetchBrandsAsync = createAsyncThunk(
	"product/fetchBrands",
	async () => {
		const response = await fetchBrands();

		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);
export const fetchAllProductByIdAsync = createAsyncThunk(
	"product/fetchProductById",
	async (id) => {
		const response = await fetchProductById(id);
		// The value we return becomes the `fulfilled` action payload
		return response.data;
	}
);
export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProductsAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.products = action.payload;
			})
			.addCase(fetchProductByFilterAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.products = action.payload.products;
				state.totalItems = action.payload.totalItems;
			})
			.addCase(fetchCategoriesAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.categories = action.payload;
			})
			.addCase(fetchBrandsAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchBrandsAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.brands = action.payload;
			})
			.addCase(fetchAllProductByIdAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.selectedProduct = action.payload;
			});
	},
});

// export const {} = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectedProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
