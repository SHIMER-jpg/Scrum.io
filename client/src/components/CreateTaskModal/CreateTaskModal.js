/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useSearch } from "../../hooks/useSearch";
import { createTask } from "../../redux/ManagerView/actions";

import styles from "../CreateProjectModal/CreateProjectModal.module.css";



Modal.setAppElement("#root");

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

const CreateTaskModal = ({
  isModalOpen,
  setIsModalOpen,
  assignedUsers,
  projectId,
}) => {
  const dispatch = useDispatch();
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [usersInProject, setUsersInProject] = useState([]);

  const [usersError, setUsersError] = useState(null);

  const loggedUser = useSelector((state) => state.app.loggedUser);

  const [values, setValues] = useState({
    title: "",
    assignedTo: "",
    storyPoints: "",
    priorization: "Easy Win",
    details: "",
  });

  const [query, setQuery, filteredUsers] = useSearch(usersInProject);

  useEffect(() => {
    const filteredUsers = assignedUsers
      .filter(({ user }) => user._id !== loggedUser._id)
      .map((u) => u.user);

    setUsersInProject(filteredUsers);
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = (user) => {
    if (!values.assignedTo.includes(user._id)) {
      setValues({
        ...values,
        assignedTo: user._id,
      });

      setUsersError(null);
    }
    setQuery("");
  };

  const handleRemoveUser = () => {
    setValues({
      ...values,
      assignedTo: "",
    });
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <header className={styles.modalHeader}>
        <h2>Create task</h2>
        <button onClick={() => setIsModalOpen(false)}>
          <IoClose size={30} />
        </button>
      </header>
      <Formik
        initialValues={values}
        validationSchema={Yup.object({
          title: Yup.string().required("The task must have a name"),
          priorization: Yup.string().required(
            "You must indicate the priorization level"
          ),
          details: Yup.string().required(
            "You must write a description for the task"
          ),
        })}
        onSubmit={(_, actions) => {
          if (!values.assignedTo) {
            setUsersError(
              "You must indicate the assigned developer for this task"
            );
            actions.setSubmitting(false);
          } else {
            dispatch(createTask({ ...values, projectId }));

            setValues({
              title: "",
              assignedTo: "",
              storyPoints: "",
              priorization: "",
              details: "",
            });

            setIsModalOpen(false);
          }
        }}
      >
        {({ isSubmitting, isValidating }) => (
          <Form styles={styles.modalBody}>
            <Field as="div" className={styles.modalFormGroup}>
              <label>Title</label>
              <Field
                placeholder="Type the title of the task"
                name="title"
                type="text"
                onChange={handleChange}
              />
              <ErrorMessage name="title" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field
              as="div"
              className={`${styles.modalFormGroup} ${styles.selectUserContainer}`}
            >
              <label>Assigned developer</label>
              <input
                onBlur={() => setIsSelectUsersOpen(false)}
                onFocus={() => setIsSelectUsersOpen(true)}
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={query}
                placeholder="Type a name..."
                autoComplete="off"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Field
                as="div"
                className={`${styles.modalSelectUser} ${
                  isSelectUsersOpen ? styles.visible : undefined
                }`}
              >
                {filteredUsers.length ? (
                  filteredUsers.map((user) => (
                    <article
                      onClick={() => handleAddUser(user)}
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
              </Field>
              <ErrorMessage name="assignedTo" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field as="div" className={styles.addedUsers}>
              {usersInProject
                .filter((user) => values.assignedTo.includes(user._id))
                .map((user) => (
                  <article key={user._id} className={styles.addedUsersCard}>
                    <img src={user.picture} alt={user.name} />
                    <p>{user.name.split(" ")[0]}</p>
                    <button onClick={() => handleRemoveUser(user)}>
                      <IoClose size={15} />
                    </button>
                  </article>
                ))}
            </Field>
            <Field className={styles.modalFormGroup} as="div">
              <label>Story points</label>
              <Field
                placeholder="Type the amount of story points"
                name="storyPoints"
                type="number"
                onChange={handleChange}
              />
              <ErrorMessage name="storyPoints" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field className={styles.modalFormGroup} as="div">
              <label>Priorization</label>
              <select
                placeholder="Type the amount of story points"
                name="priorization"
                value={values.priorization}
                onChange={handleChange}
              >
                <option value="Easy Win">Easy win</option>
                <option value="Deprioritize">Deprioritize</option>
                <option value="Worth Pursuing">Worth pursuing later</option>
                <option value="Strategic Initiative">
                  Strategic initiative
                </option>
              </select>
              <ErrorMessage name="priorization" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field className={styles.modalFormGroup} as="div">
              <label>Details</label>
              <textarea
                name="details"
                id="details"
                cols="15"
                placeholder="Type the task's details..."
                value={values.details}
                onChange={handleChange}
              ></textarea>
              <ErrorMessage name="details" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            {usersError && (
              <div className={styles.userValidationError}>
                <BiErrorCircle size={20} /> {usersError}
              </div>
            )}
            <Field as="div" className={styles.modalFormGroup}>
              <button disabled={isSubmitting && !isValidating} type="submit">
                Create task
              </button>
            </Field>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateTaskModal;