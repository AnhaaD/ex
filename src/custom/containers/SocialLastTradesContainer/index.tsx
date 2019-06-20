import * as React from 'react';
import { capitalize, localeDate } from '../../../helpers';
import { Table } from '../../../openware';

interface CellDataInterface {
    pair: string;
    amount: string;
    action: string;
    date: string;
}

export interface SocialLastTradesProps {
    data: CellDataInterface[];
}

const mapRows = (cell: CellDataInterface) => [cell.pair.toUpperCase(), cell.amount, capitalize(cell.action), localeDate(cell.date, 'fullDate')];

class SocialLastTrades extends React.Component<SocialLastTradesProps> {
    private headers = ['Pair', 'Amount', 'Action', 'Time'];

    public render() {
        const { data } = this.props;

        if (!data.length) {
            return null;
        }

        const tableData = data.map(mapRows);

        return (
            <div className="col-12 pg-last-trades px-0 my-5">
                <div className="col-12 pg-last-trades__header">
                    Last 5 Trades
                </div>
                <div className="col-12 pg-last-trades__content">
                    <Table data={tableData} header={this.headers} />
                </div>
            </div>
        );
    }
}

export const SocialLastTradesContainer = SocialLastTrades;


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/SocialLastTradesContainer/index.tsx
