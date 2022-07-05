import React from 'react';
import styled from 'styled-components';

function Input(props) {
    return (
        <InputStyled type={props.type} placeholder={props.placeholder} onChange={e => props.onInputChange(e)} />
    );
};

const InputStyled = styled.input`
    padding: 4px;
    text-align: center;
    border-color: rgb(232,39,155);
    border-style: dashed;
    outline: none;
`;

export default Input;