import React, { useState } from 'react';

const EnterPlayerInfo = ({ addPlayer }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [points, setPoints] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedPoints = parseInt(points);

        if (!id || !name || isNaN(parsedPoints)) {
            setErrorMessage('Please fill in all fields with valid data.');
            return;
        }

        const player = { id, name, points: parsedPoints };
        addPlayer(player);

        setId('');
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
                    ID:
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
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
