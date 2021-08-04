import React, { useState, useLayoutEffect } from 'react';
import { createContainer, VictoryAxis, VictoryBar, VictoryBrushContainer, VictoryChart, VictoryTooltip } from 'victory';

import useResizeObserver from '@react-hook/resize-observer';
import moment from 'moment';

const formatDate = date => moment(date).format('YYYY-MM-DD HH:mm');

class BrushChartTooltip extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents;

  render() {
    return (
      <VictoryTooltip
        { ... this.props }
        x={this.props.width/2}
        y={40}
        cornerRadius={0}
        pointerLength={0}
        flyoutWidth={200}
        dy={-20}
        renderInPortal={false}
      />
    )
  }

}

const useSize = (target) => {
  const [size, setSize] = useState({width: 0, height: 0})
  useLayoutEffect(() => {
    if(target) {
        setSize(target.getBoundingClientRect())
    }
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size;
}

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export const BrushChart = ({data}) => {
  const [target, setTarget] = useState(null);
  const { width } = useSize(target);

  const domain = data
    .reduce(([dStart, dEnd], { x }) => [Math.min(+x, dStart), Math.max(+x, dEnd)], [Infinity, -Infinity])
    .map(date => new Date(date));
  const [zoomDomain, setZoomDomain] = useState(domain);

  let brushCallback = ({x}) => setZoomDomain(x);

  let theme = {
    axis: {
      style: {
        axis: {
          stroke: "grey",
          strokeWidth: 1
        },
        tickLabels: {
        },
        grid: {
          stroke: "grey",
          strokeDasharray: "5,5",
          strokeWidth: 0.5,
        }
      }
    },
    bar: {
      style: {
        data: {
          fill: "steelblue"
        }
      }
    },
  };

  return (
    <div className="w-full h-full" ref={setTarget}>
      <div
        style={{ marginLeft: "2.5rem", fontWeight: "bold", fontSize: "17px" }}
      >
        <text
          style={{
            display: "inline-flex",
            color: "#373738",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Main Valve History
        </text>
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
            allowPan={false}
            allowZoom={false}
            zoomDomain={{ x: zoomDomain }}
          />
        }
      >
        <VictoryAxis fixLabelOverlap gridComponent={<></>} />
        <VictoryAxis dependentAxis fontSize={1} />
        <VictoryBar
          barRatio={0.4}
          labels={({ datum: { x, y } }) => `${formatDate(x)} — ${y.toFixed(2)}`}
          labelComponent={<BrushChartTooltip />}
          data={data}
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
        <VictoryBar barRatio={0.4} data={data} />
      </VictoryChart>
    </div>
  );
}
