import "./App.css";
import React from "react";
import DropDown from "./DropDown/DropDown";
import Footer from "./Footer/Footer";
function App() {
  const API = [
    {
      id: "winc8sncis",
      label: "Tag",
      type: "multi",
      options: [
        "Oliver Hansen",
        "Van Henry",
        "April Tucker",
        "Ralph Hubbard",
        "Anja Greenwood",
        "Viola Ritter",
        "Keavy Rhodes",
        "Macauly Chadwick",
      ],
      size: "lg",
    },
    {
      id: "kscn28ndak",
      label: "Age",
      type: "single",
      options: ["Twenty", "Twenty one", "Twenty one and a half"],
      size: "md",
    },
  ];

  return (
    <div className="App">
      {API.map((dropdown) => (
        <DropDown
          key={dropdown.id}
          id={dropdown.id}
          label={dropdown.label}
          type={dropdown.type}
          options={dropdown.options}
          size={dropdown.size}
        />
      ))}
       <Footer />
    </div>
  );
}

export default App;
