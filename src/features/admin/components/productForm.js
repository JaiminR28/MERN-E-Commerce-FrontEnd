import { useDispatch, useSelector } from "react-redux";
import {
	clearSelectedProduct,
	createProductAsync,
	fetchProductByIdAsync,
	selectBrands,
	selectCategories,
	selectedProductById,
	updateProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function ProductForm() {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const brands = useSelector(selectBrands);
	const params = useParams();

	const selectedProduct = useSelector(selectedProductById);
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (params.id) {
			dispatch(fetchProductByIdAsync(params.id));
			reset();
		} else {
			dispatch(clearSelectedProduct());
			reset();
			// TODO: on product successfully added clear fileds and show a message and redirect to the homepage
		}
	}, [params.id, dispatch]);

	useEffect(() => {
		if (selectedProduct && params.id) {
			setValue("title", selectedProduct.title);
			setValue("description", selectedProduct.description);
			setValue("price", selectedProduct.price);
			setValue("discountPercentage", selectedProduct.discountPercentage);
			setValue("stock", selectedProduct.stock);
			setValue("brand", selectedProduct.brand);
			setValue("thumbnail", selectedProduct.thumbnail);
			setValue("category", selectedProduct.category);
			setValue("image1", selectedProduct.images[0]);
			setValue("image2", selectedProduct.images[1]);
			setValue("image3", selectedProduct.images[2]);
		}
	}, [selectedProduct, params.id, setValue]);

	const handleDelete = () => {
		const product = { ...selectedProduct };
		product.deleted = true;
		dispatch(updateProductAsync(product));
	};

	return (
		<form
			onSubmit={handleSubmit((data) => {
				const product = { ...data };

				product.rating = 0;
				product.images = [
					product.image1,
					product.image2,
					product.image3,
				];
				delete product["image1"];
				delete product["image2"];
				delete product["image3"];
				product.price = +product.price;
				product.stock = +product.stock;
				product.discount = +product.discount;

				if (params.id) {
					product.rating = selectedProduct.rating || 0;
					product.id = params.id;
					dispatch(updateProductAsync(product));

					reset();
				} else {
					dispatch(createProductAsync(product));
					// TODO: these alert should check if API failed
					reset();
				}
				// Add product API
			})}
		>
			<div className="space-y-12 bg-white p-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Add Product
					</h2>
					{selectedProduct.deleted && (
						<h5 className="text-red-500 font-bold">
							Product is deleted
						</h5>
					)}

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						{/* Product Name*/}
						<div className="sm:col-span-6">
							<label
								htmlFor="title"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Product Name
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										type="text"
										{...register("title", {
											required: "Product Name required",
										})}
										id="title"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="product Name here"
									/>
								</div>
							</div>
						</div>

						{/* Description */}
						<div className="col-span-full">
							<label
								htmlFor="about"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Description
							</label>
							<div className="mt-2">
								<textarea
									id="description"
									{...register("description", {
										required: " description required",
									})}
									rows={3}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									defaultValue={""}
								/>
							</div>
							<p className="mt-3 text-sm leading-6 text-gray-600">
								Write a Description of the product here...
							</p>
						</div>

						{/* Prices*/}
						<div className="sm:col-span-2">
							<label
								htmlFor="price"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Price ( in $ )
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										type="number"
										{...register("price", {
											required: " price required",
											min: 1,
											max: 10000,
										})}
										id="price"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						{/* Stock*/}
						<div className="sm:col-span-2">
							<label
								htmlFor="stock"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Stock
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										type="number"
										{...register("stock", {
											required: " stock required",
											min: 0,
											max: 10000,
										})}
										id="stock"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						{/** Discount */}
						<div className="sm:col-span-2">
							<label
								htmlFor="discountPercentage"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Discount
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										type="number"
										{...register("discountPercentage", {
											min: 0,
											max: 99,
										})}
										id="discountPercentage"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						{/** Thumbnail */}
						<div className="sm:col-span-6">
							<label
								htmlFor="thumbnail"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Thumbnail
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										type="text"
										{...register("thumbnail", {
											required: " thumbnail required",
										})}
										id="thumbnail"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>

						{/** Image 1 */}
						<div className="sm:col-span-6">
							<label
								htmlFor="image1"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Image 1
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										type="text"
										{...register("image1")}
										id="image1"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>

						{/** Image 2 */}
						<div className="sm:col-span-6">
							<label
								htmlFor="image2"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Image 2
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										type="text"
										{...register("image2")}
										id="image2"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						{/** Image 3 */}
						<div className="sm:col-span-6">
							<label
								htmlFor="image3"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Image 3
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<input
										type="text"
										{...register("image3")}
										id="image3"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						{/** Brands */}
						<div className="col-span-full">
							<label
								htmlFor="about"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Brand
							</label>
							<div className="mt-2">
								<select
									{...register("brand", {
										required: " brand required",
									})}
								>
									<option value="">
										---Choose a brand ---{" "}
									</option>
									{brands.map((brand) => (
										<option value={brand.label}>
											{brand.value}
										</option>
									))}
								</select>
							</div>
						</div>

						{/** Categories */}
						<div className="col-span-full">
							<label
								htmlFor="about"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Category
							</label>
							<div className="mt-2">
								<select
									{...register("category", {
										required: " category required",
									})}
								>
									<option value="">
										---Choose a Category ---{" "}
									</option>
									{categories.map((category) => (
										<option value={category.label}>
											{category.value}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Extra
					</h2>
				</div>

				<div className="border-b border-gray-900/10 pb-12">
					<div className="mt-10 space-y-10">
						<fieldset>
							<legend className="text-sm font-semibold leading-6 text-gray-900">
								By Email
							</legend>
							<div className="mt-6 space-y-6">
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="comments"
											name="comments"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label
											htmlFor="comments"
											className="font-medium text-gray-900"
										>
											Comments
										</label>
										<p className="text-gray-500">
											Get notified when someones posts a
											comment on a posting.
										</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="candidates"
											name="candidates"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label
											htmlFor="candidates"
											className="font-medium text-gray-900"
										>
											Candidates
										</label>
										<p className="text-gray-500">
											Get notified when a candidate
											applies for a job.
										</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="offers"
											name="offers"
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label
											htmlFor="offers"
											className="font-medium text-gray-900"
										>
											Offers
										</label>
										<p className="text-gray-500">
											Get notified when a candidate
											accepts or rejects an offer.
										</p>
									</div>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<legend className="text-sm font-semibold leading-6 text-gray-900">
								Push Notifications
							</legend>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								These are delivered via SMS to your mobile
								phone.
							</p>
							<div className="mt-6 space-y-6">
								<div className="flex items-center gap-x-3">
									<input
										id="push-everything"
										name="push-notifications"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
									<label
										htmlFor="push-everything"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Everything
									</label>
								</div>
								<div className="flex items-center gap-x-3">
									<input
										id="push-email"
										name="push-notifications"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
									<label
										htmlFor="push-email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Same as email
									</label>
								</div>
								<div className="flex items-center gap-x-3">
									<input
										id="push-nothing"
										name="push-notifications"
										type="radio"
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
									<label
										htmlFor="push-nothing"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										No push notifications
									</label>
								</div>
							</div>
						</fieldset>
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
				{selectedProduct && selectedProduct.deleted && (
					<button
						onClick={handleDelete}
						className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
					>
						Delete
					</button>
				)}
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Save
				</button>
			</div>
		</form>
	);
}

export default ProductForm;
