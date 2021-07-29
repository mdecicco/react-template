import * as React from 'react';
import { Button, Flex } from 'components';
import API from 'api';

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
                    submitAlert({
                        title: 'Pressed',
                        message: 'The button was pressed The button was pressed',
                        type: API.Alerts.AlertType.Info,
                        duration: Math.random() * 5
                    });
                }}
                confirm
            />
        </Flex>
    );
};

export default Counter;