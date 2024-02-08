import {
  DocumentType,
  SearchResultPropsType,
  SearchResultType,
} from "@/components/interfaces/interfaces";
import { Button, Typography, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import SearchContext from "./SearchContext";
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
    borderLeft: "1px solid #eee",
    display: "flex",
    justifyContent: "center",
    padding: 1,
  }));

  const DataCell = styled(Grid)(({ theme }) => ({
   spacing: 1,
   borderLeft: 'none',
   borderRight: '1px solid #eee',
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
    BorderRight: "1px solid #eee",
    BorderLeft: "1px solid #eee",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    justifyItems: "center",
    display: "flex",
  };
  // console.log('RECEIVED RESULT',result)
  return (
    <>
    {result && result.doc  &&
    (
    <GridContainer className="search-result-container" borderBottom={1} borderColor={'#eee'} style={{...style}} container xs={12}>
      <DataCell xs={12}>
        <Typography variant="h6" color="textSecondary" style={{margin: 0, padding: 0}}>
          ID:{result.id}
          
        </Typography>
      </DataCell>
      <DataCell xs={12}>
        <Typography variant="h3">{result.doc.title}</Typography>
      </DataCell>
      <GridContainer display={"flex"} borderBottom={1} borderTop={1} borderColor={"#eee"} borderLeft={0} container xs={12}>
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
          <Typography>
            {doc.commentDate
            ? new Date(doc.commentDate).toLocaleDateString()
            : "N/A"}</Typography>
        </DataCell>
        <DataCell xs={6}>
          {`${doc.title}`}
        </DataCell>
        <DataCell xs={2} flex={1} style={{ ...style }}>
          <Button variant="contained">Download</Button>
        </DataCell>
      </GridContainer>
      <DataCell xs={12}>
        <Typography variant="body2">
          urna molestie at. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Quam quisque id diam vel quam elementum pulvinar. Elit pellentesque habitant morbi tristique senectus.
        </Typography>
      </DataCell>
    </GridContainer>
    )}
    </>
  );
};
export default SearchResult;
