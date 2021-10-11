/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 08/10/2021 - 11:26:07
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 08/10/2021
 * - Author          : Grant
 * - Modification    :
 **/
/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 20/09/2021 - 09:11:41
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 20/09/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import {
  HeatMapComponent,
  Inject,
  Legend,
  Tooltip,
  Adaptor
} from "@syncfusion/ej2-react-heatmap";
class HeatMap extends React.Component {
  constructor() {
    super(...arguments);
    this.heatmapData = [
      [73, 39, 26, 39, 94, 0, 94, 0, 94, 0],
      [93, 58, 53, 38, 26, 68, 94, 0, 94, 0],
      [99, 28, 22, 4, 66, 90, 94, 0, 94, 0],
      [14, 26, 97, 69, 69, 3, 94, 0, 94, 0],
      [7, 46, 47, 47, 88, 6, 94, 0, 94, 0],
      [41, 55, 73, 23, 3, 79, 94, 0, 94, 0],
      [56, 69, 21, 86, 3, 33, 94, 0, 94, 0]
    ];
  }
  render() {
    return (
      <HeatMapComponent
        id="heatmap"
        titleSettings={{
          text: "Block: A Soil Moisture in %",
          textStyle: {
            size: "15px",
            fontWeight: "500",
            fontStyle: "Normal",
            fontFamily: "Segoe UI"
          }
        }}
        xAxis={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }}
        yAxis={{
          labels: [
            "100 cm",
            "90 cm",
            "80 cm",
            "70 cm",
            "60 cm",
            "50 cm",
            "40 cm",
            "30 cm",
            "20 cm",
            "10 cm"
          ]
        }}
        cellSettings={{
          showLabel: true
        }}
        renderingMode={"SVG"}
        showTooltip={true}
        dataSource={this.heatmapData}
      >
        <Inject services={[Legend, Tooltip, Adaptor]} />
      </HeatMapComponent>
    );
  }
}

const Moisture = () => {
  return (
    <div className="p-2">
      <div className="flex align-center justify-center bg-gray-300 shadow-md rounded p-2">
        <HeatMap />
      </div>
    </div>
  );
};

export default Moisture;
