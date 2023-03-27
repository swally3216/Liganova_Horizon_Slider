import Slider from "./components/Slider"

function App() {
  return (
    <div>
      <Slider min={0} max={99} step={11}/>
      <Slider min={0} max={80}/>
    </div>
  );
}

export default App;
