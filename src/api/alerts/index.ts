import { AlertActions, AlertState, AlertActionType } from './types';
import { SubmitReducer, UpdateReducer, RemoveReducer } from './reducers';
export { AlertType } from './types';
export {
    useAlerts as use,
    useSubmitAlert,
    useUpdateAlert,
    useRemoveAlert
} from './actions';

export type {
    AlertActions,
    Alert,
    AlertState,
    SubmitAlertAction,
    UpdateAlertAction,
    RemoveAlertAction,
    AlertActionType
} from './types';

const defaults : AlertState = {
    alerts: []
};

export function Reduce (state: AlertState = defaults, action: AlertActionType) : AlertState {
    switch (action.type) {
        case AlertActions.Submit: return SubmitReducer(state, action);
        case AlertActions.Update: return UpdateReducer(state, action);
        case AlertActions.Remove: return RemoveReducer(state, action);
        default: return state;
    }
    return state;
}