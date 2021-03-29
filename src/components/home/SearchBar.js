import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus as searchIcon,
  faUserPlus as addUserIcon,
} from "@fortawesome/free-solid-svg-icons";
import { debounce } from "../../utils/globalFunctions";

const SearchBar = ({ handleSearch, searchUser, handleAddUser }) => {
  const [search, setSearch] = useState("");
  const [db, setDb] = useState(null);

  useEffect(() => {
    console.log('here')
    setDb(() => debounce(handleSearch, 500)); 
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };


  const searchUsers = (e) => {
    setSearch(e.target.value);
    console.log(db)
    db(e.target.value);

  }

  return (
    <>
      <form onSubmit={handleSubmit} className="search--container m-2">
        <input
          className="w-100 py-2 pl-3 pr-5"
          type="text"
          value={search}
          onChange={searchUsers}
          placeholder="Search Users..."
        />
        <FontAwesomeIcon
          type="submit"
          title="search"
          icon={searchIcon}
          onClick={handleSubmit}
          className="searchIcon"
        />
      </form>
      <ul className="list-group overflow-auto">
        {searchUser &&
          searchUser.map((user) => {
            user.request = false;
            return (
              <li key={user.id} className="btn list-group-item p-2 d-flex">
                <span className="text-truncate mr-auto">{user.email}</span>
                <FontAwesomeIcon
                  icon={addUserIcon}
                  onClick={() => handleAddUser(user.id)}
                  className="my-auto"
                />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default SearchBar;
