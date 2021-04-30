import * as React from "react";
import { Link } from 'gatsby';

function Slide({image, url, altText}){
	return (
		<Link to={url}>
			<img className='d-block w-75 mh-75 p-4' src={image} alt={altText} />
		</Link>
	);
}


export default Slide;
