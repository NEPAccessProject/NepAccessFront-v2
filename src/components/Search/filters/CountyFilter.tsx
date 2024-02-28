import { useContext } from "react";
import SearchContext from "../SearchContext";
import { counties as options } from "../data/dropdownValues";
import FilterSelect from "./FilterSelect";
const CountyFilter = () => {
  const context = useContext(SearchContext);
  const { updateFilterStateValues, filters,loading,searchTitlesOnly } = context;
  const { county } = filters;

  const onCountyChange = (evt, item, tag) => {
    console.log(`onCountyChange ~ evt, item:`, evt, item, tag);

    const countyValues = [];
    for (var i = 0; i < evt.length; i++) {
      // countyValues.push(evt[i].value);
    }

    updateFilterStateValues("countyValues", countyValues);
    //updateFilterStateValues("countyRaw", evt);
  };
  return (
    <>
    <FilterSelect options={options} filterValue={county} keyLabel="county" placeholder="Type or Select a Counties / Regions" />
      {/* <FormLabel htmlFor="county">County/counties:</FormLabel> */}
      {/* <Autocomplete
        id="county"
        tabIndex={5}
        options={counties}
        disabled={searchTitlesOnly}
        loading={loading}
    isOptionEqualToValue={(option, value) => option.value === value.value}
        // value={counties.filter((v) => counties.includes({value: v.value, label: v.value
        // }))}
        onChange={(evt, value, reason) =>
          onCountyChange("county", value, reason)
        }
        renderInput={(params) => {
          return (
            <TextField
              placeholder="Type or Select a Counties"
              {...params}`
              variant="outlined"
              sx={{
                width: "100%",
                p: 0,
              }}
            />
          );
        }}
      /> */}
    </>
  );
};
export default CountyFilter;
