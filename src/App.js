import { RouterProvider } from 'react-router-dom';
import './App.css';
import { routes } from './Routes/Routes/Routes';
import 'react-day-picker/dist/style.css'; 
import {Toaster} from 'react-hot-toast';
function App() {
  return (
    <div className='max-w-[1440px] mx-auto ' >
      <RouterProvider  router={routes} >
      </RouterProvider>
    </div>
  );
}

export default App;
