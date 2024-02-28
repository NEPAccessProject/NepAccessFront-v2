import { useContext } from "react";
import SearchContext from "../SearchContext";
import {
  counties,
  locations as options
} from "../data/dropdownValues";
import FilterSelect from "./FilterSelect";
export default function StateFilter() {
  const context = useContext(SearchContext);
  const {
    getFilterValues,
    getFilteredValues,
    updateFilterStateValues,
    updatePaginationStateValues,
    filters,
    searchTitlesOnly,
    loading,
    error,
  } = context;
  const states = filters.states;

  const onChange = (value, meta) => {
    const filtered = getFilteredValues(options, value, meta);
    console.log(`onChange ~ filtered:`, filtered);
    updateFilterStateValues("county", counties);

    //onCountyChange(countyOptions.filter(countyObj => this.state.county.includes(countyObj.value)));
  };

  const narrowCountyOptions = (filtered,value)=> {
    console.log('narrowCountyOptions',filtered, ' value ',value)
  };

  return (
    <>
      {/* [TODO] we will need to pass a function to handle the narrowing of counties or other post select action behavior */}
      <FilterSelect options={options} filterValue={states || []} keyLabel="states" placeholder="Type or Select States"
      
        callback={narrowCountyOptions}
      />
    </>
  )

  // return (
  //   <Box>
  //     <Select
  //       className="basic-single"
  //       isSearchable={true}
  //       isMulti={true}
  //       classNamePrefix="select"
  //       isDisabled={searchTitlesOnly}
  //       isClearable={true}
  //       value={getFilterValues(options, states)}
  //       placeholder="Type or Select Lead Agencies"
  //       onChange={(newValue, actionMeta) => onChange(newValue, actionMeta)}
  //       isLoading={loading}
  //       name="agency"
  //       options={options}
  //     />
  //   </Box>
  // );

  // return (
  //   <>
  //     {/* <FormLabel htmlFor="state">State(s) and Location(s):</FormLabel> */}
  //     <Autocomplete
  //       id="state"
  //       options={locations}
  //       loading={loading}
  //       disabled={searchTitlesOnly}
  //       isOptionEqualToValue={(option, value) => option.value === value.value}
  //       onChange={(evt, value, reason) => onLocationChange(evt, value, reason)}
  //       renderInput={(params) => {
  //         return (
  //           <TextField
  //             {...params}
  //             placeholder="Type or Select a State"
  //             variant="outlined"
  //             sx={{
  //               width: "100%",
  //               p: 0,
  //             }}
  //           />
  //         );
  //       }}
  //     />
  //   </>
  // );
}

// We have to share this between the state filter and the county filter, so we export it here, akward but works
export const narrowCountyOptions = (stateValues) => {
  /** Filter logic for county array of specific label/value format given array of state abbreviations  */
  function countyFilter(_stateValues) {
    return function (a) {
      let returnValue = false;
      _stateValues.forEach((item) => {
        if (a.label.split(":")[0] === item) {
          // a.label.split(':')[0] gets 'AZ' from expected 'AZ: Arizona'
          returnValue = true;
        }
      });
      return returnValue;
    };
  }

  let filteredCounties = counties;
  if (stateValues && stateValues.length > 0) {
    filteredCounties = filteredCounties.filter(countyFilter(stateValues));
  }

  return filteredCounties;
};
