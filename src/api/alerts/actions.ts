import {
    Alert,
    AlertState,
    AlertActions,
    AlertType,
    AlertButton,
    SubmitAlertAction,
    RemoveAlertAction,
    UpdateAlertAction
} from "./types";

import { StateType } from 'api';
import { genUUID, UUID } from 'utils';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

type SubmitAlertParams = {
    title: string,
    message?: string,
    type?: AlertType,
    duration?: number,
    imgUrl?: string,
    buttons?: AlertButton[]
};

export function submitAlert(params: SubmitAlertParams) : SubmitAlertAction {
    return {
        type: AlertActions.Submit,
        alert: {
            uuid: genUUID(),
            type: params.type || AlertType.Info,
            duration: params.duration !== undefined ? params.duration : 5.0,
            timeoutId: null,
            title: params.title,
            message: params.message || '',
            imgUrl: params.imgUrl || null,
            buttons: params.buttons || [],
            fading: false,
            hovered: false
        }
    };
}

export function updateAlert(alert: Alert) : UpdateAlertAction {
    return {
        type: AlertActions.Update,
        alert
    };
}

export function removeAlert(id: UUID) : RemoveAlertAction {
    return {
        type: AlertActions.Remove,
        uuid: id
    };
}

export function useAlerts() : AlertState {
    return useSelector((state: StateType) : AlertState => state.alerts, shallowEqual);
}

export function useSubmitAlert() : (params: SubmitAlertParams) => void {
    const dispatch = useDispatch();

    return (params: SubmitAlertParams) : void => {
        dispatch(submitAlert(params));
    };
}

export function useUpdateAlert() : (alert: Alert) => void {
    const dispatch = useDispatch();

    return (alert: Alert) : void => {
        dispatch(updateAlert(alert));
    };
}

export function useRemoveAlert() : (id: UUID) => void {
    const dispatch = useDispatch();

    return (id: UUID) : void => {
        dispatch(removeAlert(id));
    };
}