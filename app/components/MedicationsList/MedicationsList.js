import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { List, ListItem, Button } from 'react-native-elements'

const renderMedication = medication => (
  <ListItem
    key={medication.id}
    title={medication.name}
  />
)

const MedicationsList = ({ medications, onAddButtonPress }) => (
  <View>
    <List>
      { medications.map(renderMedication) }
    </List>
    <Button title="Add Medication" onPress={onAddButtonPress} />
  </View>
)

MedicationsList.propTypes = {
  medications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAddButtonPress: PropTypes.func.isRequired,
}

MedicationsList.defaultProps = {
  medications: [],
}

export default MedicationsList
