import './styles/App.css';
import data from './data/dominion_cards.json';
import { useState } from 'react';
import CardSearcher from './components/CardSearcher';
import NavBar from './components/NavBar';
import KingdomGenerator from './components/KingdomGenerator';
import { Card } from 'react-bootstrap';

function App() {
  const [cards] = useState(data);
  const [page, setPage] = useState('generate');

  return (
    <div className="App">
      <img src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" className="logo"/>
			<Card style={{width: "75%", margin: "auto"}}>
				<Card.Header>
					<NavBar page={page} setPage={setPage}/>
				</Card.Header>
				<Card.Body>
					{(page === 'generate') && <KingdomGenerator cards={cards}/>}
					{(page === 'browse') && <CardSearcher cards={cards}/>}
				</Card.Body>
			</Card>
    </div>
  );
}

export default App;
