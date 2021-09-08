/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage } from "formik"
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

const CreateProjectModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);

  const users = useSelector((state) => state.home.users);
  const loggedUser = useSelector((state) => state.app.loggedUser);

  const [values, setValues] = useState({
    projectName: "",
    requiredDate: "",
    sprintCount: "",
    sprintDuration: "",
    Users: [],
    description: "",
  });

  const [query, setQuery, filteredUsers] = useSearch(users);

  useEffect(() => {
    console.log("fetchuser", loggedUser);
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
    }
    setQuery("");
  };

  const handleRemoveUser = (user) => {
    setValues({
      ...values,
      Users: values.Users.filter((u) => u !== user._id),
    });
  };

  //FALTA VALIDAR EL FORM NO NOS OLVIDEMOS
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    dispatch(createProject({ ...values, scrumMaster: loggedUser._id }));

    setValues({
      projectName: "",
      requiredDate: "",
      sprintCount: "",
      sprintDuration: "",
      Users: [],
      description: "",
    });
    setIsModalOpen(false);
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
        initialValues={{
          projectName: "",
          startDate: "",
          requiredDate:"",
          description: "",
          sprintAmount: "",
          srpintDuration: "",
        }}
        validationSchema={Yup.object({
          projectName: Yup.string()
            .required("The project must have a name."),
          startDate: Yup.date()
            .required("You must provide a start date."),
            requiredDate: Yup.date()
            .when("startDate", (startDate, Yup) => startDate && Yup.min(
              startDate, "Error. Cannot be before Start Date."
              )),
          sprintAmount: Yup.number()
            .required("You must provide the amounts of sprints."),
          sprintDuration: Yup.number()
            .required("You must provide the duration of sprints."),
          description: Yup.string()
            .required("It must have a description."),
        })}
      >
        <Form onSubmit={handleSubmit} styles={styles.modalBody}>
          <Field as="div" className={styles.modalFormGroup}>
            <label>Title</label>
            <Field 
              name="projectName"
              type="text"
              placeholder="Name of your project"
            />
            <ErrorMessage name="projectName" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </Field>
          <Field as="div" className={styles.modalFormGroup}>
            <label>Start Date</label>
            <Field 
              name="startDate"
              type="date"
              placeholder="DD/MM/AAAA"
            />
            <ErrorMessage name="startDate" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </Field>
          <Field as="div" className={styles.modalFormGroup}>
              <label>Required Date</label>
            <Field 
              name="requiredDate"
              type="date"
              placeholder="DD/MM/AAAA"
            />
            <ErrorMessage name="requiredDate" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </Field>  
          <Field as="div" className={styles.modalFormGroup}>
            <label>Amount of Sprints</label>
            <Field 
              name="sprintAmount"
              type="number"
              placeholder="Amount of Sprints"
              min="1"
              max="20"
            />
            <ErrorMessage name="sprintAmount" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
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
            />
            <ErrorMessage name="sprintDuration" component="div">
              { msg => <div style={{ color: 'red' }}>{msg}</div> }
            </ErrorMessage>
          </Field>
          <Field as="div" className={`${styles.modalFormGroup} ${styles.selectUserContainer}`}>
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
              <Field as="div" className={`${styles.modalSelectUser} ${isSelectUsersOpen ? styles.visible : undefined}`}>
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
          </Field>
          <Field as="div" className={styles.addedUsers}>
            {users
              .filter((user) => values.Users.includes(user._id)).map((user) => (
                <article key={user._id} className={styles.addedUsersCard}>
                  <img src={user.picture} alt={user.name} />
                  <p>{user.name.split(" ")[0]}</p>
                  <button onClick={() => handleRemoveUser(user)}>
                    <IoClose size={15} />
                  </button>
                </article>
              ))
            }
          </Field>
          <Field as="div" className={styles.modalFormGroup}>
            <label>Description</label>
            <textarea 
              name="description"
              type="textarea"
              placeholder="Description"
            />
          <ErrorMessage name="description" component="div">
            { msg => <div style={{ color: 'red' }}>{msg}</div> }
          </ErrorMessage>
          </Field>
          <Field as="div" className={styles.modalFormGroup}>
            <button type="submit">Create project</button>
          </Field>
        </Form>
      </Formik>
    </Modal>
  );
};

export default CreateProjectModal;