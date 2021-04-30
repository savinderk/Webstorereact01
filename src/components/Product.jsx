import * as React from "react";
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'gatsby';

export default function Product({title, price, description, category, image}){
	return (
		<Container>
			<Row>
				<Col xs={4} md={2} >
					<Image rounded fluid src={image} />
				</Col>
			</Row>
		</Container>
	);
}

export function ProductListItem({
	image,
	title,
	id,
	description=null,
	price=null
}) {
	return (
		<Media as={Link} to={`/product/${id}`}>
			<Image
				thumbnail
				src={image}
				height={144}
				width={176}
				className="align-self-start mr-3 d-block"
			/>
			<Media.Body className="lead text-dark">
				{
					description ? (
					<>
					<h4>{title}</h4>
					{ price ? <strong>{price}</strong> : null }
					<p className="lead sm">{description}</p>
					</>
					) : {title}
				}
			</Media.Body>
		</Media>
	);
}

export function ProductTile({image, title, id}) {
	return (
		<Container as={Link} to={`/product/${id}`}>
			<Row>
				<Image
					thumbnail
					src={image}
					height={144}
					width={176}
					alt={title}
					className="d-block m-auto"
				/>
			</Row>
			<Row className="lead text-dark sm m-auto">
					{title}
			</Row>
		</Container>
	);
}
