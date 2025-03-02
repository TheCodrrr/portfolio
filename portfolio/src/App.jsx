import './App.css';
import MainContent from './MainContent';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { UIProvider } from './context/UIContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
      <UIProvider>
        <div className="min-h-screen w-full m-0 p-0 flex">
          <Sidebar />
          <div className="left_container fixed top-0 left-[3.75rem] flex-col w-[calc(100vw-3.75rem)]">
            <Navbar />
            {/* Page content starts here */}
            <MainContent />
          </div>
        </div>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;
