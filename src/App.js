import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/home";
import LogInPage from "./pages/logInPage";
import SignUpPage from "./pages/signupPage";
import CartPage from "./pages/CartPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckoutPage from "./pages/checkout";
import ProductDetailPage from "./pages/productDetailPage";
import Protected from "./features/auth/components/protected";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./pages/404Page";
import OrderSuccessPage from "./pages/orderSuccess";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/userProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/logout";
import ForgotPasswordPage from "./pages/forgotPassword";
import ProtectedAdmin from "./features/auth/components/protectedAdmin";
import AdminHomePage from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import {
	checkAuthAsync,
	selectLoggedInUser,
	selectUserChecked,
} from "./features/auth/authSlice";
import StripeCheckout from "./pages/stripeCheckout";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Protected>
				<HomePage></HomePage>
			</Protected>
		),
	},
	{
		path: "/admin",
		element: (
			<ProtectedAdmin>
				<AdminHomePage></AdminHomePage>
			</ProtectedAdmin>
		),
	},
	{
		path: "/login",
		element: <LogInPage />,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
	},
	{
		// TODO: Only for testing
		path: "/cart",
		element: (
			<Protected>
				<CartPage />
			</Protected>
		),
	},
	{
		path: "/checkout",
		element: (
			<Protected>
				<CheckoutPage />
			</Protected>
		),
	},
	{
		path: "/product-detail/:id",
		element: (
			<Protected>
				<ProductDetailPage />
			</Protected>
		),
	},
	{
		path: "/admin/product-detail/:id",
		element: (
			<ProtectedAdmin>
				<AdminProductDetailPage />
			</ProtectedAdmin>
		),
	},
	{
		path: "/admin/product-form",
		element: (
			<ProtectedAdmin>
				<AdminProductFormPage />
			</ProtectedAdmin>
		),
	},
	{
		path: "/admin/product-form/edit/:id",
		element: (
			<ProtectedAdmin>
				<AdminProductFormPage />
			</ProtectedAdmin>
		),
	},
	{
		path: "/admin/orders",
		element: <AdminOrdersPage />,
	},
	{
		path: "/order-success/:id",
		element: <OrderSuccessPage />,
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
	{
		path: "/my-orders",
		element: (
			<Protected>
				<UserOrdersPage />
			</Protected>
		),
		// TODO: we will add page later right now using component directly
	},
	{
		path: "/logout",
		element: <LogOut />,
		// TODO: we will add page later right now using component directly
	},
	{
		path: "/forgot-password",
		element: <ForgotPasswordPage />,
		// TODO: we will add page later right now using component directly
	},
	{
		path: "/profile",
		element: (
			<Protected>
				<UserProfilePage />
			</Protected>
		),
		// TODO: we will add page later right now using component directly
	},
	{
		path: "/stripe-checkout",
		element: (
			<Protected>
				<StripeCheckout />
			</Protected>
		),
		// TODO: we will add page later right now using component directly
	},
]);

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectLoggedInUser);
	const userChecked = useSelector(selectUserChecked);

	useEffect(() => {
		dispatch(checkAuthAsync());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			dispatch(fetchItemsByUserIdAsync());
			// we can get the req.user by token on backend no need give in frontEnd that means here above we are sendding the id of the user to get the data but now no need to do that we will do that using the jwt
			dispatch(fetchLoggedInUserAsync());
		}
	}, [dispatch, user]);
	return (
		<div className="App">
			{userChecked && <RouterProvider router={router} />}
		</div>
	);
}

export default App;
