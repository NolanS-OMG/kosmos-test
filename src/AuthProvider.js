import { createContext, useContext, useState } from "react";

import inputsFromJSON from './inputsFields.json';

const authContext = createContext();

const useProvideAuth = () => {

  const [inputsList, setInputsList] = useState(inputsFromJSON.fields);

    function putInputList(newInputList) {
        setInputsList(newInputList);
    }

    function deleteInput(index) {
      let newInputsList = [...inputsList]
      newInputsList.splice(index, 1);
      setInputsList(newInputsList);
    }

    function updateInput(index, newInput) {
      let newInputsList = [...inputsList]
      newInputsList.splice(index, 1, newInput);
      setInputsList(newInputsList);
    }

    function addInput(newInput) {
      let newInputsList = [...inputsList]
      newInputsList.push(newInput);
      setInputsList(newInputsList);
    }

    return {
        inputsList, putInputList, deleteInput, updateInput, addInput
    }
}

export const ProvideAuth = ({children, ...props}) => {
    const auth = useProvideAuth();

    return( <authContext.Provider value = {auth} {...props}> {children} </authContext.Provider> )
}

export const useAuth = () => useContext(authContext);