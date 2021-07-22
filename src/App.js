import './styles/App.css';
import data from './data/dominion_cards.json';
import { useState } from 'react';
import CardSearcher from './components/CardSearcher';
import NavBar from './components/NavBar';
import KingdomGenerator from './components/KingdomGenerator';

function App() {
  const [cards] = useState(data);
  const [page, setPage] = useState('generate');

  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + "/logo.png"} alt="logo"/>
      <NavBar page={page} setPage={setPage}/>
      <br/>
      {(page === 'generate') && <KingdomGenerator cards={cards}/>}
      {(page === 'browse') && <CardSearcher cards={cards}/>}
    </div>
  );
}

export default App;
