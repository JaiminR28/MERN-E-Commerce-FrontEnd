import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function UserProfile() {
	// const dispatch = useDispatch();

	const user = useSelector(selectLoggedInUser);

	const handleDelete = (e, index) => {};
	const handleEdit = (e, index) => {};

	return (
		<div>
			<div className="mx-auto md:mt-12  bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
										onClick={(e) => handleEdit(e, index)}
										className=" inline-flex items-center rounded-md bg-yellow-50 px-3.5 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 hover:text-yellow-50 hover:bg-yellow-600 delay-75 transition-all"
									>
										Edit Address
									</button>
									<button
										onClick={(e) => handleDelete(e, index)}
										className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:text-red-50 hover:bg-red-700 delay-75 transition-all"
									>
										Delete Address
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
