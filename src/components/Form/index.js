import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './style.css';
import Input from '../Input';

const salaryBrackets = {
  bracket1: 'Less than 1.000',
  bracket2: '1.000 – 2.000',
  bracket3: '2.000 – 3.000',
  bracket4: '3.000 – 4.000',
  bigMoney: 'More than 4.000'
};

/**
 * A custom Form component that handles form validation errors.
 * It executes the form's checkValidity
 */
class Form extends React.PureComponent {
  /**
   * Define local component state in class constructor.
   * @param {object} props - Initial compoenent props
   */
  constructor(props) {
    super(props);

    this.state = {
      percentProgress: 0
    };

    this.fieldsets = [];
    this.fieldsetCount = 4;
    this.formData = [];

    this.addRef = this.addRef.bind(this);
    this.measureProgress = this.measureProgress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addRef(el) {
    this.fieldsets.push(el);
  }

  /**
   * The main function that validates the form and fills in the error messages.
   * Based on https://codepen.io/_arpy/pen/xYoyPW
   * @return {bool} - Returns a boolean showing if the form is valid for submission or not.
   */
  validate() {
    // this.formEl is a reference in the component to the form DOM element.
    const { formEl } = this;
    const formLength = this.fieldsets.length;

    /*
     * The checkValidity() method on a form runs the
     * html5 form validation of its elements and returns the result as a boolean.
     * It returns 'false' if at least one of the form elements does not qualify,
     * and 'true', if all form elements are filled with valid values.
     */
    if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        const fieldset = this.fieldsets[i];
        const elem = fieldset.querySelector('input');
        const errorLabel = fieldset.querySelector('.invalid-feedback');

        if (errorLabel) {
          /*
           * Each node in html5 form has a validity property.
           * It contains the validation state of that element.
           * The elem.validity.valid property indicates whether the element qualifies its validation rules or no.
           * If it does not qualify, the elem.validationMessage property will contain the localized validation error message.
           * We will show that message in our error container if the element is invalid, and clear the previous message, if it is valid.
           */
          if (!elem.validity.valid) {
            errorLabel.textContent = elem.validationMessage;
            errorLabel.setAttribute('aria-hidden', 'false');
          } else if (errorLabel.textContent) {
            errorLabel.textContent = '';
            errorLabel.setAttribute('aria-hidden', 'true');
          }
        }
      }

      // Return 'false', as the formEl.checkValidity() method found some invalid form inputs.
      return false;
    }

    // The form is valid, so we clear all the error messages
    for (let i = 0; i < formLength; i++) {
      const errorLabel = this.fieldsets[i].querySelector('.invalid-feedback');
      if (errorLabel) {
        errorLabel.textContent = '';
      }
    }

    // Return 'true', as the form is valid for submission
    return true;
  }

  /**
   * Check form completion progress by testing if input fields have values. Validity is not taken into
   * account at this point, only completedness.
   * @param {object} - form input element
   * @return {undefined}
   */
  measureProgress({ target: { validity, name, value, type } }) {
    let filledFieldsCount = 0;
    // strip out spacing characters from phone number
    this.formData[name] = type === 'tel' ? value.replace(/-|\s/g, '') : value;

    filledFieldsCount = Object.values(this.formData).filter(input => input.trim()).length;

    this.setState({
      percentProgress: (filledFieldsCount / this.fieldsetCount) * 100
    });
  }

  /**
   * Pass form data to next route as state.
   * It stops the default form submission process and proceeds with custom validation.
   * @param {object} event - Synthetic submit event
   * @return {undefined}
   */
  handleSubmit(event) {
    const { history } = this.props;

    event.preventDefault();

    if (this.validate()) {
      // passing form data as router state is the easiest way to send it to the summary page;
      // in a more complex app I would have used redux
      history.push({ pathname: '/summary', state: this.formData });
    }
  }

  /**
   * Render the component.
   * @return {node} - JSX node
   */
  render() {
    const { percentProgress } = this.state;
    const inputProps = {
      onBlur: this.measureProgress,
      addRef: this.addRef
    };

    return (
      <form
        noValidate
        ref={form => {
          this.formEl = form;
        }}
        onSubmit={this.handleSubmit}
      >
        <div className="progress-indicator">
          <div
            className={`progress-indicator__inner progress-indicator__inner--${percentProgress}`}
            aria-label={`form is ${percentProgress}% complete`}
            aria-live="polite"
          />
        </div>

        <Input name="fullname" label="Full name" type="text" {...inputProps} />
        <Input name="email" label="Email address" type="email" {...inputProps} />
        <Input
          name="phone"
          label="Phone number"
          type="tel"
          pattern="^\+?(\d|-|\s)+$"
          {...inputProps}
        />

        <fieldset className="input__wrap clearfix" ref={this.addRef}>
          {Object.keys(salaryBrackets).map((key, i) => (
            <label htmlFor={key} key={key} className="input__radio">
              <input
                type="radio"
                name="salary"
                id={key}
                value={key}
                className="input__field input__field--radio"
                aria-describedby="salary-error"
                onChange={this.measureProgress}
                required
              />
              <span className="input__label input__label--radio">{salaryBrackets[key]}</span>
            </label>
          ))}
          <div className="invalid-feedback" id="salary-error" aria-live="polite" />
        </fieldset>

        <button type="submit">submit</button>
      </form>
    );
  }
}

Form.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

export default withRouter(Form);
