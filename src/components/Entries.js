import React from 'react';
import Entry from './Entry';
const Entries = ({ entries, editEntry, deleteEntry }) => {

    return (
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
    );
};

export default Entries;
