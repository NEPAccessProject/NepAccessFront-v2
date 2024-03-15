import {
  DocumentType,
  SearchResultPropsType,
  SearchResultType,
} from "@/components/interfaces/types";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { styled } from "@mui/styles";
import react, { useContext, useEffect, useState } from "react";
import SearchContext from "./SearchContext";
import SearchResultCards from "./SearchResultCards";
//import SearchResultCards from "./SearchResultCards";
import { getHighlights } from "./searchUtils";
const CardItem = styled(Paper)(() => ({
  elevation: 1,
  padding: 0,
  margin: 0.5,
}));

const GridContainerProps = {
  display: "flex",
  padding: 1,
  spacing: 1,
  container: true,
  flex: 1,
};

const GridItemProps = {
  flex: 1,
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
  const { getResultHighlights, error, loading, setError,showSnippets,filters } = context;
  //applies only to the current result
  const [highlights, setHiglights] = useState<string[]>([]);
  //applies to all snippets
  const [showSnippet, setShowSnippet] = useState<boolean>(true);
  const [currentResult, setCurrentResult] = useState(result);
  const docTitle = filters.title;
  const { score, ids } = currentResult;
  const _mounted = react.useRef(false);

  useEffect(() => {
    // if (!_mounted.current) {
    //   _mounted.current = true;
    // }
    (async () => {
      // if(!showSnippets || !showSnippet){
      //    console.log('showSnippets is false - exiting');
      //   return;
      // }
      const resultHighlights = await getHighlights(result, title);
      console.log(`async ~ HIGHLIGHTS:`, resultHighlights);
      //      setHiglights(resultHighlights);
      setHiglights(resultHighlights);
      console.log(`async ~ result:`, result);
    })();
    console.log("IN EFFECT WITH RESULT", result);
  }, [result]);
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

  // const onSnippetChange = (evt:React.ChangeEvent<HTMLButtonElement>) => {
  //   console.log(`onSnippetChange ~ evt:`, evt.target);
  //   console.log(`onSnippetChange ~ evt:`, evt.target);
  //   const isChecked = evt.target.value;
  //  // setShowSnippet(isChecked);
  //   console.log(`onSnippetChange ~ target:`, isChecked);

  // }

  function convertToHTML(text: string) {
    //console.log("🚀 ~ convertToHTML ~ text:", text)
    // if (!text?.length) {
    //   return false;
    // }
    //const content: string = text.replace(/<\/?[^>]+(>|$)/g, "");
    const end = text && text.length > 512 ? 512 : text.length;
    const html = text.substring(0, end as number) + "...";
    console.log("🚀 ~ convertToHTML ~ html:", html)
    return { __html: html };
  }
  return (
    <>
      {doc && (
        <Box id="search-result-doc-container" marginTop={2} borderTop={0} borderBottom={0}>
          <Divider/>
          <Box marginTop={1} id={`search-result-container-box-${doc.id}`}>
              {/* <div><b>Snippets</b>{showSnippets ? 'false' : 'true'}</div>
              <div><b>Snippet</b>{showSnippet ? 'false' : 'true'}</div> */}
            <Typography textAlign="center" variant="h4">
              {title}
            </Typography>
            <Box display={"flex"} id={`search-result-card-box-${doc.id}`}>
              <SearchResultCards result={result} />
            </Box>

            <Grid
              id={`search-result-container${doc.id}`}
              {...GridContainerProps}
              display={"flex"}
              flex={1}
            >
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
              id={`search-result-highlights-${doc.id}`}
              style={{
                background: "#3D669C",
                //border: "1px solid #ddd",
                marginBottom: 0,
              }}
            >
              { (showSnippet) ? (
                <Button
                  color="primary"
                  fullWidth
                  onClick={()=>setShowSnippet(false)}
                >
                  <Typography color={"white"}>See Less</Typography>
                </Button>
              ) : (
                <Button
                  color="primary"
                  fullWidth
                  onClick={(evt)=> setShowSnippet(true)}
                >
                  <Typography color={"white"}> See More</Typography>
                </Button>
              )}
              <Box id={`search-result-highlights-box-${doc.id}-${doc.processId}`}>
                {(showSnippet) && (
                  <Box style={{ backgroundColor: "#fff" }}>
                    <Typography
                      color="black"
                      bgcolor="white"
                      padding={1}
                      paddingBottom={0}
                      textAlign={"left"}
                      fontSize={"1rem"}
                      variant="body2"
                    >
                      <Box>
                        {highlights.map((highlight, index) => (
                          <Box
                            key={index}
                            padding={0.25}
                            //borderBottom={1}
                            //borderColor="grey.300"
                          >
                            <Box
                              id={`search-result-highlight-container-${doc.id}`}
                            >
                             {highlights.map((highlight, index) => {
                                return (
                                  <Box
                                    key={index}
                                    padding={0}
                                    fontSize="0.75rem"
                                  >

                                    <Box 
                                      dangerouslySetInnerHTML={convertToHTML(
                                        highlight[0]
                                      )}
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
        </Box>
      )}
    </>
  );
};
export default SearchResult;
