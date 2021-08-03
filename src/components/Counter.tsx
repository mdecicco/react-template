import * as React from 'react';
import { Button, Flex, ContextMenu } from '@components';
import API from '@api';

const Counter : React.FC = () => {
    const [count, setCount] = React.useState(0);
    const submitAlert = API.Alerts.useSubmitAlert();

    const items = [{
        label: 'Reset Count',
        tip: 'Sets to 0',
        onClick: () => { setCount(0); }
    },{
        label: 'Set Count to 10',
        onClick: () => { setCount(10); }
    },{
        label: 'Set Count to 100',
        onClick: () => { setCount(100); }
    },{
        label: 'Set Count to 1000',
        onClick: () => { setCount(1000); }
    },{
        label: 'Set Count to 10000',
        onClick: () => { setCount(10000); }
    },{
        label: 'Some Not Applicable Action',
        disabled: true,
        onClick: () => { setCount(10000); }
    }];

    return (
        <Flex
            mode={Flex.Mode.Vertical}
        >
            <ContextMenu menuId='test' items={items}>
                <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '20px', color: 'white' }}>
                    <h1>Button was pressed {count} time{count === 1 ? '' : 's'}</h1>
                </div>
            </ContextMenu>
            <Button
                label='Test'
                onClick={() => {
                    setCount(count + 1);
                    const outerAction = API.Alerts.submitAlert({
                        title: 'Stop That',
                        message: 'An alert box was clicked',
                        type: API.Alerts.AlertType.Warning,
                        duration: 5.0
                    });

                    const buttonAction = API.Alerts.submitAlert({
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