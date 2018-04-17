import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'

import MedicationFormContainer from './MedicationFormContainer'
import { updateMedication } from '../bundles/medications'

const FORM_NAME = 'medication'

class AddMedicationContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    formValues: PropTypes.shape({}),
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }),
  }

  @autobind
  handleSubmit() {
    const { dispatch, formValues, navigation } = this.props
    const medication = this.props.navigation.getParam('medication', {})
    navigation.navigate('MedicationsList')
    dispatch(updateMedication({ id: medication.id, ...formValues }))
  }

  render() {
    const medication = this.props.navigation.getParam('medication', {})

    return (
      <MedicationFormContainer initialValues={medication} handleSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues(FORM_NAME)(state),
})

export default connect(mapStateToProps)(AddMedicationContainer)
