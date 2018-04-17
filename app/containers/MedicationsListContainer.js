import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import isEqual from 'lodash/isEqual'
import { Permissions } from 'expo'

import { setupNotifications } from '../bundles/medications'
import MedicationsList from '../components/MedicationsList'

class MedicationsListContainer extends Component {
  static propTypes = {
    medications: PropTypes.arrayOf(PropTypes.shape({})),
    navigation: PropTypes.shape({}).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    medications: [],
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.NOTIFICATIONS)
  }

  componentWillReceiveProps(nextProps) {
    const { medications, dispatch } = this.props
    if (!isEqual(nextProps.medications, medications)) {
      dispatch(setupNotifications())
    }
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
