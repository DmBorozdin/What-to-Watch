import React from "react";
import Main from "../main/main";

const App = (props) => {
  const {moviesList} = props;

  return (
    <Main moviesList = {moviesList}/>
  );
};

export default App;
