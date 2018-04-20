import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Field } from 'redux-form'
import uuid from 'uuid-v4'

import FormInput from '../FormInput'

class NotificationFields extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      push: PropTypes.func,
      remove: PropTypes.func,
    }).isRequired,
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
      <ScrollView>
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
      </ScrollView>
    )
  }
}

export default NotificationFields
