/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 11/08/2021 - 08:26:55
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 11/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = (res) => res.json();
const dataFetch = fetch(
  "https://b5d02741-8aed-4856-81c3-41fae5665ce2.mock.pstmn.io/get"
).then(jsonify);

const schemaFetch = [
  {
    name: "Date",
    type: "date",
    format: "%d-%b-%y-%H:%M",
  },
  {
    name: "Ec Value",
    type: "number",
  },
];

const dataSource = {
  chart: {
    exportenabled: true,
    showlegend: true,
    palettecolors: "#347aeb",
    theme: "gammel",
  },
  caption: {
    text: "EC History",
  },
  series: "Type",
  yaxis: [
    {
      plot: {
        value: "EC Volume",
        type: "realtimeline",
      },
      title: "Volume",
    },
  ],
  xAxis: {
    outputTimeFormat: {
      day: "%d-%B-%Y",
      time: "%-I:%-M",
    },
  },
  tooltip: {
    outputtimeformat: {
      day: "%d-%B-%Y (%a)",
    },
    style: {
      container: {
        "border-color": "#000000",
        "border-radius": "0.2cm",
        "background-color": "#75748D",
      },
      text: {
        color: "#FFFFFF",
      },
    },
  },
};

class ChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "100%",
        height: "400",
        dataSource,
      },
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData() {
    Promise.all([dataFetch, schemaFetch]).then((res) => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          "Fetching Data"
        )}
      </div>
    );
  }
}
export default ChartViewer;
