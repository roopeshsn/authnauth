import React, { useState } from "react"

export default function FormInput(props) {
  const [focus, setFocus] = useState(false)
  const { id, label, errorMessage, textColor, ...inputProps } = props

  function handleBlur(e) {
    setFocus(true)
  }

  return (
    <div className="form-group mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="peer shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        onBlur={handleBlur}
        onFocus={() => inputProps.name == "confirmPassword" && setFocus(true)}
        focus={focus.toString()}
        {...inputProps}
      ></input>
      <span className={`text-sm ${textColor}`}>{errorMessage}</span>
    </div>
  )
}

// hidden peer-invalid:block
