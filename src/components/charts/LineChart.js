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
  VictoryLegend,
  VictoryLine,
} from "victory";
import useResizeObserver from "@react-hook/resize-observer";
import moment from "moment";

const formatDate = (date) => moment(date).format("YYYY/MM/DD HH:mm");

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

const takeWhile = (p, arr) => {
  var idx = arr.findIndex((x) => !p(x));
  return arr.slice(0, idx == -1 ? arr.length : idx);
};

export const LineChart = ({ data }) => {
  const [target, setTarget] = useState(null);
  const { width } = useSize(target);
  const dateStart = useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() - 2);
    return now;
  }, []);

  const truncatedData = useMemo(
    () => takeWhile(({ x }) => +dateStart < +x, data),
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

  const brushCallback = ({ x }) => setZoomDomain(x);

  const series = useMemo(
    () => [
      {
        name: "Value",
        color: "blue",
        data: truncatedData.map(({ x, y }) => ({ x, y })),
        tooltip: true,
      },
      {
        name: "Target",
        color: "green",
        data: truncatedData.map(({ x, z }) => ({ x, y: z })),
        tooltip: false,
      },
    ],
    [truncatedData]
  );

  const theme = {
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
          strokeWidth: "1",
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
            color: "#373d3f",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          EC History in µS
        </div>
      </div>
      <VictoryChart
        style={{ overflow: "visible" }}
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
        {series.map(({ data, tooltip, color }, i) => {
          const tooltipOptions = tooltip && {
            labels: ({ datum: { x, y } }) => `${formatDate(x)}-${y}`,
            labelComponent: <BrushChartTooltip />,
          };
          return (
            <VictoryLine
              key={i}
              sortKey="datetime"
              interpolation="linear"
              {...tooltipOptions}
              style={{ data: { stroke: color } }}
              data={data}
            />
          );
        })}
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
        {series.map(({ data, color }, i) => (
          <VictoryLine
            key={i}
            interpolation="linear"
            style={{ data: { stroke: color } }}
            data={data}
            sortKey="x"
          />
        ))}
      </VictoryChart>
    </div>
  );
};
