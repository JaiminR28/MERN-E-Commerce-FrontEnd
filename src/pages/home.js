import Navbar from "../features/navbar/navbar";
import ProductList from "../features/product-list/productList";

function HomePage() {
	return (
		<div>
			<Navbar>
				<ProductList />
			</Navbar>
		</div>
	);
}

export default HomePage;
