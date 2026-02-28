/**
 * Helper to extract a search parameter from the current URL
 * @param paramName - The name of the search parameter to extract
 * @returns The value of the parameter, or null if not found
 */
export function getSearchParam(paramName: string): string | null {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(paramName);
}

/**
 * Helper to clear a specific search parameter from the URL
 * @param paramName - The name of the search parameter to clear
 */
export function clearSearchParam(paramName: string): void {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(paramName);
  
  const newSearch = searchParams.toString();
  const newUrl = newSearch 
    ? `${window.location.pathname}?${newSearch}${window.location.hash}`
    : `${window.location.pathname}${window.location.hash}`;
  
  replaceUrlInHistory(newUrl);
}

/**
 * Helper to replace the URL in the browser's history state
 * @param url - The new URL to set in the history
 */
export function replaceUrlInHistory(url: string): void {
  window.history.replaceState(window.history.state, '', url);
}
