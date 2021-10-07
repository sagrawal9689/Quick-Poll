import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import ResultScreen from './screens/ResultScreen';
import VotingScreen from './screens/VotingScreen';

function App() {
  return (
    <>
      <hr style={{height: "10px", color: "#A020F0", margin: "0"}}/>
      <Router>
      <Route path="/" exact component={HomeScreen}/>
      <Route path="/vote/:id" exact component={VotingScreen}/>
      <Route path="/results/:id" exact component={ResultScreen}/>
      </Router>
    </>
  );
}

export default App;
