import Page from 'components/Page';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader, CardImg,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

class HistoryPage extends React.Component {
  state = {
    sessions: []
  };

  componentDidMount() {
    let component = this;
    fetch(process.env.REACT_APP_API_URL + 'sessions').then(response => response.json()).then(
      sessions => component.setState({sessions})
    )
  }

  render() {
    return (
      <Page>
        {this.state.sessions.map((session) => (
          <div key={session.id}>
          <Row>
            <Col lg="3" md="4" sm="6" xs="12">
              <Card>
                <CardBody style={{}}>
                  <h2>Tirage n°{session.id}</h2>
                  <p>{session.creation_date}</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            {session.couples.map((couple, index) =>
              <Col lg="3" md="4" sm="6" xs="12" key={index}>
                <Card style={{padding: 10}}>
                  <Row>
                    <Col lg="6" md="6" sm="6" xs="6" style={{margin:0}}>
                      <img
                        alt="person"
                        src={require('../assets/media/' + couple.person_1.profile_picture)}
                        style={{ width: "auto", height: 100 }}
                      />
                    </Col>
                    <Col lg="6" md="6" sm="6" xs="6" style={{margin:0}}>
                      <img
                        alt="person"
                        src={require('../assets/media/' + couple.person_2.profile_picture)}
                        style={{ width: "auto", height: 100 }}
                      />
                    </Col></Row>
                </Card>
              </Col>
            )}
          </Row></div>))
        }
      </Page>
    );
  }
}

export default HistoryPage;
