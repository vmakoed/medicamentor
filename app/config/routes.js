import { StackNavigator } from 'react-navigation'

import MedicationsList from '../containers/MedicationsListContainer'
import AddMedication from '../containers/AddMedicationContainer'
import EditMedication from '../containers/EditMedicationContainer'

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
  EditMedication: {
    screen: EditMedication,
    navigationOptions: {
      title: 'Edit Medication',
    },
  },
})
