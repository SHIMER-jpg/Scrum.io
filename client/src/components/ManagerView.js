import { React, useState } from "react";
import Header from "./Header";
import { TodoCard } from "./Card";
import PROJECTS from "../hardcodingDataBD";
import Modal from "react-modal";
import Todos from "./Todos";

import styled from "../styles/Modal.module.css";
import managerStyle from "../styles/ManagerView.module.css";

function Cards() {
  const [modalOpen, setModalOpen] = useState(false);

  const [createTask, setCreateTask] = useState({
    title: "",
    asignedDev: "",
    storyPoints: "",
    priorization: "to do",
    details: "",
  });

  function handleInput(event) {
    setCreateTask({
      ...createTask,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <div>
        <div>
          <button onClick={() => setModalOpen(true)}>Create Task +</button>
          <Modal isOpen={modalOpen}>
            <div className={styled.jss63}>
              <span>Entraste a MODALSXd</span>
              <button onClick={() => setModalOpen(false)}>X</button>
              <form>
                <div>
                  <label>Title</label>
                  <input
                    name="title"
                    type="text"
                    value={createTask.test}
                    onChange={(e) => handleInput(e)}
                  ></input>
                </div>
                <div>
                  <label>Asigned Dev</label>
                  <input
                    name="asignedDev"
                    type="text"
                    value={createTask.asignedDev}
                    onChange={(e) => handleInput(e)}
                  ></input>
                </div>
                <div>
                  <label>Story Points</label>
                  <input
                    name="storyPoints"
                    type="text"
                    value={createTask.storyPoints}
                    onChange={(e) => handleInput(e)}
                  ></input>
                </div>
                <div>
                  <label>Priorization</label>
                  <select
                    value={createTask.priorization}
                    name="priorization"
                    onChange={(e) => handleInput(e)}
                  >
                    <option value="none">None</option>
                    <option value="Easy Win">Easy Win</option>
                    <option value="Depriorize">Depriorize</option>
                    <option value="Worth Pursuing">Worth Pursuing</option>
                    <option value="Strategic Initiative">
                      Strategic Initiative
                    </option>
                  </select>
                </div>
                <div>
                  <label>Detail</label>
                  <textarea
                    style={{ resize: "none" }}
                    value={createTask.details}
                    name="details"
                    onChange={(e) => handleInput(e)}
                  ></textarea>
                </div>
                <button type="submit">Create</button>
              </form>
            </div>
          </Modal>
        </div>
        <Header />
        <div className={managerStyle.ManagerView}>
          <div className={managerStyle.ManagerView_Body}>
            <Todos />
            <Todos />
            <Todos />
            <Todos />
            <Todos />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
