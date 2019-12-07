import React, { Component } from 'react';
import { Tab, Tabs, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import _ from 'underscore';

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
				})
			}
			);
	}

	renderNotices(noticeType) {
		const { allNotices } = this.state;
		const notices = allNotices[noticeType].map((notice, index) => {
			return (
				<ListGroupItem onClick={() => window.open(notice["file"], "_blank")} action="hover" key={index}>
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1" style={{ "width": "85%" }}>{notice["title"]}</h5>
						<small>{notice["date"]}</small>
					</div>
				</ListGroupItem>
			);
		});
		return (
			<ListGroup style={{ "overflow": "auto", "height": "200px" }}>
				{notices}
			</ListGroup>
		);

	}

	render() {
		const { allNotices } = this.state;
		return (
			<div>
				{
					!(_.isEmpty(allNotices)) ?
						<Tabs defaultActiveKey="General" id="uncontrolled-tab-example" >
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
						</Tabs> :
						<div style={{ "padding": "20% 50%" }}>
							<Spinner animation="grow" size="md" variant="primary" />
						</div>
				}
			</div>
		)
	}
}

export default App;
