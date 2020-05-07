import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
	// const cardComponent = robots.map((user, i) => {
	// 	// Always add a key when doing a loop to track each object
	// 	return (
	// 		<Card 
	// 			key={robots[i].id} 
	// 			id={robots[i].id} 
	// 			name={robots[i].name} 
	// 			email={robots[i].email} 
	// 			username={robots[i].username}
	// 		/>
	// 	);
	// })
	return (
		<div>
			{
				robots.map((user, i) => {
					// Always add a key when doing a loop to track each object
					return (
						<Card 
							key={robots[i].id} 
							id={robots[i].id} 
							name={robots[i].name} 
							email={robots[i].email} 
							username={robots[i].username}
						/>
					);
				})
			}
		</div>
	);
}

export default CardList;