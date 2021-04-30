import * as React from "react";
import { useState, useEffect, memo, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Accordion from 'react-bootstrap/Accordion';
import { nanoid } from 'nanoid';
import RangeSlider from 'react-bootstrap-range-slider';
import Products from './Products';

export function FilterItem({title, eventKey, children}) {
	return (
		<Card key={nanoid()}>
			<Accordion.Toggle as={Card.Header} eventKey={eventKey}>
				{title}
			</Accordion.Toggle>
			<Accordion.Collapse eventKey={eventKey}>
				<Card.Body>
					{children}
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
}

const Budget = memo(({priceMax, priceMin, setFilter, ...props}) => {
	const [budget, setBudget] = useState(priceMax);
	
	return (
	<FilterItem title="Set your budget" {...props}>
		<RangeSlider
			tooltip="on"
			size="lg"
			min={priceMin}
			max={priceMax}
			step={(priceMax - priceMin) / 10}
			value={budget}
			tooltipLabel={
				(val) => `${Math.round(val * 100) / 100}`
			}
			onChange={({target}) => setBudget(target.value)}
			onAfterChange={({target}) => setFilter((old) => ({
				...old,
				budget: (products) =>
					Array.prototype.filter.call(
						products,
						({price}) => price <= target.value
					)
			}))}
		/>
	</FilterItem>
	);
}, (_, __) => true);

const Categories = memo(({categories, setFilter, ...props}) => {
	return (
	<FilterItem title="Choose categories" {...props}>
		<ButtonGroup>
			{
				categories.map((cat) => <Button
					variant="outline-dark"
					>
						{cat}
					</Button>
				)
			}
		</ButtonGroup>
	</FilterItem>
	);
}, (_, __) => true);

const SortBy = memo(({setFilter, ...props}) => {
	const [pSort, setPSort] = useState(null);

	return (
	<FilterItem title="Sort By" {...props}>
		<DropdownButton
			className="mb-4 mt-2"
			title={`Sort by Price ${pSort ? ' - ' + pSort : ''}`}
		>
			<Dropdown.Item
				as="button"
				onClick={() => {
					setFilter((old) => ({
						...old,
						order: (products) => Array.prototype.sort.call(
							products,
							({price}, other) => other.price - price 
						)
					}));
					setPSort('High to Low');
				}}
			>
				High to Low
			</Dropdown.Item>
			<Dropdown.Item
				as="button"
				onClick={() => {
					setFilter((old) => ({
						...old,
						order: (products) => Array.prototype.sort.call(
							products,
							({price}, other) => price - other.price 
						)
					}));
					setPSort('Low to High');
				}}
			>
				Low to High
			</Dropdown.Item>
		</DropdownButton>
		<Button className="mb-4 mt-2" onClick={() => {
			setFilter((old) => ({
				...old,
				order: (products) => Array.prototype.sort.call(
					products,
					(_, __) => Math.random() - Math.random()
				)
			}));
			setPSort(null);
		}}>
			Sort by Relevance
		</Button>
	</FilterItem>
	);
}, (_, __) => true);

function SideFilterComp(props) {

	return (
		<Accordion defaultActiveKey="0">
			<Budget eventKey="0" {...props} />
			<Categories eventKey="1" {...props} />
			<SortBy eventKey="2" {...props} />
		</Accordion>
	);
}

export const SideFilter = memo(SideFilterComp, (_, __) => true);

export default function Search({products}) {
	const [results, setResults] = useState(products);
	const [filterfn, setFilter] = useState(null);

	useEffect(() => {
		if(filterfn) {
			let res = [...products];

			for(const fn in filterfn) res = filterfn[fn](res);

			setResults(res);
		}
	}, [filterfn, products]);

	const [min, max, cat] = useMemo(() => {
		const p = products.map(({price}) => price),
		b = p.reduce((one, other) => one + other) / p.length + 100;
		console.log('recompute')
		
		return [
			Math.min(...p),
			Math.max(...p) + b,
			Array.from(new Set(products.map(({category}) => category)))
		];
	}, [products]);
	// console.log(results);

	return (
	<>
	<SideFilter
		categories={cat}
		priceMax={max}
		priceMin={min}
		setFilter={setFilter}
	/>
	<Products variant="list" products={results} horizontal={false} />
	</>
	);
}