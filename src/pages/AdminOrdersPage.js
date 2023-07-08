import AdminOrders from "../features/admin/components/adminOrders";
import Navbar from "../features/navbar/navbar";

function AdminOrdersPage() {
	return (
		<div>
			<Navbar>
				<AdminOrders />
			</Navbar>
		</div>
	);
}

export default AdminOrdersPage;
