import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

import AddMedicationFormContainer from './AddMedicationFormContainer'

class AddMedicationContainer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  }

  @autobind
  navigateToMedications() {
    this.props.navigation.navigate('MedicationsList')
  }

  render() {
    return (
      <AddMedicationFormContainer navigationCallback={this.navigateToMedications} />
    )
  }
}

export default AddMedicationContainer
