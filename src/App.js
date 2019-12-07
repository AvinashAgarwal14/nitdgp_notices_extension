import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap'

// let element = (<div className="list-group">
// 	<a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
// 		<div className="d-flex w-100 justify-content-between">
// 			<h5 className="mb-1">List group item heading</h5>
// 			<small>3 days ago</small>
// 		</div>
// 		<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
// 		<small>Donec id elit non mi porta.</small>
// 	</a>
// 	<a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
// 		<div className="d-flex w-100 justify-content-between">
// 			<h5 className="mb-1">List group item heading</h5>
// 			<small className="text-muted">3 days ago</small>
// 		</div>
// 		<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
// 		<small className="text-muted">Donec id elit non mi porta.</small>
// 	</a>
// 	<a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
// 		<div className="d-flex w-100 justify-content-between">
// 			<h5 className="mb-1">List group item heading</h5>
// 			<small className="text-muted">3 days ago</small>
// 		</div>
// 		<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
// 		<small className="text-muted">Donec id elit non mi porta.</small>
// 	</a>
// </div>);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allNotices: {}
		}
	}

	componentDidMount() {
		fetch("https://admin.nitdgp.ac.in/academics/notices")
			.then(response => response.json())
			.then(data => {
				this.setState({
					allNotices: data["notices"]
				}, () => {
					console.log(this.state.allNotices);
				})
			}
			);
	}

	renderNotices(noticeType) {
		const { allNotices } = this.state;
		console.log(noticeType, allNotices);
		const notices = allNotices[noticeType].map(notice => {
			<div>
				{notice["title"]}
			</div>
		});
		return (
			<div height="500px" style={{ "overflow": "auto" }}>
				{notices}
			</div>
		);

	}


	render() {
		const { allNotices } = this.state;

		return (
			{(!allNotices) ? <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" >
				<Tab eventKey="General" title="General">
					{this.renderNotices("General")}
				</Tab>
				<Tab eventKey="Academic" title="Academic">
					{this.renderNotices("Academic")}
				</Tab>
				<Tab eventKey="Student" title="Student">
					{this.renderNotices("Student")}
				</Tab>
				<Tab eventKey="Hostel" title="Hostel">
					{this.renderNotices("Hostel")}
				</Tab>
			</Tabs> : NULL
	}
		)
}
}

export default App;
