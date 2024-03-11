import {Paper,Box,Typography,Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../themes/theme";
import { SearchResultType } from "../interfaces/types";
import SearchContext from './SearchContext';
import { BorderColor } from '@mui/icons-material';
import { spacing } from 'material-ui/styles';
import moment from 'moment';


// const Item = styled(Paper)(() => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     elevation: 1,
//     border: 0,
//     borderRadius: 1,
//   }));
  
const SearchResultCards = (props) => {

    const result:SearchResultType = props.result;
    const context = React.useContext(SearchContext);
    const {filters,pagination,updatePaginationStateValues,setError} = context;
    const {doc} = result;
    const {
        registerDate,processId,action,agency,commentDate,commentsFilename,cooperatingAgency,county,decision,department,documentType,draftNoa,state,finalNoa,finalNoaDate} = doc;


    
    const itemCardProps= {
      display:'flex',

//      margin: 0.5,
//      padding: 1,
fontSize: '0.7rem',
      elevation: 1,
      border: '1px solid #ddd',
      borderRadius: 1,
      padding: 0.5,
      margin: 0.5,
    }
        return (
              <>
               <Grid padding={2} container display={'flex'}  justifyContent={'flex-start'} flex={1}>
                 <Grid {...itemCardProps}
                >
                  <b>Status:</b>&nbsp;{status ? status : "N/A"}
                </Grid>
                <Grid {...itemCardProps}
                >
                  <b>Register Date:</b>&nbsp;{moment(registerDate).format("MM/DD/YYYY") || "N/A"}
                </Grid>
                <Grid {...itemCardProps}
                >
                  <b>State:</b>&nbsp;<b>{state ? state : 'N/A'}</b>
                </Grid>
                <Grid {...itemCardProps}
                >
                  <b>County:</b>&nbsp;{county ? county : 'N/A'}
                </Grid>
                <Grid
                 {...itemCardProps}
                >
                  <b>Action:</b>&nbsp;{action ? action : 'N/A'}
                </Grid>
                <Grid
                  //className={classes.itemHeader}
                 {...itemCardProps}
                >
                  <b>Decision:</b>&nbsp;{decision ? decision : 'N/A'}
                </Grid>
                {/* {(commentDate)
                      ? ( */}
                <Grid
                  //className={classes.itemHeader}
                  {...itemCardProps}
                >
                  <b>Project Start Date:</b>&nbsp;<>{(registerDate) ? moment(registerDate).format("MM/DD/YYYY") : 'N/A'}</>
                </Grid>
                <Grid
                  //className={classes.itemHeader}
                  {...itemCardProps}>
                  <b>Project Endate Date:</b>&nbsp;<>{finalNoa ? moment(finalNoaDate).format("MM/DD/YYYY") : 'N/A'}</>
                </Grid>
                <Grid
                  //className={classes.itemHeader}
                 {...itemCardProps}
                >
                  <b>Final NOA:</b>&nbsp; <>{finalNoa? moment(finalNoaDate).format("MM/DD/YYYY") : 'N/A'}</>                </Grid>
                <Grid
                  //className={classes.itemHeader}
                  {...itemCardProps}
                >
                  <b>Draft NOA:</b>&nbsp; <>{draftNoa? moment(draftNoa).format("MM/DD/YYYY") : 'N/A'}</>
                </Grid>
                <Grid
                  //className={classes.itemHeader}
                  {...itemCardProps}
                >
                  <b>Process ID</b>:&nbsp; {processId ? processId : 'N/A'}
                </Grid>
              </Grid>
              </>
        );
    }

export default SearchResultCards;