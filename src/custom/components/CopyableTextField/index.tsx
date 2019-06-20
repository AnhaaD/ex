import '@openware/cryptofont';

import classnames from 'classnames';
import * as React from 'react';

interface CopyableTextFieldProps {
    value: string;
    className?: string;
    fieldId: string;
}

type CopyTypes = HTMLInputElement | null;

const copy = (id: string) => {
    const copyText: CopyTypes = document.querySelector(`#${id}`);

    if (copyText) {
        copyText.select();

        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
};

class CopyableTextField extends React.Component<CopyableTextFieldProps> {
    public componentDidMount() {
        if (!this.props.fieldId) {
            throw new Error('CopyableTextField must contain `fieldId` prop');
        }
    }

    public render() {
        const {
            value,
            className,
            fieldId,
        } = this.props;
        const doCopy = () => copy(fieldId);
        const cx = classnames('cr-copyable-text-field', className);
        return (
            <div className={cx}>
                <div className="cr-copyable-text-field__input">
                    <input
                      id={String(fieldId)}
                      readOnly={true}
                      type="text"
                      value={value}
                      onClick={doCopy}
                    />
                </div>
            </div>
        );
    }
}

export {
    CopyableTextField,
    CopyableTextFieldProps,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/CopyableTextField/index.tsx
