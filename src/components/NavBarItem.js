import { Nav, Navbar } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import styles from '../styles/NavBarItem.module.css';
import classNames from 'classnames';

export default function NavBarItem({ label, isActive, onClick, icon }) {
	const isMobile = useMediaQuery({ maxWidth: 768 });

	return (
		<Nav.Item className={isMobile ? styles.iconOnly : styles.iconAndText}>
			<Nav.Link
				active={isActive}
				onClick={() => onClick()}
				className={classNames(styles.navLink, { [styles.activeLink]: isActive })}
			>
				{icon && (
					<IconContext.Provider value={{ size: '1.5em', style: { margin: 'auto' } }}>
						{icon}
					</IconContext.Provider>
				)}
				{!isMobile && <Navbar.Text className={styles.navText}>{label}</Navbar.Text>}
			</Nav.Link>
		</Nav.Item>
	)
}

NavBarItem.propTypes = {
	label: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.element
}
