import * as React from "react";
import Carousel from '../components/SliderArea';
import Search from '../components/Search';
import Dummy from '../dummy_data.json';
import Header from '../components/Header';
import NavMenu from '../components/NavMenu';

const SearchPage = () => (
	<>
	<Header />
	<NavMenu location="/search"/>
	<Search {...Dummy} />
	</>
);

export default SearchPage;