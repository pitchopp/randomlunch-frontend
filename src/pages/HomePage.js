import Page from 'components/Page';
import React from 'react';
import {
  Button, Card, CardBody, CardImg, CardText, CardTitle,
  Col, Modal, ModalBody, ModalFooter,
  Row,
} from 'reactstrap';

class HomePage extends React.Component {
  state = {
    persons: [],
    modal: false,
    sessionLoaded: false,
    session: null
  };

  componentDidMount() {
    let component = this;
    fetch(process.env.REACT_APP_API_URL + 'persons').then(
      response => response.json()
    ).then(
      (persons) => {
        component.setState({persons});
      }
    ).catch(
      error => {console.log(error)}
    )
  }

  randomLunch = () => {
    this.setState({sessionLoaded: false});
    this.toggle();
    let component = this;
    fetch(process.env.REACT_APP_API_URL + 'sessions/random', {
      method: 'POST'}).then(response => {
      let i;
      return response.json()
    }).then(
      (responseJson) => {
        console.log(responseJson)
        component.setState({session: responseJson, sessionLoaded: true});
      }
    ).catch(
      error => {console.log(error)}
    );
  };

  toggle = () => {
    this.setState({modal: !this.state.modal})
  };

  validateSession = () => {
    this.toggle();
    fetch(process.env.REACT_APP_API_URL + 'sessions/' + this.state.session.id.toString() + '/validate', {method: 'PUT'})
  };

  render() {
    return (
      <Page>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
            <Card>
              <CardImg top src={require('../assets/img/map/map-equipe.jpg')} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Button color="primary" size="lg" block onClick={this.randomLunch}>
              Lancer le Random Lunch !
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              backdrop>
              <ModalBody style={{padding: this.state.sessionLoaded ? 15: 0}}>
                {!this.state.sessionLoaded &&

                <img
                  alt="gif roulette"
                  style={{ width: '100%', height: '100%' }}
                  src={require('../assets/img/roulettes/roulette.gif')}/>
                }
                {this.state.sessionLoaded && this.state.session &&
                <Row className="justify-content-center">
                  {this.state.session.couples.map((couple, index) => (
                      <Card key={index} style={{padding: 10, marginBottom: 10}}>
                        <Row>
                          <Col lg="6" md="6" sm="6" xs="6" style={{margin:0}}>
                            <img
                              alt="person"
                              src={process.env.REACT_APP_SOURCE_URL + couple.person_1.profile_picture}
                              style={{ width: "auto", height: 100 }}
                            />
                          </Col>
                          <Col lg="6" md="6" sm="6" xs="6" style={{margin:0}}>
                            <img
                              alt="person"
                              src={process.env.REACT_APP_SOURCE_URL + couple.person_2.profile_picture}
                              style={{ width: "auto", height: 100 }}
                            />
                          </Col></Row>
                      </Card>
                  ))
                  }
                </Row>
                }
              </ModalBody>
              {this.state.sessionLoaded && this.state.session &&
              <ModalFooter>
                <Button color="primary" onClick={this.validateSession}>
                  Valider la session
                </Button>{' '}
                <Button color="secondary" onClick={this.toggle}>
                  Annuler
                </Button>
              </ModalFooter>
              }
            </Modal>
          </Col>
        </Row>
        <Row>
          {this.state.persons.map((person) => {
            return <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
              <Card key={person.id} className="flex-row">
                {person.profile_picture &&
                <CardImg
                  className="card-img-left"
                  src={process.env.REACT_APP_SOURCE_URL + person.profile_picture}
                  style={{ width: 150, height: 150 }}
                />}
                <CardBody>
                  <CardTitle>{person.first_name} {person.last_name}</CardTitle>
                  <CardText>
                    {person.mission}<br/>
                    {person.client && "Chez " + person.client.name} ({person.location.name})<br/>
                    {person.phone_number && "Tél: " + person.phone_number}
                  </CardText>
                </CardBody>
              </Card>
            </Col>})}
        </Row>
      </Page>
    );
  }
}

export default HomePage;
