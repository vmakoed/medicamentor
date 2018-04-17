import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'

import MedicationsList from '../components/MedicationsList'

class MedicationsListContainer extends Component {
  static propTypes = {
    medications: PropTypes.arrayOf(PropTypes.shape({})),
    navigation: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    medications: [],
  }

  @autobind
  navigateToAddMedication() {
    const { navigation } = this.props
    navigation.navigate('AddMedication')
  }

  @autobind
  navigateToEditMedication(medication) {
    const { navigation } = this.props
    navigation.navigate('EditMedication', { medication })
  }

  render() {
    const { medications } = this.props

    return (
      <MedicationsList
        medications={medications}
        onAddButtonPress={this.navigateToAddMedication}
        onMedicationPress={this.navigateToEditMedication}
      />
    )
  }
}

const mapStateToProps = state => ({
  medications: state.medications.medications,
})

export default connect(mapStateToProps)(MedicationsListContainer)
