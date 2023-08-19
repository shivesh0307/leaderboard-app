import React, { useState } from 'react';

const Entry = ({ entry, editEntry, deleteEntry }) => {
    const [newEntry, setNewEntry] = useState(entry);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedPoints = parseInt(newEntry.points);

        if (!newEntry.playerId || !newEntry.name || isNaN(parsedPoints)) {
            setErrorMessage('Please fill in all fields with valid data.');
            return;
        }
        const updatedEntry = { ...newEntry, points: parsedPoints }
        //const entry = { playerId, name, points: parsedPoints };
        editEntry(updatedEntry);
        setNewEntry(updatedEntry);
    };

    return (
        <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form>
                <label>
                    Player ID:
                    <input type="text" value={newEntry.playerId} onChange={(e) => setNewEntry({ ...newEntry, playerId: e.target.value })} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={newEntry.name} onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })} />
                </label>
                <br />
                <label>
                    Points:
                    <input type="number" value={newEntry.points} onChange={(e) => setNewEntry({ ...newEntry, points: e.target.value })} />
                </label>
                <br />
                <button onClick={handleSubmit}>Edit</button>
                <button onClick={() => deleteEntry(entry)}>Delete</button>
            </form>
        </div>
    );
};

export default Entry;
