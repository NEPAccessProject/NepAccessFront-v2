import {sortSearchResults} from '../components/Search/SearchApp';
describe('sortSearchResults', () => {
  it('should sort search results by title in ascending order', () => {
    const results = [
      { doc: { title: 'C' } },
      { doc: { title: 'A' } },
      { doc: { title: 'B' } },
    ];
    const sortedResults = sortSearchResults(results, 'title');
    expect(sortedResults).toEqual([
      { doc: { title: 'A' } },
      { doc: { title: 'B' } },
      { doc: { title: 'C' } },
    ]);
  });

  it('should sort search results by score in descending order', () => {
    const results = [
      { score: 10 },
      { score: 5 },
      { score: 8 },
    ];
    const sortedResults = sortSearchResults(results, 'score');
    expect(sortedResults).toEqual([
      { score: 10 },
      { score: 8 },
      { score: 5 },
    ]);
  });

  it('should sort search results by commentDate in descending order', () => {
    const results = [
      { commentDate: new Date('2022-01-01') },
      { commentDate: new Date('2022-01-03') },
      { commentDate: new Date('2022-01-02') },
    ];
    const sortedResults = sortSearchResults(results, 'commentDate');
    expect(sortedResults).toEqual([
      { commentDate: new Date('2022-01-03') },
      { commentDate: new Date('2022-01-02') },
      { commentDate: new Date('2022-01-01') },
    ]);
  });
});