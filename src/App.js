import InputsContainer from './Components/InputsContainer.js'
import InputsCreator from './Components/InputsCreator.js';

function App() {
  return (
    <div className='container'>
      <h1>Crea tu propio form</h1>
      <InputsCreator/>
      <InputsContainer/>
    </div>
  );
}

export default App;
