import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { updateTask } from '../../redux/ManagerView/actions';
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { BiSave } from "react-icons/bi";
import styles from "./EditTaskModal.module.css";
import * as Yup from "yup";

export default function EditTaskModal ({isModalOpen, setIsModalOpen, _id}) {
   const customStyles = {
      content: {
         padding: "10px",
         inset: "unset",
         width: "400px",
         height: "150px",
         borderRadius: "8px",
      },
      overlay: {
         backgroundColor: "rgba(0,0,0,0.5)",
         display: "grid",
         float: "left",
         placeItems: "center",
         zIndex: "100000",
      },
   };

   const dispatch = useDispatch();
   const [values, setValues] = useState({
      id: _id,
      title: "",
   });

   const handleChange = (e) => {
      setValues({
         ...values,
         [e.target.name]: e.target.value,
      });
   };

   return(
      <Modal
         style={customStyles}
         isOpen={isModalOpen}
         onRequestClose={() => setIsModalOpen(false)}
      >
         <header className={styles.modalHeader}>
            <button onClick={() => setIsModalOpen(false)}>
              <IoClose size={30}/>
            </button>
         </header>
         <Formik 
            initialValues={values}
            validationSchema={Yup.object({
               title: Yup.string().required("It must have a name.")
            })}
            onSubmit={(_, actions) => {
               if (!values.title) {
                 actions.setSubmitting(false);
               } else {
                  dispatch(updateTask(values));
                  setValues({
                     id: _id,
                     title:"",
                  });
                  setIsModalOpen(false);
               }
            }}
         >
            {({isSubmitting, isValidating}) => (
               <Form>
                  <Field as="div" styles={styles.modalFormGroup}>
                     <Field as="div" styles={styles.modalButtons}>
                        <Field 
                           placeholder="New name of the task" 
                           name="title" 
                           type="text" 
                           onChange={handleChange} 
                           value={values.title} 
                        />
                        <Field as="div" className={styles.modalFormGroup}>
                           <button disabled={isSubmitting && !isValidating} type="submit">
                             <BiSave size={20}/>
                           </button>
                        </Field>
                     </Field>
                        <ErrorMessage name="title" component="div">
                           {(msg) => (<p style={{ color: "red" }}>{msg}</p>)}
                        </ErrorMessage>
                  </Field>
               </Form>
            )}
         </Formik>
      </Modal>
   )
};