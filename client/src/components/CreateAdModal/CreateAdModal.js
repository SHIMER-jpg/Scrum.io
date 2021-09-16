import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { createAdvertisement } from '../../redux/NoteDetail/actions'

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

export default function CreateAdModal(props){
//FALTA VALIDAR EL BOTON DE CREATE PARA QUE NO CIERRE EL MODAL SI NO CUMPLE LAS CONDICIONES  
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: "",
    description: "",
    projectId: props.projectId
  })

  function handleChange(e){
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(createAdvertisement(input))
    props.setIsModalOpen(false)
    setInput({
      title: "",
      description: ""
    })
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
          title: Yup.string().required('It must have a title.'),
          description: Yup.string().required('You must provide a description.')
        })}
        onSubmit={(_, actions) => {
          if (!input.title || !input.description) {
            actions.setSubmitting(false);
          } else {
            dispatch(createAdvertisement({ ...input}));
            setInput({
              title: "",
              description: "",
            });
            props.setIsModalOpen(false);
          }
        }}
        >
        {({isSubmitting, isValidating}) => (
          <Form className={styles.modalBody} onSubmit={(e)=>handleSubmit(e)}>
            <Field as='div' className={styles.modalFormGroup}>
              <label>Title:</label>
              <Field
                placeholder='Title of your ad'
                name="title"
                type="text"
                onChange={(e)=>handleChange(e)}
              />
              <ErrorMessage name="title" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field as='div' className={styles.modalFormGroup}>
              <label>Description:</label>
              <Field
                type= "text"
                name= "description"
                value={input.description}
                placeholder= "Description"
                onChange={(e)=>handleChange(e)} 
              />
              <ErrorMessage name="description" component="div">
                {(msg) => (
                  <p className={styles.errorMessage} style={{ color: "red" }}>
                    {msg}
                  </p>
                )}
              </ErrorMessage>
            </Field>
            <Field as='div' className={styles.modalFormGroup}>
              <button disabled={isSubmitting && !isValidating} type="submit">
                Create
              </button>
            </Field>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
