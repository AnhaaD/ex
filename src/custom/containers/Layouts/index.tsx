import * as React from 'react';
import {
    InjectedIntlProps,
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { resetLayouts } from '../../../modules/public/gridLayout';
import move = require('../../assets/images/Move.svg');

interface DispatchProps {
    resetLayouts: typeof resetLayouts;
}

type Props = & DispatchProps & InjectedIntlProps;

class LayoutsComponent extends React.Component<Props> {
    public render() {
        return (
            <div className="pg-layout-container">
                <div className="cr-table-header__content">
                    <div className="cr-title-component">
                        Layout
                        <span className="cr-title-component__title-hidden"/>
                        <img className="cr-title-component__move" src={move}/></div>
                </div>

                <div className="pg-layout-container-body">
                    <input
                        type={'button'}
                        value={'Reset Layout'}
                        className={'cr-button reset-button'}
                        onClick={this.handleResetLayout}
                    />
                </div>
                <div className="pg-market-info__no-resize"/>
            </div>
        );
    }

    private handleResetLayout = () => {
        this.props.resetLayouts({key: 'layouts'});
    };
}

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    resetLayouts: payload => dispatch(resetLayouts(payload)),
});

export const Layouts = injectIntl(connect(null, mapDispatchToProps)(LayoutsComponent));


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Layouts/index.tsx
