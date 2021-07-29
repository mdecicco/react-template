import * as React from 'react';
import { Button, Flex } from 'components';
import API from 'api';

import { submitAlert as submitAlertAction } from '../api/alerts/actions';

const Counter : React.FC = () => {
    const [count, setCount] = React.useState(0);
    const submitAlert = API.Alerts.useSubmitAlert();

    return (
        <Flex
            mode={Flex.Mode.Vertical}
        >
            <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '20px', color: 'white' }}>
                <h1>Button was pressed {count} time{count === 1 ? '' : 's'}</h1>
            </div>
            <Button
                label='Test'
                onClick={() => {
                    setCount(count + 1);
                    const outerAction = submitAlertAction({
                        title: 'Stop That',
                        message: 'An alert box was clicked',
                        type: API.Alerts.AlertType.Warning,
                        duration: 5.0
                    });

                    const buttonAction = submitAlertAction({
                        title: 'Ha ha',
                        message: 'You were tricked into creating an alert with no timeout',
                        type: API.Alerts.AlertType.Error,
                        duration: 0.0
                    });

                    submitAlert({
                        title: 'Pressed',
                        message: 'The button was pressed The button was pressed',
                        type: API.Alerts.AlertType.Info,
                        duration: Math.random() * 5,
                        onClickAction: outerAction,
                        buttons: [{
                            label: 'Dismiss',
                            action: buttonAction
                        }]
                    });
                }}
                confirm
            />
        </Flex>
    );
};

export default Counter;