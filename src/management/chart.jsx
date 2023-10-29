import axios from 'axios';
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { API_BASE_PATH } from '../properties';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints = [];
export class Chart extends Component {

    render() {
        const options = {
            theme: "light2",
            title: {
                text: "Chart Price"
            },
            data: [{
                type: "line",
                //format dd/mm/yyyy
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,##0.00",
                dataPoints: dataPoints
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                <button onClick={()=>{dataPoints = []}}>
                    <a href="/mng-product">Back</a>
                </button>
            </div>
            
        );
    }

    componentDidMount() {
        var chart = this.chart;
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('=') + 1);
        axios.get(`${API_BASE_PATH}/product-price/${id}`)
            .then(response => {
                console.log(response.data);
                response.data.forEach(element => {
                    dataPoints.push({
                        x: new Date(element.priceDateTime),
                        y: element.price
                    });
                });
                chart.render();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}

export default Chart;   