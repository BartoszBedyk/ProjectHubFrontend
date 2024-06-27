import React, { useMemo, useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import FilterContainer from './FilterContainer';

export type ColumnType = 'DATE' | 'DATE_TIME' | 'TEXT' | 'NUMBER' | 'ENUM';

export interface ColumnDefinition {
    id: string;
    label: string;
    type: ColumnType;
    minWidth?: number;
    align?: 'left' | 'right' | 'center';
    enumValues?: string[];
    operator?: 'EQUALS' | 'GR' | 'GRE' | 'LS' | 'LSE' | 'NOT_EQUALS' | 'LIKE';
}

export interface RowData {
    [key: string]: any;
}

interface CustomTableProps {
    columns: ColumnDefinition[];
    rows: RowData[];
    title: string;
}

function CustomTable({ columns, rows, title }: CustomTableProps) {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>(columns[0]?.id || '');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filters, setFilters] = useState<Record<string, { operator: string; value: string }>>({});

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const parseDate = (dateString: string) => {
        return new Date(dateString).getTime();
    };

    const applyFilter = (rowValue: string, filterValue: string, operator: string, columnType: ColumnType) => {
        if (columnType === 'DATE' || columnType === 'DATE_TIME') {
            switch (operator) {
                case 'GRE':
                    return parseDate(rowValue) >= parseDate(filterValue);
                case 'LSE':
                    return parseDate(rowValue) <= parseDate(filterValue);
                default:
                    return true;
            }
        } else {
            rowValue = rowValue.toLowerCase();
            filterValue = filterValue.toLowerCase();
            switch (operator) {
                case 'EQUALS':
                    return rowValue === filterValue;
                case 'GR':
                    return parseFloat(rowValue) > parseFloat(filterValue);
                case 'GRE':
                    return parseFloat(rowValue) >= parseFloat(filterValue);
                case 'LS':
                    return parseFloat(rowValue) < parseFloat(filterValue);
                case 'LSE':
                    return parseFloat(rowValue) <= parseFloat(filterValue);
                case 'NOT_EQUALS':
                    return rowValue !== filterValue;
                case 'LIKE':
                    return rowValue.includes(filterValue);
                default:
                    return true;
            }
        }
    };

    const filteredRows = useMemo(() => {
        let filtered = rows;

        Object.keys(filters).forEach((columnId) => {
            const { operator, value } = filters[columnId];
            const column = columns.find(col => col.id === columnId.split('_')[0]);
            if (column) {
                filtered = filtered.filter(row =>
                    applyFilter(String(row[columnId.split('_')[0]]), value, operator, column.type)
                );
            }
        });

        return filtered;
    }, [rows, filters, columns]);

    const descendingComparator = <T extends RowData>(a: T, b: T, orderBy: keyof T) => {
        const orderByColumn = columns.find(column => column.id === orderBy);
        if (!orderByColumn) return 0;

        const cellA = a[orderBy];
        const cellB = b[orderBy];

        if (orderByColumn.type === 'NUMBER') {
            const numA = parseFloat(cellA);
            const numB = parseFloat(cellB);
            return numB - numA;
        } else if (orderByColumn.type === 'DATE' || orderByColumn.type === 'DATE_TIME') {
            const dateA = parseDate(cellA);
            const dateB = parseDate(cellB);
            return dateB - dateA;
        } else {
            return (cellB as string).localeCompare(cellA as string);
        }
    };

    type Order = 'asc' | 'desc';

    const getComparator = (order: Order, orderBy: string) => {
        return order === 'desc'
            ? (a: RowData, b: RowData) => descendingComparator(a, b, orderBy)
            : (a: RowData, b: RowData) => -descendingComparator(a, b, orderBy);
    };

    const sortedRows = useMemo(() => {
        return filteredRows.slice().sort(getComparator(order, orderBy));
    }, [filteredRows, order, orderBy]);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedRows.length - page * rowsPerPage);

    const renderCellValue = (column: ColumnDefinition, value: any) => {
        if (column.type === 'DATE') {
            return new Date(value).toLocaleDateString();
        } else if (column.type === 'DATE_TIME') {
            return new Date(value).toLocaleString();
        } else {
            return value;
        }
    };

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3}}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Box sx={{ flexGrow: 2 }} />
                <FilterContainer
                    columns={columns}
                    onFilterChange={(filters) => setFilters(filters)}
                    onClearFilters={() => setFilters({})}
                />
            </Box>
            <TableContainer sx={{padding: 2, width: 'auto' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleRequestSort(column.id)}
                                        sx ={{fontWeight: 700}}
                                    >
                                        {column.label}
                                        {orderBy === column.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align}>
                                            {renderCellValue(column, row[column.id])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={columns.length} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Wiersze na stronę:"
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} z ${count !== -1 ? count : `więcej niż ${to}`}`
                }
                getItemAriaLabel={(type) => {
                    if (type === 'previous') {
                        return 'Przejdź do poprzedniej strony';
                    }
                    if (type === 'next') {
                        return 'Przejdź do następnej strony';
                    }
                    if (type === 'last') {
                        return 'Przejdź do ostatniej strony';
                    }
                    return 'Przejdź do pierwszej strony';

                }}
            />
        </Paper>
    );
}

export default CustomTable;

