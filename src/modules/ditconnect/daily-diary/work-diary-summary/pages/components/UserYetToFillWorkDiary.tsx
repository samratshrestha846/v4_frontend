import { User } from '@uhub/types/user/user';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

type Props = {
  users: User[];
};

const UserYetToFillWorkDiary: React.FC<Props> = ({ users }) => {
  const [localSearch, setLocalSearch] = useState<string>();
  const [userList, setUserList] = useState<User[]>(users);

  // Debounced search input handler
  const handleSearchOnChange = debounce((e) => {
    setLocalSearch(e.target.value);
  }, 300);

  // Use useMemo to optimize filtering
  const filteredUsers = useMemo(() => {
    if (!localSearch) return users;
    return users.filter(
      (item) =>
        item.first_name.toLowerCase().includes(localSearch.toLowerCase()) ||
        item.last_name.toLowerCase().includes(localSearch.toLowerCase())
    );
  }, [localSearch, users]);

  // Update user list when filteredUsers changes
  useEffect(() => {
    setUserList(filteredUsers);
  }, [filteredUsers]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-3">
        <h5 className="text-primary-color my-2">
          Users Yet To Create Work Diary
        </h5>
        <div>
          <input
            onChange={handleSearchOnChange}
            className="form-control"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="d-flex justify-content-start align-items-center flex-wrap gap-2 wrapper-max-height-12">
        {userList?.map((item, key) => (
          <span
            key={key}
            className="bg-light px-2 py-1 rounded-4 text-gray fw-semibold">
            {`${item.first_name} ${item.last_name}`}
          </span>
        ))}
      </div>
    </>
  );
};

export default UserYetToFillWorkDiary;
