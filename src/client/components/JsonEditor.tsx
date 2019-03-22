import * as React from 'react';
import styled from 'styled-components';
import Notfication, { NotificationType } from './Notification';
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
            <Notfication type={NotificationType.SUCCESS} show={true} text={'Updated Successfully'} />
            <Editor
                value={code}
                insertSpaces={false}
                onValueChange={code => setCode(code)}
                highlight={code => {
                    return highlight(logCode(code), languages.javascript)
                        .split('\n')
                        .map(
                            (line, i) =>
                                `<span class="editor-line" data-line-number="${i}">${line}</span>`
                        )
                        .join('\n');
                }}
                padding={8}
                style={{
                    overflow: 'auto',
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
    overflow: hidden;
    position: relative;
    border-radius: 2px;

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

    .container__editor {
        font-size: 12px;
        counter-reset: line;
    }

    .editor-line {
        position: relative;
        padding-left: 21px;
    }

    .editor-line:before {
        position: absolute;
        left: 0;
        right: auto;
        top: 0;
        bottom: 0;
        height: 100%;
        color: #5C5C5C;
        content: attr(data-line-number) " ";
    }
`;
