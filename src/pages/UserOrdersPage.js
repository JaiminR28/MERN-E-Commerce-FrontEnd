import Navbar from "../features/navbar/navbar";
import UserOrders from "../features/user/components/userOrders";

function UserOrdersPage() {
	return (
		<Navbar>
			<h1 className="mx-auto text-2xl">My Orders</h1>
			<UserOrders></UserOrders>
		</Navbar>
	);
}

export default UserOrdersPage;
