import {
  DocumentType,
  SearchResultPropsType,
  SearchResultType,
} from "@/components/interfaces/interfaces";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useContext } from "react";
import SearchContext from "./SearchContext";
import SearchResultCards from "./SearchResultCards";

const SearchResult = (props: SearchResultPropsType) => {
  const result: SearchResultType = props.result;
  const doc: DocumentType = result.doc;
  const context = useContext(SearchContext);
  console.log("🚀 ~ SearchResult ~ context:", context)
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

  const GridContainerProps = {
    borderLeft: "1px solid #eee",
    display: "flex",
    justifyContent: "center",
    padding: 1,
    container: true,
  }

  const GridItemProps = {
   spacing: 1,
   item: true,
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
  }

   const style = {
    BorderRight: "1px solid #eee",
    BorderLeft: "1px solid #eee",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    justifyItems: "center",
    display: "flex",
  };
  console.log('Search Result RECEIVED RESULT',result)
  return (
    <>
    {JSON.stringify(result)}
    {result && result.doc  &&
    (
    <Grid  className="search-result-container" {...GridContainerProps} borderBottom={1} borderColor={'#eee'} style={{...style}} container xs={12}>
      <Grid {...GridItemProps} xs={12}>
        <Typography variant="h6" color="textSecondary" style={{margin: 0, padding: 0}}>
        </Typography>
        <SearchResultCards result={result} />
      </Grid>
      <Grid {...GridItemProps} xs={12}>
        <Typography variant="h3">{result.doc.title}</Typography>
      </Grid>
      <Grid {...GridContainerProps} display={"flex"} borderBottom={1} borderTop={1} borderColor={"#eee"} borderLeft={0} container xs={12}>
        <Grid {...GridItemProps} xs={1} borderLeft={0}>
          <Typography
            justifyContent={"center"}
            alignContent={"center"}
            variant="h6"

          >
            {doc.documentType}
          </Typography>
        </Grid>
        <Grid {...GridItemProps} xs={1} flex={1}>
          <Typography>
            {doc.commentDate
            ? new Date(doc.commentDate).toLocaleDateString()
            : "N/A"}</Typography>
        </Grid>
        <Grid {...GridItemProps} xs={6}>
          {`${doc.title}`}
        </Grid>
        <Grid  {...GridItemProps} xs={2} flex={1} style={{ ...style }}>
          <Button variant="contained">Download</Button>
        </Grid>
      </Grid>
      <Grid {...GridItemProps} xs={12}>
        <Typography variant="body2">
          urna molestie at. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Quam quisque id diam vel quam elementum pulvinar. Elit pellentesque habitant morbi tristique senectus.
        </Typography>
      </Grid>
    </Grid>
    )}
    </>
  );
};
export default SearchResult;
