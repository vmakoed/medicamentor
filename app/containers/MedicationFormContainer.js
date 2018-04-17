import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import MedicationForm from '../components/MedicationForm'

const FORM_NAME = 'medication'

const MedicationFormContainer = ({ handleSubmit }) => (
  <MedicationForm handleSubmit={handleSubmit} />
)

MedicationFormContainer.propTypes = {
  handleSubmit: PropTypes.func,
}

export default reduxForm({
  form: FORM_NAME,
})(MedicationFormContainer)
