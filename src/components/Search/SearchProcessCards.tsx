import Grid from "@mui/material/Unstable_Grid2";
import { Chip } from "material-ui";
import moment from "moment";
import React, { useEffect } from "react";
import {
  ProcessObjectType,
  SearchResultType,
  ProcessesType,
  ResultDocumentType,
  DocumentType,
} from "../interfaces/types";
import SearchContext from "./SearchContext";
import { getFinalDocumentsFromResults } from "./searchUtils";

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

const SearchProcessCards = (props) => {
  console.log(`SearchResultCards ~ props:`, props);
  const process: ProcessObjectType = props.process;
  const { results } = process;
  const finalDocs = getFinalDocumentsFromResults(results);
  const context = React.useContext(SearchContext);
  const { filters, pagination, updatePaginationStateValues, setError } =
    context;
  const _mounted = React.useRef(false);
  const itemCardProps = {
    display: "flex",

    margin: 0.5,
    padding: 0.5,
    fontSize: "0.8rem",
    elevation: 1,
    border: "1px solid #eee",
    borderRadius: 1,
  };
  useEffect(() => {
    _mounted.current = true;
    return () => {
      _mounted.current = false;
    };
  }, []);
  //   const resultsToUse = results.map((result:SearchResultType) => {
  //     const doc = result.doc as DocumentType;
  //     const documentType = result.doc.documentType;
  //         console.log(`resultsToUse ~ documentType:`, documentType);
  //         if(documentType === "FINAL"){
  //             return result;
  //         }
  //   })
  //  const resultToUse = results[0] || []
  const resultToUse =
    results?.length &&
    results.filter((result: SearchResultType) => {
      console.log("getResultToUse", result);
      return result.doc && result.doc.documentType.includes("FINAL");
    });
  console.log(`resultToUse ~ resultToUse:`, resultToUse);
  console.log("resultToUse", resultToUse);
  const doc = results[0].doc as DocumentType;
  const files = resultToUse.forEach((result: SearchResultType) => {
    console.log("filenames", result.filenames);
    const doc = result.doc as DocumentType;
    const filenames = doc.commentsFilename;
    return filenames;
  });
  const {
    action,
    agency,
    commentDate,
    commentsFilename,
    cooperatingAgency,
    county,
    decision,
    department,
    documentType,
    draftNoa,
    finalNoa,
    finalNoaDate,
    id,
    noiDate,
    processId,
    title,
    state,
    status,
    subtype,
    summaryText,
  } = doc;
  const keyToLabelMap = [
    {
      label: "Action",
      key: "action",
    },
    {
      label: "Agency",
      key: "agency",
    },
    {
      label: "Comment Date",
      key: "commentDate",
    },
    {
      label: "Comments Filename",
      key: "commentsFilename",
    },
    {
      label: "Cooperating Agency",
      key: "cooperatingAgency",
    },
    {
      label: "County",
      key: "county",
    },
    {
      label: "Decision",
      key: "decision",
    },
    {
      label: "Department",
      key: "department",
    },
    {
      label: "Document Type",
      key: "documentType",
    },
    {
      label: "Draft NoA",
      key: "draftNoa",
    },
    {
      label: "Final NoA",
      key: "finalNoa",
    },
    {
      label: "Final NoA Date",
      key: "finalNoaDate",
    },
    {
      label: "NoI Date",
      key: "noiDate",
    },
    {
      label: "Process ID",
      key: "processId",
    },
    {
      label: "State",
      key: "state",
    },
    {
      label: "Status",
      key: "status",
    },

    { label: "Subype", key: "subtype" },
  ];

  const cardStyle = {
    padding:1,
        display: "flex",
        spacing:0.5,
        justifyContent:"flex-start",
        flexWrap:"wrap",
        borderBottom:1,
        borderColor:"#EAE9E9"
  }
  return (
    <>
      <Grid
        style={cardStyle}
      >
        {/* {resultToUse &&
          resultToUse.length &&
          resultToUse.map((result) => <>{JSON.stringify(result)}</>)} */}
        {keyToLabelMap.map((entry) => (
          <>
            {doc[`${entry.key}`] && typeof doc[`${entry.key}`] === "string" && (
              <Grid
                {...itemCardProps}
              >
                    <>
                    {entry.label} : {doc[`${entry.key}`]}
                    </>
              </Grid>
            )
        }
            {doc[`${entry.key}`] && typeof doc[`${entry.key}`] !== "string" &&  (
              <Grid
                {...itemCardProps}
              >
                    <>
                    {entry.label} : {JSON.stringify(doc[`${entry.key}`])}
                    </>
              </Grid>
            )}
            
            {/* {doc[`${entry.key}`] && typeof doc[`${entry.key}`] === "date" && (
              <Grid
                {...itemCardProps}
              >
                    <>
                    {entry.label} : {JSON.stringify(doc[`${entry.key}`])}
                    </>
              </Grid>
            )} */}
            {/* {doc[`${entry.key}`] && typeof doc[`${entry.key}`] === "object" && (
              <Grid
                {...itemCardProps}
              >
                    <>
                    {entry.label} : {JSON.stringify(doc[`${entry.key}`].joins(", "))}
                    </>
              </Grid>
            )} */}
          </>
        ))}
      </Grid>
    </>
  );
};

export default SearchProcessCards;
