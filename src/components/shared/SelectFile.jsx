import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

const acceptedFileExtensions = ['.csv'];
const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    return 'rgb(232,39,155)';
};

function SelectFile({onParseCompleted, withHeader}) {
    const parseFile = useCallback((file) => {
        let parsedData = [];
        Papa.parse(file, {
          header: withHeader,
          complete: () => {
            onParseCompleted(parsedData);
            parsedData = [];
          },
          step: (results) => {parsedData.push({...results.data})},
          skipEmptyLines: true
        });
    }, [onParseCompleted, withHeader]);

    const onDropAccepted = useCallback((acceptedFiles) => {
        if (acceptedFiles.length) {
          parseFile(acceptedFiles[0]);
        }
    }, [parseFile]);

    const {acceptedFiles, getRootProps, getInputProps, isDragAccept, isDragReject} = useDropzone({
        accept: {
          'text/csv': acceptedFileExtensions
        },
        multiple: false,
        onDropAccepted
    });

    const filePath = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path}
        </li>
    ));

    return (
        <section>
            <StyledDiv {...getRootProps({isDragAccept, isDragReject})}>
                <input {...getInputProps()}/>
                <p>Drag and drop a csv file here, or click to select a file</p>
            </StyledDiv>
            <StyledAside>
                <h4>File</h4>
                <ul>{filePath}</ul>
            </StyledAside>
        </section>
    );
};

const StyledDiv = styled.div`
    padding: 10px;
    margin: 10%;
    background-color: rgb(255,255,255);
    transition: border .24s ease-in-out;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;

    p {
        color: #43454a;
    }
`;

const StyledAside = styled.aside`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #43454a;
`;

export default SelectFile;


