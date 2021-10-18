import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactHighcharts from 'react-highcharts';

const AreaGraphs = (props) => {

    /**
     * On Click of Graphs Event
     */
    const onClickGraphsPoint = (e) => {
        // onClickPoint(e);
    }

    const getConfig = () => {

        return {
            config: getAreaGraphsConfig({
                title: props.graphName,
                xAxisData: props.xAxisData,
                type: props.type,
                height: props.height,
                onClickPoint: onClickGraphsPoint,
                series: [
                    {
                        name: props.data.length ? props.data[0].name ? props.data[0].name : 'NULL' : '',
                        value: props.data.length ? props.data[0].name ? props.data[0].name : 'NULL' : '',
                        data: props.data.length ? props.data[0].data : [],
                        visible: true,
                        color: GOODDAY,
                        marker: { lineColor: GOODDAY },
                    }
                ]
            })
        }
    }
    var graphs = getConfig();

    return <>
        <TriggerResize />
        <ReactHighcharts config={graphs.config} />
    </>
}
export default AreaGraphs;
AreaGraphs.propTypes = {
    graphName: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.array,
    xAxisData: PropTypes.array,
    goodOrBadDay: PropTypes.bool,

    height: PropTypes.number,
    tickInterval: PropTypes.number,
    onClickGraphsPoint: PropTypes.fun,
}
AreaGraphs.defaultProps = {
    type: "area",
    graphName: null,
    data: [],
    xAxisData: [],
    goodOrBadDay: null,
    height: 300,
    tickInterval: 3,
    onClickGraphsPoint: () => { }
}

/**
 * To Adjust Graphs 
 */
const TriggerResize = () => {
    useEffect(() => { 
        window.dispatchEvent(new Event('resize')); 
    })

    return <></>
}

/**
 * Graph Config
 * '#8898a5',
 */
// const GOODDAY = '#0f8d34';
const GOODDAY = '#2d6ccd';
const BADDAY = '#ef6262';
const COLOR_OPACITY = ['#c27146', '#c2bfbc', '#00457c', '#33b5e6', '#e7ca60', '#40abaf', '#6272d1', '#c27146'];
const getAreaGraphsConfig = ({ title = '', height = 300, xAxisData = [], series = [], onClickPoint, tickInterval = 3, type ="area" }) => {
        return {
            chart: {
                type: type,
                height: height,
                zoomType: 'x',
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            colors: COLOR_OPACITY,
            legend: {
                padding: 0,
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
                marginBottom: 5,
                itemStyle: {
                    fontSize: '10px',
                    textTransform: 'uppercase'
                },
                enabled: false
            },
            yAxis: {
                gridLineColor: '#f0f0f0',
                gridLineDashStyle: 'dash',
                lineWidth: 0,
                title: {
                    text: ''
                },
                labels: {
                    enabled: true
                }
            },
            plotOptions: {
                series: {
                    borderRadius: 1,
                    fillOpacity: 0.5,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                onClickPoint(this)
                            }
                        }
                    }
                },
                "area": {
                    "lineWidth": 1,
                    "marker": {
                        "lineWidth": 0,
                        "symbol": "circle",
                        "fillColor": "white",
                        "radius": 0
                    }
                },
                "column": {
                    "pointPadding": 0.2,
                    "borderWidth": 1
                }
            },
            xAxis: {
                type: "datetime",
                // categories: xAxisData,
                // tickInterval: 4,
                labels: {
                    enabled: true,
                    format: '{value:%l:%M %p }'
                },
                crosshair: true,
            },
            series: series,
        }
}
