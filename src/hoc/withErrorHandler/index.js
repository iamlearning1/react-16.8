import React, { useState, Fragment, useEffect } from "react";

import Modal from "Components/UI/Modal";

export default (WrappedComponent, axios) => {
	return props => {
		const [error, setError] = useState(null);

		const reqInterceptor = axios.interceptors.request.use(req => {
			setError(null);
			return req;
		});

		const resInterceptor = axios.interceptors.response.use(
			res => res,
			error => {
				setError(error.message);
			}
		);

		const errorConfirmedHandler = () => {
			setError(null);
		};

		useEffect(
			() => () => {
				axios.interceptors.request.eject(reqInterceptor);
				axios.interceptors.response.eject(resInterceptor);
			},
			[reqInterceptor, resInterceptor]
		);

		return (
			<Fragment>
				<Modal show={error} modalClosed={errorConfirmedHandler}>
					{error ? error : null}
				</Modal>
				<WrappedComponent {...props} />
			</Fragment>
		);
	};
};
