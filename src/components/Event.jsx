import React from "react";
import './Event.css'

const Event = ({ data }) => {
  return (
    <div className="eventClass">
      <div>
      <h3 className="eventTitles"> Nombre del evento: </h3> <span> {data.nameEvent}</span>
      </div>
      <div>
      <h3 className="eventTitles"> Descripción: </h3> <span> {data.descriptionEvent}</span>
      </div>
      <div>
      <h3 className="eventTitles"> Fecha de Inicio: </h3> <span> {(data.startDateE).slice(0,10)}</span>
      </div>
      <div>
      <h3 className="eventTitles"> Fecha de Fin: </h3> <span> {(data.endDateE).slice(0,10)}</span>
      </div>
      <div>
      <h3 className="imageTitles"> Imagen de Banner: </h3> <img  src={data.imageUrl} alt="" width="300px" height="300px"/>
      </div>
      {/* <div>
      <h3 className="imageTitles"> Imagen de Miniatura: </h3> <img  src={data.imageUrl} alt="" width="300px" height="300px"/>
      </div> */}
    </div>
  );
};

export default Event;
