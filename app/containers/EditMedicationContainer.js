import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'

import { updateMedication, removeMedication } from '../bundles/medications'
import EditMedication from '../components/EditMedication'

const FORM_NAME = 'medication'

class EditMedicationContainer extends Component {
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
    const medication = navigation.getParam('medication', {})
    navigation.navigate('MedicationsList')
    dispatch(updateMedication({ id: medication.id, ...formValues }))
  }

  @autobind
  handleRemove() {
    const { dispatch, navigation } = this.props
    const medication = navigation.getParam('medication', {})
    navigation.navigate('MedicationsList')
    dispatch(removeMedication({ id: medication.id }))
  }

  render() {
    const medication = this.props.navigation.getParam('medication', {})

    return (
      <EditMedication
        medication={medication}
        handleSubmit={this.handleSubmit}
        handleRemove={this.handleRemove}
      />
    )
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues(FORM_NAME)(state),
})

export default connect(mapStateToProps)(EditMedicationContainer)
