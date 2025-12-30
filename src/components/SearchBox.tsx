/* eslint-disable no-unused-vars */
import React, { ChangeEvent, RefObject } from 'react';
import classNames from 'classnames';
import TextInput from './Form/TextInput';

type Props = {
  handleSearchOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search?: string;
  containerClass?: string;
  placeholder?: string;
  searchRef?: RefObject<HTMLInputElement>;
};

const SearchBox: React.FC<Props> = ({
  handleSearchOnChange,
  search,
  containerClass,
  placeholder,
  searchRef,
}) => {
  return (
    <div className={classNames(containerClass ?? '')}>
      <TextInput
        placeholder={placeholder ?? 'Search'}
        onChange={handleSearchOnChange}
        defaultValue={search}
        searchRef={searchRef}
      />
    </div>
  );
};

export default SearchBox;
