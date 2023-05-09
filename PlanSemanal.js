import React from "react";

function PlanSemanal({
  fechaInicio,
  diasFestivos,
  horasDiarias,
  setHorasDiarias
}) {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const esDiaTrabajo = (day) => !diasFestivos.includes(day);

  const handleHorasDiariasChange = (e, day) => {
    const hours = parseInt(e.target.value);
    setHorasDiarias((prevHorasDiarias) => {
      const newHorasDiarias = [...prevHorasDiarias];
      newHorasDiarias[days.indexOf(day)] = hours;
      return newHorasDiarias;
    });
  };

  return (
    <div>
      <h2>Plan Semanal</h2>
      {fechaInicio && (
        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Trabaja?</th>
              <th>Horas</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                <td>{esDiaTrabajo(day) ? "Sí" : "No"}</td>
                <td>
                  {esDiaTrabajo(day) ? (
                    <input
                      type="number"
                      value={horasDiarias[days.indexOf(day)]}
                      min={0}
                      max={24}
                      onChange={(e) => handleHorasDiariasChange(e, day)}
                    />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PlanSemanal;
