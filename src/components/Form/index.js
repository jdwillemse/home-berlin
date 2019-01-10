import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Easy to internationalise
const errors = {
  general: {
    patternMismatch: "This input doesn't match the expected pattern",
    tooLong: 'This input is too long',
    tooShort: 'This input is too short',
    typeMismatch: 'This input is not of the right type',
    valueMissing: 'Please fill in this field'
  },
  email: {
    typeMismatch: 'This is not a valid email address'
  },
  tel: {
    patternMismatch: 'This is not a valid telephone number'
  },
  radio: {
    valueMissing: 'Please select one of these options'
  }
};

// const inputFields = {
//   fullname: {
//     type: 'text',
//     label: 'full name'
//   },
//   email: {
//     type: 'email',
//     label: 'email'
//   },
//   phone: {
//     type: 'tel',
//     label: 'phone'
//   }
// };

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
      // isValidated: false,
      percentProgress: 0
    };

    this.fieldsetCount = 4;
    this.completedFields = [];
    this.formData = [];

    this.handleBlur = this.handleBlur.bind(this);
  }

  /**
   * Them main function that validates the form and fills in the error messages.
   * @return {bool} - Returns a boolean showing if the form is valid for submission or not.
   */
  validate() {
    // this.formEl is a reference in the component to the form DOM element.
    const { formEl } = this;
    const formLength = formEl.length;

    /*
     * The checkValidity() method on a form runs the
     * html5 form validation of its elements and returns the result as a boolean.
     * It returns 'false' if at least one of the form elements does not qualify,
     * and 'true', if all form elements are filled with valid values.
     */
    if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        // the i-th child of the form corresponds to the forms i-th input element
        const elem = formEl[i];

        /*
         * errorLabel placed next to an element is the container we want to use
         * for validation error message for that element
         */
        const fieldset = elem.closest('fieldset');
        const errorLabel = fieldset && fieldset.querySelector('.invalid-feedback');

        /*
         * A form element contains also any buttuns contained in the form.
         * There is no need to validate a button, so we'll skip those nodes.
         */
        if (errorLabel && ['button', 'fieldset'].indexOf(elem.nodeName.toLowerCase()) < 0) {
          /*
           * Each note in html5 form has a validity property.
           * It contains the validation state of that element.
           * The elem.validity.valid property indicates whether the element qualifies its validation rules or no.
           * If it does not qualify, the elem.validationMessage property will contain the localized validation error message.
           * We will show that message in our error container if the element is invalid, and clear the previous message, if it is valid.
           */
          if (!elem.validity.valid) {
            let msg = '';
            // eslint-disable-next-line guard-for-in
            // console.log(elem.validity);
            for (const key in elem.validity) {
              if (elem.validity[key]) {
                msg = (errors[elem.type] && errors[elem.type][key]) || errors.general[key];
                break;
              }
            }

            errorLabel.textContent = msg || elem.validationMessage;
            errorLabel.setAttribute('aria-hidden', 'false');
          } else if (errorLabel.textContent) {
            errorLabel.textContent = '';
            errorLabel.setAttribute('aria-hidden', 'true');
          }
        }
      }

      // Return 'false', as the formEl.checkValidity() method said there are some invalid form inputs.
      return false;
    }

    // The form is valid, so we clear all the error messages
    for (let i = 0; i < formLength; i++) {
      const elem = formEl[i];
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && ['button', 'fieldset'].indexOf(elem.nodeName.toLowerCase()) < 0) {
        errorLabel.textContent = '';
      }
    }

    // Return 'true', as the form is valid for submission
    return true;
  }

  /** */
  handleBlur({ target: { validity, name, value, type, ...props } }) {
    const nameIndex = this.completedFields.indexOf(name);

    if (nameIndex < 0) {
      this.completedFields.push(name);
      // } else if (!validity.valid && nameIndex > -1) {
      //   this.completedFields.splice(nameIndex, 1);
    }

    if (validity.valid) {
      // strip out spacing characters from phone number
      this.formData[name] = type === 'tel' ? value.replace(/-|\s|\(|\)/g, '') : value;
    }

    this.setState({ percentProgress: (this.completedFields.length / this.fieldsetCount) * 100 });
  }

  /**
   * This is the method that is called on form submit.
   * It stops the default form submission process and proceeds with custom validation.
   * @param {object} event - Synthetic submit event
   * @return {undefined}
   */
  handleSubmit(event) {
    const { history } = this.props;
    event.preventDefault();

    // If the call of the validate method was successful, we can proceed with form submission. Otherwise we do nothing.
    console.log(this.validate(), this.formData);

    if (this.validate()) {
      history.push({ pathname: '/b', state: this.formData });
    }

    // this.setState({ isValidated: true });
  }

  /**
   * Render the component as a regular form element with appended children from props.
   * @return {node} - Rendferedd React node
   */
  render() {
    // const { onSubmit } = { ...this.props };
    const { percentProgress } = this.state;

    console.log('-----------', this.props);

    const salaryBrackets = {
      bracket1: 'Less than 1.000',
      bracket2: '1.000 – 2.000',
      bracket3: '2.000 – 3.000',
      bracket4: '3.000 – 4.000',
      bigMoney: 'More than 4.000'
    };

    return (
      <form
        noValidate
        ref={form => {
          this.formEl = form;
        }}
        onSubmit={event => this.handleSubmit(event)}
      >
        <div className="progress-indicator">
          <div className="progress-indicator__inner">{percentProgress} percent complete</div>
        </div>

        <fieldset>
          <label htmlFor="fullname">
            <div className="label">full name</div>
            <input
              type="text"
              id="fullname"
              name="fullname"
              aria-describedby="fullname-error"
              onBlur={this.handleBlur}
              required
            />
            <div className="invalid-feedback" id="fullname-error" aria-live="polite" />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="email">
            <div className="label">email</div>
            <input
              type="email"
              id="email"
              name="email"
              aria-describedby="email-error"
              onBlur={this.handleBlur}
              required
            />
            <div className="invalid-feedback" id="email-error" aria-live="polite" />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="phone">
            <div className="label">phone</div>
            <input
              type="tel"
              id="phone"
              name="phone"
              aria-describedby="phone-error"
              pattern="^\+?(\d|-|\s)+$"
              onBlur={this.handleBlur}
              required
            />
            <div className="invalid-feedback" id="phone-error" aria-live="polite" />
          </label>
        </fieldset>
        <fieldset>
          {Object.keys(salaryBrackets).map((key, i) => (
            <label htmlFor={key} key={key}>
              <input
                type="radio"
                name="salary"
                id={key}
                value={key}
                aria-describedby="salary-error"
                onChange={this.handleBlur}
                required
              />
              <span className="label">{salaryBrackets[key]}</span>
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
// Form.defaultProps = {
//   lang: 'is'
// };

export default withRouter(Form);
