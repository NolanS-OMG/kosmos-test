const TextInput = ({field, label, isRequired=false, updateFunc, value}) => {

  return (
    <div className="input">
      <label>{label}: </label>
      <input 
      onChange={(e) => {
        updateFunc(field, e.target.value);
      }}
      value={value}
      required={isRequired} 
      />
    </div>
  )
}

const SelectInput = ({field, label, isRequired=false, updateFunc, value}) => {

  const options = field.options.map( (option,index) => {
    return (
      <option key={`${index}: ${option.value}`} value={option.value}>{option.label}</option>
    )
  } )

  return (
    <div className="input">
      <label>{label}: </label>
      <select required={isRequired} onChange={(e) => {
        updateFunc(field.field, e.target.value);
      }}>
        {options}
      </select>
    </div>
  )
}

const RatioInput = ({field, label, isRequired=false, updateFunc, value}) => {

  const options = field.options.map( (option,index) => {
    return (
      <div key={`${index}: ${option.value}`}>
        <input type='radio' name={field.field} value={option.value} onChange={(e) => {
          updateFunc(field.field, e.target.value);
        }}/>
        <label>{option.label}</label>
      </div>
    )
  } )

  return (
    <div className="radio-input">
      <label>{label}</label>
      {options}
    </div>
  )
}

export { TextInput, SelectInput, RatioInput }