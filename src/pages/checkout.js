import { Link, Navigate } from "react-router-dom";
import {
	deleteItemInCartAsync,
	selectItems,
	updateCartAsync,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
	selectLoggedInUser,
	updateUserAsync,
} from "../features/auth/authSlice";
import { useState } from "react";
import {
	createOrderAsync,
	selectCurrentOrder,
} from "../features/orders/orderSlice";

export default function CheckoutPage() {
	const items = useSelector(selectItems);
	const dispatch = useDispatch();
	const totalAmount = items.reduce(
		(amount, item) => item.price * item.quantity + amount,
		0
	);

	const [selectedAddress, setSelectedAddress] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState("cash");

	const totalItems = items.reduce((Items, item) => item.quantity + Items, 0);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const user = useSelector(selectLoggedInUser);
	const currentOrder = useSelector(selectCurrentOrder);

	const handleQuantity = (e, item) => {
		e.preventDefault();
		dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
	};

	const handleRemove = (e, id) => {
		e.preventDefault();
		dispatch(deleteItemInCartAsync(id));
	};

	const handleAddress = (e) => {
		setSelectedAddress(user.addresses[+e.target.value]);
	};

	const handlePayment = (e) => {
		setPaymentMethod(e.target.value);
	};

	const handleOrder = (e) => {
		e.preventDefault();
		if (selectedAddress && paymentMethod) {
			const order = {
				items,
				totalAmount,
				totalItems,
				user,
				paymentMethod,
				selectedAddress,
				status: "pending", //other status can be delivered
			};
			dispatch(createOrderAsync(order));
			// TODO : redirect to order success page
		} else {
			alert("Enter address and payment");
		}
		// TODO: clear cart after order
		// TODO: on server change the stock of the items

		return false;
	};
	return (
		<>
			{!items.length && <Navigate to={"/"} replace={true} />}
			{currentOrder && (
				<Navigate
					to={`/order-success/${currentOrder.id}`}
					replace={true}
				/>
			)}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
					<div className="lg:col-span-3">
						<form
							className="bg-white px-5 py-12 mt-12"
							noValidate
							onSubmit={handleSubmit((data) => {
								console.log(data);
								dispatch(
									updateUserAsync({
										...user,
										addresses: [...user.addresses, data],
									})
								);
								reset();
								return false;
								// createUserAsync({
								// 	email: data.email,
								// 	password: data.password,
								// })
							})}
						>
							<div className="space-y-12">
								<div className="border-b border-gray-900/10 pb-12">
									<h2 className="text-base font-semibold leading-7 text-gray-900">
										Personal Information
									</h2>
									<p className="mt-1 text-sm leading-6 text-gray-600">
										Use a permanent address where you can
										receive mail.
									</p>

									<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
										<div className="sm:col-span-3">
											<label
												htmlFor="name"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Full name
											</label>
											<div className="mt-2">
												<input
													type="text"
													{...register("name", {
														required:
															"name is required",
													})}
													id="name"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="sm:col-span-4">
											<label
												htmlFor="email"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Email address
											</label>
											<div className="mt-2">
												<input
													id="email"
													{...register("email", {
														required:
															"email is required",
													})}
													type="email"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="sm:col-span-3">
											<label
												htmlFor="phone"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Phone
											</label>
											<div className="mt-2">
												<input
													id="phone"
													{...register("phone", {
														required:
															"phone is required",
													})}
													type="tel"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="col-span-full">
											<label
												htmlFor="street-address"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Street address
											</label>
											<div className="mt-2">
												<input
													type="text"
													{...register("street", {
														required:
															"street address is required",
													})}
													id="street"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="sm:col-span-2 sm:col-start-1">
											<label
												htmlFor="city"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												City
											</label>
											<div className="mt-2">
												<input
													type="text"
													{...register("city", {
														required:
															"city is required",
													})}
													id="city"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="sm:col-span-2">
											<label
												htmlFor="region"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												State / Province
											</label>
											<div className="mt-2">
												<input
													type="text"
													{...register("state", {
														required:
															"state is required",
													})}
													id="region"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="sm:col-span-2">
											<label
												htmlFor="postal-code"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												ZIP / Postal code
											</label>
											<div className="mt-2">
												<input
													type="text"
													{...register("pincode", {
														required:
															"pincode is required",
													})}
													id="postal-code"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-6 flex items-center justify-end gap-x-6">
									<button
										type="button"
										className="text-sm font-semibold leading-6 text-gray-900"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Add Address
									</button>
								</div>

								<div className="border-b border-gray-900/10 pb-12">
									<h2 className="text-base font-semibold leading-7 text-gray-900">
										Exsisting Address
									</h2>
									<p className="mt-1 text-sm leading-6 text-gray-600">
										Choose from exsisting address
									</p>
									<ul
										role="list"
										className="divide-y divide-gray-300"
									>
										{user.addresses.map(
											(address, index) => (
												<li
													key={index}
													className="flex justify-between gap-x-6 py-5"
												>
													<div className="flex gap-x-4">
														<input
															onChange={
																handleAddress
															}
															type="radio"
															name="address"
															value={index}
															className=" self-center h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
														/>
														<div className="min-w-0 flex-auto">
															<p className="text-sm font-semibold leading-6 text-gray-900">
																{address.name}
															</p>
															<p className="mt-1 truncate text-xs leading-5 text-gray-500">
																email:{" "}
																{address.email}
															</p>
														</div>
													</div>
													<div className="flex flex-wrap max-w-xs">
														<p className="block self-start mt-1 text-xs leading-5 text-gray-500">
															address:{" "}
														</p>
														<p className=" self-start mt-1 text-xs leading-5 text-gray-500">
															{address.street +
																", " +
																address.city +
																", " +
																address.state +
																", " +
																address.pincode}
														</p>
													</div>

													<div className="flex flex-col gap-y-2">
														<button className=" inline-flex items-center rounded-md bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 hover:text-yellow-50 hover:bg-yellow-600 delay-75 transition-all">
															Edit Address
														</button>
														<button className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:text-red-50 hover:bg-red-700 delay-75 transition-all">
															Delete Address
														</button>
													</div>
												</li>
											)
										)}
									</ul>
									<div className="mt-10 space-y-10">
										<fieldset>
											<legend className="text-sm font-semibold leading-6 text-gray-900">
												Payment Methods
											</legend>
											<p className="mt-1 text-sm leading-6 text-gray-600">
												Choose one
											</p>
											<div className="mt-6 space-y-6">
												<div className="flex items-center gap-x-3">
													<input
														id="Cash"
														value="Cash"
														name="payments"
														onChange={handlePayment}
														type="radio"
														checked={
															paymentMethod ===
															"cash"
														}
														className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>
													<label
														htmlFor="Cash"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Cash
													</label>
												</div>
												<div className="flex items-center gap-x-3">
													<input
														id="Card"
														value="Card"
														onChange={handlePayment}
														checked={
															paymentMethod ===
															"Card"
														}
														type="radio"
														className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>
													<label
														htmlFor="Card"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														Card
													</label>
												</div>
												<div className="flex items-center gap-x-3">
													<input
														id="UPI"
														value="UPI"
														onChange={handlePayment}
														checked={
															paymentMethod ===
															"UPI"
														}
														type="radio"
														className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>
													<label
														htmlFor="UPI"
														className="block text-sm font-medium leading-6 text-gray-900"
													>
														UPI
													</label>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className="lg:col-span-2">
						<div className="mx-auto md:mt-12  bg-white max-w-7xl px-2 sm:px-6 lg:px-4">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 pt-12 m mb-4 ml-4">
								Cart
							</h1>
							<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
								<div className="flow-root">
									<ul
										role="list"
										className="-my-6 divide-y divide-gray-200"
									>
										{items.map((item) => (
											<li
												key={item.id}
												className="flex py-6"
											>
												<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
													<img
														src={item.thumbnail}
														alt={item.title}
														className="h-full w-full object-cover object-center"
													/>
												</div>

												<div className="ml-4 flex flex-1 flex-col">
													<div>
														<div className="flex justify-between text-base font-medium text-gray-900">
															<h3>
																<Link to={"/"}>
																	{item.title}
																</Link>
															</h3>
															<p className="ml-4">
																${" "}
																{item.price *
																	item.quantity}
															</p>
														</div>
														<p className="mt-1 text-sm text-gray-500">
															{item.color}
														</p>
													</div>
													<div className="flex flex-1 items-end justify-between text-sm">
														<div>
															<label className="text-gray-500">
																Qty
															</label>
															<select
																onChange={(
																	e
																) => {
																	handleQuantity(
																		e,
																		item
																	);
																	return false;
																}}
																className="ml-1.5 text-xs py-1 pr-8 rounded-lg "
																value={
																	item.quantity
																}
															>
																<option
																	className="text-xs"
																	value="1"
																>
																	1
																</option>
																<option
																	className="text-xs"
																	value="2"
																>
																	2
																</option>
																<option
																	className="text-xs"
																	value="3"
																>
																	3
																</option>
																<option
																	className="text-xs"
																	value="4"
																>
																	4
																</option>
																<option
																	className="text-xs"
																	value="4"
																>
																	5
																</option>
															</select>
														</div>
														<div className="flex">
															<button
																onClick={(
																	e
																) => {
																	handleRemove(
																		e,
																		item.id
																	);
																	return false;
																}}
																type="button"
																className="font-medium text-indigo-600 hover:text-indigo-500"
															>
																Remove
															</button>
														</div>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
								<div className="flex justify-between text-base my-2 font-medium text-gray-900">
									<p>Subtotal</p>
									<p>${totalAmount}</p>
								</div>
								<div className="flex justify-between text-base my-2 font-medium text-gray-900">
									<p>total items in cart</p>
									<p>{totalItems}</p>
								</div>
								<p className="mt-0.5 text-sm text-gray-500">
									Shipping and taxes calculated at checkout.
								</p>
								<div className="mt-6">
									<button
										onClick={(e) => {
											handleOrder(e);
										}}
										className="flex items-center w-full cursor-pointer  justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
										type="submit"
									>
										Order Now
									</button>
								</div>
								<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
									<p>
										or{"  "}
										<Link
											to={"/"}
											type="button"
											className="font-medium ml-0.5 text-indigo-600 hover:text-indigo-500"
										>
											Continue Shopping
											<span aria-hidden="true">
												{" "}
												&rarr;
											</span>
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
