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
import { spacing } from "material-ui/styles";
import { BorderColor } from "@mui/icons-material";
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
    display: "flex",
    padding: 1,
    BorderColor: "#eee",
    borderBottom: 1,
    borderTop: 1,
    spacing: 1,
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
    { doc && (
      <>
      <Typography textAlign="center" variant="h4">{title}</Typography>
      <Grid marginTop={1} marginBottom={1} {...GridContainerProps} flex={1}>
          <Grid xs={2} {...GridItemProps}>
            {documentType}
          </Grid>
          <Grid xs={2} {...GridItemProps}>
            {action}
          </Grid>
          <Grid xs={2} {...GridItemProps}>
            {result.score}
          </Grid>
          <Grid xs={2} {...GridItemProps}>
            {`${registerDate ? registerDate : "N/A"}`}
          </Grid>
          <Grid xs={2} {...GridItemProps}>
            {`${status ? status : "N/A"}`}
          </Grid>
          <Grid xs={2} {...GridItemProps}>
            <Button variant="contained" color="primary">Download</Button>
          </Grid>
        </Grid>
        <Box  style= {{background:'#3D669C',border:'1px solid #ddd'}}>
              { showSnippet ?(
                  <Button color="primary" fullWidth onClick={() => setShowSnippet(!showSnippet)}>
                    <Typography color={"white"}>See Less</Typography>
                  </Button> 
              )
              :(
                <Button color="primary" fullWidth onClick={() => setShowSnippet(!showSnippet)}>
                  <Typography color={"white"}> See More</Typography> 
                  </Button>
              )
            }
          <Box>
          {showSnippet &&
          <Box style={{backgroundColor: '#fff'}}>
            <Typography color="black" bgcolor="white" padding={1} textAlign={"left"} fontSize={'1rem'} variant="body2">
              urna molestie at. Sollicitudin ac orci phasellus egestas tellus
              rutrum tellus. Quam quisque id diam vel quam elementum pulvinar.
              Elit pellentesque habitant morbi tristique senectus.
            </Typography>
            </Box>
          
        }

          </Box>
      </Box>
      </>

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