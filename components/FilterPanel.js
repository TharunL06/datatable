// FilterPanel.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, TextField, Checkbox, FormControlLabel, Slider, Typography, Button } from '@mui/material';

const FilterPanel = ({ open, onClose, categories, subcategories, onApplyFilter }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [dateRange, setDateRange] = useState([new Date(2022, 0, 1), new Date()]); // Change according to your minimum and maximum dates

    const handleCategoryChange = (category) => {
        const currentIndex = selectedCategories.indexOf(category);
        const newCategories = [...selectedCategories];

        if (currentIndex === -1) {
            newCategories.push(category);
        } else {
            newCategories.splice(currentIndex, 1);
        }

        setSelectedCategories(newCategories);
    };

    const handleSubcategoryChange = (subcategory) => {
        const currentIndex = selectedSubcategories.indexOf(subcategory);
        const newSubcategories = [...selectedSubcategories];

        if (currentIndex === -1) {
            newSubcategories.push(subcategory);
        } else {
            newSubcategories.splice(currentIndex, 1);
        }

        setSelectedSubcategories(newSubcategories);
    };

    const handleApplyFilter = () => {
        const filters = {
            categories: selectedCategories,
            subcategories: selectedSubcategories,
            priceRange,
            dateRange
        };

        onApplyFilter(filters);
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>Filters</Typography>
                <List>
                    <ListItem>
                        <TextField label="Search" variant="outlined" fullWidth />
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1" gutterBottom>Category</Typography>
                        {categories.map(category => (
                            <FormControlLabel
                                key={category}
                                control={<Checkbox checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} />}
                                label={category}
                            />
                        ))}
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1" gutterBottom>Subcategory</Typography>
                        {subcategories.map(subcategory => (
                            <FormControlLabel
                                key={subcategory}
                                control={<Checkbox checked={selectedSubcategories.includes(subcategory)} onChange={() => handleSubcategoryChange(subcategory)} />}
                                label={subcategory}
                            />
                        ))}
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
                        <Slider
                            value={priceRange}
                            onChange={(event, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1000}
                        />
                    </ListItem>
                    <ListItem>
                        <Typography variant="subtitle1" gutterBottom>Date Range</Typography>
                        {/* Add date range picker component here */}
                    </ListItem>
                </List>
                <Button variant="contained" color="primary" onClick={handleApplyFilter}>Apply</Button>
            </div>
        </Drawer>
    );
};

export default FilterPanel;
