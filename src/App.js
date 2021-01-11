import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
   
  } from 'react-router-dom';

  import Home from './components/Home'
  import Invoice from './components/Invoice'

function App() {
    return (
       <Router>
           <Route exact path="/" component={Home}/>
           <Route  path="/invoice" component={Invoice}/>
       </Router>
    )
}

export default App
