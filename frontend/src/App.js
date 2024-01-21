import './App.css';
import {Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <Route path='/' Component={HomePage}/>
    </div>
  );
}

export default App;
