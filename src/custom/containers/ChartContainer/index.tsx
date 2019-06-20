// tslint:disable jsx-no-lambda
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import {
    MarketDepthsComponent,
    TradingChart,
    ZoomChart,
} from '../';
import {
    Market,
    RootState,
    selectCurrentMarket,
} from '../../../modules';
import move = require('../../assets/images/Move.svg');

interface ReduxProps {
    currentMarket?: Market;
    defaultChart?: string;
}

interface ChartState {
    currentChart: string;
}

export type ChartContainerProps = ReduxProps;

class Chart extends React.Component<ChartContainerProps, ChartState> {
    constructor(props: ChartContainerProps) {
        super(props);

        this.state = {
            currentChart: 'chart',
        };
    }

    public render() {
        const { currentChart } = this.state;
        const { defaultChart } = this.props;
        const chart = defaultChart ? defaultChart : currentChart;
        const chartLabelClassNames = classnames({
            'pg-chart-container__switcher-item': chart !== 'chart',
            'pg-chart-container__switcher-item-active': chart === 'chart',
        });

        const depthsLabelClassNames = classnames({
            'pg-chart-container__switcher-item': chart !== 'depths',
            'pg-chart-container__switcher-item-active': chart === 'depths',
        });

        const orderLabelClassNames = classnames({
            'pg-chart-container__switcher-item': chart !== 'order',
            'pg-chart-container__switcher-item-active': chart === 'order',
        });

        return (
            <React.Fragment>
                <div className="pg-chart-container">
                    <div className="cr-table-header__content">
                        <div className="pg-chart-container__title">
                            Chart&nbsp;&nbsp;
                            <span className="pg-chart-container__title__market" >
                                {this.props.currentMarket ? this.props.currentMarket.name : null}
                            </span>
                        </div>
                        <div className="pg-chart-container__switcher">
                            <div className={chartLabelClassNames} onClick={e => this.changeCurrentChart('chart')}>
                                Chart
                            </div>
                            <div className={depthsLabelClassNames} onClick={e => this.changeCurrentChart('depths')}>
                                Depth
                            </div>
                            <div className={orderLabelClassNames} onClick={e => this.changeCurrentChart('order')}>
                                Trade from Chart
                            </div>
                        </div>
                        <img className="cr-title-component__move" src={move} />
                    </div>
                </div>
                {this.renderCurrentChart(chart)}
                <div className="cr-table-footer" />
            </React.Fragment>
        );
    }

    private renderCurrentChart = (chart: string) => {
        if (chart === 'chart') {
            return <TradingChart />;
        } else {
            if (chart === 'depths') {
                return <MarketDepthsComponent />;
            } else {
                return <ZoomChart />;
            }
        }
    }

    private changeCurrentChart = (value: string) => {
        this.setState({
            currentChart: value,
        });
    };
}

const mapStateToProps = (state: RootState) => ({
    currentMarket: selectCurrentMarket(state),
});

export const ChartContainer = connect(mapStateToProps)(Chart);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/ChartContainer/index.tsx
