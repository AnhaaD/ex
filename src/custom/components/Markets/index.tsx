import classnames from 'classnames';
import * as React from 'react';
import { Table } from '../';
import { CellData } from '../../../openware';

interface MarketsProps {
    data: CellData[][];
    rowKeyIndex?: number;
    selectedKey?: string;
    onSelect: (marketKey: string) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filters?: boolean;
    headers?: string[];
    title?: string;
    filterPlaceholder?: string;
}

interface MarketsState {
    filteredData: CellData[][];
    searchKey: string;
}

class Markets extends React.Component<MarketsProps, MarketsState> {
    constructor(props: MarketsProps) {
        super(props);

        this.state = {
            filteredData: props.data,
            searchKey: '',
        };
    }

    private defaultHeaders: string[] = ['Name', 'Last', '24h', 'Vol'];

    public componentWillReceiveProps(nextProps: MarketsProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                filteredData: nextProps.data.filter(w => (w[0] as string).toLowerCase().includes(this.state.searchKey.toLowerCase())),
            });
        }
    }

    public render() {
        const { filteredData } = this.state;
        const { filters = true, headers, title, filterPlaceholder, rowKeyIndex, selectedKey } = this.props;
        const tableData = this.getTableData(filteredData);
        return (
            <div className="cr-markets">
                <Table
                    data={tableData}
                    rowKeyIndex={rowKeyIndex}
                    selectedKey={selectedKey}
                    filters={filters ? this.filters : []}
                    header={headers ? headers : this.defaultHeaders}
                    onSelect={this.props.onSelect}
                    titleComponent={title ? title : 'Markets'}
                    filterData={this.props.data}
                    onFilter={this.handleFilter}
                    filter={this.searchFilter}
                    placeholder={filterPlaceholder ? this.props.filterPlaceholder : ''}
                />
            </div>
        );
    }

    public searchFilter = (row: CellData[], searchKey: string) => {
        this.setState({
            searchKey,
        });
        return (row[0] as string).toLowerCase().includes(searchKey.toLowerCase());
    };

    public handleFilter = (result: object[]) => {
        this.setState({
            filteredData: [...result] as CellData[][],
        });
    };

    public getTableData = (filteredData: CellData[][]): CellData[][] => filteredData.length > 0 ? this.renderFiltredData(filteredData) : [['', '', '', '']];

    private checkFavoritesName = (name: string): true | false  => localStorage.getItem(`favorites.${name}`) ? true : false;

    private renderFiltredData(filteredData: CellData[][]) {
        const pinned = 'pinned';
        const keyIndex = 'rowKeyIndex';
        let result = filteredData.map(row => row.map(this.mapRows));
        result = result.map(row => {
            if ((row[1] as string).length !== 0) {
                row[keyIndex] = row[1];
                row[pinned] = this.checkFavoritesName(row[0] as string);
                row[1] = this.renderRow(row, pinned);
            }
            row.shift();
            return(row);
        });
        result.sort((a, b) => (a[pinned] < b[pinned]) ? 1 : (a[pinned] > b[pinned]) ? -1 : 0);
        return result;
    }

    private renderRow(row, key: string) {
        const classNameStars = (row[1] as string).split('/')[0].length > 3 ? 'cr-markets-name__dcheckbox' : 'cr-markets-name__checkbox';
        return (
            <div className="cr-markets-name">
                <input type="checkbox" className={classNameStars} value={row[0] as string} onChange={this.props.onChange} checked={row[key]} id={row[0]} />
                <label htmlFor={row[0]} />
                {this.renderText(row[1] as string, 'cr-markets-name__neutral', 0, '')}
                {this.renderText(row[1] as string, 'cr-markets-name__text', 1, '/')}
            </div>
        );
    }

    private renderText = (text: string, elementClass: string, num: number, extraContent: string | null) => <p className={elementClass}>{extraContent}{(text).split('/')[num]}</p>;

    private renderChange(cell: string) {
        const isItChangeValue = (c: string) => {
            return c.search('\\+') ? 'negative' : 'positive';
        };

        const className = classnames('', {
            __positive: isItChangeValue(cell) === 'positive',
            __negative: isItChangeValue(cell) === 'negative',
        });

        return <span className={className}>{cell.substr(1)}</span>;
    }

    private mapRows = (cell: CellData) => {
        const isChangeValue = typeof(cell) === 'string' && (cell.charAt(0) === '-' || cell.charAt(0) === '+');
        return isChangeValue ? this.renderChange(cell as string) : this.renderNeutral(cell as string);
    }

    private renderNeutral = (cell: string) => +cell ? <span className="__neutral">{cell}</span> : cell === '0.' ? '0' : cell;


    private filterType = (headerKey: string, searchKey: string) => (item: CellData[]) => {
        const typeIndex = this.props.headers ? this.props.headers.indexOf(headerKey) : this.defaultHeaders.indexOf(headerKey);
        // tslint:disable-next-line:no-string-literal
        const result = typeIndex > 0 ? item[typeIndex] : item['rowKeyIndex'];
        return (result as string).includes(searchKey);
    };

    private get filters() {
        const { data } = this.props;

        const currencyFilters = data && data.length > 0
            ? this.props.data
                .map(this.getMarketFromDataRow)
                .reduce(this.createUniqueCurrencies, [])
                .map(this.transformCurrencyToFilter)
            : [];
        return [
            {
                name: 'All',
                filter: this.filterType('Name', ''),
            },
            ...currencyFilters,
        ];
    }

    private getMarketFromDataRow = (market: React.ReactNode[]) => market[0] as string;

    private createUniqueCurrencies(currencies: string[], market: string) {
        const isCurrencyUnique = (currency: string) => !currencies.includes(currency);

        const marketCurrencies = market.split('/').map((c: string) => c.trim());
        const uniqueCurrencies = marketCurrencies.filter(isCurrencyUnique);

        return currencies.concat(uniqueCurrencies);
    }

    private transformCurrencyToFilter = (currency: string) => ({
        name: currency,
        filter: this.filterType('Name', currency),
    });
}

export {
    Markets,
    MarketsProps,
    MarketsState,
};


// WEBPACK FOOTER //
// src/drone/src/src/custom/components/Markets/index.tsx
