import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAdvertisement } from "../../redux/NoteDetail/actions";

import styles from "./CreateAdModal.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

export default function CreateAdModal(props) {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: "",
    description: "",
    color: "",
    projectId: props.projectId,
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Modal
      style={customStyles}
      isOpen={props.isModalOpen}
      onRequestClose={() => props.setIsModalOpen(false)}
    >
      <header className={styles.modalHeader}>
        <h2>Create Advertisement</h2>
        <button onClick={() => props.setIsModalOpen(false)}>
          <IoClose size={30} />
        </button>
      </header>
      <Formik
        initialValues={input}
        validationSchema={Yup.object({
          title: Yup.string().required("It must have a title."),
          description: Yup.string().required("You must provide a description."),
        })}
        onSubmit={(_, actions) => {
          if (!input.title || !input.description) {
            actions.setSubmitting(false);
          } else {
            dispatch(createAdvertisement({ ...input }));
            setInput({
              title: "",
              description: "",
            });
            props.setIsModalOpen(false);
          }
        }}
      >
        {({ isSubmitting, isValidating }) => (
          <Form className={styles.modalBody}>
            <Field as="div" className={styles.modalFormGroup}>
              <label>Title:</label>
              <Field
                placeholder="Title of your ad"
                name="title"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <ErrorMessage name="title" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field as="div" className={styles.modalFormGroup}>
              <label>Description:</label>
              <textarea
                type="text"
                name="description"
                value={input.description}
                placeholder="Description"
                onChange={(e) => handleChange(e)}
              />
              <ErrorMessage name="description" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field className={styles.modalFormGroup} as="div">
              <label>Color</label>
              <select
                name="color"
                value={input.color}
                required
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select a color</option>
                <option value="Lightblue">Light Blue</option>
                <option value="Orange">Orange</option>
                <option value="Pink">Pink</option>
                <option value="Purple">Purple</option>
                <option value="Green">Green</option>
                <option value="Blueviolet">Blueviolet</option>
                <option value="Azure">Azure</option>
                <option value="Teal">Teal</option>
              </select>
              <ErrorMessage name="selectColors" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field as="div" className={styles.modalFormGroup}>
              <button disabled={isSubmitting && !isValidating} type="submit">
                Create
              </button>
            </Field>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
