import React, { useEffect } from "react";
import Portal from './Portal';
import styled from 'styled-components';

export type ContextMenuItem = {
    label: string,
    tip?: string,
    disabled?: boolean,
    onClick: () => void
};

export type ContextMenuProps = {
    children: React.ReactElement,
    menuId: string,
    items: ContextMenuItem[],
    disabled?: boolean,
    wrapContent?: boolean
};

const ContextMenuItemContainer = styled.div`
    padding: 8px;
    transition: background-color 125ms;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const ContextMenuContainer = styled.div`
    background-color: rgb(41, 42, 45);
    border: 1px solid rgb(60, 64, 67);
    position: absolute;
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    font-size: 14px;
    color: white;
    font-family: sans-serif;
`;

const ContextMenu : React.FC<ContextMenuProps> = (props: ContextMenuProps) => {
    const ref = React.useRef<HTMLElement>(null);
    /*
    saving just in case...
    const [visible, setVisible] = React.useState<boolean>(false);
    const [pos, setPos] = React.useState({ x: 0, y: 0});

    React.useEffect(() => {
        const parent = ref.current;
        if (!parent) return;

        const showMenu = (e: MouseEvent) => {
            e.preventDefault();
            setPos({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };

        parent.addEventListener('contextmenu', showMenu);

        return () => {
            parent.removeEventListener('contextmenu', showMenu);
        };
    }, [ref, setVisible]);

    if (!React.isValidElement(props.children) || props.disabled) {
        // some kind of warning
        return props.children;
    }

    const children = props.wrapContent ? props.children : React.Children.map<React.ReactNode, React.ReactNode>(props.children, child => {
        if (React.isValidElement(child)) {
            if ((typeof child.type) !== 'string' && !child.type.hasOwnProperty('styledComponentId')) {
                console.error(`Only HTML elements and styled components can be wrapped with the context menu component, got`, child.type);
                return child;
            }
            return React.cloneElement(child, { ref });
        }
    });
    
    return (
        <React.Fragment>
            {visible && (
                <Portal
                    id={props.menuId}
                    key={props.menuId}
                    onExternalClick={() => { setVisible(false); }}
                >
                    <ContextMenuContainer style={{ top: `${pos.y}px`, left: `${pos.x}.px` }}>
                        {props.items.map((i, idx) => (
                            <ContextMenuItemContainer
                                key={idx}
                                onClick={() => { setVisible(false); i.onClick(); }}
                                style={{ pointerEvents: i.disabled ? 'none' : 'all' }}
                            >
                                <span style={{ opacity: i.disabled ? 0.4 : 1.0 }}>{i.label}</span>
                                <span style={{ opacity: 0.4 }}>{i.tip}</span>
                            </ContextMenuItemContainer>
                        ))}
                    </ContextMenuContainer>
                </Portal>
            )}
            {props.wrapContent ? (
                <div ref={ref as React.LegacyRef<HTMLDivElement>}>{children}</div>
            ) : children}
        </React.Fragment>
    );
    */

    const menuIdRef = React.useRef<string | null>(props.menuId);

    useEffect(() => {
        if (menuIdRef.current !== props.menuId) {
            // Menu id changed for some reason... Context menu data must be updated if it
            // contains data for the previous id
            const ctxData = window.contextMenuData.find(d => d.id === menuIdRef.current);
            if (ctxData) ctxData.id = props.menuId;
        }
        menuIdRef.current = props.menuId;

        const ctxData = window.contextMenuData.find(d => d.id === props.menuId);
        if (ctxData) ctxData.items = props.items;
        else window.contextMenuData.push({ id: props.menuId, items: props.items });
        
        window.contextMenuTriggerUpdate();

        return () => {
            window.contextMenuData = window.contextMenuData.filter(d => d.id !== props.menuId);
        };
    }, [props.items, props.menuId]);

    if (props.disabled) return props.children;

    if (!React.isValidElement(props.children)) {
        console.error(`Invalid child provided to ContextMenu component`, props.children);
        return props.children;
    }

    if (React.Children.count(props.children) !== 1) {
        console.error(`The ContextMenu component can only accept one child`, props.children);
        return props.children;
    }

    if ((typeof props.children.type) !== 'string' && !props.children.type.hasOwnProperty('styledComponentId') && !props.wrapContent) {
        console.error(`Only HTML elements and styled components can be wrapped with the ContextMenu component, got`, props.children.type);
        console.error('If you must wrap a non-intrinsic component with the ContextMenu component, pass the wrapContent property');
        return props.children;
    }

    const child = props.wrapContent ? props.children : React.Children.map<React.ReactNode, React.ReactNode>(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                ref,
                'data-context-menu-id': props.menuId
            });
        }
    });
    
    return (
        <React.Fragment>
            {props.wrapContent ? (
                <div ref={ref as React.LegacyRef<HTMLDivElement>} data-context-menu-id={props.menuId}>{child}</div>
            ) : child}
        </React.Fragment>
    );
};

export default ContextMenu;