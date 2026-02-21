import { BrowserRouter, Routes, Route } from "react-router";
import WebsiteLayout from "./layouts/WebsiteLayout";
import AboutPage from "./page/about/AboutPage";
import WebsiteLoading from "./components/loader/WebsiteLoading";
import { lazy, Suspense } from "react";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
