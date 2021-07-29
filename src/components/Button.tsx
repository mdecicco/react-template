import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';

const ButtonConfirmTimeout = 4000; // ms

type ButtonLabelProps = {
    label?: string,
    onClick?: () => void,
    disabled?: boolean,
    danger?: boolean,
    primary?: boolean,
    confirm?: boolean,
    confirmText?: string
};

type StyledButtonProps = {
    disabled?: boolean
};

const StyledNormalButton = styled.div`
    outline: none;
    padding: 4px 16px 4px 16px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: sans-serif;
    line-height: 17px;
    position: relative;
    font-weight: bold;

    ${(props : StyledButtonProps) => !props.disabled ? css`
        border: 2px solid rgba(255, 255, 255, 0.5);
        background-color: transparent;
        color: rgba(255, 255, 255, 0.6);
        transition: all linear 125ms;
        cursor: pointer;

        &:hover {
            color: #d38800;
            border: 2px solid #d38800;
            box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.8);

            &:active {
                color: #8b5900;
                border: 2px solid #8b5900;
                box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
            }
        }
    ` : css`
        border: 2px solid rgba(255, 255, 255, 0.3);
        background-color: transparent;
        color: rgba(255, 255, 255, 0.4);
        pointer-events: none;
    `}
`;

const StyledPrimaryButton = styled.div`
    outline: none;
    padding: 4px 16px 4px 16px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: sans-serif;
    line-height: 17px;
    position: relative;
    font-weight: bold;

    ${(props : StyledButtonProps) => !props.disabled ? css`
        border: 2px solid transparent;
        background-color: rgba(255, 141, 0, 0.60);
        color: rgba(0, 0, 0, 0.75);
        transition: all linear 125ms;
        cursor: pointer;

        &:hover {
            color: rgba(0, 0, 0, 0.75);
            background-color: rgba(255, 141, 0, 0.75);
            border: 2px solid transparent;
            box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.8);

            &:active {
                color: rgba(0, 0, 0, 0.75);
                background-color: rgba(255, 141, 0, 0.60);
                border: 2px solid transparent;
                box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
            }
        }
    ` : css`
        border: 2px solid rgba(255, 255, 255, 0.3);
        background-color: transparent;
        color: rgba(255, 255, 255, 0.4);
        pointer-events: none;
    `}
`;

const StyledDangerButton = styled.div`
    outline: none;
    padding: 4px 16px 4px 16px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: sans-serif;
    line-height: 17px;
    position: relative;
    font-weight: bold;

    ${(props : StyledButtonProps) => !props.disabled ? css`
        border: 2px solid rgba(255, 80, 80, 0.5);
        background-color: transparent;
        color: rgba(255, 80, 80, 0.6);
        transition: all linear 125ms;
        cursor: pointer;

        &:hover {
            color: #ff6666;
            border: 2px solid #fe5e5e;
            box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.8);

            &:active {
                color: #aa6464;
                border: 2px solid #a34f4f;
                box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
            }
        }
    ` : css`
        border: 2px solid rgba(255, 0, 0, 0.3);
        background-color: transparent;
        color: rgba(255, 0, 0, 0.4);
        pointer-events: none;
    `}
`;

const StyledPrimaryDangerButton = styled.div`
    outline: none;
    padding: 4px 16px 4px 16px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: sans-serif;
    line-height: 17px;
    position: relative;
    font-weight: bold;

    ${(props : StyledButtonProps) => !props.disabled ? css`
        border: 2px solid transparent;
        background-color: rgba(255, 0, 0, 0.60);
        color: rgb(61, 0, 0);
        transition: all linear 125ms;
        cursor: pointer;

        &:hover {
            color: rgb(61, 0, 0);
            background-color: rgba(255, 0, 0, 0.75);
            border: 2px solid transparent;
            box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.8);

            &:active {
                color: rgb(61, 0, 0);
                background-color: rgba(255, 0, 0, 0.60);
                border: 2px solid transparent;
                box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.5);
            }
        }
    ` : css`
        border: 2px solid rgba(255, 255, 255, 0.3);
        background-color: transparent;
        color: rgba(255, 255, 255, 0.4);
        pointer-events: none;
    `}
`;

const ConfirmBoxAnim = keyframes`
    from {
        width: calc(100% - 5px);
    }
    to {
        width: 0%;
    }
`;

const StyledNormalConfirmBox = styled.div`
    background-color: #d38800;
    animation: ${ConfirmBoxAnim} ${ButtonConfirmTimeout}ms linear;
    position: absolute;
    bottom: 2px;
    left: 2px;
    height: 2px;
    border-radius: 1px;
    z-index: 0;
`;

const StyledPrimaryConfirmBox = styled.div`
    background-color: #ffeb00;
    animation: ${ConfirmBoxAnim} ${ButtonConfirmTimeout}ms linear;
    position: absolute;
    bottom: 2px;
    left: 2px;
    height: 2px;
    border-radius: 1px;
    z-index: 0;
`;

const StyledDangerConfirmBox = styled.div`
    background-color: #fe5e5e;
    animation: ${ConfirmBoxAnim} ${ButtonConfirmTimeout}ms linear;
    position: absolute;
    bottom: 2px;
    left: 2px;
    height: 2px;
    border-radius: 1px;
    z-index: 0;
`;

const StyledPrimaryDangerConfirmBox = styled.div`
    background-color: #fe5e5e;
    animation: ${ConfirmBoxAnim} ${ButtonConfirmTimeout}ms linear;
    position: absolute;
    bottom: 2px;
    left: 2px;
    height: 2px;
    border-radius: 1px;
    z-index: 0;
`;

const StyledButtonLabel = styled.span`
    position: relative;
    z-index: 1;
`;

const Button : React.FC<ButtonLabelProps> = props => {
    const [confirmTimeout, setConfirmTimeout] = React.useState<null | NodeJS.Timeout>(null);

    const BtnComp = props.danger ? (props.primary ? StyledPrimaryDangerButton : StyledDangerButton) : (props.primary ? StyledPrimaryButton : StyledNormalButton);
    let onClick = props.onClick;
    if (props.confirm) {
        if (!confirmTimeout) {
            // start confirmation timer and animation
            onClick = () => {
                const timeout = setTimeout(() => {
                    setConfirmTimeout(null);
                }, ButtonConfirmTimeout);
                setConfirmTimeout(timeout);
            };
        } else {
            // button clicked before timer finished, accept input
            onClick = () => {
                clearTimeout(confirmTimeout);
                setConfirmTimeout(null);
                if (props.onClick) props.onClick();
            };
        }
    }

    const ConfirmComp = props.danger ? (props.primary ? StyledPrimaryDangerConfirmBox : StyledDangerConfirmBox) : (props.primary ? StyledPrimaryConfirmBox : StyledNormalConfirmBox);

    return (
        <BtnComp
            onClick={onClick}
            disabled={props.disabled ? true : false}
        >
            <StyledButtonLabel>
                {confirmTimeout ? (props.confirmText ? props.confirmText : 'Confirm') : (props.label ? props.label : '')}
            </StyledButtonLabel>
            {confirmTimeout && (<ConfirmComp/>)}
        </BtnComp>
    )
};

export default Button;