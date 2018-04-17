import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { Field } from 'redux-form'
import uuid from 'uuid-v4'

import FormInput from '../FormInput'

class NotificationFields extends Component {
  static propTypes = {
    fields: PropTypes.shape({}),
  }

  @autobind
  onAddButtonPress() {
    this.props.fields.push({})
  }

  @autobind
  onRemoveButtonPress(index) {
    this.props.fields.remove(index)
  }

  render() {
    const { fields } = this.props

    return (
      <View>
        <Button title="Add Notification" onPress={this.onAddButtonPress} />
        {fields.map((member, index) => (
          <View key={uuid()}>
            <Field
              name={`${member}.time`}
              component={FormInput}
            />
            <Button
              title="Remove Notification"
              onPress={() => this.onRemoveButtonPress(index)}
            />
          </View>
        ))}
      </View>
    )
  }
}

export default NotificationFields
