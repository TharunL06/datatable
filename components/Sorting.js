// SortingPanel.js
import React from 'react';
import { List, ListItem, ListItemText, Divider, Button, Drawer, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';


const SortingPanel = ({ headers, onSort, onClearSort, sortColumn, sortDirection, onClose }) => {
    return (
        <Drawer anchor="right" open={open}  onClose={onClose}>
            <div style={{ width: 450, padding: '20px' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '20px' }}>Sorting Options</Typography>

                <List>
                    {headers.map((header, index) => (
                        <div key={index}>
                            <ListItem onClick={() => onSort(header)}>
                                <ListItemText primary={header} />
                                {sortColumn === header && (
                                    sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />
                                )}
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <Button variant="outlined" onClick={onClearSort} style={{ marginTop: 10 }}>Clear Sort</Button>
                </div>
            </div>
        </Drawer>

    );
};

export default SortingPanel;
