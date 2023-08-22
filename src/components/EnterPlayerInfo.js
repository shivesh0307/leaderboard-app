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
                <div className="form-group">

                    Player ID:
                    <input className="form-control" type="text" value={playerId} onChange={(e) => setPlayerId(e.target.value)} />

                </div>

                <div className="form-group">
                    Name:
                    <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    Points:
                    <input className="form-control" type="number" value={points} onChange={(e) => setPoints(e.target.value)} />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Add Player</button>
            </form>
        </div >
    );
};

export default EnterPlayerInfo;
