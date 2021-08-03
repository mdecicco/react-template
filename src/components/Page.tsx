import * as React from 'react';
import ContextMenu from './ContextMenu';
import AlertPresenter from './AlertPresenter';
import ContextMenuPresenter from './ContextMenuPresenter';

type PageProps = {
    children?: JSX.Element | JSX.Element[]
}

const Page : React.FC<PageProps> = ({ children }) => (
    <ContextMenu
        menuId='ctx-page'
        items={[
            { label: 'Back', onClick: () => window.history.back() }
        ]}
    >
        <div
            id='page'
            style={{
                backgroundColor: '#4a4a4a',
                padding: '10px',
                width: 'calc(100vw - 20px)',
                height: 'calc(100vh - 20px)',
                overflow: 'hidden'
            }}
        >
            <ContextMenuPresenter/>
            <AlertPresenter/>
            {children}
        </div>
    </ContextMenu>
);

export default Page;