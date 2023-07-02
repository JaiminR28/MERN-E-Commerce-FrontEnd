import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Link } from "react-router-dom";

export default function UserOrders() {
	const dispatch = useDispatch();
	const user = useSelector(selectLoggedInUser);
	const orders = useSelector(selectUserOrders);
	console.log(orders);
	useEffect(() => {
		dispatch(fetchLoggedInUserOrdersAsync(user.id));
	}, []);
	return (
		<div>
			{orders.map((order) => (
				<div>
					<div className="mx-auto md:mt-12  bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 pt-12 m mb-4 ml-4">
							Order # {order.id}
						</h1>
						<h3 className="text-l font-bold tracking-tight text-red-900 pt-12 m mb-4 ml-4">
							Order Status {order.status}
						</h3>
						<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
							<div className="flow-root">
								<ul
									role="list"
									className="-my-6 divide-y divide-gray-200"
								>
									{order.items.map((item) => (
										<div className="flex py-6">
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
															Qty: {item.quantity}
														</label>
													</div>
													<div className="flex"></div>
												</div>
											</div>
										</div>
									))}
								</ul>
							</div>
						</div>

						<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
							<div className="flex justify-between text-base my-2 font-medium text-gray-900">
								<p>Subtotal</p>
								<p>$ {order.totalAmount}</p>
							</div>
							<div className="flex justify-between text-base my-2 font-medium text-gray-900">
								<p>total items in cart</p>
								<p>{order.totalItems} items</p>
							</div>
							<p className="mt-0.5 text-sm text-gray-500">
								Shipping and taxes calculated at checkout.
							</p>
							<div className="flex justify-between gap-x-6 py-5">
								<div className="flex gap-x-4">
									<input
										type="radio"
										name="address"
										className=" self-center h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
									<div className="min-w-0 flex-auto">
										<p className="text-sm font-semibold leading-6 text-gray-900">
											{order.selectedAddress?.name}
										</p>
										<p className="mt-1 truncate text-xs leading-5 text-gray-500">
											email:{" "}
											{order.selectedAddress?.email}
										</p>
									</div>
								</div>
								<div className="flex flex-wrap max-w-xs">
									<p className="block self-start mt-1 text-xs leading-5 text-gray-500">
										order.selectedAddress:{" "}
									</p>
									<p className=" self-start mt-1 text-xs leading-5 text-gray-500">
										{order.selectedAddress.street +
											", " +
											order.selectedAddress.city +
											", " +
											order.selectedAddress.state +
											", " +
											order.selectedAddress.pincode}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
