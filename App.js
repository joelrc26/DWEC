import React, { useState } from "react";
import PlanSemanal from "./PlanSemanal";

function App() {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [diasFestivos, setDiasFestivos] = useState([]);
  const [horasDiarias, setHorasDiarias] = useState([0, 0, 0, 0, 0]);
  const [horasTotales, setHorasTotales] = useState(0);

  const handleFechaInicioChange = (e) => {
    const date = new Date(e.target.value);
    setFechaInicio(date);
  };

  const handleDiasFestivosChange = (e) => {
    const days = e.target.value.split(",");
    setDiasFestivos(days);
  };

  const handleHorasTotalesChange = (e) => {
    const hours = parseInt(e.target.value);
    setHorasTotales(hours);
  };

  const calculateFechaFinal = () => {
    const diasTrabajo = 5 - diasFestivos.length;
    const horasTrabajo = horasDiarias.reduce((acc, cur) => acc + cur, 0);
    const diasAprox = Math.ceil(horasTotales / horasTrabajo);
    const fechaFinal = new Date(fechaInicio);
    fechaFinal.setDate(fechaFinal.getDate() + diasAprox + diasTrabajo - 1);
    return fechaFinal;
  };

  return (
    <div>
      <h1>Cálculo del Plan Semanal</h1>

      <label htmlFor="start-date">Fecha de inicio: </label>
      <input type="date" id="start-date" onChange={handleFechaInicioChange} />

      <br />

      <label htmlFor="non-working-days">Dias de la semana que no se trabaja: </label>
      <input
        type="text"
        id="non-working-days"
        onChange={handleDiasFestivosChange}
      />

      <br />

      <label htmlFor="total-hours">Horas totales: </label>
      <input
        type="number"
        id="total-hours"
        min="0"
        onChange={handleHorasTotalesChange}
      />

      <br />

      <PlanSemanal
        fechaInicio={fechaInicio}
        diasFestivos={diasFestivos}
        horasDiarias={horasDiarias}
        setHorasDiarias={setHorasDiarias}
      />

      {horasTotales > 0 && fechaInicio && (
        <p>Fecha de finalización: {calculateFechaFinal().toLocaleDateString()}</p>
      )}
    </div>
  );
}

export default App;
