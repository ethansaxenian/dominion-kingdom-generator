import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import styles from '../styles/SearchBar.module.css';
import classNames from 'classnames';

export default function SearchBar({ searchTerm, setSearchTerm, sortBy, setSortBy, displayed, toggleDisplayType }) {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	return (
		<>
			<Row xs="1" md="2" className={styles.formRow}>
				<Col>
					<Form.Control
						value={searchTerm}
						placeholder="Search"
						onChange={(event) => setSearchTerm(event.target.value)}
						className={classNames(styles.searchInput, { [styles.mobileSearchInput]: isMobile })}
					/>
				</Col>
				<Col>
					<InputGroup className={classNames(styles.sortSelector, { [styles.mobileSortSelector]: isMobile })}>
						<InputGroup.Text>Sort by: </InputGroup.Text>
						<Form.Select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
							<option value="name">Name</option>
							<option value="expansion">Expansion</option>
							<option value="cost">Cost</option>
						</Form.Select>
					</InputGroup>
				</Col>
			</Row>
			<div className={styles.checkboxes}>
				{['Supply', 'Non-supply', 'Landscape'].map((type) => (
					<Form.Check
						inline={!isMobile}
						checked={displayed.includes(type)}
						key={type}
						label={type}
						type="switch"
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
