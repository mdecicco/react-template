import * as React from 'react';

import AlertPresenter from './AlertPresenter';

type PageProps = {
    children?: JSX.Element | JSX.Element[]
}

const Page : React.FC<PageProps> = ({ children }) => (
    <div
        style={{
            backgroundColor: '#4a4a4a',
            padding: '10px',
            width: 'calc(100vw - 20px)',
            height: 'calc(100vh - 20px)',
            overflow: 'hidden'
        }}
    >
        {children}
        <AlertPresenter/>
    </div>
);

export default Page;