import { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function LogOut() {
	const dispatch = useDispatch();
	const user = useSelector(selectLoggedInUser);

	// but   useEffect  reuns after render, so we have to delay navigate part
	useEffect(() => {
		localStorage.removeItem("persist:root");
		dispatch(signOutAsync());
		localStorage.removeItem(localStorage.key(0));
		localStorage.removeItem(localStorage.key(2));
	});

	return <>{!user && <Navigate to={"/login"} replace={true}></Navigate>} </>;
}
export default LogOut;
