
import { Autocomplete, FormControl, FormLabel, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import SearchContext from "../SearchContext";
import Select from "react-select";
const LimitControl = () => {
  const context = useContext(SearchContext);
  const { pagination, updatePaginationStateValues,loading,error,results } = context;
  const { page, limit, sortby, sortdir } = pagination;
  const onLimitChange = (value,action) => {
    console.log(`onLimitChange ~ value,action:`, value,action);
    updatePaginationStateValues("limit", value);
  }
  return (
    <Grid container>

      <Grid container>
      <Grid item xs={4} display={'flex'} style={{justifyContent: 'center',alignItems: 'center'}}>
          <FormLabel htmlFor="searchAgency">Results per page:</FormLabel>
        </Grid>
          <Grid item xs={8}>
            <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isDisabled={loading}
                  defaultValue={{
                    label: "10",
                    value: 10,
                  }}
                  
                  
                  onChange={(newValue, actionMeta) => onLimitChange(newValue, actionMeta)}
                  isLoading={loading}
                  name="color"
                  options={[
                    {label:"1",value:1},
                    {label:"5",value:5},
                    {label:"10",value:10},
                    {label:"25",value:25},
                    {label:"50",value:50},
                  ]}
            />
          </Grid>
      </Grid>
      </Grid>
  );
};
export default LimitControl;
