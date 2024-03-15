import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import jsonData from "../data/data"



const DataTable = () => {
    const headers = Object.keys(jsonData[1]);
    // const [page,setPage] = useState(1);


    return (
        <Paper elevation={3} style={{ maxWidth: 1400, margin: 'auto' }}>
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
                        {Object.values(jsonData).map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {headers.map((header, cellIndex) => (
                                    <TableCell key={cellIndex}>{row[header]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }} count={10} color="secondary" shape="rounded" variant="outlined" />
            </TableContainer>

        </Paper>
    );
};

export default DataTable;
