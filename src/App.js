import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EnterPlayerInfo from './components/EnterPlayerInfo';
import Leaderboard from './components/Leaderboard';
import Entry from './components/Entry';
import Entries from './components/Entries';
import { nanoid } from 'nanoid'
import FileUpload from './components/FileUpload';
import './components/styles.css'
import './App.css'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';


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

  const addEntries = (newEntries) => {
    const new_entries_with_id = newEntries.map((entry) => ({
      ...entry, id: nanoid()
    }))
    const updatedEntries = [...entries, ...new_entries_with_id]
    localStorage.setItem('entries', JSON.stringify(updatedEntries))
    setEntries(updatedEntries)
  }

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
      <div style={{ display: 'flex', height: '100vh' }}>
        <div className="Sidebar" style={{ height: '100vh' }}>
          <CDBSidebar textColor="#fff" backgroundColor="#333" style={{ height: '100%' }}>
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                Sidebar
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">Enter Player Points</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/leaderboard" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">Leaderboard</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/entries" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user">All Entries</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/file-upload" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="upload">File Upload</CDBSidebarMenuItem>
                </NavLink>

              </CDBSidebarMenu>

            </CDBSidebarContent>

          </CDBSidebar>
        </div>

        {/*<div>
        <nav>
          <ul>
            <li>
              <Link to="/"></Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/entries"></Link>
            </li>
            <li>
              <Link to="/file-upload">/Link>
            </li>
          </ul>
        </nav>
            </div>
        */ }
        <div className="App" id='main'>
          <Routes>
            <Route path='/leaderboard' element={<Leaderboard players={players} />} />
            <Route path='/' element={<EnterPlayerInfo addEntry={addEntry} />} />
            <Route path='/entries' element={<Entries entries={entries} editEntry={editEntry} deleteEntry={deleteEntry} />} />
            <Route path='/file-upload' element={<FileUpload addEntries={addEntries} />} />

          </Routes>
          {/*<div>
          <Entries entries={entries} editEntry={editEntry} deleteEntry={deleteEntry} />
      </div>*/}
        </div>
      </div>
    </Router >


  );
};

export default App;
