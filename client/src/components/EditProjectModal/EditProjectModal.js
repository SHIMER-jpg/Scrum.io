import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { BiSave } from "react-icons/bi"
import { editProject } from '../../redux/ManagerView/actions';
import styles from "./EditProjectModal.module.css";
import * as Yup from "yup";

export default function EditProjectModal ({isModalOpen, setIsModalOpen, projectId}) {
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
      id: projectId,
      projectName: "",
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
            <h2>New Title</h2>
            <button onClick={() => setIsModalOpen(false)}>
              <IoClose size={30}/>
            </button>
         </header>
         <Formik 
            initialValues={values}
            validationSchema={Yup.object({
               projectName: Yup.string().required("It must have a name.")
            })}
            onSubmit={(_, actions) => {
               if (!values.projectName) {
                 actions.setSubmitting(false);
               } else {
                  dispatch(editProject(values));
                  setValues({
                     id: projectId,
                     projectName:"",
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
                           placeholder="New name of the project" 
                           name="projectName" 
                           type="text" 
                           onChange={handleChange} 
                           value={values.projectName} 
                        />
                        <Field as="div" className={styles.modalFormGroup}>
                           <button 
                              disabled={isSubmitting && !isValidating} 
                              type="submit" 
                           >
                             <BiSave size={20}/>
                           </button>
                        </Field>
                     </Field>
                        <ErrorMessage name="projectName" component="div">
                           {(msg) => (<p style={{ color: "red" }}>{msg}</p>)}
                        </ErrorMessage>
                  </Field>
               </Form>
            )}
         </Formik>
      </Modal>
   )
};