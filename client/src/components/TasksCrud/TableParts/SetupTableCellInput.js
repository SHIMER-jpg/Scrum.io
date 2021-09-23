/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import styles from '../TasksCrud.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useSearch } from "../../../hooks/useSearch";

// material-ui componentes para la tabla
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

// redux actions
import { updateTask } from "../../../redux/ManagerView/actions";

export default function SetupTableCellInput({ property, task }){

    const projectSprintCount = useSelector((state) => state.managerView.project.sprintCount);

    // estado para modificar un campo de la task
    const [dynamicField, setDynamicField] = useState({
        [property]: task[property],
        user: task.user
    });

    // estados para el input de seleccion de usuario asignado
    const loggedId = useSelector((state) => state.app.loggedUser._id);
    const assignedUsers = useSelector((state) => state.managerView.asignedUsers);
    const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
    const [usersInProject, setUsersInProject] = useState([]);
    const [query, setQuery, filteredUsers] = useSearch(usersInProject);

    useEffect(() => {
        const filteredUsers = assignedUsers
            .filter(({ user }) => user._id !== loggedId)
            .map((u) => u.user);

        setUsersInProject(filteredUsers);
    }, []);

    const isManager = useSelector(
        (state) => state.viewRouter.userRole === "scrumMaster"
    );
    
    // se encarga de actualizar los campos de los input en la tabla cada vez que cambian las propiedades de la task
    useEffect(() => {
        setDynamicField({
            [property]: task[property],
            user: task.user
        })
    },[task])
    
    const dispatch = useDispatch();

    // funcion para tomar los cambios de los campos y actualizar la task
    function handleTaskFieldsChange(event) {
        if(property === "sprintId"){
            event.target.value = parseInt(event.target.value) === 0
            ? null
            : parseInt(event.target.value) > projectSprintCount
            ? projectSprintCount
            : parseInt(event.target.value)
        }
        const change = {
            taskId: task._id,
            field: property,
            value: property === "helpNeeded"
            ? !dynamicField[property]
            : event.target.value,
        };
        setDynamicField({
            ...dynamicField,
            [property]: property === "helpNeeded"
            ? !dynamicField[property]
            : event.target.value,
        });

        dispatch(updateTask(change));
    }

    // misma funcion de arriba pero personalizada para los cambios del usuario asignado
    const handleAddUser = (user) => {
        const change = {
          taskId: task._id,
          field: "asignedTo",
          value: user._id,
        };
        setDynamicField({
          ...dynamicField,
          asignedTo: user._id,
          user: user,
        });
        setIsSelectUsersOpen(false);
        dispatch(updateTask(change));
        setQuery("");
      };

    // options del select
    const options = 
    property === "priorization"
        ? ["Easy Win", "Deprioritize", "Worth Pursuing", "Strategic Initiative"]
        : ["Pending", "In progress", "Completed", "Testing"]
    ;

    return(
        <TableCell className={styles.tableInput} align="center">
            {property === "asignedTo"
                ? <>
                    
                    <div
                    className={styles.userBox}
                    onClick={() => {
                        isManager && setIsSelectUsersOpen(true);
                    }}
                    >
                        <img
                            src={dynamicField.user.picture}
                            alt={dynamicField.user.name}
                        />
                        <p>{dynamicField.user.name}</p>
                    </div>
                    
                    {isManager && isSelectUsersOpen && (
                        <div
                        className={`${styles.modalSelectUser} ${
                            isSelectUsersOpen ? styles.visible : undefined
                        }`}
                        >
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
                        </div>
                    )}
                  </>
                : property === "helpNeeded"
                ? 
                    <Checkbox
                        onClick={(event) => handleTaskFieldsChange(event, task._id)}
                        checked={dynamicField[property]}
                    />
                : property === "sprintId"
                ? 
                    <input
                    type="number"
                    value={dynamicField[property]}
                    onChange={(e) => handleTaskFieldsChange(e)}
                    min="1"
                    max={projectSprintCount}
                    />
                :
                    <select
                        value={dynamicField[property]}
                        onChange={(e) => handleTaskFieldsChange(e)}
                        >
                        {options.map((value, index) => (
                            <option key={index} value={value}>
                            {value}
                            </option>
                        ))}
                    </select>
          }
        </TableCell>
    )
}