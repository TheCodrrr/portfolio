import './App.css';
import MainContent from './MainContent';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { UIProvider } from './context/UIContext';
import { BrowserRouter } from 'react-router-dom';
import useWindowWidth from './hooks/windowWidthHook';

function App() {
  const width = useWindowWidth();

  return (

    <BrowserRouter>
      <UIProvider>
        <div className="min-h-screen w-full m-0 p-0 flex">

          { width > 770 ? (
            <Sidebar />
          ) : null }

          <div className={`left_container fixed top-0 ${width > 770 ? "left-[3.75rem] w-[calc(100vw-3.75rem)]" : "left-0 w-[100vw]"} flex-col`}>
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
