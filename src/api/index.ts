import * as Redux from 'redux';
import * as Alerts from './alerts';

export type {
    AlertActions,
    AlertType,
    Alert,
    AlertState,
    SubmitAlertAction,
    RemoveAlertAction,
    AlertActionType
} from './alerts';

export type StateType = {
    alerts: Alerts.AlertState
};

export type ActionType = Alerts.AlertActionType;

export type StoreType = Redux.Store<StateType, ActionType>;

function createStore() : StoreType {
    const reducer = Redux.combineReducers({
        alerts: Alerts.Reduce
    });

    return Redux.createStore(reducer);
};

export default {
    createStore,
    Alerts
};