import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { EXPANSIONS, PROMOS } from '../lib/constants';
import Selector from './Selector';
import PropTypes from 'prop-types';
import { expansionAmtsType, expansionType, promoNameType } from '../lib/types';

export default function KingdomSettings({ expansions, promos, toggleExpansion, togglePromo, expansionAmts, setExpansionAmts }) {
	const [show, setShow] = useState(false);

  return (
    <>
			<Button variant="secondary" onClick={() => setShow(true)}>
        Adjust Kingdom Settings
      </Button>
      <Offcanvas show={show} onHide={() => setShow(false)} scroll>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
					<Selector
						list={expansions}
						toggle={toggleExpansion}
						options={EXPANSIONS}
						name="Expansions"
						adjustAmts
						expansionAmts={expansionAmts}
						setExpansionAmts={setExpansionAmts}
					/>
					<br/>
					<Selector list={promos} toggle={togglePromo} options={PROMOS} name="Promos" adjustAmts={false}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}


KingdomSettings.propTypes = {
	expansions: PropTypes.arrayOf(expansionType).isRequired,
	promos: PropTypes.arrayOf(promoNameType).isRequired,
	toggleExpansion: PropTypes.func.isRequired,
	togglePromo: PropTypes.func.isRequired,
	expansionAmts: expansionAmtsType.isRequired,
	setExpansionAmts: PropTypes.func.isRequired
}
