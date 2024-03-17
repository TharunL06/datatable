import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DatePicker, MuiPickersUtilsProvider } from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';



const getMaxValue = (data, field) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return 0;
    }
    return Math.max(...data.map(item => item[field]));
};


const FilterPanel = ({ data }) => {

    const [filters, setFilters] = useState({
        name: '',
        category: [],
        subcategory: [],
        createdAt: { startDate: null, endDate: null },
        updatedAt: { startDate: null, endDate: null },
        price: [0, getMaxValue(data, 'price')],
        salePrice: [0, getMaxValue(data, 'salePrice')]
    });




    const filterData = () => {
        if (!data || !Array.isArray(data)) {
            return []; 
        }
        return data.filter(item => {
         
            if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) {
                return false;
            }
            
            if (filters.category.length > 0 && !filters.category.includes(item.category)) {
                return false;
            }
            
            if (filters.subcategory.length > 0 && !filters.subcategory.some(sub => item.subcategory.includes(sub))) {
                return false;
            }
           
            const createdAt = new Date(item.createdAt);
            if (filters.createdAt.startDate && createdAt < filters.createdAt.startDate) {
                return false;
            }
            if (filters.createdAt.endDate && createdAt > filters.createdAt.endDate) {
                return false;
            }
            
            const updatedAt = new Date(item.updatedAt);
            if (filters.updatedAt.startDate && updatedAt < filters.updatedAt.startDate) {
                return false;
            }
            if (filters.updatedAt.endDate && updatedAt > filters.updatedAt.endDate) {
                return false;
            }
            
            if (item.price < filters.price[0] || item.price > filters.price[1]) {
                return false;
            }
            
            if (item.salePrice < filters.salePrice[0] || item.salePrice > filters.salePrice[1]) {
                return false;
            }
            return true;
        });
    };

    
    const handleNameChange = (e) => {
        setFilters({ ...filters, name: e.target.value });
    };

    
    const handleCategoryChange = (e) => {
        const selectedCategories = e.target.value;
        setFilters({ ...filters, category: selectedCategories });
    };

    
    const handleSubcategoryChange = (e) => {
        const selectedSubcategories = e.target.value;
        setFilters({ ...filters, subcategory: selectedSubcategories });
    };

    
    const handleCreatedAtChange = (dates) => {
        const [startDate, endDate] = dates;
        setFilters({ ...filters, createdAt: { startDate, endDate } });
    };

    
    const handleUpdatedAtChange = (dates) => {
        const [startDate, endDate] = dates;
        setFilters({ ...filters, updatedAt: { startDate, endDate } });
    };

    
    const handlePriceChange = (event, newValue) => {
        setFilters({ ...filters, price: newValue });
    };

    const handleSalePriceChange = (event, newValue) => {
        setFilters({ ...filters, salePrice: newValue });
    };

    
    const filteredData = filterData();

    return (
        <div>
           
            <TextField
                label="Search by name"
                value={filters.name}
                onChange={handleNameChange}
            />

            
            <Select
                multiple
                value={filters.category}
                onChange={handleCategoryChange}
            >
               
            </Select>

            
            <Select
                multiple
                value={filters.subcategory}
                onChange={handleSubcategoryChange}
            >
                
            </Select>

          
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    label="Created At"
                    value={[filters.createdAt.startDate, filters.createdAt.endDate]}
                    onChange={handleCreatedAtChange}
                    format="MM/dd/yyyy"
                    minDate={data ? new Date(Math.min(...data.map(item => new Date(item.createdAt)))) : null}
                    maxDate={data ? new Date(Math.max(...data.map(item => new Date(item.createdAt)))) : null}
                />
            </MuiPickersUtilsProvider>

         
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    label="Updated At"
                    value={[filters.updatedAt.startDate, filters.updatedAt.endDate]}
                    onChange={handleUpdatedAtChange}
                    format="MM/dd/yyyy"
                    minDate={data ? new Date(Math.min(...data.map(item => new Date(item.updatedAt)))) : null}
                    maxDate={data ? new Date(Math.max(...data.map(item => new Date(item.updatedAt)))) : null}
                />
            </MuiPickersUtilsProvider>

         
            <Slider
                value={filters.price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                aria-labelledby="price-slider"
                min={0}
                max={getMaxValue(data, 'price')}
            />

         
            <Slider
                value={filters.salePrice}
                onChange={handleSalePriceChange}
                valueLabelDisplay="auto"
                aria-labelledby="salePrice-slider"
                min={0}
                max={getMaxValue(data, 'salePrice')}
            />

          
            <ul>
                {filteredData.map(item => (
                    <li key={item.id}></li>
                ))}
            </ul>
        </div>
    );
};

export default FilterPanel;