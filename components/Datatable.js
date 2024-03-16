"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import LayersIcon from '@mui/icons-material/Layers';
import SearchBar from './Searchbar';
import ColumnVisibilityPanel from './ColumnVisibilityPanel';
import Sorting from './Sorting';
import jsonData from "../data/data";

const DataTable = () => {
    const headers = Object.keys(jsonData[0]);
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [showColumnPanel, setShowColumnPanel] = useState(false)
    const [visibleColumns, setVisibleColumns] = useState(headers.map((_, index) => true));
    const [showSortingPanel, setShowSortingPanel] = useState(false);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = jsonData.slice(indexOfFirstRow, indexOfLastRow);

    const sortData = (data, column, direction) => {
        return data.sort((a, b) => {
            const valA = a[column];
            const valB = b[column];
            if (valA < valB) return direction === 'asc' ? -1 : 1;
            if (valA > valB) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
        setShowSortingPanel(false);
    };


    const handleClearSort = () => {
        setSortColumn(null);
        setSortDirection('asc');
    };

    const filteredRows = jsonData.filter(row => {
        return Object.values(row).some(value => {
            if (value === null) {
                return false;
            }
            return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1);
    };

    const toggleColumnVisibility = (index) => {
        const updatedVisibleColumns = [...visibleColumns];
        updatedVisibleColumns[index] = !updatedVisibleColumns[index];
        setVisibleColumns(updatedVisibleColumns);
    };

    const handleShowAllColumns = () => {
        setVisibleColumns(headers.map(() => true));
    };

    const handleApply = () => {
        setShowColumnPanel(false);
        setVisibleColumns(appliedColumns);
    };

    useEffect(() => {
        setVisibleColumns(visibleColumns);
    }, [visibleColumns]);

    return (
        <div style={{ display: 'flex', justifyContent: 'right ' }}>
            <Paper elevation={3} style={{ maxWidth: 1400, width: '100%', margin: '20px auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <SearchBar label="Search" variant="outlined" onChange={(e) => handleSearch(e.target.value)} />
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                        <VisibilityIcon style={{ marginRight: 10 }} onClick={() => setShowColumnPanel(!showColumnPanel)} />
                        <SwapVertIcon style={{ marginRight: 10 }} onClick={() => setShowSortingPanel(!showSortingPanel)} />
                        <FilterListIcon style={{ marginRight: 10 }} />
                        <LayersIcon />
                    </div>
                </div>

                <TableContainer>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) => (
                                    visibleColumns[index] &&
                                    <TableCell key={index} style={{ fontWeight: 'bold' }}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortColumn ? sortData(currentRows, sortColumn, sortDirection).map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {headers.map((header, cellIndex) => (
                                        <TableCell key={cellIndex}>{row[header]}</TableCell>
                                    ))}
                                </TableRow>
                            )) : currentRows.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {headers.map((header, cellIndex) => (
                                        <TableCell key={cellIndex}>{row[header]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}
                    count={Math.ceil(filteredRows.length / rowsPerPage)}
                    page={page}
                    color="secondary"
                    onChange={handleChangePage}
                    shape="rounded"
                    variant="outlined"
                />
            </Paper>
            {showSortingPanel && (
                <Sorting
                    headers={headers}
                    onSort={handleSort}
                    onClearSort={handleClearSort}
                />
            )}
            <ColumnVisibilityPanel
                headers={headers}
                visibleColumns={visibleColumns}
                toggleColumnVisibility={toggleColumnVisibility}
                open={showColumnPanel}
                onClose={() => setShowColumnPanel(false)}
                onShowAllColumns={handleShowAllColumns}
                onApply={handleApply}
            />
        </div>
    );
};

export default DataTable;
