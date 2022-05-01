import { useEffect, useState } from 'react';

import { RatioInput, SelectInput, TextInput } from './InputType';
import { useAuth } from '../AuthProvider';

const InputsCreator = () => {

  const updateFunc = (field, value) => {
    let newInputClone = {...newInput};
    newInputClone[field] = value;
    setNewInput(newInputClone);
  }

  const submit = (event) => {
    event.preventDefault();
    let newInputClone = {...newInput};
    if (newInput.type === 'select' || newInput.type === 'radio') {
      newInputClone.field = {field: newInput.field, options: options}
    }
    addInput(newInputClone);
    setNewInput({ type:'text', field:'', label:'', isRequired:'', value:'' });
  }

  const { addInput } = useAuth();

  const [newInput, setNewInput] = useState({ type:'text', field:'', label:'', isRequired:'', value:'' });

  const [displayOptions, setDisplayOptions] = useState(false);

  const [options, setOptions] = useState( [{label:'', value:''}, {label:'', value:''}] );
  const [optionsCopy, setOptionsCopy] = useState( [{label:'', value:''}, {label:'', value:''}] );

  const optionsInputs = optionsCopy.map( (option, index) => {
    const updateFunc = (i, value) => {
      let newOptions = [...options];
      if (i < options.length) {
        newOptions[i].value = value;
        newOptions[i].label = value;
        setOptions(newOptions);
      } else {
        for (let j = 0; j <= (i + 1 - options.length); j++) {
          newOptions.push({label:'', value:''});
        }
        setOptions(newOptions);
      }
    }
    return (
      <InputsOfOptions key={`${index+1}: ${option.value}`} index={index} updateFunc={updateFunc}/>
    )
  } )

  useEffect( () => {
    if (newInput.type === 'select' || newInput.type === 'radio') {
      setDisplayOptions(true);
    } else if (newInput.type === 'text') {
      setDisplayOptions(false);
    }
  }, [newInput] )

  return (
      <form onSubmit={submit}>
        <h4>Introduzca los 'inputs' de su form</h4>
        <TextInput 
          field = 'field'
          label = 'Inserte el campo del formulario'
          isRequired = {true}
          updateFunc = {updateFunc}
          value = {newInput.field}
        />
        <TextInput 
          field = 'label'
          label = 'Inserte el texto a mostrar del formulario'
          isRequired = {true}
          updateFunc = {updateFunc}
          value = {newInput.label}
        />
        <SelectInput
          field = {
            {
              field:'type', 
              options:[
                {value:'text', label:'Texto'}, 
                {value:'select', label:'Select'},
                {value:'radio', label:'Radio'}
              ]
            }
          }
          label = 'Elija el tipo de campo'
          updateFunc = {updateFunc}
          value = {newInput.type}
        />
        <div className='add-options'
          style={{display:`${displayOptions ? 'block' : 'none' }`}}
        >
          {optionsInputs}

          <div className='add-quit-buttons'>
            <button type='button' onClick={() => {
              let newOptions = [...options]
              newOptions.push({label:'', value:''});
              setOptionsCopy(newOptions);
            }}>Añadir</button>

            <button type='button' onClick={() => {
              if (options.length > 2) {
                let newOptions = [...options]
                newOptions.pop();
                setOptionsCopy(newOptions);
              }
            }}>Quitar</button>
          </div>
        </div>
        <RatioInput
          field = {
            {
              field:'isRequired', 
              options:[
                {value:'true', label:'Sí'}, 
                {value:'false', label:'No'}
              ]
            }
          }
          label = '¿El campo debería de ser obligatorio?'
          updateFunc = {updateFunc}
          value = {newInput.isRequired}
        />
        <input type='submit' value='Crear nuevo input' className='submit-button'/>
      </form>
  )
}

const InputsOfOptions = ( { index, updateFunc } ) => {
  
  const [optionValue, setOptionValue] = useState('');

  useEffect( () => {
    updateFunc(index, optionValue);
  }, [optionValue, updateFunc, index] );
    
    return (
      <div className='input'>
        <label>Opción {index+1}: </label>
        <input value={optionValue} onChange={(e) => {
          setOptionValue(e.target.value);
        }} />
      </div>
    )
} 

export default InputsCreator