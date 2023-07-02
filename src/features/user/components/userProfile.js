import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync } from "../userSlice";

export function Counter() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchLoggedInUserOrdersAsync);
	});
	return <div></div>;
}
