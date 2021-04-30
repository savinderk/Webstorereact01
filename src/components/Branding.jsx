import * as React from "react";
import './css/Branding.css';

function Branding () {
	return (
		<div className="site-branding-area">
		<div className="container">
			<div className="row">
			<div className="col-sm-6">
				<div className="logo">
				<br />
				<a href="index.html">
					<img
						src="images/logo.png"
						height="60px"
						width="120px"
						alt="logo"
					/>
				</a>
				</div>
			</div>
			<div className="col-sm-6">
				<div className="shopping-item">
				<a href="cart.html">
					Cart - <span className="cart-amunt">$100</span>{" "}
					<i className="fa fa-shopping-cart" />{" "}
					<span className="product-count">5</span>
				</a>
				</div>
			</div>
			</div>
		</div>
		</div>
	);
}

export default Branding;
