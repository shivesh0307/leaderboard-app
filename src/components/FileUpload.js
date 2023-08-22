import React, { useState } from 'react';
import * as XLSX from "xlsx/xlsx";

const FileUpload = ({ addEntry }) => {
    const [selectedFile, setSelectedFile] = useState(null);

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
                addEntry(entries);

            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
