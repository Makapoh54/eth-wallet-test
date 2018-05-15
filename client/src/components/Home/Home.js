import React, { Component } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Table } from "reactstrap";
import SendModal from "../Modals";
import { TABLE_HEADERS, END_POINT } from "../../constants";
import "./Home.css";

class Home extends Component {
  state = {
    accountAudit: [],
    isLoading: false,
  };

  componentWillMount() {
    this.getAccountAudit();
  }

  getAccountAudit = () => {
    this.setState({ isLoading: true });
    axios
      .get(`${END_POINT}/audit`)
      .then(response =>
        this.setState({ accountAudit: response.data.data.accountAudit })
      );
    this.setState({ isLoading: false });
  }


  newWallet = async () => {
    this.setState({ isLoading: true });
    const response = await axios.post(`${END_POINT}/wallets`);
    if (response.status === 200) {
      // Notification
      this.getAccountAudit();
    }
    this.setState({ isLoading: false });
  }

  newToken = async () => {
    this.setState({ isLoading: true });
    const response = await axios.post(
      `${END_POINT}/tokens`, 
      {ownerAddress: this.state.accountAudit[0].accountAddress}
    );
    if (response.status === 200) {
      // Notification
      this.getAccountAudit();
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { accountAudit, isLoading } = this.state;
    return (
      <div className="Home">
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <h5 className="my-0 mr-md-auto font-weight-normal">Eth rinkeby wallet manager</h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <a className="p-2 text-dark">
              (Server is connected to real rinkeby network, transaction may take ~30 sec, please be patient)
            </a>
          </nav>
        </div>
        <Container className="Home-container">
          <Table responsive bordered>
            <thead>
              <tr>
                {TABLE_HEADERS.map(header => (
                  <th key={Math.random()}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accountAudit.map((account, index) => (
                <tr key={Math.random()}>
                  <td>{index + 1}</td>
                  <td>{account.accountAddress}</td>
                  <td>{(+account.ethBalance).toFixed(3)}</td>
                  <td>{account.tokenBalance}</td>
                  <td>
                    <SendModal
                      disabled={isLoading} 
                      getAccountAudit={this.getAccountAudit}
                      buttonLabel="Send"
                      fromAddress={account.accountAddress}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Button className="Home-button" outline color="primary" onClick={this.newWallet} disabled={isLoading} >
            {isLoading ? 'Creating...' : 'New wallet'}
            </Button>
            <Button outline color="primary" onClick={this.newToken} disabled={isLoading} >
            {isLoading ? 'Deploying...' : 'Deploy NEW Token'}
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
