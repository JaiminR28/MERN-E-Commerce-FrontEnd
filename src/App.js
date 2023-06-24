import React from "react";
import "./App.css";
import HomePage from "./pages/home";
import LogInPage from "./pages/logInPage";
import SignUpPage from "./pages/signupPage";
import CartPage from "./pages/CartPage";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from "react-router-dom";
import CheckoutPage from "./pages/checkout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
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
		element: <CartPage />,
	},
	{
		// TODO: Only for testing
		path: "/checkout",
		element: <CheckoutPage />,
	},
]);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
