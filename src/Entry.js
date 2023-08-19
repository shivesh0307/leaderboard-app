import React from 'react';

const Entry = ({ entry, editEntry, deleteEntry }) => {
    return (
        <div className="entry">
            <p>playerID: {entry.playerId}</p>
            <p>Name: {entry.name}</p>
            <p>Points: {entry.points}</p>
            <button onClick={() => editEntry(entry)}>Edit</button>
            <button onClick={() => deleteEntry(entry)}>Delete</button>
        </div>
    );
};

export default Entry;
