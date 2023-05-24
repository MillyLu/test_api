import { Routes, Route } from "react-router-dom";
import { StartModal } from "./components/startModal/StartModal";
import { Main } from "./components/Main/Main";
import { ProtectedRoute } from "./protected-route";

export function AppRoutes({ user, id, setId, apiToken, setApiToken }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={<StartModal setId={setId} setApiToken={setApiToken} />}
      />
      <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
        <Route
          path="/"
          element={
            <Main
              id={id}
              setId={setId}
              apiToken={apiToken}
              setApiToken={setApiToken}
            />
          }
        />
      </Route>
    </Routes>
  );
}
