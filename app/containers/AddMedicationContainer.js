import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { getFormValues, reset } from 'redux-form'

import MedicationFormContainer from './MedicationFormContainer'
import { addMedication } from '../bundles/medications'

const FORM_NAME = 'medication'

class AddMedicationContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    formValues: PropTypes.shape({}),
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  @autobind
  handleSubmit() {
    const { dispatch, formValues, navigation } = this.props
    navigation.navigate('MedicationsList')
    dispatch(reset(FORM_NAME))
    dispatch(addMedication({ ...formValues }))
  }

  render() {
    return (
      <MedicationFormContainer handleSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues(FORM_NAME)(state),
})

export default connect(mapStateToProps)(AddMedicationContainer)
