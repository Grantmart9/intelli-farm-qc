import { DeviceType, useApiUrl } from 'api/api';
import useAxios from 'axios-hooks';
import { CHART_UPDATE_INTERVAL, useInterval, useSize } from 'hooks/hooks';
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { ErrorComponent } from './Error/Error';
import { createContainer, VictoryAxis, VictoryBar, VictoryBarProps, VictoryBrushContainer, VictoryChart, VictoryLine, VictoryLineProps, VictoryThemeDefinition, VictoryTooltip, VictoryVoronoiContainerProps, VictoryZoomContainer, VictoryZoomContainerProps } from 'victory';

import * as bounds from 'binary-search-bounds';
import { useMediaQuery } from '@react-hook/media-query';
import { ReloadButton } from './ReloadButton';
import moment from 'moment';


const formatDate = (date: Date, deviceType: DeviceType): string => {
  return moment(date).format({
    '8Ch-AI-Sigfox': 'YYYY-MM-DD HH:mm',
    '8Ch-DI-Flow-Sigfox': 'YYYY-MM-DD'
  }[deviceType])
}

const on = <T,S,U>(f: (s1: S, s2: S) => U, g: (t: T) => S) => (x: T, y: T) => f(g(x),g(y));
const compare = <T,>() => (x: T,y: T) => x < y ? -1 : x == y ? 0 : 1;

const transformData = (rawApiData: {x: string, y: number}[], maxPoints: number) => {
  const data = rawApiData
    .map((data) => {
      return {
        x: new Date(data['datetime']),
        y: +data['y'],
      };
    })
    .sort(on(compare<Date>(), (({ x }) => x)));

  let domain: [Date, Date] = [data[0].x, new Date(+data[data.length-1].x + 1e8)];

  /* let aggregate = (slice: {x: Date, y: number}[]): {x: Date, y: number} => {
   *   let {x: tx, y: ty} = slice
   *     .map(({x,y}) => ({ x: +x, y }))
   *     .reduce(({x: tx, y: ty}, {x, y}) => ({
   *       x: tx + x,
   *       y: ty + y
   *     }), {x: 0, y: 0})
   *   return {
   *     x: new Date(tx / slice.length),
   *     y: ty / slice.length
   *   }
   * }; */
  let aggregate = (slice: {x: Date, y: number}[]): {x: Date, y: number} => slice[slice.length-1];

  let sampleData = [data];
  while(true) {
    let data = sampleData[sampleData.length - 1];
    if(data.length < maxPoints) {
      break;
    }
    sampleData.push(downsample(data, aggregate, 2));
  }

  return { domain, sampleData };

};

const downsample = <T,>(data: T[], aggregate: (slice: T[]) => T, step: number): T[] => {
  let downsampled = [];
  for(let i=0; i<data.length; i+=step) {
    downsampled.push(aggregate(data.slice(i, i+step)));
  }
  return downsampled;
};

const getZoomRatio = (domain: [Date,Date], zoomDomain: [Date,Date]) => {
  const [domainStart, domainEnd] = domain.map(d => +d);
  const [zoomDomainStart, zoomDomainEnd] = zoomDomain.map(d => +d);
  const domainRange = domainEnd - domainStart;
  const zoomDomainRange = zoomDomainEnd - zoomDomainStart;
  if(domainRange == 0 || zoomDomainRange == 0) {
    return 0;
  }
  const r = zoomDomainRange / domainRange;
  return r;
};

const getSampleLevel = (ratio: number, samples: number): number => {
  const level = Math.max(0, samples - 1 + Math.ceil(Math.log2(ratio)))
  return level;
};

class BrushChartTooltip extends React.Component<{ width?: number }> {
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


export const truncateDomain = (data: {x: Date, y: Number}[], [start, end]: [Date, Date]) => {
  const dateCompare = on(compare<Date>(), ({x}: {x: Date}) => x);
  const lo = Math.max(0,bounds.lt(data, { x: start }, dateCompare));
  const hi = bounds.gt(data, { x: end }, dateCompare)+1;
  return data.slice(lo, hi);
};

export const lerp = (x: number, y: number, t: number) => x*(1-t) + y*t

export const justTheTip = ([start, end]: [Date, Date]): [Date, Date] => {
  return [new Date(lerp(+start,+end,0.8)), end]
}



const VICTORY_PLOT_FOR: Record<DeviceType, FunctionComponent<{ barProps: VictoryBarProps, commonProps: VictoryBarProps & VictoryLineProps }>> = {
  "8Ch-DI-Flow-Sigfox": ({ barProps, commonProps }) => <VictoryBar {...commonProps} { ...barProps } />,
  "8Ch-AI-Sigfox": ({ commonProps }) => <VictoryLine {...commonProps} />

};

const VictoryZoomVoronoiContainer = createContainer<VictoryZoomContainerProps, VictoryVoronoiContainerProps>("zoom", "voronoi");

export const BrushBarChart = () => {

  const { sensorId } = useParams<any>();
  const apiUrl = useApiUrl();
  const [{ data: resp, loading, error }, refetch] = useAxios(
    `${apiUrl}/sensor${sensorId}/history`
  );
  useInterval(() => {
      refetch();
  }, CHART_UPDATE_INTERVAL);

  const { data: rawData, device_type } = resp || {};

  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const { width } = useSize(target);

  const [zoomDomain, setZoomDomain] = useState<[Date, Date] | null>(null);

  const minMedium = useMediaQuery('(min-width: 768px)');
  const maxPoints = {
    "8Ch-AI-Sigfox": minMedium ? 400 : 100,
    "8Ch-DI-Flow-Sigfox": Number.MAX_VALUE,
  }[device_type];
  let { domain, sampleData } = useMemo(() => rawData != null ? transformData(rawData, maxPoints) : { domain: null, sampleData: null }, [rawData, maxPoints]);
  useEffect(() => {
    if(domain) {
      setZoomDomain(justTheTip(domain));
    }
  },[domain])
  let zoomRatio = zoomDomain && getZoomRatio(domain, zoomDomain);
  let unfilteredData = rawData && zoomDomain && sampleData[getSampleLevel(zoomRatio, sampleData.length)];
  let data = useMemo(() => rawData && zoomDomain && truncateDomain(unfilteredData, zoomDomain), [unfilteredData, zoomDomain]);
  let barsRatio = data == null ? 1 : data.length / unfilteredData.length;
  let brushData = data && sampleData[sampleData.length - 1];
  let brushCallback = ({x}) => setZoomDomain(x as [Date,Date]);
  let tickCount = Math.max(2, Math.floor(width / 100));

  const victoryPlot = VICTORY_PLOT_FOR[device_type];

  let theme: VictoryThemeDefinition = {
    axis: {
      style: {
        axis: {
          stroke: "grey",
          strokeWidth: 1
        },
        tickLabels: {
          /* fontSize: 5 */
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
    }
  };

  useInterval(() => {
    refetch();
  }, CHART_UPDATE_INTERVAL);
  if (loading || !data) {
    return (
      <div
        style={{ marginTop: '100px', minHeight: '280px' }}
        className="spinner"
      ></div>
    );
  }
  if (error) {
    return <ErrorComponent retryFunc={refetch} />;
  }


  return (
    <div className="w-full h-full" ref={setTarget}>
        <div className="mb-12">
            <ReloadButton onClick={refetch} />
        </div>
        <VictoryChart
          theme={theme}
          height={300}
          width={width}
          padding={{left: 40, bottom: 20}}
          scale={{x: "time", y: "linear"}}
          domain={{ x: domain }}
          containerComponent={
            <VictoryZoomVoronoiContainer
              style={{
                touchAction: "auto"
              }}
              zoomDimension="x"
              voronoiDimension="x"
              allowPan={false}
              allowZoom={false}
              zoomDomain={{x: zoomDomain}}
            />
          }>
            <VictoryAxis fixLabelOverlap tickCount={tickCount} gridComponent={<></>}/>
            <VictoryAxis dependentAxis />
            {
              victoryPlot({
                barProps:{
                  barRatio: 0.4 * barsRatio / zoomRatio
                },
                commonProps: {
                  labels: ({ datum: {x, y} }) => `${formatDate(x, device_type)} — ${y.toFixed(2)}`,
                  labelComponent: <BrushChartTooltip/>,
                  data: data
                }
              })
            }
        </VictoryChart>
        <VictoryChart
          theme={theme}
          height={100}
          width={width}
          padding={{left: 40, bottom: 20}}
          scale={{x: "time", y: "linear"}}
          domain={{x: domain}}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={{ x: zoomDomain }}
              onBrushDomainChangeEnd={brushCallback}
            />
          }>
            <VictoryAxis fixLabelOverlap gridComponent={<></>}/>
            {
              victoryPlot({
                barProps: {
                  barRatio: 0.4
                },
                commonProps: {
                  data: brushData
                }
              })
            }
        </VictoryChart>
    </div>
  );
}
