import * as React from "react";
import Carousel from '../components/SliderArea';
import Header from '../components/Header';
import Branding from '../components/Branding';
import NavMenu from '../components/NavMenu';
import Dummy from '../dummy_data.json';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faUser,
	faHeart,
	faSignInAlt,
	faCreditCard,
	faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
library.add(faUser, faHeart, faSignInAlt, faCreditCard, faShoppingCart);

function App() {
	return (
		<>
			<Header />
			<Branding />
			<NavMenu location="/" />
			<Carousel {...Dummy} />
		</>
	);
}

export default App;

