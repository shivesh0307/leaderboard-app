import React, { useState } from 'react';

const EnterPlayerInfo = ({ addEntry }) => {
    const [playerId, setPlayerId] = useState('');
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedPoints = parseInt(points);

        if (!playerId || !name || isNaN(parsedPoints)) {
            setErrorMessage('Please fill in all fields with valid data.');
            return;
        }

        const entry = { playerId, name, points: parsedPoints };
        addEntry(entry);

        setPlayerId('');
        setName('');
        setPoints('');
        setErrorMessage('');
    };

    return (
        <div>
            <h2>Enter Player Information</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Player ID:
                    <input type="text" value={playerId} onChange={(e) => setPlayerId(e.target.value)} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Points:
                    <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} />
                </label>
                <br />
                <button type="submit">Add Player</button>
            </form>
        </div>
    );
};

export default EnterPlayerInfo;
