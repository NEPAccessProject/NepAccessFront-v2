import React,{useContext} from 'react'
import SearchContext from '../SearchContext';
import {Box} from '@mui/material';
import Select from 'react-select';
import { FilterOptionType } from '@/components/interfaces/types';

type FilterSelectProps = {
    options: FilterOptionType[];
    filterValue: FilterOptionType[];
    key:string,
    placeholder:string,
    //[TODO] Create a standard interface for post filtering callback function
    callback?: (filtered:FilterOptionType[],key:string,value:FilterOptionType,meta) => void
}
export default function FilterSelect(props:FilterSelectProps) {
    const {options,filterValue,key,placeholder,callback} = props;
    const context = useContext(SearchContext);
    const {loading,searchTitlesOnly,getFilterValues,getFilteredValues,updateFilterStateValues} = context;
    
    const onChange = (key,value, meta) => {
        const filtered = getFilteredValues(options, value, meta);
        console.log(`onChange ~ filtered:`, filtered);
        updateFilterStateValues(key, filtered);
        if(callback){
            callback(filtered,key,value,meta)
        }
        //onCountyChange(countyOptions.filter(countyObj => this.state.county.includes(countyObj.value)));
      };
    return (
        <div>
<Box>
      <Select
        className="basic-single"
        isSearchable={true}
        isMulti={true}
        classNamePrefix="select"
        isDisabled={searchTitlesOnly}
        isClearable={true}
        value={getFilterValues(options, filterValue)}
        placeholder={placeholder}
        onChange={(newValue, actionMeta) => onChange(key,newValue, actionMeta)}
        isLoading={loading}
        name={key}
        options={options}
      />
    </Box>
            
        </div>
    )
}