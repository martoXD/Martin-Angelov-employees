import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Table from './shared/Table';
import SelectFile from './shared/SelectFile';
import { filterData } from '../utils/helper';
import Input from './shared/Input';

const tableHeaders = {
    firstEmpID: 'Employee ID #1',
    secondEmpID: 'Employee ID #2',
    projectID: 'Project ID',
    daysWorked: 'Days worked'
};
// filter by projectID
const filter = '1';
// how many rows to select - default value
const defaultRowsToSelect = 1;

function Home() {
    const [filteredCsvData, setfilteredCsvData] = useState([]);
    const [rowsToSelect, setRowsToSelect] = useState(defaultRowsToSelect);

    const onParseCompleted = useCallback(async (parsedData) => {
        let filteredData = await filterData(parsedData, filter, rowsToSelect);
        if(filterData){
            setfilteredCsvData(filteredData);
        }
    }, [rowsToSelect]);

    const onInputChange = useCallback((e) => {
        if(isNaN(e.target.value)){
            setRowsToSelect(defaultRowsToSelect);
        }
        else {
            setRowsToSelect(e.target.value);
        }
    },[]);

    return (
        <Container>
            <SelectFile onParseCompleted={onParseCompleted} withHeader={false} />
            <Input type='text' placeholder={`Rows to select (default is ${defaultRowsToSelect})`} onInputChange={onInputChange} />
            <TableWrapper>
                {filteredCsvData?.length > 0 && <Table data={filteredCsvData} headers={tableHeaders} />}
            </TableWrapper>
        </Container>
    );
};

const TableWrapper = styled.div`
    width: 80%;
    display: flex;
    margin-top: 35px;
    height: 100%;
    overflow-y: hidden;
    overflow-x: clip;
`;

const Container = styled.main`
    display: flex;
    align-items: center;
    background-color: #ebebeb;
    justify-content: flex-start;
    flex-direction: column;
`;

export default Home;
