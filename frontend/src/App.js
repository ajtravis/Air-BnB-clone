import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import SpotDetails from "./components/SpotDetailsPage";
import AddSpotForm from "./components/AddSpotForm";
import UpdateSpotForm from './components/UpdateSpotForm'
import AddReviewForm from "./components/AddReviewForm";


function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const spot = useSelector((state) => state.spot)
  const spotId = spot.id;

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={'/'}>
            <SpotList />
          </Route>
          <Route exact path={`/spots/:spotId`}>
            <SpotDetails currentSpot={spot}/>
          </Route>
          <Route path={'/addSpotForm'}>
            <AddSpotForm />
          </Route>
          <Route path={`/spots/:spotId/update`}>
            <UpdateSpotForm />
          </Route>
          <Route path={'/reviewForm'}>
            <AddReviewForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
