import React from 'react';
import { Table as TableBootstrap } from 'react-bootstrap';
import { dataArray, headingArray } from './array';
import './Table.scss';

const Table = () => {
	return (
		<div>
			<TableBootstrap responsive>
				<thead>
					<tr className='table-heading'>
						{headingArray.map((heading) => {
							return (
								<>
									<th>{heading.id}</th>
									<th>{heading.name}</th>
									<th>{heading.email}</th>
									<th>{heading.username}</th>
									<th>{heading.city}</th>
									<th>{heading.zipCode}</th>
									<th>{heading.companyName}</th>
								</>
							);
						})}
					</tr>

				</thead>
				<tbody>
					{dataArray.map((person) => {
						return (
							<tr>
								<td>{person.id}</td>
								<td>{person.name}</td>
								<td>{person.email}</td>
								<td>{person.username}</td>
								<td>{person.address.city}</td>
								<td>{person.address.zipcode}</td>
								<td>{person.company.name}</td>
							</tr>
						);
					})}
				</tbody>
			</TableBootstrap>
		</div>
	)
}

export default Table
