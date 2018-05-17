import React from 'react';
import { FormGroup, Label, Input, } from 'reactstrap';

const SelectInput = props => (
  <FormGroup>
    <Label for="exampleSelect">{props.title}</Label>
    <Input type="select" name={props.name} onChange={props.onChange}>
      {props.dropdownItems.map(item => <option key={item}>{item}</option>)}
    </Input>
  </FormGroup>
);

export default SelectInput;