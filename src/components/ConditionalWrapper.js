import PropTypes from 'prop-types';

export default function ConditionalWrapper({ condition, wrapper, children }) {
  return condition ? wrapper(children) : children;
}

ConditionalWrapper.propTypes = {
  condition: PropTypes.bool.isRequired,
  wrapper: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
