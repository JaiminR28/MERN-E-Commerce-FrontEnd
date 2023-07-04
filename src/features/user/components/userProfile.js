import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function UserProfile() {
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState("cash");
	const dispatch = useDispatch();
	const user = useSelector(selectLoggedInUser);
	const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm();

	console.log(user);
	const handleDelete = (e, index) => {
		const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
		newUser.addresses.splice(index, 1);
		dispatch(updateUserAsync(newUser));
	};
	const handleEdit = (addressUpdate, index) => {
		const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
		newUser.addresses.splice(index, 1, addressUpdate);
		dispatch(updateUserAsync(newUser));
		setSelectedEditIndex(-1);
	};

	const handleEditForm = (index) => {
		setSelectedEditIndex(index);
		const address = user.addresses[index];
		setValue("name", address.name);
		setValue("email", address.email);
		setValue("phone", address.phone);
		setValue("street", address.street);
		setValue("city", address.city);
		setValue("state", address.state);
		setValue("pincode", address.pincode);
	};

	const handleAddress = (e) => {
		setSelectedAddress(user.addresses[+e.target.value]);
	};

	const handlePayment = (e) => {
		setPaymentMethod(e.target.value);
	};

	return (
		<div>
			<div className="mx-auto md:mt-12  bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
					<button
						type="submit"
						className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
					>
						Add new Address
					</button>
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 pt-12 m mb-4 ml-4">
						Name: {user.name ? user.name : "New user"}
					</h1>
					<h3 className="text-l font-bold tracking-tight text-red-900 pt-12 m mb-4 ml-4">
						email address : {user.email}
					</h3>
				</div>

				<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
					<p className="mt-0.5 text-sm text-gray-500">
						Your Addresses
					</p>
					{user.addresses.map((address, index) => {
						return (
							<div>
								{selectedEditIndex === index ? (
									<form
										className="bg-white px-5 py-12 mt-12"
										noValidate
										onSubmit={handleSubmit((data) => {
											handleEdit(data, index);
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
													Use a permanent address
													where you can receive mail.
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
																{...register(
																	"name",
																	{
																		required:
																			"name is required",
																	}
																)}
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
																{...register(
																	"email",
																	{
																		required:
																			"email is required",
																	}
																)}
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
																{...register(
																	"phone",
																	{
																		required:
																			"phone is required",
																	}
																)}
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
																{...register(
																	"street",
																	{
																		required:
																			"street address is required",
																	}
																)}
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
																{...register(
																	"city",
																	{
																		required:
																			"city is required",
																	}
																)}
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
																{...register(
																	"state",
																	{
																		required:
																			"state is required",
																	}
																)}
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
																{...register(
																	"pincode",
																	{
																		required:
																			"pincode is required",
																	}
																)}
																id="postal-code"
																className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
															/>
														</div>
													</div>
												</div>
											</div>
											<div className="mt-6 flex items-center justify-end gap-x-6">
												<button
													onClick={() =>
														setSelectedEditIndex(-1)
													}
													type="button"
													className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												>
													Cancel
												</button>
												<button
													type="submit"
													className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												>
													Edit Address
												</button>
											</div>
										</div>
									</form>
								) : null}
								<div
									key={address.email}
									className="flex justify-between mt-4 p-3 gap-x-6 py-5 border-solid border-2 border-gray-200"
								>
									<div className="flex gap-x-4">
										<div className="min-w-0 flex-auto">
											<p className="text-sm font-semibold leading-6 text-gray-900">
												Name: {address.name}
											</p>
											<p className="mt-1 truncate text-sm leading-5 text-gray-600">
												email: {address.email}
											</p>
										</div>
									</div>
									<div className="flex flex-wrap max-w-xs">
										<p className="block self-start mt-1 text-m leading-5 text-gray-900">
											Address:{" "}
										</p>
										<p className=" self-start mt-1 text-s leading-5 text-gray-600">
											{address.street +
												", " +
												address.city +
												", " +
												address.state +
												", " +
												address.pincode}
										</p>
										<p className="block self-start mt-1 text-m leading-5 text-gray-900">
											Phone: {address.phone}
										</p>
									</div>

									<div className="flex flex-col gap-y-4 justify-center">
										<button
											type="button"
											onClick={() =>
												handleEditForm(index)
											}
											className=" inline-flex items-center rounded-md bg-yellow-50 px-3.5 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 hover:text-yellow-50 hover:bg-yellow-600 delay-75 transition-all"
										>
											Edit Address
										</button>
										<button
											onClick={(e) =>
												handleDelete(e, index)
											}
											className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:text-red-50 hover:bg-red-700 delay-75 transition-all"
										>
											Delete Address
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
