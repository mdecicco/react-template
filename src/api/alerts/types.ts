import { UUID } from 'utils';

export enum AlertActions {
    Submit = 'alerts/SUBMIT_ALERT',
    Update = 'alerts/UPDATE_ALERT',
    Remove = 'alerts/REMOVE_ALERT'
};

export enum AlertType {
    Info,
    Warning,
    Error
};

export type Alert = {
    uuid: UUID,
    type: AlertType,
    duration: number,
    timeoutId: NodeJS.Timeout | null,
    title: string,
    message: string,
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