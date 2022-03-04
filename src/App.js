import "./App.css";
import Layout from "../src/components/Layout/Layout";
import AuthPage from "../src/pages/AuthPage";
import HomePage from "../src/pages/HomePage";
import ExpensesPage from "./pages/ExpensesPage";
import GoalsPage from "../src/pages/GoalsPage";
import CalendarPage from "../src/pages/CalendarPage";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
          {authCtx.isLoggedIn && (
            <Route path="/expenses" element={<ExpensesPage />} />
          )}
          {authCtx.isLoggedIn && (
            <Route path="/goals" element={<GoalsPage />} />
          )}
          {authCtx.isLoggedIn && (
            <Route path="/calendar" element={<CalendarPage />} />
          )}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
