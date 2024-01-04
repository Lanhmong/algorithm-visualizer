// Router.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Components
import Overview from "../pages/Overview";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Overview</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
