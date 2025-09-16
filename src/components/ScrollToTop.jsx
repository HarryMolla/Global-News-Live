import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Category from "./Category";

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Small delay to ensure content is rendered
    const timeout = setTimeout(() => {
      // If you scroll the window
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

      // If your scrollable container instead:
      // const container = document.getElementById('main-content');
      // container.scrollTop = 0;
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname, search, hash, Category]);

  return null;
}

export default ScrollToTop;
