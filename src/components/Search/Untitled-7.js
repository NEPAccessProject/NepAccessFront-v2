{
  highlights.map((highlight, index) => (
    <Box key={index} padding={0.25} className="document-higlights" border={1} borderColor={'blue'}>
      <Box id={`search-result-highlight-container-${doc.id}`}>
        {highlights.map((highlight, index) =>
          <>
            {(index < 3 || showMoreSnippets) && (
              <Box key={index} padding={0} fontSize="0.75rem" className="document-highlight">
                <Box
                  dangerouslySetInnerHTML={convertToHTML(
                    highlight
                  )}
                ></Box>
              </Box>
            )}
          </>
        )}</Box>
      {index > 3 && showMoreSnippets && (
        <>
          <Button onClick={(evt) => setShowMoreSnippets(!showMoreSnippets)} variant="text">
            See More Snippets...
          </Button>
        </>
      )}
    </Box>
  ))
}
