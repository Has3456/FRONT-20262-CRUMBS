import React from 'react';

const Historial = () => {
  // Datos de ejemplo del historial
  const pedidos = [
    { id: "#CR-9981", fecha: "28/04/2026", total: "$24.500", estado: "Entregado", clase: "success" },
    { id: "#CR-1002", fecha: "01/05/2026", total: "$18.900", estado: "En camino", clase: "pending" },
    { id: "#CR-1034", fecha: "02/05/2026", total: "$12.000", estado: "Cancelado", clase: "danger" },
  ];

  return (
    <div className="historial-container">
      <h3>Historial de Pedidos</h3>
      <div className="table-responsive">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.fecha}</td>
                <td>{item.total}</td>
                <td>
                  <span className={`status-badge ${item.clase}`}>
                    {item.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;