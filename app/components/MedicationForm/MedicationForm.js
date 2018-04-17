import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Field, FieldArray } from 'redux-form'
import { Button } from 'react-native-elements'

import FormInput from '../FormInput'
import NotificationFields from './NotificationFields'

const MedicationForm = ({ handleSubmit }) => (
  <View>
    <Field
      name="name"
      component={FormInput}
    />
    <FieldArray name="notifications" component={NotificationFields} />
    <Button
      title="Save"
      onPress={handleSubmit}
    />
  </View>
)

MedicationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default MedicationForm
