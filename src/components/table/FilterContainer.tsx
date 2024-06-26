import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    IconButton,
    Popover,
    Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { ColumnDefinition, ColumnType } from './CustomTable';

interface FilterContainerProps {
    columns: ColumnDefinition[];
    onFilterChange: (filters: Record<string, { operator: string; value: string }>) => void;
    onClearFilters: () => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({
                                                             columns,
                                                             onFilterChange,
                                                             onClearFilters,
                                                         }) => {
    const [filters, setFilters] = useState<Record<string, { operator: string; value: string }>>({});
    const [dateRangeFilters, setDateRangeFilters] = useState<Record<string, { start: string; end: string }>>({});
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleFilterIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (columnId: string, operator: string, value: string) => {
        const newFilters = { ...filters };

        if (value) {
            newFilters[columnId] = { operator, value };
        } else {
            delete newFilters[columnId];
        }

        setFilters(newFilters);
    };

    const handleApply = () => {
        onFilterChange(filters);
        handlePopoverClose();
    };

    const handleClear = () => {
        setFilters({});
        setDateRangeFilters({});
        onClearFilters();
        handlePopoverClose();
    };

    const handleDateRangeChange = (columnId: string, valueStart: string, valueEnd: string) => {
        const newFilters = { ...filters };

        if (valueStart) {
            newFilters[`${columnId}_start`] = { operator: 'GRE', value: valueStart };
        } else {
            delete newFilters[`${columnId}_start`];
        }

        if (valueEnd) {
            newFilters[`${columnId}_end`] = { operator: 'LSE', value: valueEnd };
        } else {
            delete newFilters[`${columnId}_end`];
        }

        setFilters(newFilters);
        setDateRangeFilters((prev) => ({
            ...prev,
            [columnId]: { start: valueStart, end: valueEnd },
        }));
    };

    const renderInputField = (column: ColumnDefinition) => {
        const filterValue = filters[column.id]?.value || '';

        if (column.type === 'DATE' || column.type === 'DATE_TIME') {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        label={`${column.label} od `}
                        type="date"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ minWidth: 120 }}
                        value={dateRangeFilters[column.id]?.start || ''}
                        onChange={(e) =>
                            handleDateRangeChange(column.id, e.target.value, dateRangeFilters[column.id]?.end || '')
                        }
                    />
                    <TextField
                        label={`${column.label} do`}
                        type="date"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ minWidth: 120 }}
                        value={dateRangeFilters[column.id]?.end || ''}
                        onChange={(e) =>
                            handleDateRangeChange(column.id, dateRangeFilters[column.id]?.start || '', e.target.value)
                        }
                    />
                </Box>
            );
        }

        return (
            <TextField
                label={column.label}
                variant="outlined"
                size="small"
                value={filterValue}
                sx={{ minWidth: 200 }}
                onChange={(e) => handleChange(column.id, getOperatorForType(column.type), e.target.value)}
            />
        );
    };

    const getOperatorForType = (type: ColumnType): string => {
        switch (type) {
            case 'NUMBER':
                return 'EQUALS';
            case 'TEXT':
                return 'LIKE';
            case 'ENUM':
                return 'EQUALS';
            default:
                return 'LIKE';
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handleFilterIconClick}>
                <FilterListIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ '& .MuiPaper-root': { borderRadius: 2, p: 2, minWidth: 350 } }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Filtry</Typography>
                    {columns.map((column) => (
                        <Box key={column.id} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                            {renderInputField(column)}
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleApply}
                            sx={{width: '40%'}}
                        >
                            Zastosuj
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClear}
                            startIcon={<ClearIcon />}
                            sx={{width: '40%'}}
                        >
                            Wyczyść
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default FilterContainer;


