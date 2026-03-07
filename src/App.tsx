import { BrowserRouter, Routes, Route } from "react-router";
import WebsiteLayout from "./layouts/WebsiteLayout";
import AboutPage from "./page/about/AboutPage";
import WebsiteLoading from "./components/loader/WebsiteLoading";
import { lazy, Suspense } from "react";
import Page from "./page/service/Page";

const App = () => {
  const HomePage = lazy(() => import("./page/home/HomePage"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<WebsiteLoading />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route index path="/about" element={<AboutPage />} />
          <Route index path="/our-services" element={<Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
