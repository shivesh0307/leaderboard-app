import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EnterPlayerInfo from './EnterPlayerInfo';
import Leaderboard from './Leaderboard';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(storedEntries);
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);

    // Calculate total points for each player
    /*const playersMap = storedEntries.reduce((map, entry) => {
      if (map[entry.id]) {
        map[entry.id].totalPoints += entry.points;
      } else {
        map[entry.id] = { id: entry.id, totalPoints: entry.points };
      }
      return map;
    }, {});

    setPlayers(Object.values(playersMap));*/
  }, []);

  const addEntry = (entry) => {
    setEntries([...entries, entry]);
    localStorage.setItem('entries', JSON.stringify([...entries, entry]));
    addPlayer(entry);
  };

  const addPlayer = (player) => {
    const existingPlayer = players.find((p) => p.id === player.id);

    if (existingPlayer) {
      const updatedPlayers = players.map((p) =>
        p.id === player.id ? { ...p, points: parseInt(p.points) + parseInt(player.points) } : p
      );
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
    } else {
      const updatedPlayers = [...players, player];
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
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
        <Route path='/' element={<EnterPlayerInfo addEntry={addEntry} />} />
      </Routes>

    </Router >

  );
};

export default App;
