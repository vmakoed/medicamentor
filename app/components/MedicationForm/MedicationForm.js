import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Field } from 'redux-form'
import { Button } from 'react-native-elements'

import FormInput from '../FormInput'

const MedicationForm = ({ handleSubmit }) => (
  <View>
    <Field
      name="name"
      component={FormInput}
    />
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
