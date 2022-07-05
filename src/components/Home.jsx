import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Table from './shared/Table';
import SelectFile from './shared/SelectFile';
import { filterData } from '../utils/helper';

const tableHeaders = {
    firstEmpID: 'Employee ID #1',
    secondEmpID: 'Employee ID #2',
    projectID: 'Project ID',
    daysWorked: 'Days worked'
};
// filter by projectID
const filter = '1';

function Home() {
    const [filteredCsvData, setfilteredCsvData] = useState([]);

    const onParseCompleted = useCallback(async (parsedData) => {
        let filteredData = await filterData(parsedData, filter);
        if(filterData){
            setfilteredCsvData(filteredData);
        }
    }, []);

    return (
        <Container>
            <SelectFile onParseCompleted={onParseCompleted} withHeader={false} />
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
    overflow-y: scroll;
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
