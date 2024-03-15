import { FilterOptionType } from '@/components/interfaces/types';
import { Box } from '@mui/material';
import { useContext } from 'react';
import Select from 'react-select';
import SearchContext from '../SearchContext';

type FilterSelectProps = {
    options: FilterOptionType[];
    filterValue: FilterOptionType[];
    keyLabel:string,
    placeholder:string,
    //[TODO] Create a standard interface for post filtering callback function
    callback?: (filtered:FilterOptionType[],key:string,value:FilterOptionType,meta) => void
}
export default function FilterSelect(props:FilterSelectProps) {
    const {options,filterValue,keyLabel,placeholder,callback} = props;
    const {setError,filters,loading,error,updateFilterStateValues,searchTitlesOnly} = useContext(SearchContext);
    const {title} = filters;
    // if(!keyLabel){
    //         const msg = `Missing key, please provide a key for the filter select. Key: ${keyLabel} - ${props.keyLabel}`
    //     setError(msg);

    // }    
    const onChange = (value, meta,key:string) => {
      console.log(`onChange ~ value, meta,key:`, value, meta,key);
      if(!key){
        console.warn('Filter Update Called with a missing KEY: ', key);
        return;        
      }
      if(meta.action ==='select-option'){
        updateFilterStateValues(key, value);
      }
      else if(meta.action ==='remove-value'){
        //remove selected item only
        let filtered = options.filter((v) => v === value)
        updateFilterStateValues(key, filtered);
      }
      else if(meta.action ==='clear'){
        //remove filter
        updateFilterStateValues(key,[] );
      }
        // const filtered = getFilteredValues(options, value, meta);
        // if(!value || !meta){
        //   console.warn('Filter Update Called with a missing KEY: ', key,' OR VALUE: ' ,value, meta);
        //   return;
        // } 
        // console.log(`onChange ~ filtered:`, filtered);
        // updateFilterStateValues(key, value.label);
        // if(callback){
        //     console.info('Callback received in FilterSelect',callback);
        //     //callback(filtered,value.label)
        // }
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
              value={options.filter((v) => filterValue.includes(v))}
              placeholder={placeholder}
              onChange={(newValue, actionMeta) => onChange(newValue, actionMeta,keyLabel)}
              isLoading={loading}
              name={keyLabel}
              options={options}
            />
          </Box>
        </div>
    )
}