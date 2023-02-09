import React, { useState, useEffect } from "react";
import {
	Card,
	Radio,
	Input,
	message,
	Form,
	Row,
	Col,
	Button,
	Drawer,
	Descriptions
} from "antd";
import AttendanceApi from "api/attendance-api";
import {
	SendOutlined, CheckCircleOutlined
} from "@ant-design/icons";

const { TextArea } = Input;

const EditForm = (props) => {
	const [attendance, setAttendance] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	// store state of each User: 0: not initialized, 1: present, 2: absent, 3: late
	const [userAttendanceStates, setUserAttendanceStates] = useState({});
	const [absentIds, setAbsentIds] = useState([]);
	const [lateIds, setLateIds] = useState([]);
	const [presentIds, setPresentIds] = useState([]);

	const [totalLate, setTotalLate] = useState(0);
	const [totalAbsent, setTotalAbsent] = useState(0);
	const [totalPresent, setTotalPresent] = useState(0);

	const onOK = () => {

		if(totalAbsent + totalPresent + totalLate < attendance.class.totalUser ){
			message.error("Bạn chưa cập nhật toàn bộ trạng thái của học sinh.");
			return;
		}

		setIsLoading(true);
		let model = { ...attendance };

		var updatedTotalLate = 0;
		var updatedTotalAbsent = 0;
		var updatedTotalPresent = 0;
		var presentIds = [];
		var absentIds = [];

		Object.keys(userAttendanceStates).map(key => {
			if (userAttendanceStates[key] === 1) {
				updatedTotalPresent++;
				presentIds.push(key);
			} else {
				updatedTotalAbsent++;
				absentIds.push(key);
			}
		});

		model.lateUserIds = "";
		model.presentUserIds = presentIds.join(';');
		model.absentUserIds = absentIds.join(';');
		model.totalAbsent = updatedTotalAbsent;
		model.totalLate = 0;
		model.totalPresent = totalPresent;

		new AttendanceApi().saveAttendance(model).then((response) => {
			message.success("Cập nhật thành công.");
			if (props.onClose) {
				props.onClose(true);
			}
		});
	};

	useEffect(() => {
		calculateTotals(userAttendanceStates);
	}, [userAttendanceStates]);

	useEffect(() => {
		fetchData(props.classId);
	}, [props.classId]);

	const fetchData = (classId) => {
		new AttendanceApi().getAttendance(classId).then((response) => {
			if (response.data.id == 0) {
				let state = {};
				response.data.userAttendances.map((item) => {
					state[item.id] = 0;
				});
				setUserAttendanceStates(state);
			} else {
				let state = {};
				response.data.absentUsers.map((item) => {
					state[item] = 2;
				});
				response.data.presentUsers.map((item) => {
					state[item] = 1;
				});
				setUserAttendanceStates(state);
			}
			setAttendance(response.data);
		});
	};

	const changeStatus = (userId, status) => {
		let state = userAttendanceStates;
		state[userId] = status;
		setUserAttendanceStates({ ...state });
	}

	const selectAll = () => {
		let state = userAttendanceStates;
		Object.keys(state).map(key => {
			state[key] = 1;
		});
		setUserAttendanceStates({ ...state });
	}

	const calculateTotals = (states) => {
		var updatedTotalLate = 0;
		var updatedTotalAbsent = 0;
		var updatedTotalPresent = 0;

		Object.keys(states).map(key => {
			if (states[key] === 1) {
				updatedTotalPresent++
			} else if (states[key] === 2) {
				updatedTotalAbsent++;
			}
		});

		setTotalAbsent(updatedTotalAbsent);
		setTotalLate(updatedTotalLate);
		setTotalPresent(updatedTotalPresent);
	}

	return (
		<>
			<Drawer
				title={`Điểm danh `}
				width={820}
				onClose={props.onClose}
				visible={true}
				bodyStyle={{ paddingBottom: 0 }}
				footer={
					<div
						style={{
							textAlign: "right",
						}}
					>
						<Button
							onClick={selectAll}
							style={{ marginRight: 8 }}
							type="primary"
							color="primary"
						>
							<CheckCircleOutlined />&nbsp;
							Lớp học đủ
						</Button>
						&nbsp;
						<Button
							onClick={onOK}
							style={{ marginRight: 8 }}
							type="primary"
							color="primary"
							loading={isLoading}
						>
							<SendOutlined />&nbsp;
							Cập nhật
						</Button>
					</div>
				}
			>
				{attendance && (
					<Form layout="vertical" hideRequiredMark>
						<Row >
							<Col span={24}>
								<Descriptions bordered>
									<Descriptions.Item label="Lớp học" span={3}  >
										{attendance.class.name}
									</Descriptions.Item>
									<Descriptions.Item label="Chưa điểm danh"  >
										<b style={{ color: 'rgb(255, 77, 79)', fontWeight: 'bold', fontSize: 18 }}>
											{totalAbsent}
										</b>
									</Descriptions.Item>
									<Descriptions.Item label="Đã điểm danh"  >
										<b style={{ color: 'rgb(82, 196, 26)', fontWeight: 'bold', fontSize: 18 }}>
											{totalPresent}
										</b>
									</Descriptions.Item>
									<Descriptions.Item label="Tổng số học sinh"   >
										<b style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>{attendance.class.totalUser}</b>
									</Descriptions.Item>
								</Descriptions>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<br />
								<Card bodyStyle={{ padding: 0 }}>
									<div className="table-responsive">
										<div className="ant-table">
											<div className="ant-table-container">
												<div className="ant-table-content">
													<table>
														<thead className="ant-table-thead">
															<tr>
																<th
																	className="ant-table-cell"
																	style={{ width: 25 }}
																>
																	#
																</th>
																<th
																	className="ant-table-cell"
																>
																	Học sinh
																</th>
																{/* <th
																	className="ant-table-cell"
																>
																	Ghi chú
																</th> */}
																<th
																	className="ant-table-cell"
																	style={{ width: 180 }}
																>
																	Trạng thái
																</th>
															</tr>
														</thead>
														<tbody className="ant-table-tbody">
															{attendance.userAttendances.map((item, index) => {
																return (
																	<tr
																		key={`tr-administrator-${item.id}`}
																		className="ant-table-row ant-table-row-level-0"
																	>
																		<td className="ant-table-cell "
																			style={{ width: 25 }}
																		>
																			{index + 1}
																		</td>
																		<td className="ant-table-cell ">
																			{item.userName}
																			<br />
																			{item.fullName}
																		</td>
																		{/* <td className="ant-table-cell ">
																		</td> */}
																		<td className="ant-table-cell ">
																			<Radio.Group
																				value={userAttendanceStates[item.id] ?? 0}
																				onChange={(e) => {
																					changeStatus(item.id, e.target.value);
																				}}
																				size="small"
																				key={`radion-status-${item.id}`} buttonStyle="solid">
																				<Radio.Button value={1}>Có mặt</Radio.Button>
																				<Radio.Button value={2}>Vắng mặt</Radio.Button>
																			</Radio.Group>
																		</td>
																	</tr>
																);
															})}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</Card>
							</Col>
						</Row>
					</Form>
				)}
			</Drawer >
		</>
	);
};

export default EditForm;
