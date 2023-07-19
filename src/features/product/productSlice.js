import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createProduct,
	fetchBrands,
	fetchCategories,
	fetchProductById,
	fetchProductsByFilter,
	updateProduct,
} from "./productAPI";

const initialState = {
	products: [],
	brands: [],
	categories: [],
	totalItems: 0,
	selectedProduct: null,
	status: "idle",
};

// export const fetchAllProductsAsync = createAsyncThunk(
// 	"product/fetchAllProducts",
// 	async () => {
// 		const data = await fetchAllProducts();

// 		// The value we return becomes the `fulfilled` action payload
// 		return data;
// 	}
// );
export const fetchProductByFilterAsync = createAsyncThunk(
	"product/fetchProductsByFilter",
	async ({ filter, sort, pagination, admin }) => {
		const { data } = await fetchProductsByFilter(
			filter,
			sort,
			pagination,
			admin
		);
		// TODO : On server we will support multi values in filter
		// TODO: Server has to filter the products marked as deleted in case of non-Admin Users
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
export const createProductAsync = createAsyncThunk(
	"product/createProduct",
	async (product) => {
		const response = await createProduct(product);
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);
export const updateProductAsync = createAsyncThunk(
	"product/updateProduct",
	async (product) => {
		const response = await updateProduct(product);
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
export const fetchProductByIdAsync = createAsyncThunk(
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
	reducers: {
		clearSelectedProduct: (state) => {
			state.selectedProduct = null;
		},
	},
	extraReducers: (builder) => {
		builder
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
			.addCase(fetchProductByIdAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.selectedProduct = action.payload;
			})
			.addCase(createProductAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createProductAsync.fulfilled, (state, action) => {
				state.status = "idle";
				state.products.push(action.payload);
			})
			.addCase(updateProductAsync.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateProductAsync.fulfilled, (state, action) => {
				state.status = "idle";
				const index = state.products.findIndex(
					(product) => product.id === action.payload.id
				);
				state.products[index] = action.payload;
			});
	},
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectedProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
