import React from 'react'
import { Card, Avatar } from 'antd'
import Flex from '../Flex'
import CustomStatistic from '../CustomStatistic'
import { Link, useLocation } from "react-router-dom";

const DataDisplayWidget = props => {
	const { size, value, title, icon, color, avatarSize, vertical, url } = props
	const customStatisticProps = { size, value, title }
	return (
		<Card>
			<Link to={url} >
				<Flex alignItems="center" flexDirection={vertical ? 'column' : 'row'}>
					<Avatar size={avatarSize} shape="square" icon={icon} className={`ant-avatar-${color}`} />
					<div className={vertical ? 'mt-3 text-center' : 'ml-3'}>
						<CustomStatistic {...customStatisticProps} />
					</div>
				</Flex>
			</Link>
		</Card>
	)
}

DataDisplayWidget.defaultProps = {
	avatarSize: 50,
	vertical: false
};

export default DataDisplayWidget
