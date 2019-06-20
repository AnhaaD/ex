import * as React from 'react';

interface CloseButtonProps {
    onClick: () => void;
    label?: string;
    className?: string;
}

const CloseButton: React.FunctionComponent<CloseButtonProps> = (props: CloseButtonProps) => (
    <button className={props.className || 'cr-close-button'} onClick={props.onClick} >{props.label || 'Cancel'}</button>
);

export {
    CloseButton,
    CloseButtonProps,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/CloseButton/index.tsx
