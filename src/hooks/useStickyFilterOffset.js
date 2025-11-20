import { useEffect } from "react";

export function useStickyFilterOffset() {
  useEffect(() => {
    const update = () => {
      const filter = document.querySelector(".filter-sticky-header");
      const cart = document.querySelector(".filter-aware-sticky");
      if (filter && cart) {
        document.documentElement.style.setProperty(
          "--filter-height",
          filter.offsetHeight + "px"
        );
      }
    };

    update();
    window.addEventListener("resize", update);

    const observer = new MutationObserver(update);
    const filterEl = document.querySelector(".filter-sticky-header");
    if (filterEl)
      observer.observe(filterEl, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);
}
