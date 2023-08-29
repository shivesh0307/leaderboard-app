import React, { useState } from 'react';
import * as XLSX from "xlsx/xlsx";

const FileUpload = ({ addEntries }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [Message, setMessage] = useState('')
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const entries = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                addEntries(entries);

            };
            reader.readAsArrayBuffer(selectedFile);

            setMessage("Success");
        }
        else {
            setMessage("Error : Upload file")
        }
    };

    return (
        <div>
            {Message && <p style={{ color: 'Black' }} >{Message}  </p>}
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
