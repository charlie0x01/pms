import React, { useState } from "react";
import Avatar from "react-avatar";

const TableWithCheckbox = ({ members, callBack }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = members?.data.map((item) => item.user_id);
      setSelectedItems(allItemIds);
    }
    setSelectAll(!selectAll);
  };

  return (
    <>
      <table className="table is-striped is-narrow is-hoverable table is-fullwidth">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                // onClick={handleSelectAllChange}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {members?.data.map((item) => (
            <tr key={item.user_id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.user_id)}
                  onChange={() => handleCheckboxChange(item.user_id)}
                />
              </td>
              <td>{`${item.first_name} ${item.last_name}`}</td>
              <td>{item.email}</td>
              <td>
                <div className="">
                  <Avatar
                    maxInitials={1}
                    name={`${item.first_name} ${item.last_name}`}
                    src={item.profile_picture}
                    round
                    size="28"
                    textSizeRatio={1.9}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{ fontWeight: 500, fontSize: 13 }}
        className="button is-small"
        onClick={() => callBack(selectedItems)}
      >
        Add to Broadcast List
      </button>
    </>
  );
};

export default TableWithCheckbox;
