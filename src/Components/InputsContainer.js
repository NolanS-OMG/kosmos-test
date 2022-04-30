import { useState } from 'react';

import { RatioInput, SelectInput, TextInput } from './InputType';
import { useAuth } from '../AuthProvider';

const InputsContainer = () => {

  const stringToBool = (str) => {
    if (str) {
      if (str === 'true') {
        return true
      } else if (str === 'false') {
        return false
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }

  const updateFunc = (field, value) => {
    let newInputsList = [...inputsList];
    newInputsList[field.index]['value'] = value;
    putInputList(newInputsList);
  }

  const submit = (event) => {
    event.preventDefault();
    let newData = [...data];
    newData.push([]);
    for (let i=0; i<inputsList.length; i++){
      newData[newData.length-1].push({field: inputsList[i].field, value: inputsList[i].value});
    };
    setData(newData);
  }

  const { inputsList, putInputList } = useAuth();

  const [data, setData] = useState([]);

  const results = data.map( (entries, index1) => {
    const rows = entries.map( (entry, index2) => {
      return (
        <p key={`Dato ${index1+1}, entrada ${index2+1}`}>{entry.field}: {entry.value}</p>
      )
    } )
    return (
      <li key={`Entrega de datos ${index1+1}`}>
        {rows}
        <button type='button' onClick={() => {
          let newData = [...data];
          newData.splice(index1, 1);
          setData(newData);
        }}>Eliminar</button>
      </li>
    )
  } )

  const showInputs = inputsList.map( (input, index) => {
    if (input.type === 'text') {
      return (
        <div className='created-input' key = {`${index}: ${input.field}`}>
          <TextInput 
            field = {{index:index, field:input.field}}
            label = {input.label}
            isRequired = {stringToBool(input.isRequired)}
            value = {input.value}
            updateFunc = {updateFunc} 
          />
          <button type='button' onClick={() => {
            let newInputsList = [...inputsList];
            newInputsList.splice(index, 1);
            putInputList(newInputsList);
          }}>Eliminar</button>
        </div>
      )
    } else if (input.type === 'select') {
      return (
        <div className='created-input' key = {`${index}: ${input.field.field}`}>
          <SelectInput
            field = {input.field}
            label = {input.label}
            updateFunc = {updateFunc}
            value = {input.type}
          />
          <button type='button' onClick={() => {
            let newInputsList = [...inputsList];
            newInputsList.splice(index, 1);
            putInputList(newInputsList);
          }}>Eliminar</button>
        </div>
      )
    }
    else if (input.type === 'radio') {
      return (
        <div className='created-input created-radio-input' key = {`${index}: ${input.field.field}`}>
          <RatioInput
          field = {input.field}
          label = {input.label}
          updateFunc = {updateFunc}
          value = {input.type}
          />
          <button type='button' onClick={() => {
            let newInputsList = [...inputsList];
            newInputsList.splice(index, 1);
            putInputList(newInputsList);
          }}>Eliminar</button>
        </div>
      )
    }
    return []
  } )

  return (
      <form onSubmit={submit}>
        <h4>Aquí puede ver sus resultados</h4>
        {showInputs}
        <input type='submit' value='Entregar datos' className='submit-button' />
        <ul className='results-container'>
          {results}
        </ul>
      </form>
  )
}

export default InputsContainer