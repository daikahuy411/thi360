import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';
import { COLOR_1, COLOR_2, COLOR_4 } from 'constants/ChartConstant';

export class CourseStatChart extends Component {
	render() {
		const data = {
			labels: ['Chưa vào học', 'Hoàn thành', 'Đạt'],
      datasets: [
        {
          data: [350, 450, 100],
          backgroundColor: [COLOR_1, COLOR_4, COLOR_2],
        	pointBackgroundColor : [COLOR_1, COLOR_4, COLOR_2]
        }
      ]
		}
		return (
			<div>
				<Doughnut height={60} data={data}/>
			</div>
		)
	}
}

export default CourseStatChart