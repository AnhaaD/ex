import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    TooltipPayload,
    XAxis,
    YAxis,
} from 'recharts';
import {
    RootState,
    selectCurrentColorTheme,
} from '../../../modules';

export interface SocialTradingVolumeProps {
    data: Array<{
        name: string;
        volume: number;
    }>;
}

type TooltipPayloadProp = TooltipPayload & { payload?: TooltipPayload };

interface ReduxProps {
    colorTheme: string;
}

interface CustomToolTipProps {
    active?: boolean;
    external?: Array<{
        name: string;
        volume: number;
    }>;
    payload?: TooltipPayloadProp[];
}

const CustomTooltip = (props: CustomToolTipProps) => {
    const { payload, active } = props;

    const renderPayload = () => {
        if (!payload || !payload[0]) {
            return '';
        }

        const { name, volume } = payload[0].payload;

        return (
            <div className="pg-trading-volume__tooltip">
                <div className="pg-trading-volume__tooltip-label">
                    {name} Average
                </div>
                <div  className="pg-trading-volume__tooltip-item">
                    {volume} USD
                </div>
            </div>
        );
    };

    if (active) {
        return (
            <div className="area-chart-tooltip">
                {renderPayload()}
            </div>
        );
    }

    return null;
};

export type SocialTradingVolumeContainerProps = ReduxProps & SocialTradingVolumeProps;

class SocialTradingVolume extends React.Component<SocialTradingVolumeContainerProps> {
    public render() {
        const {
            colorTheme,
            data,
        } = this.props;

        return (
            <div className="col-12 pg-trading-volume-chart px-0">
                <div className="col-12  pg-trading-volume-chart__header">
                    Trading Volume
                </div>
                <div className="col-12  pg-trading-volume-chart__content">
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                isAnimationActive={false}
                                cursor={{stroke: 'rgba(255, 255, 255, 0.1)'}}
                                content={<CustomTooltip external={data} />}
                            />
                            <CartesianGrid vertical={false} style={{ background: 'rbga(255, 255, 255, 0.2)'}} />
                            <Line
                                dot={false}
                                type="linear"
                                dataKey="volume"
                                stroke="#8d75f8"
                                activeDot={{r: 4, fill: colorTheme === 'light' ? '#f4f4f6' : '#101032', stroke: '#8d75f8', strokeWidth: 2}}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    colorTheme: selectCurrentColorTheme(state),
});

export const SocialTradingVolumeContainer = connect(mapStateToProps)(SocialTradingVolume);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/SocialTradingVolumeContainer/index.tsx
