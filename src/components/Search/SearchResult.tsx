import React, { useContext, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Paper, Box, Button, styled } from "@mui/material";
import {
  DocumentType,
  SearchResultType,
  SearchResultPropsType,
} from "@/components/interfaces/interfaces";
import SearchContext from "./SearchContext";
import { BorderLeft, BorderRight } from "@mui/icons-material";

const SearchResult = (props: SearchResultPropsType) => {
  const result: SearchResultType = props.result;
  const doc: DocumentType = result.doc;
  const context = useContext(SearchContext);
  //const {action,commentDate,agency} = doc;
  const { filters } = context;
  const {
    actions,
    actionsRaw,
    agencies,
    agenciesRaw,
    cooperatingAgency,
    cooperatingAgencyRaw,
    county,
    countyRaw,
    decisions,
    decisionsRaw,
  } = filters;

  const GridContainer = styled(Grid)(() => ({
    borderLeft: "1px solid #ccc",
    display: "flex",
    justifyContent: "center",
  }));

  const DataCell = styled(Grid)(({ theme }) => ({
   spacing: 2,
   borderLeft: 'none',
   borderRight: '1px solid #ccc',
   display: 'flex',
   justifyContent: 'center',
   justifyItems: 'center',
   alignContent: 'center',
   alignItems: 'center',
   '&:hover': {
     //           backgroundColor: //theme.palette.grey[200],
     boxShadow: '0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)',
     cursor: 'pointer',
     '& .addIcon': {
       color: 'purple',
     },
    },
  }));

   const style = {
    BorderRight: "1px solid #aaa",
    BorderLeft: "1px solid #ccc",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    justifyItems: "center",
    display: "flex",
  };
  // console.log('RECEIVED RESULT',result)
  return (
    <GridContainer className="search-result-container" style={{...style}} container xs={12}>
      <DataCell xs={12}>
        <Typography variant="h3">{result.doc.title}</Typography>
      </DataCell>
      <GridContainer display={"flex"} borderBottom={1} borderTop={1} borderColor={"#ccc"} borderLeft={0} container xs={12}>
        <DataCell xs={1} borderLeft={0}>
          <Typography
            justifyContent={"center"}
            alignContent={"center"}
            variant="h6"

          >
            {doc.documentType}
          </Typography>
        </DataCell>
        <DataCell xs={1} flex={1}>
          {doc.commentDate
            ? new Date(doc.commentDate).toLocaleDateString()
            : "N/A"}
        </DataCell>
        <DataCell xs={6}>
          {`${doc.title}`}
        </DataCell>
        <DataCell xs={2} flex={1} style={{ ...style }}>
          <Button variant="contained">Download</Button>
        </DataCell>
      </GridContainer>
      <DataCell xs={12}>
        <Typography>Snippets here</Typography>
      </DataCell>
    </GridContainer>
  );
};
export default SearchResult;
