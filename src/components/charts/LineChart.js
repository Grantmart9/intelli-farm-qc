/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 16/08/2021 - 13:10:37
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 16/08/2021
 * - Author          : Grant
 * - Modification    :
 **/
import React, { useState, useMemo, useLayoutEffect } from "react";
import {
  createContainer,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryTooltip,
  VictoryLine,
} from "victory";
import useResizeObserver from "@react-hook/resize-observer";
import moment from "moment";

const formatDate = (date) => moment(date).format("YYYY/MM/DD hh:mm");

class BrushChartTooltip extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents;

  render() {
    return (
      <VictoryTooltip
        {...this.props}
        x={this.props.width / 2}
        y={40}
        cornerRadius={0}
        pointerLength={0}
        flyoutWidth={200}
        dy={-20}
        renderInPortal={false}
      />
    );
  }
}

const useSize = (target) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (target) {
      setSize(target.getBoundingClientRect());
    }
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export const LineChart = ({ data }) => {
  const [target, setTarget] = useState(null);
  const { width } = useSize(target);

  const truncatedData = useMemo(
    () => data.slice(Math.max(0, data.length - 200)),
    [data]
  );
  const domain = useMemo(
    () =>
      truncatedData
        .reduce(
          ([dStart, dEnd], { x }) => [Math.min(+x, dStart), Math.max(+x, dEnd)],
          [Infinity, -Infinity]
        )
        .map((date) => new Date(date)),
    [truncatedData]
  );
  const [zoomDomain, setZoomDomain] = useState(domain);

  let brushCallback = ({ x }) => setZoomDomain(x);

  let theme = {
    axis: {
      style: {
        axis: {
          stroke: "gray",
          strokeWidth: 2,
        },
        tickLabels: {},
        grid: {
          stroke: "blue",
          strokeDasharray: "5,5",
          strokeWidth: 0.5,
        },
      },
    },
    line: {
      style: {
        data: {
          stroke: "blue",
          strokeWidth: "2",
          fill: "#dae1ed",
        },
      },
    },
  };

  return (
    <div className="w-full h-full" ref={setTarget}>
      <div
        style={{ marginLeft: "2.5rem", fontWeight: "bold", fontSize: "17px" }}
      >
        <div
          style={{
            display: "inline-flex",
            color: "#373738",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Fertilizer History
        </div>
      </div>
      <VictoryChart
        theme={theme}
        height={300}
        width={width}
        padding={{ left: 40, bottom: 20 }}
        scale={{ x: "time", y: "linear" }}
        domain={{ x: domain }}
        containerComponent={
          <VictoryZoomVoronoiContainer
            style={{
              touchAction: "auto",
            }}
            zoomDimension="x"
            voronoiDimension="x"
            allowZoom={false}
            allowPan={true}
            zoomDomain={{ x: zoomDomain }}
          />
        }
      >
        <VictoryAxis fixLabelOverlap gridComponent={<></>} />
        <VictoryAxis dependentAxis />
        <VictoryLine
          sortKey="datetime"
          interpolation="linear"
          labels={({ datum: { x, y, datetime } }) =>
            `${formatDate(datetime, x)}-${y.toFixed(2)}`
          }
          labelComponent={<BrushChartTooltip />}
          data={truncatedData}
        />
      </VictoryChart>
      <VictoryChart
        theme={theme}
        height={100}
        width={width}
        padding={{ left: 40, bottom: 20 }}
        scale={{ x: "time", y: "linear" }}
        domain={{ x: domain }}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={{ x: zoomDomain }}
            onBrushDomainChangeEnd={brushCallback}
          />
        }
      >
        <VictoryAxis fixLabelOverlap gridComponent={<></>} />
        <VictoryLine interpolation="linear" data={truncatedData} sortKey="x" />
      </VictoryChart>
    </div>
  );
};
