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
      fontFamily: 'open sans',
      fontSize: 12,
      display:'flex',
//      margin: 0.5,
//      padding: 1,
      elevation: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      border: '1px solid #ddd',
      borderRadius: 1,
      padding: 0.5,
      margin: 0.5,
      spacing: 0.5,
    }
        return (
              <>
               <Grid padding={2} container display={'flex'}  justifyContent={'flex-start'} flex={1}>
                 <Grid {...itemCardProps}
                >
                  Status:&nbsp;{status ? status : "N/A"}
                </Grid>
                <Grid {...itemCardProps}
                >
                  Register Date:&nbsp;{moment(registerDate).format("MM/DD/YYYY") || "N/A"}
                </Grid>
                <Grid {...itemCardProps}
                >
                  State:&nbsp;<b>{state ? state : 'N/A'}</b>
                </Grid>
                <Grid {...itemCardProps}
                >
                  County:&nbsp;<b>{county ? county : 'N/A'}</b>
                </Grid>
                <Grid
                 {...itemCardProps}
                >
                  Action:&nbsp;<b>{action ? action : 'N/A'}</b>
                </Grid>
                <Grid
                  //className={classes.itemHeader}
                 {...itemCardProps}
                >
                  Decision:&nbsp;<b>{decision ? decision : 'N/A'}</b>
                </Grid>
                {/* {(commentDate)
                      ? ( */}
                <Grid
                  //className={classes.itemHeader}
                  {...itemCardProps}
                >
                  Project Start Date:&nbsp;<>{(registerDate) ? moment(registerDate).format("MM/DD/YYYY") : 'N/A'}</>
                </Grid>
                <Grid
                  //className={classes.itemHeader}
                  {...itemCardProps}>
                  Project Endate Date:&nbsp;<b>{finalNoa ? moment(finalNoaDate).format("MM/DD/YYYY") : 'N/A'}</b>
                </Grid>
                <Grid
                  //className={classes.itemHeader}
                 {...itemCardProps}
                >
                  Final NOA:&nbsp; <>{finalNoa? moment(finalNoaDate).format("MM/DD/YYYY") : 'N/A'}</>                </Grid>
                <Grid
                  //className={classes.itemHeader}
                  {...itemCardProps}
                >
                  Draft NOA:&nbsp; <>{draftNoa? moment(draftNoa).format("MM/DD/YYYY") : 'N/A'}</>
                </Grid>
                <Grid
                  //className={classes.itemHeader}
                  {...itemCardProps}
                >
                  Process ID:&nbsp; <b>{processId ? processId : 'N/A'}</b>
                </Grid>
              </Grid>
              </>
        );
    }

export default SearchResultCards;