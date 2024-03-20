import Grid from "@mui/material/Unstable_Grid2";
import moment from "moment";
import React from "react";
import { ProcessObjectType, SearchResultType,ProcessesType, ResultDocumentType,DocumentType } from "../interfaces/types";
import SearchContext from "./SearchContext";
import { result } from "lodash";

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
  const process: ProcessObjectType = props.process;
  const context = React.useContext(SearchContext);
  const { filters, pagination, updatePaginationStateValues, setError } =
    context;
  // const {
  //   registerDate,
  //   processId,
  //   action,
  //   agency,
  //   commentDate,
  //   commentsFilename,
  //   cooperatingAgency,
  //   county,
  //   decision,
  //   department,
  //   documentType,
  //   draftNoa,
  //   state,
  //   finalNoa,
  //   finalNoaDate,
  // } = doc;
  const {processId,results,title,agency,score} = process;

  results.map((result,index) => {
    let doc = result.doc as DocumentType;
    console.log(`CONVERTED IDX ${index} DOC:`,doc);
  })

  const itemCardProps = {
    display: "flex",

    margin: 0.5,
    padding: 0.5,
    fontSize: "0.8rem",
    elevation: 1,
    border: "1px solid #eee",
    borderRadius: 1,
  };
  // return (
  //   <>
  //     <Grid
  //       padding={1}
  //       container
  //       display={"flex"}
  //       spacing={1}
  //       justifyContent={"flex-start"}
  //       flex={1}
  //     >
  //       {status && (
  //         <Grid {...itemCardProps}>
  //           <b>Status:</b>&nbsp;{status ? status : "N/A"}
  //         </Grid>
  //       )}
  //       {(
  //         <Grid {...itemCardProps}>
  //           <b>Document Type:</b>&nbsp;{!documentType ?  "N/A" : }
  //         </Grid>
  //       )}
  //       {decision && (
  //         <Grid {...itemCardProps}>
  //           <b>Decision(s):</b>{(decision &&  typeof(decision) === "string"?) ? decision : decision.map((d) => d.decision)}
  //         </Grid>
  //       )}
  //       {startDate && (
  //         <Grid {...itemCardProps}>
  //           <b>Start Date:</b>&nbsp;
  //           {moment(startDate).format("MM/DD/YYYY") || "N/A"}
  //         </Grid>
  //       )}
  //       {endDate && (
  //         <Grid {...itemCardProps}>
  //           <b>End Date:</b>&nbsp;
  //           {moment(endDate).format("MM/DD/YYYY") || "N/A"}
  //         </Grid>
  //       )}
  //       {state && state.length && (
  //         <Grid {...itemCardProps}>
  //           <b>State:</b>&nbsp;<b>{state ? state : "N/A"}</b>
  //         </Grid>
  //       )}
  //       {county && county.length && (
  //         <Grid {...itemCardProps}>
  //           <b>County:</b>&nbsp;{county ? county : "N/A"}
  //         </Grid>
  //       )}
  //       {/* {action && (
  //         <Grid {...itemCardProps}>
  //           <b>Action:</b>&nbsp;{action ? action : "N/A"}
  //         </Grid>
  //       )} */}
  //       {decision && (
  //         <Grid
  //           //className={classes.itemHeader}
  //           {...itemCardProps}
  //         >
  //           <b>Decision:</b>&nbsp;{decision ? decision : "N/A"}
  //         </Grid>
  //       )}
  //       {/* {(commentDate)
  //                     ? ( */}
  //       {/* {commentDate && (
  //         <Grid
  //           //className={classes.itemHeader}
  //           {...itemCardProps}
  //         >
  //           <b>Project Start Date:</b>&nbsp;
  //           <>
  //             {registerDate ? moment(registerDate).format("MM/DD/YYYY") : "N/A"}
  //           </>
  //         </Grid>
  //       )} */}
  //       {/* {finalNoaDate && (
  //         <Grid
  //           //className={classes.itemHeader}
  //           {...itemCardProps}
  //         >
  //           <b>Project Endate Date:</b>&nbsp;
  //           <>{finalNoa ? moment(finalNoaDate).format("MM/DD/YYYY") : "N/A"}</>
  //         </Grid>
  //       )} */}
  //       {/* {finalNoa && (
  //         <Grid
  //           {...itemCardProps}
  //           >
  //           <b>Final NOA:</b>&nbsp;{" "}
  //           <>{finalNoa ? moment(finalNoaDate).format("MM/DD/YYYY") : "N/A"}</>{" "}
  //         </Grid>
  //       )} */}
  //       {/* {draftNoa && (
  //         <Grid
  //           //className={classes.itemHeader}
  //           {...itemCardProps}
  //         >
  //           <b>Draft NOA:</b>&nbsp;{" "}
  //           <>{draftNoa ? moment(draftNoa).format("MM/DD/YYYY") : "N/A"}</>
  //         </Grid>
  //       )} */}
  //       {processId && (
  //         <Grid
  //           //className={classes.itemHeader}
  //           {...itemCardProps}
  //         >
  //           <b>Process ID</b>:&nbsp; {processId ? processId : "N/A"}
  //         </Grid>
  //       )}
  //     </Grid>
  //   </>
  // );
  return (
    <>
      Search Result Cards Placeholder
    </>
  )
};

export default SearchResultCards;
