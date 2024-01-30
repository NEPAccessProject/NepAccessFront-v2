import React, { useContext, KeyboardEvent } from 'react';
import { Paper, Grid,Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SearchContext from './SearchContext';

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Tab") {
    // ... rest of the function remains the same
  }
};

const onKeyUp = (evt: KeyboardEvent) => {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    // ... rest of the function remains the same
  }
};

type SearchDatePickersProps = {
  startDate: Date;
  endDate: Date;
  startPublish: boolean,
  endPublish: Date | undefined,
  onEndDateChange: (date: Date) => void;
  onStartDateChange: (date: Date) => void;
};

/**
 * Renders the search date pickers.
 * @param props - The props for the search date pickers.
 */
export default function SearchDatePickers(props: SearchDatePickersProps) {
  const { startDate, endDate, onEndDateChange, onStartDateChange,startPublish,endPublish } = props;
  const { state, setState } = useContext(SearchContext);
  return (
    <Grid container id="date-filters-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box marginBottom={2} padding={0} width="100%">
          <DatePicker
            name="startPublish"
            format='yyyy-MM-dd'
            
            className="sidebar-date"
            sx={{
              height: 50,
              width: '100%'
            }}
          />
        </Box>
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box padding={0} width="100%">
          <DatePicker
            name="endPublish"
            //selected={endPublish ? true : false}
            // onChange={onEndDateChange}
            format="yyyy-MM-dd"
            className="sidebar-date"            
            sx={{
              height: 50,
              width: '100%'
            }}
          />
        </Box>
      </LocalizationProvider>
    </Grid>
  );
}