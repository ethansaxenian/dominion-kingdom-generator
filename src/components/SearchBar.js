import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

export default function SearchBar({ searchTerm, setSearchTerm, sortBy, setSortBy, displayed, toggleDisplayType }) {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	return (
		<>
			<Row xs="1" md="2" style={{alignItems: 'center', justifyContent: 'center', marginBottom: 25}}>
				<Col style={{marginBottom: isMobile && 15}}>
					<Form.Control
						value={searchTerm}
						placeholder="Search"
						onChange={(event) => setSearchTerm(event.target.value)}
						style={{width: 210, margin: 'auto', float: !isMobile && 'right'}}
					/>
				</Col>
				<Col>
					<InputGroup style={{width: 210, margin: 'auto', float: !isMobile && 'left'}}>
						<InputGroup.Text>Sort by: </InputGroup.Text>
						<Form.Select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
							<option value="name">Name</option>
							<option value="expansion">Expansion</option>
							<option value="cost">Cost</option>
						</Form.Select>
					</InputGroup>
				</Col>
			</Row>
			<div style={{width: 'fit-content', margin: 'auto'}}>
				{['Supply', 'Non-supply', 'Landscape'].map((type) => (
					<Form.Check
						inline={!isMobile}
						checked={displayed.includes(type)}
						key={type}
						label={type}
						onChange={() => toggleDisplayType(type)}
					/>
				))}
			</div>
		</>
	)
}


SearchBar.propTypes = {
	searchTerm: PropTypes.string.isRequired,
	setSearchTerm: PropTypes.func.isRequired,
	sortBy: PropTypes.oneOf(['name', 'expansion', 'cost']).isRequired,
	setSortBy: PropTypes.func.isRequired,
	displayed: PropTypes.arrayOf(PropTypes.oneOf(['Supply', 'Non-supply', 'Landscape'])).isRequired,
	toggleDisplayType: PropTypes.func.isRequired
}
