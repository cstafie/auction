import React from 'react';

const Card = ({rank, suit}) => {
	return <div className='card'>
		{rank ? rank : 'R'} {suit ? suit : 'S'}
	</div>
};

const Player = ({username, cards}) => {
	return <div key={username} className='player'>
		<div> {username} </div>
		<div> {cards ? cards.map((card, index) => <Card key={index} {...card} />) : null} </div>
	</div>;
};

const Game = ({players, state}) => {

	return <div className='game'>
		<div> {state} </div>
		<div> {players ? players.map(Player) : null} </div>
	</div>;
};

export default Game;