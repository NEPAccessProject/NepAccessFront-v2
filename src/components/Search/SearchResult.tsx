import {
  DocumentType,
  SearchResultPropsType,
  SearchResultType,
} from "@/components/interfaces/types";
import {
  Button,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useState } from "react";
import SearchContext from "./SearchContext";
//import SearchResultCards from "./SearchResultCards";
import { spacing } from "material-ui/styles";
const CardItem = styled(Paper)(() => ({
  elevation: 1,
  padding: 0,
  margin: 0.5,
  border:0,
}));

const GridContainerProps = {
  display: "flex",
  padding: 1,
  borderColor: "#eee",
  borderBottom: 1,
  borderTop: 1,
  spacing: 1,
  container: true,
  flex: 1,
};

const GridItemProps = {
  flex: 1,
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
const SearchResult = (props: SearchResultPropsType) => {
  const result: SearchResultType = props.result;
  const doc: DocumentType = result.doc;
  const context = useContext(SearchContext);
  //applies only to the current result
  const [showSnippet, setShowSnippet] = useState(false);
  //applies to all snippets
  const { showSnippets, setShowSnippets } = context;
  const { filters } = context;
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
      Item
      {/* {doc && (
        <>
          <ProcessCards result={result} />
          <Typography textAlign="center" variant="h4">
            {title}
          </Typography>
          <Grid marginTop={1} marginBottom={1} {...GridContainerProps} flex={1}>
            <Grid xs={2} {...GridItemProps}>
              {documentType}
            </Grid>
            <Grid xs={2} {...GridItemProps}>
              {action}
            </Grid>
            <Grid xs={1} {...GridItemProps}>
              {agency}
            </Grid>
            <Grid xs={1} {...GridItemProps}>
              {result.score}
            </Grid>
            <Grid xs={2} {...GridItemProps}>
              {`${registerDate ? registerDate : "N/A"}`}
            </Grid>
            <Grid xs={2} {...GridItemProps}>
              {`${status ? status : "N/A"}`}
            </Grid>
            <Grid xs={2} {...GridItemProps}>
              <Button variant="contained" color="primary">
                Download
              </Button>
            </Grid>
          </Grid>
          <Box style={{ background: "#3D669C", border: "1px solid #ddd" }}>
            {showSnippets || showSnippet ? (
              <Button
                color="primary"
                fullWidth
                onClick={() => setShowSnippet(!showSnippet)}
              >
                <Typography color={"white"}>See Less</Typography>
              </Button>
            ) : (
              <Button
                color="primary"
                fullWidth
                onClick={() => setShowSnippet(!showSnippet)}
              >
                <Typography color={"white"}> See More</Typography>
              </Button>
            )}
            <Box>
              {showSnippet && (
                <Box style={{ backgroundColor: "#fff" }}>
                  <Typography
                    color="black"
                    bgcolor="white"
                    padding={1}
                    textAlign={"left"}
                    fontSize={"1rem"}
                    variant="body2"
                  >
                    urna molestie at. Sollicitudin ac orci phasellus egestas
                    tellus rutrum tellus. Quam quisque id diam vel quam
                    elementum pulvinar. Elit pellentesque habitant morbi
                    tristique senectus.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </>
      )} */}
    </>
  );
};

export default SearchResult;

const useStyles = makeStyles(() => ({
  resultsHeader: {
    fontFamily: "open sans",
    fontSize: 50,
    fontWeight: "bolder",
    padding: 4,
    margin: 2,
  },
  resultItemHeader: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 0.5,
    padding: 1,
    elevation: 1,
  },
  itemHeader: {
    fontFamily: "open sans",
    fontSize: 40,
    fontWeight: "bold",
    margin: 0.5,
    padding: 1,
    elevation: 1,
    p: 1,
    "&:hover": {
      //textDecoration: 'underline'
      boxShadow: "0px 4px 8px rgba(0.5, 0.5, 0.5, 0.15)",
    },
    infoCard: {
      padding: 1,
      margin: 1,
    },
  },
}));
const ProcessCards = (props) => {
  const result: SearchResultType = props.result;
  const doc: DocumentType = result.doc;
  const context = useContext(SearchContext);
  const {
    agency,
    cooperatingAgency,
    documentType,
    registerDate,
    status,
    title,
    action,
    commentDate,
    id,
  } = doc;
  const classes = useStyles();
  return (
    <>
      <Grid container flex={1} display={"flex"} spacing={0.5} margin={1}>
        {Object.keys(doc).map((key) => (
          <span key={key}>
            {doc[key] && doc[key].length && (
                <CardItem style={{
                  margin:0,
                  border:0,
                }}>
                  <Grid {...GridItemProps} border={0} justifyContent={"flex-start"} padding={1} margin={1}>
                    <Typography>
                      <b>
                        
                        {key.substring(0, 1).toUpperCase() + key.substring(1)}: {' '}
                      </b>
                      {doc[key] ? doc[key] : "N/A"}
                    </Typography>
                  </Grid>
                </CardItem>
            )}
          </span>
        ))}
      </Grid>
    </>
  );
};
//    //       className={classes.itemHeader}
//           sx={{
//             margin: 0.5,
//             padding: 1,
//             elevation: 1,
//           }}
//         >
//           State: <b>{state ? state : 'N/A'}</b>
//         </Grid>

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
