import logo from './images/logo.png';
import './styles/App.css';
import data from './data/dominion_cards.json';
import { useState } from 'react';
import CardSearcher from './components/CardSearcher';

function App() {
  const [cards] = useState(data);

  return (
    <div className="App">
      <img src={logo} alt="logo"/>
      <CardSearcher cards={cards}/>
    </div>
  );
}

export default App;
