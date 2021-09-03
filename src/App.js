import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./views/Home";
import FilmDetails from "./views/FilmDetails";
import './index.css'


function App() {
  return (
   <div className="container my-5">
       <Router>
           <Route path exact="/"><Home /></Route>
           <Route path="/film/:id"><FilmDetails /></Route>
       </Router>
   </div>
  );
}

export default App;
