import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EnterPlayerInfo from './EnterPlayerInfo';
import Leaderboard from './Leaderboard';
import Entry from './Entry';
import { nanoid } from 'nanoid'

const App = () => {
  const [players, setPlayers] = useState([]);
  const [entries, setEntries] = useState([]);
  //console.log("hi");

  useEffect(() => {
    //console.log("hi");
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(storedEntries);
  }, []);

  useEffect(() => {
    //Calculate total points for each player
    //console.log("hi");
    const playersMap = entries.reduce((map, entry) => {
      if (map[entry.playerId]) {
        map[entry.playerId].points += entry.points;
        map[entry.playerId].name = entry.name;
      } else {
        map[entry.playerId] = { playerId: entry.playerId, name: entry.name, points: entry.points };
      }
      return map;
    }, {});
    setPlayers(Object.values(playersMap));
  }, [entries]);

  const addEntry = (entry) => {
    entry = { ...entry, id: nanoid() };
    localStorage.setItem('entries', JSON.stringify([...entries, entry]));
    setEntries([...entries, entry]);
  };
  const deleteEntry = (entryToDelete) => {
    const updatedEntries = entries.filter((entry) => entry.id !== entryToDelete.id);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  const editEntry = (entry) => {
    const updatedEntries = entries.map((e) =>
      e.id === entry.id ? entry : e
    );
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Enter Player Points</Link>
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
      <div>
        <h2>All Entries</h2>
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            entry={entry}
            editEntry={editEntry}
            deleteEntry={deleteEntry}
          />
        ))}
      </div>

    </Router >


  );
};

export default App;
