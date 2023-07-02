import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

function Protected({ children }) {
	const user = useSelector(selectLoggedInUser);

	if (!user) {
		console.log("Up event");
		return <Navigate to="/login" replace={true}></Navigate>;
	}
	return children;
}

export default Protected;
