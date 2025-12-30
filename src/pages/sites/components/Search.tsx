import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

type Props = {
  handleSearchOnChange: any;
};

const Search: React.FC<Props> = ({ handleSearchOnChange }) => {
  return (
    <InputGroup className="mb-2">
      <Form.Control
        id="inlineFormInput"
        placeholder="Search"
        onChange={handleSearchOnChange}
      />
    </InputGroup>
  );
};

export default Search;
