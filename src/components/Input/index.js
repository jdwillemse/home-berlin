import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input component that can be resused for diffent input types.
 * It executes the form's checkValidity
 */
class Input extends React.PureComponent {
  /**
   * Render the component.
   * @return {node} - JSX node
   */
  render() {
    const { name, label, addRef, ...props } = this.props;

    return (
      <fieldset className="input__wrap clearfix" ref={addRef}>
        <label htmlFor={name}>
          <div className="input__label">{label}</div>
          <input
            {...props}
            id={name}
            name={name}
            className="input__field"
            aria-describedby={`${name}-error`}
            required
          />
          <div className="invalid-feedback" id={`${name}-error`} aria-live="polite" />
        </label>
      </fieldset>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  addRef: PropTypes.func.isRequired
};

export default Input;
