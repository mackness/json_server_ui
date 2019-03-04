import * as React from 'react';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

interface JsonEditorProps {
    code: string;
    setCode: Function;
    isEditorActive: boolean;
    setActiveEditor: Function;
}

function logCode(code) {
    console.log(code);
    return code;
}

export default function JsonEditor({
    code,
    setCode,
    isEditorActive,
    setActiveEditor,
}: JsonEditorProps): JSX.Element {
    return (
        <EditorContainer
            isActive={isEditorActive}
            onClick={e => setActiveEditor(true)}
        >
            <Editor
                value={code}
                insertSpaces={false}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(logCode(code), languages.javascript)}
                padding={8}
                style={{
                    overflow: 'scroll',
                    height: 'calc(100vh - 140px)',
                    outline: 'none',
                    background: '#282828',
                    border: 'solid 1px #464646',
                    color: '#fff',
                    borderRadius: '2px',
                    fontFamily: '"SF Mono", monospace',
                    fontSize: 12,
                }}
            />
        </EditorContainer>
    );
}

const EditorContainer: any = styled.div`
    textarea {
        outline: 0;
        color: #fff;
        outline: 0;
        overflow: scroll;
        border-radius: 2px;
        height: calc(100vh - 140px);
        font-size: 12px;
        background: #282828;
        font-family: 'SF Mono', monospace;
    }

    border-radius: 2px
    ${(props: any) => {
        if (props.isActive) {
            return `
                border: solid 1px #2e98f8 !important;
            `;
        } else {
            return `
                border: solid 1px #464646;
            `;
        }
    }}
`;
