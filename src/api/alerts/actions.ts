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
import { StateType } from '@api';
import { UUID } from '@utils';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Action } from 'redux';
import * as Constants from '@constants';


/**
 * - type
 *    - Type of alert box (one of API.Alerts.AlertType.[Info | Warning | Error])
 * - title
 *    - Alert box title
 * - message
 *    - (optional) Alert box message
 * - duration
 *    - (optional) Number of seconds the alert will be displayed for.
 *      0 = no automatic dismissal. Defaults to Constants.DefaultAlertDuration.
 * - imgUrl
 *    - (optional) URL of an image to display as a substitute for the info/warning/error icons
 * - onClickAction
 *    - (optional) Action to dispatch when a user clicks on the alert box itself (and not on
 *      any buttons). Can be any redux action.
 * - buttons
 *    - (optional) Array of objects which define any buttons which should be present on the alert.
 */
type SubmitAlertParams = {
    title: string,
    message?: string,
    type?: AlertType,
    duration?: number,
    imgUrl?: string,
    onClickAction?: Action,
    buttons?: AlertButton[]
};

export function submitAlert(params: SubmitAlertParams) : SubmitAlertAction {
    return {
        type: AlertActions.Submit,
        alert: {
            uuid: '', // UUID must be assigned when the action is processed
            type: params.type || AlertType.Info,
            duration: params.duration !== undefined ? params.duration : Constants.DEFAULT_ALERT_DURATION,
            timeoutId: null,
            title: params.title,
            message: params.message || '',
            imgUrl: params.imgUrl || null,
            onClickAction: params.onClickAction ? JSON.parse(JSON.stringify(params.onClickAction)) : null,
            buttons: params.buttons ? JSON.parse(JSON.stringify(params.buttons)) : [],
            fading: false,
            hovered: false
        }
    };
}

export function updateAlert(alert: Alert) : UpdateAlertAction {
    return {
        type: AlertActions.Update,
        alert: JSON.parse(JSON.stringify(alert))
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


/**
 * Returns a function which dispatches an action to submit an alert to the redux state.
 * AlertButton format:
 * ```
 * {
 *     label: string,           // Text displayed on the button
 *     action: Action,          // Action to dispatch when a user clicks on the button.
 *                              // Can be any redux action.
 *     buttonProps: ButtonProps // Properties which will be passed to the <Button>
 *                              // component
 * }
 * ```
 * @type SubmitAlertParams
 * @export
 * @return {*}  {(params: SubmitAlertParams) => void}
 */
export function useSubmitAlert() : (params: SubmitAlertParams) => void {
    const dispatch = useDispatch();

    return (params: SubmitAlertParams) : void => {
        dispatch(submitAlert(params));
    };
}

/**
 * Returns a function which dispatches an action to update an alert in the redux state. A
 * full alert body must be provided as an argument to the returned function, and the
 * corresponding alert in the redux state will be overwritten entirely by it.
 *
 * @export
 * @return {*}  {(alert: Alert) => void}
 */
export function useUpdateAlert() : (alert: Alert) => void {
    const dispatch = useDispatch();

    return (alert: Alert) : void => {
        dispatch(updateAlert(alert));
    };
}

/**
 * Returns a function which dispatches an action to remove an alert from the redux state with
 * the provided UUID.
 *
 * @export
 * @return {*}  {(id: UUID) => void}
 */
export function useRemoveAlert() : (id: UUID) => void {
    const dispatch = useDispatch();

    return (id: UUID) : void => {
        dispatch(removeAlert(id));
    };
}