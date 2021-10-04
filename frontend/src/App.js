import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <hr style={{height: "10px", color: "#A020F0", margin: "0"}}/>
      <Router>
      <Route path="/" exact component={HomeScreen}/>
      </Router>
    </>
  );
}

export default App;
