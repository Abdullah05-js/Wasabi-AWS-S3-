import './App.css';
import Main from './Componets/Main/Main';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' exec element={<Main />}>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
