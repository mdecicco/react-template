import {
    AlertState,
    SubmitAlertAction,
    UpdateAlertAction,
    RemoveAlertAction
} from './types';
import update from 'immutability-helper';

export function SubmitReducer(state: AlertState, action: SubmitAlertAction) : AlertState {
    return update(state, {
        alerts: {
            $push: [action.alert]
        }
    });
}

export function UpdateReducer(state: AlertState, action: UpdateAlertAction) : AlertState {
    const idx = state.alerts.findIndex(a => a.uuid === action.alert.uuid);
    if (idx >= 0) {
        return update(state, {
            alerts: {
                [idx]: { $set: action.alert }
            }
        })
    }
    return state;
}

export function RemoveReducer(state: AlertState, action: RemoveAlertAction) : AlertState {
    const idx = state.alerts.findIndex(a => a.uuid === action.uuid);
    if (idx >= 0) {
        return update(state, {
            alerts: {
                $splice: [[idx, 1]]
            }
        })
    }

    return state;
}