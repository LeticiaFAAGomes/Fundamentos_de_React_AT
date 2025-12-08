import "./assets/css/App.css";
import Header from "./components/header/Header";
import EnvironmentCard from "./components/header/environmentCard/EnvironmentCard";

function App() {
  const monitoramentoAmbiental = [
    {
      id: 1,
      location: "São Paulo",
      condition: "Condição Crítica",
      isActive: false,
      lastUpdate: "02/12/2025",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eius vitae eligendi ut provident illo, quisquam, unde earum cumque magnam tenetur, ipsam distinctio ad quo aspernatur. Iste exercitationem natus earum!",
    },
    {
      id: 2,
      location: "Chapada Diamantina",
      condition: "Condição Boa",
      isActive: true,
      lastUpdate: "08/12/2025",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eius vitae eligendi ut provident illo, quisquam, unde earum cumque magnam tenetur, ipsam distinctio ad quo aspernatur. Iste exercitationem natus earum!",
    },
  ];

  return (
    <div className='App'>
      <Header />
      <main>
        <div className='container'>
          {monitoramentoAmbiental.map((dado, index) => {
            return <EnvironmentCard dado={dado} key={index} />;
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
