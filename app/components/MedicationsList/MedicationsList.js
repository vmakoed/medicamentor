import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { List, Button } from 'react-native-elements'

import MedicationListItem from './MedicationListItem'

const MedicationsList = ({ medications, onAddButtonPress, onMedicationPress }) => (
  <ScrollView>
    <List>
      { medications.map(medication => (
        <MedicationListItem
          key={medication.id}
          medication={medication}
          onItemPress={onMedicationPress}
        />
      )) }
    </List>
    <Button title="Add Medication" onPress={onAddButtonPress} />
  </ScrollView>
)

MedicationsList.propTypes = {
  medications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAddButtonPress: PropTypes.func.isRequired,
  onMedicationPress: PropTypes.func.isRequired,
}

export default MedicationsList
