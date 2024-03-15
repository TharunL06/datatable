import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    const handleClear = () => {
        setSearchQuery('');
        onSearch('');
    };

    return (
        <div style={{ position: 'relative' }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        searchQuery && (
                            <IconButton
                                aria-label="clear search"
                                onClick={handleClear}
                                edge="end"
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        )
                    )
                }}
            />
        </div>
    );
};

export default SearchBar;
