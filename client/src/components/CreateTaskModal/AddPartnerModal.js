import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export function AddPartnerModal({
  allUsers,
  setModalAddPartner,
  modalAddPartner,
  assignedUsers,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    AddPartnerModal(false);
  }

  function deleteUser(e) {
    console.log(e);
  }

  function filterUser(e) {
    var dataobj = allUsers.users.filter((value) => {
      return value._id === e;
    });

    for (let i = 0; i < allUsers.users.length; i++) {
      if (allUsers.users[i]._id === dataobj[0]._id) {
        assignedUsers.push(allUsers.users[i]);
      }
    }
  }

  const customStyles = {
    content: {
      padding: "40px",
      inset: "unset",
      width: "100%",
      maxHeight: "90vh",
      borderRadius: "8px",
      maxWidth: "650px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "grid",
      placeItems: "center",
      zIndex: "100000",
    },
  };

  console.log(assignedUsers);

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={modalAddPartner}
        onRequestClose={() => setModalAddPartner(false)}
      >
        <h2>Add Partner</h2>
        <button onClick={() => setModalAddPartner(false)}>
          <IoClose size={30} />
        </button>
        <form onChange={(e) => handleSubmit(e)}>
          <div>
            <h3>Current Users</h3>
            {assignedUsers && assignedUsers.length > 0 ? (
              assignedUsers.map((e) => {
                return (
                  <div>
                    <div>{e.name}</div>
                    <button
                      type="button"
                      style={{ border: "none" }}
                      onClick={() => deleteUser(e._id)}
                    >
                      <img src={e.picture} alt={e.username} />
                    </button>
                  </div>
                );
              })
            ) : (
              <h1>what</h1>
            )}
            <h3>Users to Add</h3>
            {
              (console.log(allUsers),
              allUsers && allUsers.users.length > 0
                ? allUsers.users
                    .filter((userA) => {
                      return !assignedUsers.find((userB) => {
                        return userA._id === userB._id;
                      });
                    })
                    .map((e) => {
                      return (
                        <div>
                          <div>{e.name}</div>
                          <button
                            type="button"
                            style={{ border: "none" }}
                            onClick={() => filterUser(e._id)}
                          >
                            <img src={e.picture} alt={e.username} />
                          </button>
                        </div>
                      );
                    })
                : null)
            }
          </div>
          <button type="submit">Add!</button>
        </form>
      </Modal>
    </div>
  );
}
