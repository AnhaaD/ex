import * as React from 'react';
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Sector,
} from 'recharts';

interface ChartItemInterface {
    code: string;
    currency: string;
    balance: string;
    value: number;
}

export interface SocialPortfolioRepartitionProps {
    data: ChartItemInterface[];
}

interface SocialPortfolioRepartitionState {
    activeIndex: number;
}

class SocialPortfolioRepartition extends React.Component<SocialPortfolioRepartitionProps, SocialPortfolioRepartitionState> {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
        };
    }

    private headers = ['Currency', 'Balance'];

    public render() {
        return (
            <div className="col-12 pg-portfolio-repartition px-0 my-5">
                <div className="col-12 pg-portfolio-repartition__header">
                    Portfolio Repartition
                </div>
                <div className="col-12 pg-portfolio-repartition__content row">
                    <div className="col col-md-6">
                        <div className="pg-portfolio-repartition__content-table col-12 row">
                            <div className="col-12 row pg-portfolio-repartition__content-table-head">
                                {this.getHeaders()}
                            </div>
                            {this.getRows()}
                        </div>
                    </div>
                    <div className="col col-md-6">
                        {this.getChart()}
                    </div>
                </div>
            </div>
        );
    }

    private getChart = () => {
        const { data } = this.props;

        return (
          <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                  <Pie
                      activeIndex={this.state.activeIndex}
                      activeShape={this.renderActiveShape}
                      data={data}
                      innerRadius={80}
                      outerRadius={120}
                      onMouseEnter={this.onPieEnter}
                      dataKey="value"
                      paddingAngle={1}
                  >
                      {this.getCells()}
                  </Pie>
              </PieChart>
          </ResponsiveContainer>
        );
    };

    private getCells = () => {
        const { data } = this.props;
        const colors = ['#6317af', '#2784db', '#50caf0'];

        return data.map((entry: ChartItemInterface, index: number) => {
            return (
                <Cell
                    key={`cell-${index}`}
                    stroke={colors[index % colors.length]}
                    fill={colors[index % colors.length]}
                />
            );
        });
    };

    private onPieEnter = (cellData, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    private renderActiveShape = props => {
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
        } = props;

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="chart-text">
                    {payload.currency}: {payload.balance}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    private getHeaders = () => {
        return this.headers.map((item, i) => {
            return (
                <div key={i} className="col-6 pg-portfolio-repartition__content-table-head-item">
                    {item}
                </div>
            );
        });
    };

    private getRows = () => {
        const { data } = this.props;

        return data.map((item, i) => {
            return (
                <div className="col-12 row" key={i}>
                    <div className="col-6 pg-portfolio-repartition__content-table-row">
                        <div className=" pg-portfolio-repartition__content-table-row-currency pl-3">
                            {item.currency}
                        </div>
                    </div>
                    <div className="col-6 pg-portfolio-repartition__content-table-row">
                        <div className="pg-portfolio-repartition__content-table-row-balance pl-3">
                            {item.balance}
                        </div>
                    </div>
                </div>
            );
        });
    };
}

export const SocialPortfolioRepartitionContainer = SocialPortfolioRepartition;


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/SocialPortfolioRepartitionContainer/index.tsx
