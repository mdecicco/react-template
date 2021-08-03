import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import update from 'immutability-helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faInfoCircle, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import Flex from './Flex';
import ContextMenu from './ContextMenu';
import API, { Alert, AlertType } from '@api';
import { UUID } from '@utils';
import { useDispatch } from 'react-redux';
import Button from './Button';

const AlertFadeDuration = 250; // ms
const AlertSlideDuration = 300; // ms
const AlertHeight = 70; // px
const AlertWidth = 380; // px
const AlertTitleMargin = 5; // px
const AlertTitleSize = 18; // px
const AlertTimerHeight = 2; // px
const AlertTimerVMargin = 5; // px
const ButtonRowHeight = 29; // px
const ButtonRowMargin = 5; // px

const Container = styled.div`
    position: absolute;
    pointer-events: none;
    top: 0px;
    right: 0px;
    min-width: ${AlertWidth + 20}px;
    max-width: ${AlertWidth + 20}px;
    width: ${AlertWidth + 20}px;
    height: 100vh;
    overflow-y: hidden;
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
    min-width: ${AlertWidth}px;
    max-width: ${AlertWidth}px;
    width: ${AlertWidth}px;
    transition: top ${AlertSlideDuration}ms ease-in-out,
                height ${AlertSlideDuration}ms ease-in-out,
                min-height ${AlertSlideDuration}ms ease-in-out,
                max-height ${AlertSlideDuration}ms ease-in-out,
                opacity ${AlertFadeDuration}ms ease-in-out,
                background-color 125ms,
                box-shadow 125ms;
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
    overflow-y: hidden;
    z-index: 3;

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
    margin: 0px 5px 5px 5px;
    max-width: ${AlertWidth - (AlertHeight + 10)}px;
    min-width: ${AlertWidth - (AlertHeight + 10)}px;
    width: ${AlertWidth - (AlertHeight + 10)}px;
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
        min-width: ${AlertWidth - (AlertHeight + 5)}px;
        max-width: ${AlertWidth - (AlertHeight + 5)}px;
        width: ${AlertWidth - (AlertHeight + 5)}px;
    }
    to {
        min-width: 0px;
        max-width: 0px;
        width: 0px;
    }
`;

const AlertTimerBox = DurationVariantDiv`
    pointer-events: none;
    min-height: ${AlertTimerHeight}px;
    max-height: ${AlertTimerHeight}px;
    height: ${AlertTimerHeight}px;
    background-color: red;
    animation-name: ${TimerShrink};
    animation-duration: ${(props) => props.duration}s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
`;

const AlertImg = styled.img`
    width: ${AlertHeight - 10}px;
    height: ${AlertHeight - 10}px;
    margin: 5px;
    border-radius: 5px;
`;

const AlertIconContainer = styled.div`
    width: ${AlertHeight - 10}px;
    height: ${AlertHeight - 10}px;
    margin: 5px;
    border-radius: 5px;
    font-size: 40px;
    line-height: 60px;
    text-align: center;
`;

const ButtonDrawer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 5px;
`;

const CloseButtonWrapper = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 2px 5px 0px 0px;
    color: rgba(100, 64, 0, 0.73);
    font-size: 16px;
    width: 24px;
    height: 24px;
    text-align: right;
    transition: color 125ms;

    &:hover {
        color: rgba(28, 18, 0, 0.73);
    }
`;

type AlertIconProps = {
    type: AlertType
};

const AlertIcon = (props: AlertIconProps) => {
    let icon = faInfoCircle;
    let color = '#301f00';
    if (props.type === API.Alerts.AlertType.Warning) {
        icon = faExclamationCircle;
        color = '#ffe000';
    }
    else if (props.type === API.Alerts.AlertType.Error) {
        icon = faExclamationTriangle;
        color = '#c40000';
    }

    return (
        <AlertIconContainer style={{ color }}>
            <FontAwesomeIcon icon={icon}/>
        </AlertIconContainer>
    );
};

const AlertPresenter : React.FC = () => {
    const { alerts } = API.Alerts.use();
    const dispatch = useDispatch();

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
        if (!a || a.fading) return;
        if (a.timeoutId) clearTimeout(a.timeoutId);
        updateAlert(update(a, {
            timeoutId: { $set: null },
            hovered: { $set: true }
        }));
    }, [alerts, updateAlert]);

    const alertMouseOut = React.useCallback((uuid: UUID) => {
        const a = alerts.find(c => c.uuid === uuid);
        if (!a || !a.hovered || a.fading) return;

        const timeoutId = a.duration > 0.0 ? setTimeout(() => { animateRemoveAlert(a.uuid); }, a.duration * 1000) : null;
        updateAlert(update(a, {
            timeoutId: { $set: timeoutId },
            hovered: { $set: false }
        }));
    }, [alerts, updateAlert, animateRemoveAlert]);
    
    const pinAlert = React.useCallback((alerts: Alert[], uuid: UUID) => {
        const a = alerts.find(c => c.uuid === uuid);
        if (!a || a.fading) return;
        if (a.timeoutId) clearTimeout(a.timeoutId);
        updateAlert(update(a, {
            timeoutId: { $set: null },
            duration: { $set: 0 }
        }));
    }, [updateAlert]);

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

    let verticalOffset = 10; // px
    return (
        <Container>
            <Flex mode={Flex.Mode.Vertical}>
                {alerts.map(a => {
                    const cVOff = verticalOffset;
                    verticalOffset += AlertHeight + 10;
                    let height = AlertHeight;
                    if (a.buttons.length > 0 && a.hovered) {
                        verticalOffset += ButtonRowHeight + ButtonRowMargin;
                        height += ButtonRowHeight + ButtonRowMargin;
                    }
                    const options = [];
                    if (a.duration !== 0) options.push({ label: 'Pin', onClick: () => { pinAlert(alerts, a.uuid); } });
                    options.push({ label: 'Dismiss', onClick: () => { animateRemoveAlert(a.uuid); } });
                    return (
                        <ContextMenu 
                            menuId={`ctx_${a.uuid}`}
                            key={a.uuid}
                            items={options}
                        >
                            <AlertBox
                                style={{
                                    top: `${cVOff}px`,
                                    opacity: a.fading ? 0 : 1,
                                    minHeight: `${height}px`,
                                    maxHeight: `${height}px`,
                                    height: `${height}px`,
                                }}
                                onMouseEnter={() => alertMouseOver(a.uuid)}
                                onMouseLeave={() => alertMouseOut(a.uuid)}
                                onClick={() => {
                                    if (a.onClickAction) dispatch(a.onClickAction);
                                }}
                            >
                                <Flex mode={Flex.Mode.Horizontal}>
                                    {a.imgUrl ? (
                                        <AlertImg src={a.imgUrl}/>
                                    ) : (
                                        <AlertIcon type={a.type}/>
                                    )}
                                    <Flex mode={Flex.Mode.Vertical}>
                                        <AlertTitle>{a.title}</AlertTitle>
                                        <AlertMessage>{a.message}</AlertMessage>
                                        {a.timeoutId && !a.fading && (<AlertTimerBox duration={a.duration}/>)}
                                    </Flex>
                                </Flex>
                                <ButtonDrawer>
                                    {a.buttons.map((b, idx) => (
                                        <Button
                                            key={idx}
                                            label={b.label}
                                            buttonStyle={{ borderColor: 'rgba(100, 64, 0, 0.73)' }}
                                            labelStyle={{ color: 'rgba(100, 64, 0, 0.73)' }}
                                            onClick={e => {
                                                e.stopPropagation();
                                                dispatch(b.action);
                                            }}
                                            {...b.buttonProps}
                                        />
                                    ))}
                                </ButtonDrawer>
                                {a.hovered && (
                                    <CloseButtonWrapper
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            animateRemoveAlert(a.uuid);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </CloseButtonWrapper>
                                )}
                            </AlertBox>
                        </ContextMenu>
                    );
                })}
            </Flex>
        </Container>
    );
};

export default AlertPresenter;