import React from 'react';
import JsonEditor from './JsonEditor';
import styled from 'styled-components';
import { Gear } from './Icon';
import { getLocalDbState } from '../model';
import { updateLocalDb, updateRemoteDb, displayContextMenu } from '../model';
const { remote } = require('electron');

let isMounted = false;
export default function App() {
    const [code, setCode] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [isEditorActive, setActiveEditor] = React.useState(true);

    const handleSave = (event: React.SyntheticEvent): any => {
        isEditorActive ? updateLocalDb(code) : updateRemoteDb(url);
    };

    const handleClick = () => {
        displayContextMenu('');
    };

    const fetchLocalDbState = () => {
        getLocalDbState().then(response => {
            return setCode(JSON.stringify(response.data, undefined, 2));
        });
    };

    React.useEffect(() => {
        if (!isMounted) {
            remote.getCurrentWindow().on('show', fetchLocalDbState);
        }
        isMounted = true;
    });
    return (
        <Container>
            {/* <Caret /> */}
            <Header>
                <H1>Local db.json</H1>
                <SettingsButton onClick={handleClick}>
                    <Gear fill="#fff" height={10} width={10} />
                </SettingsButton>
            </Header>
            <JsonEditor
                code={code}
                setCode={setCode}
                isEditorActive={isEditorActive}
                setActiveEditor={setActiveEditor}
            />
            <H1>Remote db.json</H1>
            <Input
                type="text"
                value={url}
                isActive={isEditorActive}
                onClick={() => setActiveEditor(false)}
                onChange={event => setUrl(event.target.value)}
                placeholder="https://github.com/typicode/demo/blob/master/db.json"
            />
            <SaveButton onClick={handleSave}>Update</SaveButton>
        </Container>
    );
}

const Button: any = styled.button`
    background-color: #0b85ef;
    color: #fff;
    font-weight: bold;
    outline: 0;
    border: 0;
    padding: 4px 18px;
    border-radius: 2px;
    overflow: hidden;

    &:hover {
        background-color: #2e98f8;
    }

    &:active {
        background-color: #0b85ef;
    }
`;

const Link: any = styled.a`
    background: #fff;
    color: #494949;
    font-size: 10px;
    border-radius: 20px;
`;

const Container = styled.div`
    max-width: 800px;
    padding: 0 6px;
    display: flex;
    flex-direction: column;
`;

const Caret: any = styled.div`
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
`;

const H1 = styled.p`
    color: #fff;
    font-size: 14px;
    flex-grow: 1;
    margin: 6px 0;
`;

const Input: any = styled.input`
    background: #282828;
    color: #bde052;
    outline: 0;
    padding: 6px 8px;
    border-radius: 2px;
    ${(props: any) => {
        if (props.isActive) {
            return `
                border: solid 1px #464646;
            `;
        } else {
            return `
                border: solid 1px #2e98f8;
            `;
        }
    }}
`;

const SaveButton = styled(Button)`
    cursor: pointer;
    margin: 12px 0;
    width: 100%;
    padding: 6px 0;
    font-size: 13px;
`;

const SettingsButton = styled(Button)`
    width: 20px;
    height: 20px;
    padding: 0;
    margin-right: 2px;
`;

const Header: any = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
