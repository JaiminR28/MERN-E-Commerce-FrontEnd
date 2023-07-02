import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import nextId from "react-id-generator";
import {
	deleteItemInCartAsync,
	selectItems,
	updateCartAsync,
} from "./cartSlice";

export function Cart() {
	const items = useSelector(selectItems);
	const dispatch = useDispatch();
	const totalAmount = items.reduce(
		(amount, item) => item.price * item.quantity + amount,
		0
	);
	const totalItems = items.reduce((Items, item) => item.quantity + Items, 0);

	const handleQuantity = (e, item) => {
		e.preventDefault();
		dispatch(
			updateCartAsync({
				...item,
				quantity: +e.target.value,
			})
		);
	};

	const handleRemove = (e, id) => {
		e.preventDefault();
		dispatch(deleteItemInCartAsync(id));
	};

	return (
		<>
			{!items.length && <Navigate to={"/"} replace={true} />}
			<div>
				<div className="mx-auto md:mt-12  bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
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
									<li key={item.id} className="flex py-6">
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
														onChange={(e) =>
															handleQuantity(
																e,
																item
															)
														}
														className="ml-1.5 text-xs py-1 pr-8 rounded-lg "
														value={item.quantity}
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
														onClick={(e) =>
															handleRemove(
																e,
																item.id
															)
														}
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
							<Link
								to={"/checkout"}
								className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
							>
								Checkout
							</Link>
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
									<span aria-hidden="true"> &rarr;</span>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}