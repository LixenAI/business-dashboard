import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import BuildTracker from "./pages/BuildTracker";
import Financials from "./pages/Financials";
import Crm from "./pages/Crm";
import Brand from "./pages/Brand";
import Markets from "./pages/Markets";
import Playbook from "./pages/Playbook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="build-tracker" element={<BuildTracker />} />
          <Route path="financials" element={<Financials />} />
          <Route path="crm" element={<Crm />} />
          <Route path="brand" element={<Brand />} />
          <Route path="markets" element={<Markets />} />
          <Route path="playbook" element={<Playbook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
