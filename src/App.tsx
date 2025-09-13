import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";
import Landing from "./page/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
