import React from "react";
import axios from "axios";
import {
  Input,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import SelectInput from "../Common";
import { END_POINT, TRANSFER_TYPES } from "../../constants"

class SendModal extends React.Component {
  state = {
    modal: false,
    accountAddresses: [],
    toAddress: "",
    amount: null,
    isLoading: false,
    transferType: "eth",
  };

  getAccountAddresses = async () => {
    const response = await axios.get(`${END_POINT}/wallets`);
    if (response.data) {
      return response.data.data.accountAddresses;
    }
    return [];
  };

  getLastToken = async () => {
    const response = await axios.get(`${END_POINT}/tokens/last`);
    if (response.data) {
      return response.data.data.tokenAddress;
    }
    return [];
  };

  toggle = async () => {
    const accountAddresses = !this.state.modal
      ? await this.getAccountAddresses()
      : [];
    this.setState({
      accountAddresses,
      modal: !this.state.modal,
      toAddress: accountAddresses[0]
    });
  };

  makeTransfer = async () => {
    this.setState({ isLoading: true });
    const { toAddress, amount, transferType } = this.state;
    const args = { toAddress };
    args[`${transferType}Amount`] = amount;
    let url;
    if (this.state.transferType === TRANSFER_TYPES[0]) {
      url = `${END_POINT}/wallets/${this.props.fromAddress}/transfers`;
    } else {
      const tokenAddress = await this.getLastToken();
      url = `${END_POINT}/tokens/${tokenAddress}/accounts/${this.props.fromAddress}/transfers`;
    }
    const response = await axios.post(url, { ...args });
    if (response.status === 200 ) {
      // Notification
      this.props.getAccountAudit();
      this.toggle();
    }
    this.setState({ isLoading: false });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
 

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <Button color='primary' onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          className={this.props.className}
        >
          <ModalHeader>Transfer currency</ModalHeader>
          <ModalBody>
            <SelectInput
              title="Select recipient"
              dropdownItems={this.state.accountAddresses}
              name="toAddress"
              onChange={this.onChange}
            />
            <SelectInput
              title="Select transferred currency type"
              dropdownItems={TRANSFER_TYPES}
              name="transferType"
              onChange={this.onChange}
            />
            <FormGroup>
              <Label for="exampleEmail">Currency Amount</Label>
              <Input
                type="number"
                min={0}
                max={1000}
                name="amount"
                placeholder="Value from 0 to 1000"
                onChange={this.onChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.makeTransfer} disabled={isLoading}>
              {isLoading ? 'Sending' : 'Send'}
            </Button>
            <Button color="secondary" onClick={this.toggle} disabled={isLoading} >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SendModal;
