"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, TextField } from '@mui/material';
import jsonData from "../data/data"
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import LayersIcon from '@mui/icons-material/Layers';

const DataTable = () => {
    const headers = Object.keys(jsonData[0]);
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);

    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = jsonData.slice(indexOfFirstRow, indexOfLastRow);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ maxWidth: 1400, width: '100%', margin: '20px auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        shape="rounded"
                    />
                    <VisibilityIcon style={{ marginLeft: 'auto' }} />
                    <SwapVertIcon />
                    <FilterListIcon />
                    <LayersIcon />


                </div>

                <TableContainer>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <TableCell key={index} style={{ fontWeight: 'bold' }}>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentRows.map((row, rowIndex) => (
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
                    count={Math.ceil(jsonData.length / rowsPerPage)}
                    page={page}
                    color="secondary"
                    onChange={handleChangePage}
                    shape="rounded"
                    variant="outlined"
                />
            </Paper>
        </div>
    );
};

export default DataTable;
