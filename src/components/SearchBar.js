import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchBar({ searchTerm, setSearchTerm, sortBy, setSortBy }) {
  return (
    <Row>
      <Col
        xs={{span: 'auto', offset: 1}}
        sm={{span: 'auto', offset: 2}}
        md={{span: 'auto', offset: 3}}
        lg={{span: 'auto', offset: 4}}
      >
        <Form.Control
          value={searchTerm}
          placeholder="Search"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </Col>
      <Col xs={{span: 'auto', offset: 1}} sm={{span: 'auto', offset: 0}}>
        <InputGroup>
          <InputGroup.Text>Sort by: </InputGroup.Text>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="name">Name</option>
            <option value="expansion">Expansion</option>
            <option value="cost">Cost</option>
          </select>
        </InputGroup>
      </Col>
    </Row>
  )
}


SearchBar.propTypes = {
	searchTerm: PropTypes.string.isRequired,
	setSearchTerm: PropTypes.func.isRequired,
	sortBy: PropTypes.oneOf(['name', 'expansion', 'cost']).isRequired,
	setSortBy: PropTypes.func.isRequired
}
