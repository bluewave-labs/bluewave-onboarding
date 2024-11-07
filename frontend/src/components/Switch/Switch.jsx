import PropTypes from "prop-types";
import "./Switch.css";

/**
 * Switch components for both HRM and Onboarding applications.
 *
 * Props:
 * - id<String>: Standard input id attribute
 *
 * - name<String>: Standard input name attribute
 *
 * - value<String>: Standard input value attribute
 */
export default function Switch({ id, name, value, enabled, onChange }) {
  return (
    <label className='switch' htmlFor={id}>
      <input
        type='checkbox'
        id={id}
        name={name}
        value={value}
        disabled={!enabled}
        checked={value}
        onChange={onChange}
      />
      <span className='slider round'></span>
    </label>
  );
}

Switch.propTypes = {
  enabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};
