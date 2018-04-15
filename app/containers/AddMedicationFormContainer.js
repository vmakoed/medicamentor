import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'

import MedicationForm from '../components/AddMedication'
import { addMedication } from '../bundles/medications'

const FORM_NAME = 'addMedication'

class AddMedicationFormContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    formValues: PropTypes.shape({}),
    navigationCallback: PropTypes.func.isRequired,
  }

  @autobind
  handleSubmit() {
    const { dispatch, formValues, navigationCallback } = this.props
    navigationCallback()
    dispatch(addMedication({ ...formValues }))
  }

  render() {
    return (
      <MedicationForm handleSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues(FORM_NAME)(state),
})

export default connect(mapStateToProps)(reduxForm({
  form: FORM_NAME,
})(AddMedicationFormContainer))
