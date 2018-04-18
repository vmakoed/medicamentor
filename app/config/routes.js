import { StackNavigator } from 'react-navigation'

import Home from '../containers/HomeContainer'
import MedicationsList from '../containers/MedicationsListContainer'
import AddMedication from '../containers/AddMedicationContainer'
import EditMedication from '../containers/EditMedicationContainer'

export default StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Medicamentor',
    },
  },
  MedicationsList: {
    screen: MedicationsList,
    navigationOptions: {
      title: 'Medications',
      headerLeft: null,
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
