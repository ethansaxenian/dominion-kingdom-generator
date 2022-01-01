import PropTypes from 'prop-types';
import { HStack, Input, InputGroup, InputLeftAddon, Select, Stack, Switch, Text } from '@chakra-ui/react';

export default function SearchBar({ searchTerm, setSearchTerm, sortBy, setSortBy, displayed, toggleDisplayType }) {

	return (
		<>
			<Stack direction={{base: 'column', md: 'row'}} justify="space-evenly" w={{base: 'fit-content', md: '75%'}} p="30px">
				<Input
					value={searchTerm}
					placeholder="Search"
					onChange={(event) => setSearchTerm(event.target.value)}
					w="250px"
				/>
				<InputGroup w="250px">
					<InputLeftAddon>Sort by:</InputLeftAddon>
					<Select value={sortBy} onChange={(event) => setSortBy(event.target.value)} borderLeftRadius="none">
						<option value="name">Name</option>
						<option value="expansion">Expansion</option>
						<option value="cost">Cost</option>
					</Select>
				</InputGroup>
			</Stack>
			<Stack direction={{base: 'column', md: 'row'}} spacing={{base: '5px', md: '20px'}}>
				{['Supply', 'Non-supply', 'Landscape'].map((type) => (
					<HStack key={type}>
						<Switch isChecked={displayed.includes(type)} onChange={() => toggleDisplayType(type)}/>
						<Text pl="10px">{type}</Text>
					</HStack>
				))}
			</Stack>
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
