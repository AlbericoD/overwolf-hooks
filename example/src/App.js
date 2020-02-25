import React, { useEffect, useState } from "react";
import { useGameEventProvider } from "overwolf-hooks";

const App = () => {
  const [gep, setRequiredFeatures] = useGameEventProvider();

  //Demo App
  const [displayEventsDemo, setDemo] = useState([]);

  useEffect(() => {
    setRequiredFeatures(["kill", "match", "weapon"]);
    return () => {
      setRequiredFeatures([]);
    };
  }, [setRequiredFeatures]);

  useEffect(() => {
    const data = { info: gep.info, event: gep.event };
    setDemo(oldGep => [...oldGep, data]);
  }, [gep.info, gep.event]);

  return (
    <div className="container">
      <h1>Game Event Provider - useGameEventProvider</h1>
      <button onClick={() => setDemo([])}>Clear Events</button>
      <div>
        {displayEventsDemo.map((data, key) => (
          <p key={key}>{JSON.stringify(data)}</p>
        ))}
      </div>
    </div>
  );
};
export default App;
