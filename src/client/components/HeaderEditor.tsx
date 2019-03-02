import * as React from 'react';
import styled from 'styled-components';

interface Header {
    key: string;
    value: string;
}

interface HeaderRowProps {
    index: number;
    header: Header
    handleChange: (index: number, header: Header) => void;
}

export default function HeaderEditor() {
    const [headers, setHeaders] = React.useState([{
        key: '',
        value: ''
    }]);
    function handleChange(index: number, header: Header): void {
        console.log(index, header)
    }
    return (
        <>
            <H1>Headers</H1>
            {headers.map((h, i) => <HeaderRow key={i} header={h} index={i} handleChange={handleChange} />)}
        </>
    );
}

function HeaderRow ({ header, index, handleChange }: HeaderRowProps) {
    const onChange = (event: React.SyntheticEvent) => handleChange(index, header);
    return (
        <div key={index}>
            <Input  placeholder="Key" type="text" value={header.key} onChange={onChange} />
            <Input placeholder="Value" type="text" value={header.value} onChange={onChange} />
        </div>
    )
}

const H1 = styled.h1`
    color: #fff;
    font-size: 20px;
    margin-bottom: 8px;
    margin-top: 24px;
`;

const AddHeader: any = styled.div`
    display: flex;
`;

const Input: any = styled.input`
    background-color: #494949;
    border: 1px solid #505050;
    flex-grow: 1;
    width: 50%;
    color: #fff;
    font-family: "SF Mono", arial;

    &:focus {
        outline: 0;
    }
`;
