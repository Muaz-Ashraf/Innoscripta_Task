import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoutes = ({ routes, isLoggedIn }) => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const component = route.component;
        const path = route.path;

        return (
          <Route
            key={index}
            path={path}
            render={() => (isLoggedIn ? <component /> : <Redirect to="/" />)}
          />
        );
      })}
    </Routes>
  );
};
const routes = [
  {
    path: "/search",
    component: SearchStories,
  },
  {
    path: "/details/:index",
    component: StoryDetails,
  },
];

const [isLoggedIn, setIsLoggedIn] = useState(false);

const token = localStorage.getItem("accessToken");

if (token !== null) {
  setIsLoggedIn(true);
}

function App() {
  return (
    <>
      <ProtectedRoutes routes={routes} isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
