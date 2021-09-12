import { useSearch } from "../../hooks/useSearch";
import styles from "./AddPartnerModal.module.css";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { useState } from "react";
import {
  assignUser,
  deleteUserFromProject,
} from "../../redux/ManagerView/actions";

export function AddPartnerModal({
  allUsers,
  setModalAddPartner,
  modalAddPartner,
  assignedUsers,
  projectId,
}) {
  const dispatch = useDispatch();
  const [mapState, setMapState] = useState(assignedUsers);

  const customStyles = {
    content: {
      padding: "40px",
      inset: "unset",
      width: "100%",
      maxHeight: "550px",
      borderRadius: "8px",
      overflowY: "unset",
      overflowX: "unset",
      maxWidth: "650px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "grid",
      placeItems: "center",
      zIndex: "100000",
    },
  };

  function deleteUser(userId) {
    assignedUsers = mapState.filter((v) => {
      return v._id !== userId;
    });

    setMapState(assignedUsers);
    dispatch(deleteUserFromProject(projectId, userId));
  }

  const handleAddUser = (user, userId) => {
    if (!mapState.find((e) => e._id === user._id)) {
      setMapState([...mapState, user]);
      dispatch(assignUser(projectId, userId));
    }
  };

  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [query, setQuery, filteredUsers] = useSearch(allUsers);

  return (
    <Modal
      style={customStyles}
      isOpen={modalAddPartner}
      onRequestClose={() => setModalAddPartner(false)}
    >
      <header className={styles.modalHeader}>
        <h2>Add Partner</h2>
        <button onClick={() => setModalAddPartner(false)}>
          <IoClose size={30} />
        </button>
      </header>
      <h3 style={{ fontWeight: "600", fontSize: "20px" }}>Current users in project</h3>
      <div
        style={{
          maxHeight: "100px",
          overflowY: "scroll",
          marginBottom: "30px",
        }}
        className={styles.divAdded}
      >
        <div className={styles.addedUsers}>
          {mapState && mapState.length > 0 ? (
            mapState.map((e, i) => {
              return (
                <div className={styles.addedUsersCard}>
                  {e.key}
                  <img src={e.picture} alt={e.username} />
                  <p>{e.name.split(" ")[0]}</p>
                  <button type="button" onClick={() => deleteUser(e._id)}>
                    <IoClose size={15} />
                  </button>
                </div>
              );
            })
          ) : (
            <h3>no users assigned yet</h3>
          )}
        </div>
      </div>
      <div className={`${styles.modalFormGroup} ${styles.selectUserContainer}`}>
        <label>Add a new user</label>
        <input
          onBlur={() => setIsSelectUsersOpen(false)}
          onFocus={() => setIsSelectUsersOpen(true)}
          type="text"
          name="Users"
          placeholder="Search for a new user..."
          value={query}
          autoComplete="off"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className={`${styles.modalSelectUser} ${
            isSelectUsersOpen ? styles.visible : undefined
          }`}
          style={{zIndex: "190000"}}
        >
          {filteredUsers.length ? (
            filteredUsers
              .filter((value) => {
                return !mapState.find((value2) => {
                  return value2._id === value._id;
                });
              })
              .map((user) => (
                <article
                  onClick={() => handleAddUser(user, user._id)}
                  key={user._id}
                  className={styles.modalUser}
                >
                  <img src={user.picture} alt={user.name} />
                  <p>{user.name}</p>
                </article>
              ))
          ) : (
            <p>There's no user with that name :(</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
