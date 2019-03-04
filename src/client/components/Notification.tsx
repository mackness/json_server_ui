import * as React from 'react';
import styled from 'styled-components';

export enum NotificationType {
    ERROR,
    SUCCESS,
    WARNING,
}

interface NotificationProps {
    type: NotificationType;
    text: string;
    show: boolean;
}

export default function Notification({
    type,
    text,
    show,
}: NotificationProps): JSX.Element {
    const [shouldShow, setShouldShow] = React.useState(false);
    React.useEffect(() => {
        if (show) {
            setShouldShow(true);
            setTimeout(() => setShouldShow(false), 2000);
        }
    });
    return (
        <Container type={type} show={shouldShow}>
            <Text>{text}</Text>
        </Container>
    );
}

const Container: any = styled.div`
    width: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    font-size: 12px;
    position: absolute;
    text-align: center;
    padding: 8px 0 8px 0;
    transition: transform 100ms linear;
    transform: translateY(-100%);
    ${(props: any) => {
        switch (props.type) {
            case NotificationType.ERROR:
                return `
                    color: #0771cd;
                    background-color: red;
                `;
            case NotificationType.SUCCESS:
                return `
                    color: #0771cd;
                    background-color: #0b85ef;
                `;
            default:
                return`
                    color: red;
                    background-color: red;
                `;
        }
    }};

    ${(props: any) => {
        if (props.show) {
            return `
                transform: translateY(0);
            `;
        }
    }}
`;

const Text: any = styled.p`
    color: #fff;
`;
