import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

import MedicationFormContainer from '../../containers/MedicationFormContainer'

const EditMedication = ({ medication, handleSubmit, handleRemove }) => (
  <View>
    <MedicationFormContainer initialValues={medication} handleSubmit={handleSubmit} />
    <Button title="Remove medication" onPress={handleRemove} />
  </View>
)

EditMedication.propTypes = {
  medication: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default EditMedication
