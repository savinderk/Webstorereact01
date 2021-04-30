import * as React from "react";
import { Link } from 'gatsby';
import Nav from 'react-bootstrap/Nav';
import { nanoid } from 'nanoid';

export function NavMenuItem({ to, children, key, ...props }) {
	return (
		<Nav.Item key={key}>
			<Nav.Link {...props} as={Link} eventKey={to} to={to}>
				{children}
			</Nav.Link>
		</Nav.Item>
	);
}

export const Routes = [
	{ href: '/', name: 'Home' },
	{ href: '/products', name: 'Products' },
	{ href: '/search', name: 'Search' }
];

function NavMenu({location}) {
	return (
		<Nav
			className="justify-content-center sticky-top"
			variant="pills"
			activeKey={location}
		>
			{
				Routes.map(({ href, name }) => (
					<NavMenuItem to={href} key={nanoid()}>
						{name}
					</NavMenuItem>
				))
			}
		</Nav>
	);
}

export default NavMenu;