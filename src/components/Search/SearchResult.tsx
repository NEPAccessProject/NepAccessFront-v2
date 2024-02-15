import {
  DocumentType,
  SearchResultPropsType,
  SearchResultType,
} from "@/components/interfaces/interfaces";
import { Button, Typography, Divider, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useState } from "react";
import SearchContext from "./SearchContext";
import SearchResultCards from "./SearchResultCards";
const SearchResult = (props: SearchResultPropsType) => {
  const result: SearchResultType = props.result;
  const doc: DocumentType = result.doc;
  const context = useContext(SearchContext);
  const [showSnippet, setShowSnippet] = useState(false);
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
    //  borderLeft: "1px solid #eee",
    display: "flex",
    //    justifyContent: "center",
    padding: 1,
    BorderBottom: 1,
    BorderTop: 1,
    spacing: 1,
    // BorderColor: "#eee",
    container: true,
    flex: 1,
  };

  const GridItemProps = {
    flex: 1,
    //    item: true,
    // borderLeft: "none",
    // borderRight: "1px solid #eee",
    border: "1px solid #eee",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignContent: "center",
    alignItems: "center",
    // "&:hover": {
    //   //           backgroundColor: //theme.palette.grey[200],
    //   boxShadow: "0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)",
    //   cursor: "pointer",
    //   "& .addIcon": {
    //     color: "purple",
    //   },
    // },
  };
  const {
    commentDate,
    title,
    agency,
    status,
    documentType,
    decision,
    registerDate,
    action,
  } = doc;
  return (
    <>
      {/* <SearchResultCards result={result}/> */}
      {doc && (
        <Grid>
          <Grid {...GridContainerProps}>
            <SearchResultCards result={result} />
          </Grid>
          <Grid {...GridContainerProps} flex={1}>
            <Grid {...GridItemProps} xs={12} border={0}>
              <Typography variant="h4">{title}</Typography>
            </Grid>
          </Grid>
          <Grid {...GridContainerProps} flex={1}>
            <Grid xs={2} {...GridItemProps}>
              {documentType}
            </Grid>
            <Grid xs={2} {...GridItemProps}>
              {action}
            </Grid>
            <Grid xs={3} {...GridItemProps}>
              {`${registerDate ? registerDate : "N/A"}`}
            </Grid>
            <Grid xs={3} {...GridItemProps}>
              {`${status ? status : "N/A"}`}
            </Grid>
            <Grid xs={2} {...GridItemProps}>
              <Button variant="contained" color="primary">
                Download
              </Button>
            </Grid>
          </Grid>
          <Grid {...GridContainerProps} flex={1} borderTop={0}>
            <Grid {...GridItemProps} xs={12} padding={1} flex={1} border={0}>
              {showSnippet ? (
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => setShowSnippet(false)}
                >
                  See Less
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => setShowSnippet(true)}
                >
                  See More
                </Button>
              )}
            </Grid>
            {showSnippet && (
              <Grid
                xs={12}
                container
                hidden={!showSnippet}
                //border={"1px solid #ccc"}
              >
                <Grid xs={12}>
                  <Typography variant="body2">
                    urna molestie at. Sollicitudin ac orci phasellus egestas
                    tellus rutrum tellus. Quam quisque id diam vel quam
                    elementum pulvinar. Elit pellentesque habitant morbi
                    tristique senectus.
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SearchResult;

// <Grid item xs={12} display={'flex'} id="grid-snippet-expand-box" width={'100%'}>
//             <Button
//               id="grid-snippet-expand-button"
//               fullWidth={true}
//               variant='contained'
//               color="primary"
//               onClick={(evt) => toggleContentExpansion(evt, id)}
//               sx={{
//                 width:'100%',
//                 borderRadius: 0,
//               }}
//             >
//               Click to See {isContentExpanded ? 'Less' : 'More'}
//             </Button>
