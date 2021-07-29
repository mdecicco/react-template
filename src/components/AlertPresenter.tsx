import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import update from 'immutability-helper';

import { Flex } from 'components';
import API from 'api';
import { UUID } from 'utils';

const AlertFadeDuration = 250; // ms
const AlertSlideDuration = 300; // ms
const AlertHeight = 70; // px
const AlertWidth = 180; // px
const AlertTitleMargin = 5; // px
const AlertTitleSize = 18; // px
const AlertTimerHeight = 2; // px
const AlertTimerVMargin = 5; // px

const Container = styled.div`
    position: absolute;
    pointer-events: none;
    top: 0px;
    right: 0px;
    min-width: ${AlertWidth + 20}px;
    max-width: ${AlertWidth + 20}px;
    width: ${AlertWidth + 20}px;
    height: 100vh;
`;

const AlertFadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const AlertBox = styled.div`
    position: absolute;
    left: 10px;
    min-height: ${AlertHeight}px;
    max-height: ${AlertHeight}px;
    height: ${AlertHeight}px;
    min-width: ${AlertWidth}px;
    max-width: ${AlertWidth}px;
    width: ${AlertWidth}px;
    transition: top ${AlertSlideDuration}ms ease-in-out, opacity ${AlertFadeDuration}ms ease-in-out, background-color 125ms, box-shadow 125ms;
    animation-name: ${AlertFadeIn};
    animation-duration: ${AlertFadeDuration}ms;
    animation-iteration-count: 1;
    box-shadow: 3px 3px 6px 0px black;
    background-color: #bda07c;
    color: #301f00;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    pointer-events: all;
    cursor: pointer;

    &:hover {
        background-color: #c5ab8c;
        
        &:active {
            background-color: #bda07c;
            box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
        }
    }
`;

const AlertTitle = styled.span`
    pointer-events: none;
    font-size: ${AlertTitleSize}px;
    font-family: sans-serif;
    margin: ${AlertTitleMargin}px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const AlertMessage = styled.div`
    pointer-events: none;
    font-size: 15px;
    margin: 0px 5px 0px 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    min-height: ${AlertHeight - (AlertTitleSize + (2 * AlertTitleMargin) + AlertTimerHeight + (2 * AlertTimerVMargin))}px;
    max-height: ${AlertHeight - (AlertTitleSize + (2 * AlertTitleMargin) + AlertTimerHeight + (2 * AlertTimerVMargin))}px;
    height: ${AlertHeight - (AlertTitleSize + (2 * AlertTitleMargin) + AlertTimerHeight + (2 * AlertTimerVMargin))}px;
`;

interface AlertTimerProps {
    duration: number;
};

const DurationVariantDiv = styled.div.attrs((props: AlertTimerProps) => ({
    duration: props.duration
}));

const TimerShrink = keyframes`
    from {
        min-width: ${AlertWidth - 10}px;
        max-width: ${AlertWidth - 10}px;
        width: ${AlertWidth - 10}px;
    }
    to {
        min-width: 0px;
        max-width: 0px;
        width: 0px;
    }
`;

const AlertTimerBox = DurationVariantDiv`
    pointer-events: none;
    position: absolute;
    left: 5px;
    bottom: ${AlertTimerVMargin - AlertTimerHeight}px;
    min-height: ${AlertTimerHeight}px;
    max-height: ${AlertTimerHeight}px;
    height: ${AlertTimerHeight}px;
    background-color: red;
    animation-name: ${TimerShrink};
    animation-duration: ${(props) => props.duration}s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
`;

const AlertPresenter : React.FC = () => {
    const { alerts } = API.Alerts.use();

    const removeAlert = API.Alerts.useRemoveAlert();
    const updateAlert = API.Alerts.useUpdateAlert();

    const animateRemoveAlert = React.useCallback((uuid: UUID) => {
        const a = alerts.find(c => c.uuid === uuid);
        if (a) {
            // Make it fade out
            updateAlert(update(a, {
                fading: { $set: true }
            }));

            // Remove it after the fading animation completes
            setTimeout(() => {
                removeAlert(uuid);
            }, AlertFadeDuration);
        }
    }, [alerts, removeAlert, updateAlert]);
    
    const alertMouseOver = React.useCallback((uuid: UUID) => {
        const a = alerts.find(c => c.uuid === uuid);
        if (!a || !a.timeoutId || a.fading) return;
        clearTimeout(a.timeoutId);
        updateAlert(update(a, {
            timeoutId: { $set: null },
            hovered: { $set: true }
        }));
    }, [alerts, updateAlert]);

    const alertMouseOut = React.useCallback((uuid: UUID) => {
        const a = alerts.find(c => c.uuid === uuid);
        if (!a || !a.hovered) return;

        const timeoutId = setTimeout(() => { animateRemoveAlert(a.uuid); }, a.duration * 1000);
        updateAlert(update(a, {
            timeoutId: { $set: timeoutId },
            hovered: { $set: false }
        }));
    }, [alerts, updateAlert, animateRemoveAlert]);

    React.useEffect(() => {
        alerts.forEach(a => {
            if (a.duration > 0 && a.timeoutId === null && !a.hovered) {
                const timeoutId = setTimeout(() => { animateRemoveAlert(a.uuid); }, a.duration * 1000);
                updateAlert(update(a, {
                    timeoutId: { $set: timeoutId }
                }));
            }
        });
    }, [alerts, updateAlert, animateRemoveAlert]);

    return (
        <Container>
            <Flex mode={Flex.Mode.Vertical}>
                {alerts.map((a, idx) => (
                    <AlertBox
                        key={a.uuid}
                        style={{
                            top: `${10 + (idx * (AlertHeight + 10))}px`,
                            opacity: a.fading ? 0 : 1
                        }}
                        onMouseOver={() => alertMouseOver(a.uuid)}
                        onMouseOut={() => alertMouseOut(a.uuid)}
                    >
                        <AlertTitle>{a.title}</AlertTitle>
                        <AlertMessage>{a.message}</AlertMessage>
                        {a.timeoutId && !a.fading && (<AlertTimerBox duration={a.duration}/>)}
                    </AlertBox>
                ))}
            </Flex>
        </Container>
    );
};

export default AlertPresenter;