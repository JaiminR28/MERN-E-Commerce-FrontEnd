import AdminProductList from "../features/admin/components/adminProductList";
import Navbar from "../features/navbar/navbar";

function AdminHomePage() {
	return (
		<div>
			<Navbar>
				<AdminProductList />
			</Navbar>
		</div>
	);
}

export default AdminHomePage;
