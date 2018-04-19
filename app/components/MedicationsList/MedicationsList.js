import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { List, Button } from 'react-native-elements'

import MedicationListItem from './MedicationListItem'
import styles from './styles'

const MedicationsList = ({ medications, onAddButtonPress, onMedicationPress }) => (
  <View>
    <List>
      { medications.map(medication => (
        <MedicationListItem
          key={medication.id}
          medication={medication}
          onItemPress={onMedicationPress}
        />
      )) }
    </List>
    <Button style={styles.addButton} title="Add Medication" onPress={onAddButtonPress} />
  </View>
)

MedicationsList.propTypes = {
  medications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAddButtonPress: PropTypes.func.isRequired,
  onMedicationPress: PropTypes.func.isRequired,
}

export default MedicationsList
