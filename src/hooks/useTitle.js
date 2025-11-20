/**
 * Custom Hook: useTitle
 * Description:
 *  - Updates the browser tab title whenever the given title value changes.
 *
 * Usage Example:
 *   useTitle("Bitecraft | Order");
 *
 * Params:
 *  - title (string): The title text to set for the document.
 */

import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    // Update the browser tab title on mount & when title changes
    document.title = title;
  }, [title]);
};

export default useTitle;
