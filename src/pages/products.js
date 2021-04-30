import * as React from "react";
import Carousel from '../components/SliderArea';
import Products from '../components/Products';
import Dummy from '../dummy_data.json';
import Header from '../components/Header';
import NavMenu from '../components/NavMenu';


const ProductsPage = () => (
	<>
	<Header />
	<NavMenu location="/products"/>
	<Carousel {...Dummy} />
		<Products
			products={Dummy.products}
			className="flex-wrap"
			itemProps={{
				className: "w-25"
			}}
		/>
	</>
);

export default ProductsPage;