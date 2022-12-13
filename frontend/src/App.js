import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import SpotDetails from "./components/SpotDetailsPage";


function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const spot = useSelector((state) => state.spot)

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={'/'}>
            <SpotList />
          </Route>
          <Route path={'/spots/spotDetails'}>
            <SpotDetails spot={spot} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
