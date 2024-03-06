import react,{useEffect} from 'react'
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
  Paper, TextField,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext, useState } from "react";
import SearchContext from "./SearchContext";
import SearchResultCards from "./SearchResultCards";
//import SearchResultCards from "./SearchResultCards";
import { spacing } from "material-ui/styles";
import {
  getResultHighlights,
  getUnhighlightedFromResult,
  post,
  getHighlights
} from "./searchUtils";
import axios, { AxiosResponse, AxiosError } from "axios";
const CardItem = styled(Paper)(() => ({
  elevation: 1,
  padding: 0,
  margin: 0.5,
  border: 0,
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
  if (!result || !result.doc) return null;
  const doc: DocumentType = result.doc;
  const context = useContext(SearchContext);
  const { getResultHighlights, error, loading, setError } = context;
  //applies only to the current result
  const [highlights, setHiglights] = useState<string[]>([]);
  //applies to all snippets
  const [showSnippet, setShowSnippet] = useState<boolean>(true);
  const [currentResult, setCurrentResult] = useState(result);
  const { filters, showSnippets } = context;
  const docTitle = filters.title;
  const { score, ids } = currentResult;
  const _mounted = react.useRef(false)

//   useEffect(()=>{
//     if(!_mounted.current){
//       _mounted.current= true;
//     }
//     (async()=>{
//       const resultHighlights= await getHighlights(result,title)
//       console.log(`async ~ HIGHLIGHTS:`, resultHighlights);
// //      setHiglights(resultHighlights);
//       setHiglights(resultHighlights);
//       console.log(`async ~ result:`, result);
//     })();
//     console.log('IN EFFECT WITH RESULT',result)
//   },[result])
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
  const onShowHighlight = async (searchResult: SearchResultType) => {
    console.log(`onShowHighlight ~ searchResult:`, searchResult);
    try {
      const host = import.meta.env.VITE_API_HOST;
      //const unhighlighted = getUnhighlightedFromResult(result,'Copper Mine');
      //let highlights:string[] = [];
      console.log("RESULT", result.ids);
      setShowSnippet(!showSnippet);
    } catch (err) {
      console.error("SEARCH RESULT ERROR", err);
      const msg = `Error getting highlights for result:`;
      console.error(`onShowHighlight ~ ${msg}`);
      setError(msg);
    }
  };

  //  result.highlights = data[0];
  const renderHighlights = (text = "") => {
    console.log(`renderHighlights ~ text:`, text);
    if (!text || !text.length) {
      console.log(`NO TEXT RECEIVED :`, text);
      return "";
    }
    const highlight = text.replace(/<\/?[^>]+(>|$)/g, "");
    const snippet = highlight.substring(
      0,
      highlight.length ? highlight.length - 1 : 0
    );
    console.log(`renderSnippet ~ snippet:`, snippet);

    return snippet;
  };
  //    console.log(`🚀 ~ file: SearchResultSnippets.jsx:65 ~ Snippets ~ snippet:`, snippet);
  function convertToHTML(content) {
    return { __html: content };
  }
  return (
    <>
      {doc && (
        
        <Box marginTop={2}>
          <Typography textAlign="center" variant="h4">
            {title}
          </Typography>
          <Box display={"flex"}>
            <SearchResultCards result={result} />
          </Box>

          <Grid
            id={`search-result-container${doc.id}`}
            border={0}
            {...GridContainerProps}
            display={"flex"}
            flex={1}
          >
            ``{" "}
            <Grid xs={2} {...GridItemProps} display={"flex"}>
              {documentType}
            </Grid>
            <Grid xs={2} {...GridItemProps}>
              {action}
            </Grid>
            <Grid xs={2} {...GridItemProps}>
              {agency}
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
          <Box
            style={{
              background: "#3D669C",
              border: "1px solid #ddd",
              //marginBottom: 1,
            }}
          >
            {
            showSnippet ? (
              <Button
                color="primary"
                fullWidth
                onClick={(evt) => setShowSnippet(false)}
              >
                <Typography color={"white"}>
                  See Less
                </Typography>
              </Button>
            ) : (
              <Button
                color="primary"
                fullWidth
                onClick={(evt) => setShowSnippet(true)}
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
                    <Box>
                      <b>Highlight?</b>
                      <b>Show Snippet</b> {showSnippet ? "true" : "false"}
                      {highlights.map((highlight, index) => (
                        <Box
                          key={index}
                          padding={1}
                          borderBottom={1}
                          borderColor="grey.300"
                        >
                          <Box>
                            <b>HIGHLIGHT # {highlights.length}</b>
                            {highlights.map((highlight, index) => {
                              return (
                                <Box
                                  key={index}
                                  padding={1}
                                  borderBottom={1}
                                  borderColor="grey.300"
                                >
                                  <Box>
                                    {JSON.stringify(highlight)}
                                  </Box>
                                  <Box
                                    dangerouslySetInnerHTML={convertToHTML(highlight.slice(0, 100))}
                                  >
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default SearchResult;
