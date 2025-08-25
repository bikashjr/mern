import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const response = await fetch("http://localhost:5001");
    const data = await response.json();
    setMessage(data);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);


  return <h1>{message}</h1>;
}

export default App;
