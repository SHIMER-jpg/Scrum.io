/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useSearch } from "../../hooks/useSearch";
import { fetchUsers, createProject } from "../../redux/Home/actions";

import styles from "./CreateProjectModal.module.css";

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

const CreateProjectModal = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [usersError, setUsersError] = useState(null);

  const users = useSelector((state) => state.home.users);
  const loggedUser = useSelector((state) => state.app.loggedUser);

  const [values, setValues] = useState({
    projectName: "",
    // startDate: "",
    requiredDate: "",
    sprintCount: "",
    sprintDuration: "",
    Users: [],
    description: "",
  });

  const [query, setQuery, filteredUsers] = useSearch(users);

  useEffect(() => {
    dispatch(fetchUsers(loggedUser));
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = (user) => {
    if (!values.Users.includes(user._id)) {
      setValues({
        ...values,
        Users: [...values.Users, user._id],
      });

      setUsersError(null);
    }
    setQuery("");
  };

  const handleRemoveUser = (user) => {
    setValues({
      ...values,
      Users: values.Users.filter((u) => u !== user._id),
    });
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <header className={styles.modalHeader}>
        <h2>Create project</h2>
        <button onClick={() => setIsModalOpen(false)}>
          <IoClose size={30} />
        </button>
      </header>
      <Formik
        initialValues={values}
        validationSchema={Yup.object({
          projectName: Yup.string().required("The project must have a name."),
          // startDate: Yup.date().required("You must provide a start date."),
          // requiredDate: Yup.date()
          //   .required("You must provide a finish date")
          //   .when(
          //     "startDate",
          //     (startDate, Yup) =>
          //       startDate &&
          //       Yup.min(
          //         startDate,
          //         "The required date cannot be before start date."
          //       )
          //   ),
          requiredDate: Yup.date().required("You must provide a finish date"),
          sprintCount: Yup.number().required(
            "You must provide the amount of sprints."
          ),
          sprintDuration: Yup.number().required(
            "You must provide the duration of sprints."
          ),
          description: Yup.string().required("You must provide a description."),
        })}
        onSubmit={(_, actions) => {
          if (!values.Users.length) {
            setUsersError("You must add at least one user to the project");
            actions.setSubmitting(false);
          } else {
            dispatch(createProject({ ...values, scrumMaster: loggedUser._id }));

            setValues({
              projectName: "",
              requiredDate: "",
              // startDate: "",
              sprintCount: "",
              sprintDuration: "",
              Users: [],
              description: "",
            });

            setIsModalOpen(false);
          }
        }}
      >
        {({ isSubmitting, isValidating }) => (
          <Form styles={styles.modalBody}>
            <Field as="div" className={styles.modalFormGroup}>
              <label>Project name</label>
              <Field placeholder="Type the name of the project" name="projectName" type="text" onChange={handleChange} />
              <ErrorMessage name="projectName" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            {/* <Field as="div" className={styles.modalFormGroup}>
              <label>Start Date</label>
              <Field name="startDate" type="date" onChange={handleChange} />
              <ErrorMessage name="startDate" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field> */}
            <Field as="div" className={styles.modalFormGroup}>
              <label>Required Date</label>
              <Field name="requiredDate" type="date" onChange={handleChange} />
              <ErrorMessage name="requiredDate" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field as="div" className={styles.modalFormGroup}>
              <label>Amount of Sprints</label>
              <Field
                name="sprintCount"
                type="number"
                placeholder="Amount of Sprints"
                min="1"
                max="20"
                onChange={handleChange}
              />
              <ErrorMessage name="sprintCount" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field as="div" className={styles.modalFormGroup}>
              <label>Sprint Duration (weeks)</label>
              <Field
                name="sprintDuration"
                type="number"
                placeholder="Sprint Duration"
                min="1"
                max="4"
                onChange={handleChange}
              />
              <ErrorMessage name="sprintDuration" component="div">
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
              <label>Users</label>
              <input
                onBlur={() => setIsSelectUsersOpen(false)}
                onFocus={() => setIsSelectUsersOpen(true)}
                type="text"
                placeholder="Search for users..."
                value={query}
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
                  filteredUsers
                    .filter((user) => !values.Users.includes(user._id))
                    .map((user) => (
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
            </Field>
            <Field as="div" className={styles.addedUsers}>
              {users
                .filter((user) => values.Users.includes(user._id))
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
            <Field as="div" className={styles.modalFormGroup}>
              <label>Description</label>
              <textarea
                name="description"
                type="textarea"
                placeholder="Description"
                onChange={handleChange}
              />
              <ErrorMessage name="description" component="div">
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
                Create project
              </button>
            </Field>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default CreateProjectModal;
