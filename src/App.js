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
import { selectLoggedInUser } from "./features/auth/authSlice";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Protected>
				<HomePage />
			</Protected>
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
]);

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectLoggedInUser);
	useEffect(() => {
		if (user) {
			dispatch(fetchItemsByUserIdAsync(user.id));
		}
	}, [dispatch, user]);
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
