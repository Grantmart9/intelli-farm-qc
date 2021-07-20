import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import "./EquipmentStatus.css";

const EquipmentStatus = () => {
  return (
    <form>
      <h1>Equipment Status</h1>
      <div class="EquipmentStatusOutterCard">
        <div class="EquipmentStatusCard ">
          <div class="EquipmentStatusIcon">
            <h3>Block A Valve</h3>
            <h4>Open</h4>
            <h4>125 m3/h</h4>
          </div>
          <h4 style={{ color: "red" }}>No Alarm</h4>
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div class="EquipmentStatusCard ">
          <div class="EquipmentStatusIcon">
            <h3>Block b Valve</h3>
            <h4>Closed</h4>
            <h4>0 m3/h</h4>
          </div>
          <h4 style={{ color: "red" }}>No Flow</h4>
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div class="EquipmentStatusCard ">
          <div class="EquipmentStatusIcon">
            <h3>Fertilizer A</h3>
            <h4>Open</h4>
            <h4>125 m3/h</h4>
          </div>
          <h4 style={{ color: "red" }}>No Alarm</h4>
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div class="EquipmentStatusCard ">
          <div class="EquipmentStatusIcon">
            <h3>Fertilizer EC</h3>
            <h4>2889 mS</h4>
          </div>
          <h4 style={{ color: "red" }}>No Alarm</h4>
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div class="EquipmentStatusCard ">
          <div class="EquipmentStatusIcon">
            <h3>Fertilizer Tank</h3>
            <h4>20 %</h4>
          </div>
          <h4 style={{ color: "red" }}>Low</h4>
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div class="EquipmentStatusCard ">
          <div class="EquipmentStatusIcon">
            <h3>Water Pump</h3>
            <h4>Running</h4>
            <h4>400 m3/h</h4>
          </div>
          <h4 style={{ color: "red" }}>No Alarm</h4>
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div class="EquipmentStatusCard ">
          <div class="EquipmentStatusIcon">
            <h3>Reservoir</h3>
            <h4>90 %</h4>
          </div>
          <h4 style={{ color: "red" }}>No Alarm</h4>
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div class="EquipmentStatusCard ">
          <div class="EquipmentStatusIcon">
            <h3>Fertilizer</h3>
            <h4>6999 mS</h4>
          </div>
          <h4 style={{ color: "red" }}>High</h4>
          <FontAwesomeIcon icon={faChartLine} />
        </div>
      </div>
    </form>
  );
};
export default EquipmentStatus;
