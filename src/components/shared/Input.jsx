import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

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

Input.propTypes = {
    type: string.isRequired,
    placeholder: string.isRequired,
    onInputChange: func.isRequired
};

export default Input;