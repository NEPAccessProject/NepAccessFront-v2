
import { Autocomplete, FormControl, FormLabel, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import SearchContext from "../SearchContext";

const LimitControl = () => {
  const context = useContext(SearchContext);
  const { pagination, updatePaginationStateValues } = context;
  const { page, limit, sortby, sortdir } = pagination;
  const onLimitChange = (evt, value, reason) => {
    updatePaginationStateValues("limit", value);
  }
  return (
    <Grid container>
      <Grid xs={3} item marginRight={0} paddingRight={0}>
        <FormLabel htmlFor="searchAgency"># of Results:</FormLabel>
      </Grid>
      <Grid xs={9} item>
        <FormControl fullWidth>
          <Autocomplete
            fullWidth
            id="limit"
            tabIndex={4}
            isOptionEqualToValue={(option, value) => option === value}
            options={
              [1,10,25,50]
            }
            value={limit}
            onChange={(evt, value, tag) =>
              onLimitChange(evt, value, tag) 
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="Set A limit"
                  variant="outlined"
                  sx={{
                    wordWrap: "break-word",
                    overflow: "hidden",
                    p: 0,
                  }}
                />
              );
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default LimitControl;
