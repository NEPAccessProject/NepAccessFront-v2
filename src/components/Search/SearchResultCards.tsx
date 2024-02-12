import { Grid, Paper } from '@mui/material';
//import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from "@mui/styles";
import React from "react";
import theme from "../../themes/theme";
import { SearchResultType } from "../interfaces/interfaces";
import SearchContext from './SearchContext';



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
        finalNoaDate,
        registerDate,states,processId,action,agency,commentDate,commentsFilename,cooperatingAgency,county,decisionRaw,decisions,department,documentType,draftNoa,finalNoa,firstRodDate} = doc;


    const useStyles = makeStyles(() => ({
    resultsHeader: {
      fontFamily: 'open sans',
      fontSize: 50,
      fontWeight: 'bolder',
      padding: 4,
      margin: 2,
    },
    resultItemHeader: {
      fontSize: 25,
      fontWeight: 'bold',
      margin: 0.5,
      padding: 1,
      elevation: 1,
    },
    itemHeader: {
      fontFamily: 'open sans',
      fontSize: 40,
      fontWeight: 'bold',
      margin: 0.5,
      padding: 1,
      elevation: 1,
      p: 1,
      '&:hover': {
        //textDecoration: 'underline'
        boxShadow: '0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)',
      },
      infoCard: {
        padding: 1,
        margin: 1,
      },
    },
  }));
    const classes = useStyles(theme);
        return (
              <Paper elevation={1}>
               <Grid xs={12} container spacing={2}>
                    <SearchResultCards result={result} />
               </Grid>
               <Grid padding={2} container xs={12} flexDirection={'row'} flex={1}>
               <Grid item
          //        className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Score: {status ? status : "N/A"}
                </Grid>
                 <Grid item 
          //        className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Status: {status ? status : "N/A"}
                </Grid>
                <Grid item
           //       className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Register Date: {registerDate? registerDate : "N/A"}
                </Grid>
                <Grid item
           //       className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  State: <b>{states ? states : 'N/A'}</b>
                </Grid>
                <Grid item
          //        className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  County: <b>{county ? county : 'N/A'}</b>
                </Grid>
                <Grid item
                 // className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Action: <b>{action ? action : 'N/A'}</b>
                </Grid>
                <Grid item
                  //className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Decision <b>{decisions ? decisions : 'N/A'}</b>
                </Grid>
                {/* {(commentDate)
                      ? ( */}
                <Grid item
                  //className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Project Start Date: <>{(registerDate) ? registerDate : 'N/A'}</>
                </Grid>
                <Grid item
                  //className={classes.itemHeader}
                  sx={{
                    // margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Project Endate Date: <b>{finalNoaDate}</b>
                </Grid>
                <Grid item
                  //className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Final NOA: <>{finalNoa? finalNoa : 'N/A'}</>
                </Grid>
                <Grid item
                  //className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Draft NOA: <>{draftNoa? draftNoa : 'N/A'}</>
                </Grid>
                <Grid item
                  //className={classes.itemHeader}
                  sx={{
                    margin: 0.5,
                    padding: 1,
                    elevation: 1,
                  }}
                >
                  Process ID: <b>{processId ? processId : 'N/A'}</b>
                </Grid>
              </Grid>
              </Paper>
        );
    }

export default SearchResultCards;