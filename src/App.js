import Home from '../src/Home.jsx'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from '../src/About.jsx';
function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Router>
      <Switch>
      <Route  exact path="/" component={Home}></Route>
      <Route exact path="/about/:id" component={About}></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
