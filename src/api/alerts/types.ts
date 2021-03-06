import { UUID } from '@utils';
import { ButtonProps } from '@components';
import { Action } from 'redux';

export enum AlertActions {
    Submit = 'alerts/SUBMIT_ALERT',
    Update = 'alerts/UPDATE_ALERT',
    Remove = 'alerts/REMOVE_ALERT'
};

export enum AlertType {
    Info = 0,
    Warning = 1,
    Error = 2
};

/**
 * - label
 *    - Text displayed on the button.
 * - action
 *    - Action to dispatch when a user clicks on the button. Can be any redux action.
 * - buttonProps
 *    - Properties which will be passed to the <Button> component
 */
export type AlertButton = {
    label: string,
    action: Action,
    buttonProps?: ButtonProps
};

export type Alert = {
    uuid: UUID,
    type: AlertType,
    duration: number,
    timeoutId: NodeJS.Timeout | null,
    title: string,
    message: string,
    imgUrl: string | null,
    onClickAction: Action | null,
    buttons: AlertButton[],
    fading: boolean,
    hovered: boolean
};

export type AlertState = {
    alerts: Alert[]
};

export type SubmitAlertAction = {
    type: AlertActions.Submit,
    alert: Alert,
};

export type UpdateAlertAction = {
    type: AlertActions.Update,
    alert: Alert,
};

export type RemoveAlertAction = {
    type: AlertActions.Remove,
    uuid: string,
};

export type AlertActionType = SubmitAlertAction | UpdateAlertAction | RemoveAlertAction;