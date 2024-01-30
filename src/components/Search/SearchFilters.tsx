import {
    Autocomplete,
    Box,
    Button,
    Container,
    Checkbox,
    Paper,
    Divider,
    FormControl,
    FormLabel,
    Link,
    TextField,
    Typography,
    Stack,
    Chip,
    FormControlLabel,
  } from '@mui/material';
  import Grid from '@mui/material/Unstable_Grid2';
  import { styled, makeStyles } from '@mui/styles';
  import React, { useContext,useState } from 'react';
  //import { ThemeProvider, createUseStyles } from "react-jss";
  import SearchContext from './SearchContext';
  //import Grid from '@mui/material/Grid'; // Grid version 1
  import { ThemeProvider } from '@material-ui/core';
  import SearchDatePickers from './SearchDatePickers';
  import {FilterType} from "@/components/interfaces/interfaces";

  import {
    actionOptions ,
    agencyOptions,
    decisionOptions,
    locations as states,
    counties,
  } from './data/dropdownValues';
import { update } from 'lodash';
  //filter out duplicates
  const actions = Array.from(new Set(actionOptions));
  const agencies = Array.from(new Set(agencyOptions));
  //const counties = Array.from(new Set(counties));
  const decisions = Array.from(new Set(decisionOptions));
//  const states = Array.from(new Set(Globals.locations));
  const useStyles = makeStyles((theme) => ({
    checkbox: {
      padding: 0,
      margin: 0,
    },
    autoComplete: {
      fontSize: 20,
      padding: 0,
      margin: 0
    }
  }));
  
  const SearchFilters = (props) => {
    // Remove unused import statement
    const context = useContext(SearchContext);
    const {pagination,filters,updatePaginationStateValues,updateFilterStateValues} = context;
    const {page,sortby,sortdir,limit} = pagination;
    const {action,agency,agencyRaw,cooperatingAgency,cooperatingAgencyRaw,county,countyRaw} = filters;

    const useStyles = makeStyles((theme) => ({
        checkbox: {
            padding: 0,
            margin: 0,
        },
        autoComplete: {
            fontSize: 20,
            padding: 0,
            margin: 0
        }
    }));

    // Add missing prop validation
    interface ISearchFiltersProps {
        filtersHidden: boolean;
    }

    //Common Settings used by all autocomplete filters
    const filterProps = {
      fullWidth: true,
      multiple: true,
      autoComplete: true,
      autoFocus: false,
      //autoHighlight: true,
      limitTags: 3,
      disablePortal: true,
      variant: 'standard',
      closeText: '...Close',
      forcePopupIcon: true,
      selectOnFocus: true,
  
      //render selected values from the dropdown
    // renderTags: (props: any[]) => {
    //     return (
    //         props.map((prop: any) => (
    //             <Chip
    //                 component="div" // Add the missing component prop
    //                 size="small"
    //                 color="primary"
    //                 fontSize="small" // Remove the fontSize prop if it's not needed
    //                 key={prop.label} // Use the correct key prop
    //                 label={abbreviate(prop.label, 30)}
    //             />
    //         ))
    //     )
    // },
      //render selected values for the dropdown options
      getOptionLabel: (option) => abbreviate(option.label, 50),
      getLimitTagsText: (options) =>
        options.label.length > 10
          ? options.label.slice(0, 10) + '...'
          : options.label,
  
      // ),
    };
    const abbreviate = (text = "", length = 20) => {
      if (!text.length) {
        console.warn(`The text specified is empty this is most likely an upstream issue`)
        return "TEXT NOT FOUND!!!!"
      }
      else {
        return text.length > length ? text.slice(0, length) + '...' : text
      }
    }

    const formControlProps = {
      p: 1,
      mb: 1,
      mt: 1,
    };
    return (
      <>
        <Box alignItems={'center'}>
                  <FormLabel>
                    <Typography
                      variant='filterLabel'>
                      {' '}
                      Search Only Within titles
                    </Typography>
                  </FormLabel>
                </Box>
                <Box>
                <Button
                    style={{margin:0}}
                    variant='outlined'
                    fullWidth
                    color='primary'
                >
                    Clear Filters
                </Button>
                </Box>
                <Box>
                  <FormControl
                    fullWidth
                    {...formControlProps}
                  >
                    <Autocomplete
                      id='agency'
                      {...filterProps}
                      tabIndex={4}
                      options={agencies}
                      //value={agencies.filter((v) => state.agency.includes(v.value))}
                      //onChange={(evt, value, tag) => onAgencyChange(evt, value, tag)}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            placeholder='Type or Select Lead Agencies'
                            variant='outlined'
                            sx={{
                              wordWrap: 'break-word',
                              overflow: 'hidden',
                              p: 0,
                            }}
                          />
                        );
                      }}
                    />
                  </FormControl>
                </Box>
                <Box >
                  <FormControl
                    fullWidth
                    {...formControlProps}>
                    <FormLabel htmlFor='searchAgency'>
                      Cooperating Agencies:
                    </FormLabel>
                    <Autocomplete
                      fullWidth
                      id='searchAgency'
                      {...formControlProps}
                      tabIndex={4}
                      options={agencies}
                      // value={agencies.filter((v) =>
                      //  state.cooperatingAgency.includes(v.value),
                      // )}
                     // onChange={(evt, value, tag) => onCooperatingAgencyChange(evt, value, tag)}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            placeholder='Type or Select Cooperating Agencies'
                            variant='outlined'
                            sx={{
                              wordWrap: 'break-word',
                              overflow: 'hidden',
                              p: 0,
                            }}
                          />
                        );
                      }}
                    />
                  </FormControl>
                </Box>
                {/* #endregion */}
                <Divider />
                {/* #region search states */}
                <Box>
                  <FormLabel htmlFor='state'>State(s) and Location(s):</FormLabel>
                  <Autocomplete
                    id='state'
                    {...filterProps}
                    options={states}
                    // value={states.filter((v) => {
                    //   return state.state.includes(v.value);
                    // })}
                    // onChange={(evt, value, reason) =>
                    //   onLocationChange(evt, value, reason)
                    // }
  
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          placeholder='Type or Select a State'
                          variant='outlined'
                          sx={{
                            width: '100%',
                            p: 0,
                          }}
                        />
                      );
                    }}
                  />
                </Box>
                {/* #endregion */}
                {/* #region search counties */}
                <Box  >
                  <FormLabel
                    htmlFor='county'>
                    County/counties:
                  </FormLabel>
                  <Autocomplete
                    id='county'
                    {...filterProps}
                    tabIndex={5}
                    options={counties}
                    //value={state.countyOptions.filter((v) => state.county.includes(v.value))}
                    // onChange={(evt, value, reason) =>
                    //   onCountyChange(evt, value, reason)
                    // }
                    renderInput={(params) => {
                      return (
                        <TextField
                          placeholder='Type or Select a Counties'
                          {...params}
                          variant='outlined'
                          sx={{
                            width: '100%',
                            p: 0,
                          }}
                        />
                      );
                    }}
                  />
                </Box>
                <Divider />
                <div>
                  <Box id="action-type-box">
                    <FormLabel htmlFor='searchAction'>Action Type:</FormLabel>
                    <Autocomplete
                      {...filterProps}
                      id='searchAction'
                      tabIndex={10}
                      className={'classes.autocomplete'}
                      options={actions}
                     // value={(actions.filter((v) => state.action.includes(v.value)))}
                     // onChange={(evt, value, reason) => onActionChange(evt, value, reason)}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            placeholder='Type or Select a Action Type(s)'
                            variant='outlined'
                            sx={{
                              width: '100%',
                              p: 0,
                            }}
                          />
                        );
                      }}
                    />
                  </Box>
                  {/* #endregion */}
                </div>
                {/* </div> */}
                {/* #endregion */}
                <Box>
                    <FormLabel htmlFor='searchDecision'></FormLabel>
                    <Typography variant='filterLabel'>Decision Type</Typography>
                    <Autocomplete
                      id='searchDecision'
                      {...filterProps}
                      tabIndex={11}
                      options={decisions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant='outlined'
                          placeholder='Type or select decision type(s)'
                          sx={{
                            width: '100%',
                            p: 0,
                          }}
                        />
                      )}
                    />
                  {/* #endregion */}

                <Divider />
                {/* #region document type filters */}
                    <Box>
                      <FormControlLabel
                        label={
                          <Typography variant='filterLabel'>
                              Final EIS
                              {/* {EISCount ? EISCount : ''} */}
                          </Typography>
                          }
                        control={
                          <Checkbox
                            name='typeDraft'
                            id='typeDraft'
                            tabIndex={12}
                            //checked={state.typeFinal}
                            //onClick={onTypeChecked}
                          />
                        }
                      />
                    </Box>
                   <Box>
                      <FormControlLabel
                        label={<Typography variant='filterLabel'>
                          Draft EIS {/* {draftCount ? draftCount : ''} */}
                          </Typography>
                          }
                        control={
                          <Checkbox
                            name='typeDraft'
                            id='typeDraft'
                            tabIndex={12}
                            //checked={state.typeDraft}
                            //onClick={onTypeChecked
                          />
                        }
                      />
                   </Box>
                      <Box>
                        <FormControlLabel
                          label={
                              <Typography 
                                  variant='filterLabel'>
                                  EA 
                                  {/* {eaCount ? eaCount : '' */}
                              </Typography>}
                          control={
                            <Checkbox
                              name='typeEA'
                              id='typeEA'
                              tabIndex={13}
                              //checked={state.eaCount}
                              //onChange={onTypeChecked}
                            />
                          }
                        />
                      </Box>
                     <Box>
                       <FormControlLabel
                          label={
                          <Typography variant='filterLabel'>
                              NOI 
                              {/* {noiCount ? noiCount : ''} */}
                          </Typography>}
                          control={
                            <Checkbox
                              name='typeNOI'
                              tabIndex={14}
                              //checked={state.typeNOI}
                              //onChange={onTypeChecked}
                            />
                          }
                        />
                     </Box>
                     <Box>
                       <FormControlLabel
                          label={
                          <Typography variant='filterLabel'>
                              ROD 
                              {/* {rodCount ? rodCount : ''} */}
                          </Typography>
                          }
                          control={
                            <Checkbox
                              name='typeROD'
                              id='typeROD'
                              tabIndex={15}
                              //checked={typeROD}
                              //onChange={(evt) => onTypeChecked(evt)}
                            />
                          }
                        />
                     </Box>
                     <Box>
                        <FormControlLabel
                        label={
                        <Typography variant='filterLabel'>
                          {/* Scoping Report 
                          {scopingCount ? scopingCount : ''} */}
                          </Typography>
                      }
                        control={
                          <Checkbox
                            name='typeScoping'
                            id='typeScoping'
                            tabIndex={16}
                          />
                        }
                        />
                     </Box>
                 
                  <Box className='sidebar-checkboxes'>
                 <Typography variant='h6'>Advanced</Typography>
                    <FormControlLabel
                      label={<Typography variant='filterLabel'>
                        Final 
                        {/* {finalCount ? finalCount : ''} */}
                      </Typography>}
                      control={
                        <Checkbox
                          name='typeFinal'
                          //checked={useOptionsChecked}
                          //onClick={(evt) => onTypeChecked(evt)}
                          onChange={(evt) => {
                            console.log(`file: SideBarFilters.jsx:492 ~ SideBarFilters ~ evt:`, evt);
                            //onTypeChecked(evt)
                          }}
                        />
                      }
                    />
                  </Box>
                  </Box>
      </>
    );
  };
  //export default withStyles(useStyles)(SideBarFilters);
  export default SearchFilters;
  