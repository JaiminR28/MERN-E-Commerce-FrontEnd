import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { PencilIcon, XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";

import {
	fetchAllOrdersAsync,
	selectOrders,
	selectTotalOrders,
	updateOrderAsync,
} from "../../orders/orderSlice";
import { useDispatch, useSelector } from "react-redux";

function AdminOrders() {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const orders = useSelector(selectOrders);
	const totalOrders = useSelector(selectTotalOrders);
	const [editableItemId, setEditableItemId] = useState(-1);

	useEffect(() => {
		const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
		dispatch(fetchAllOrdersAsync({ pagination }));
	}, [dispatch, page]);

	const handleEdit = (order) => {
		setEditableItemId(order.id);
		console.log("handle Edit");
	};
	const handleShow = () => {
		console.log("handle Show");
	};

	const handleUpdate = (e, order) => {
		// Update here
		const updatedOrder = { ...order, status: e.target.value };
		dispatch(updateOrderAsync(updatedOrder));
		setEditableItemId(-1);
	};

	const chooseColor = (status) => {
		switch (status) {
			case "pending": {
				return "bg-purple-200 text-purple-600";
			}
			case "dispatched": {
				return "bg-yellow-200 text-yellow-600";
			}
			case "delivered": {
				return "bg-green-200 text-green-600";
			}

			default: {
				return "bg-grey-200 text-grey-600";
			}
		}
	};

	return (
		<div>
			<>
				{/* component */}
				<div className="overflow-x-auto">
					<div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
						<div className="w-full">
							<div className="bg-white shadow-md rounded my-6">
								<table className="min-w-max w-full table-auto">
									<thead>
										<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
											<th className="py-3 px-6 text-left">
												Order#
											</th>
											<th className="py-3 px-6 text-left">
												Items
											</th>
											<th className="py-3 px-6 text-center">
												Total Amount
											</th>
											<th className="py-3 px-6 text-center">
												Shipping Address
											</th>
											<th className="py-3 px-6 text-center">
												Status
											</th>
											<th className="py-3 px-6 text-center">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="text-gray-600 text-sm font-light">
										{orders.map((order) => {
											return (
												<tr className="border-b border-gray-200 hover:bg-gray-100">
													<td class="py-3 px-6 text-left whitespace-nowrap">
														<div className="flex items-center">
															<span className="font-medium">
																{order.id}
															</span>
														</div>
													</td>
													<td class="py-3 px-6 text-left">
														{order.items.map(
															(item) => {
																return (
																	<div class="flex items-center">
																		<div class="mr-2">
																			<img
																				class="w-6 h-6 rounded-full"
																				src={
																					item.thumbnail
																				}
																			/>
																		</div>
																		<span>
																			{
																				item.title
																			}{" "}
																			- #
																			{
																				item.quantity
																			}{" "}
																			qua.
																			-{" "}
																			{discountedPrice(
																				item
																			)}{" "}
																			$
																		</span>
																	</div>
																);
															}
														)}
													</td>

													<td class="py-3 px-6 text-left whitespace-nowrap">
														<div className="flex items-center">
															${order.totalAmount}
														</div>
													</td>

													<td class="py-3 px-6 text-left whitespace-wrap w-6">
														<div className="flex items-start flex-col">
															<strong className="flex">
																{
																	order
																		.selectedAddress
																		.name
																}
																,
															</strong>
															{
																order
																	.selectedAddress
																	.street
															}
															{
																order
																	.selectedAddress
																	.city
															}
															,
															{
																order
																	.selectedAddress
																	.state
															}
															.
															{
																order
																	.selectedAddress
																	.pincode
															}
														</div>
													</td>

													<td class="py-3 px-6 text-left whitespace-nowrap">
														<div className="flex items-center">
															{order.id ===
															editableItemId ? (
																<select
																	onChange={(
																		e
																	) =>
																		handleUpdate(
																			e,
																			order
																		)
																	}
																>
																	<option value="pending">
																		Pending
																	</option>
																	<option value="dispatched">
																		Dispatched
																	</option>
																	<option value="delivered">
																		Delivered
																	</option>
																	<option value="cancelled">
																		Cancelled
																	</option>
																</select>
															) : (
																<span
																	className={`${chooseColor(
																		order.status
																	)} py-1 px-3 rounded-full text-xs`}
																>
																	{
																		order.status
																	}
																</span>
															)}
														</div>
													</td>

													<td class="py-3 px-4 text-left whitespace-nowrap">
														<div class="flex item-center justify-between">
															<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
																<EyeIcon
																	className="w-5 h-5"
																	onClick={(
																		e
																	) =>
																		handleShow(
																			order
																		)
																	}
																></EyeIcon>
															</div>
															<div class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
																<PencilIcon
																	className="w-5 h-5"
																	onClick={(
																		e
																	) =>
																		handleEdit(
																			order
																		)
																	}
																></PencilIcon>
															</div>
															<div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</>
		</div>
	);
}

export default AdminOrders;
