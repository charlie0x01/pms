import React, { useState, useEffect } from "react";
import { useGetMembersQuery } from "../../apis/projectApi";
import { useParams } from "react-router-dom";
import Modal from "../common/Modal";

const SelectMembers = ({ isOpen, setIsOpen, callback, assginees }) => {
  const [selectedRows, setSelectedRows] = useState(
    assginees ? [...assginees] : []
  );
  console.log(selectedRows);
  const handleRowSelect = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  // get members
  const {
    isLoading,
    error,
    data: members,
  } = useGetMembersQuery(useParams().projectId);

  useEffect(() => {}, [selectedRows]);

  return (
    <Modal show={isOpen}>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {members &&
            members?.data.map((member, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleRowSelect(member.user_id)}
                      checked={selectedRows.includes(member.user_id)}
                    />
                  </td>
                  <td>{member.user_id}</td>
                  <td>{`${member.first_name} ${member.last_name}`}</td>
                  <td>{member.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button
        onClick={() => {
          callback(selectedRows);
          setIsOpen(false);
        }}
        className="button is-primary"
      >
        Assign
      </button>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className="ml-2 button is-danger"
      >
        Cancel
      </button>
    </Modal>
  );
};

export default SelectMembers;
