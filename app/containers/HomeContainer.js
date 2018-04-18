import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { loadMedications } from '../bundles/medications'

const resetNavigationAction = destination => (
  NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: destination }),
    ],
  })
)

class HomeContainer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }),
    dispatch: PropTypes.func,
    medicationsLoaded: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(loadMedications())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.medicationsLoaded) {
      this.props.navigation.dispatch(resetNavigationAction('MedicationsList'))
    }
  }

  render() {
    return (
      <View>
        <Text>Please wait while medications are being loaded...</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  medicationsLoaded: state.medications.loaded,
})

export default connect(mapStateToProps)(HomeContainer)
