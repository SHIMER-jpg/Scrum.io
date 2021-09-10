import { useSearch } from "../../hooks/useSearch";
import styles from "./AddPartnerModal.module.css";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import {
  assignUser,
  deleteUserFromProject,
  getAsignedUsers,
} from "../../redux/ManagerView/actions";

export function AddPartnerModal({
  allUsers,
  setModalAddPartner,
  modalAddPartner,
  assignedUsers,
  projectId,
}) {
  const [values, setValues] = useState({
    Users: [],
  });
  const dispatch = useDispatch();
  const [mapState, setMapState] = useState(assignedUsers);

  const customStyles = {
    content: {
      padding: "40px",
      inset: "unset",
      width: "100%",
      maxHeight: "550px",
      borderRadius: "8px",
      maxWidth: "650px",
      height: "100%",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "grid",
      placeItems: "center",
      zIndex: "100000",
    },
  };

  useEffect(() => {
    dispatch(getAsignedUsers(projectId));
  }, [mapState]);

  function deleteUser(userId) {
    console.log(userId);

    assignedUsers = mapState.filter((v) => {
      return v._id !== userId;
    });
    setMapState(assignedUsers);
    console.log(assignedUsers);
    dispatch(deleteUserFromProject(projectId, userId));
  }

  const handleAddUser = (user, userId) => {
    if (!mapState.find((e) => e._id === user._id)) {
      setMapState([...mapState, user]);
      dispatch(assignUser(projectId, userId));
    }
  };

  console.log(mapState);

  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);

  const [query, setQuery, filteredUsers] = useSearch(allUsers);

  const handleRemoveUser = (user, userId) => {
    setValues({
      ...values,
      Users: values.Users.filter((u) => u !== user._id),
    });
    dispatch(deleteUserFromProject(projectId, userId));
  };

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
      </header>{" "}
      <h3 style={{ color: "" }}>Current users in project</h3>
      <div className={styles.divAdded}>
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
        <label>Users</label>
        <input
          onBlur={() => setIsSelectUsersOpen(false)}
          onFocus={() => setIsSelectUsersOpen(true)}
          type="text"
          name="Users"
          value={query}
          autoComplete="off"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className={`${styles.modalSelectUser} ${
            isSelectUsersOpen ? styles.visible : undefined
          }`}
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
