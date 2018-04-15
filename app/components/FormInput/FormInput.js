import React from 'react'
import PropTypes from 'prop-types'
import { FormInput as InputComponent } from 'react-native-elements'

const FormInput = ({ input, ...inputProps }) => (
  <InputComponent
    {...inputProps}
    onChangeText={input.onChange}
    onBlur={input.onBlur}
    onFocus={input.onFocus}
    value={input.value}
  />
)

FormInput.propTypes = {
  input: PropTypes.shape({}).isRequired,
}

export default FormInput
