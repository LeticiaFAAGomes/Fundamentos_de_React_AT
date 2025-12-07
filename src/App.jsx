import "./assets/css/App.css";
import Header from "./components/header/Header";
import EnvironmentCard from "./components/header/environmentCard/EnvironmentCard";

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <div className='container'>
          <EnvironmentCard location='São Paulo' condition='Condição Crítica' isActive={false} />
          <EnvironmentCard location='Chapada Diamantina' condition='Condição Boa' isActive={true} />
        </div>
      </main>
    </div>
  );
}

export default App;
