import PropTypes from 'prop-types';
import './Switch.css';

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
export default function Switch({id, name, value, enabled}) {
    return (
        <label class="switch">
            <input type="checkbox" id={id} name={name} value={value} disabled={!enabled} />
            <span class="slider round"></span>
        </label>
    );
};

Switch.propTypes = {
    enabled: PropTypes.bool
};

Switch.defaultProps = {
    id: 'test',
    name: 'name',
    value: 'value',
    enabled: true
};