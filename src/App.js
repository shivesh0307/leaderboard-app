import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EnterPlayerInfo from './EnterPlayerInfo';
import Leaderboard from './Leaderboard';

const App = () => {
  const [players, setPlayers] = useState([]);

  const addPlayer = (player) => {
    const existingPlayer = players.find((p) => p.id === player.id);

    if (existingPlayer) {
      const updatedPlayers = players.map((p) =>
        p.id === player.id ? { ...p, points: parseInt(p.points) + parseInt(player.points) } : p
      );
      setPlayers(updatedPlayers);
    } else {
      setPlayers([...players, player]);
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Enter Player Info</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>
      </div>



      <Routes>
        <Route path='/leaderboard' element={<Leaderboard players={players} />} />
        <Route path='/' element={<EnterPlayerInfo addPlayer={addPlayer} />} />
      </Routes>

    </Router >

  );
};

export default App;
