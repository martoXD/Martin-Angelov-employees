import React from 'react';
import styled from 'styled-components';

const renderRowData = (rowData, i) => {
    if(Array.isArray(rowData)){
        return rowData.map((row,i) => <RowText key={i}>{row}</RowText>)
    }
    else{
        return <RowText key={i}>{rowData}</RowText>
    }
};

function Table({data, headers}) {
    return (
        <TableView>
            <Header>
                {Object.values(headers).map((value,i) =>{
                    return (
                        <HeaderText key={i}>{value}</HeaderText>
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
`;

export default Table;


