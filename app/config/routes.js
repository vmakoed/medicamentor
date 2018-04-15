import { StackNavigator } from 'react-navigation'

import MedicationsList from '../containers/MedicationsListContainer'
import AddMedication from '../containers/AddMedicationContainer'

export default StackNavigator({
  MedicationsList: {
    screen: MedicationsList,
    navigationOptions: {
      title: 'Medications',
    },
  },
  AddMedication: {
    screen: AddMedication,
    navigationOptions: {
      title: 'Add Medication',
    },
  },
})
