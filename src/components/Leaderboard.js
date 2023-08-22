import React from 'react';
import './styles.css'
const Leaderboard = ({ players }) => {
    return (
        <div className="board">
            <h1 className='leaderboard'>Leaderboard</h1>
            <div id="profile">
                {players.map((player) => (
                    <div className="flex" key={player.playerId}>
                        <div className="item">
                            <img src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"} alt="" />
                            <div className="info">
                                <h3 className='name text-dark'>{player.name}</h3>
                                <span>{player.playerId}</span>
                            </div>

                        </div>
                        <div className="item">
                            <span>{player.points}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Leaderboard;
