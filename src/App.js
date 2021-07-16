import logo from './images/logo.png';
import './styles/App.css';
import data from './data/dominion_cards.json';
import CardsDisplay from './components/CardsDisplay';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

function App() {
  const [cards] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredCards = cards.filter(({ name, expansion, types, cost, text }) => {
    const parsedTerm = searchTerm.toLowerCase();
    return (name.toLowerCase().includes(parsedTerm)
    || expansion.toLowerCase().includes(parsedTerm)
    || types.some((type) => type.toLowerCase().includes(parsedTerm))
    || (cost && (
      (cost.coins && cost.coins.toString().includes(parsedTerm))
      || (cost.potions && cost.potions.includes(parsedTerm))
      || (cost.debt && cost.debt.includes(parsedTerm))
    ))
    || text.toLowerCase().includes(parsedTerm))
  });

  const sortedCards = filteredCards.sort((m1, m2) => {
    let first = m1[sortBy];
    let second = m2[sortBy];
    if (sortBy === 'types') {
      first = first[0];
      second = second[0];
    } else if (sortBy === 'cost') {
      first = parseInt(`${m1.coins ? m1.coins : ''}${m1.potions ? 100 : ''}${m1.debt ? m1.debt.slice(0, -1) + '00000' : ''}` || 0)
      second = parseInt(`${m2.coins ? m2.coins : ''}${m2.potions ? 100 : ''}${m2.debt ? m2.debt.slice(0, -1) + '00000' : ''}` || 0)
      console.log(m1.name, first)
    }
    if (first < second) {
      return -1;
    } else if (first === second) {
      return 0;
    }
    return 1;
  });

  return (
    <div className="App">
      <img src={logo} alt="logo"/>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortBy={sortBy} setSortBy={setSortBy}/>
      <br/>
      <CardsDisplay data={sortedCards}/>
    </div>
  );
}

export default App;
