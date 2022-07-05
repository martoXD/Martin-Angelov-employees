import React from 'react';
import styled from 'styled-components';
import { array, object } from 'prop-types';

const renderRowData = (rowData, i) => {
    if(Array.isArray(rowData)){
        return rowData.map((row,i) => <RowText key={i}>{row}</RowText>)
    }
    else{
        return <RowText key={i}>{rowData}</RowText>
    }
};

const renderHeaderData = (headerData, i, arrLength) => {
    let headers = [];
    if(arrLength > 0 && Array.isArray(headerData)){
        for(let i = 1; i <= arrLength; i++){
            headers.push(<HeaderText key={i}>{`Employee ID #${i}`}</HeaderText>);
        }
        return headers;
    }
    else{
        return <HeaderText key={i}>{headerData}</HeaderText>
    }
};

function Table({data, headers}) {
    return (
        <TableView>
            <Header>
                {Object.values(headers).map((value,i) => {
                    return (
                        renderHeaderData(value,i,data[0].employeeIDs?.length)
                    )
                })}
            </Header>
            {data?.map((d,index) => {
                return (
                    <Row key={index}>
                        {Object.values(d).map((value,i) => {
                            return (
                                renderRowData(value,i)
                        )})}
                    </Row>
                )
            })}
        </TableView>
    );
};

const RowText = styled.span`
    padding-left: 20px;
    width: 25%;
    overflow: hidden;
    color: #43454a;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 2px solid #ebebeb;
    background-color: rgb(255, 255, 255);
    padding 10px;

    &:hover {
        background-color: #ebebeb;
        cursor: pointer;
    }
`;

const HeaderText = styled.span`
    color: rgb(232, 39, 155);
    font-weight: 700;
    padding-left: 20px;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 2px solid #ebebeb;
    background-color: rgb(255, 255, 255);
    padding 10px;
`;

const TableView = styled.div`
    background-color: #ebebeb;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    height: 700px;
`;

Table.propTypes = {
    data: array.isRequired,
    headers: object.isRequired
};

export default Table;


