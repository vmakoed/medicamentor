import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { ListItem } from 'react-native-elements'

class MedicationListItem extends Component {
  static propTypes = {
    medication: PropTypes.shape({}).isRequired,
    onItemPress: PropTypes.func.isRequired,
  }

  @autobind
  onPress() {
    const { medication, onItemPress } = this.props
    onItemPress(medication)
  }

  render() {
    const { medication } = this.props

    return (
      <ListItem
        title={medication.name}
        onPress={this.onPress}
      />
    )
  }
}

export default MedicationListItem
