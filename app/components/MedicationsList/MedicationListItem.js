import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import uuid from 'uuid-v4'

const renderNotification = notification => (
  <View key={uuid()}>
    <Text>{notification.time}</Text>
  </View>
)

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
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View>
          <Card
            title={medication.name}
          >
            {medication.notifications.map(renderNotification)}
          </Card>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default MedicationListItem
