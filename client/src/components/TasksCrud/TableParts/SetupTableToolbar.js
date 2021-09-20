/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import styles from '../TasksCrud.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useSearch } from "../../../hooks/useSearch";

// material-ui componentes para la tabla
import { alpha } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// react-icons
import { BsTrashFill, BsCheckBox, BsFilter } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
// sweet-alert
import Swal from "sweetalert2";

// redux actions
import { updateManyTask, deleteSelectedTasks } from "../../../redux/ManagerView/actions";

export default function SetupTableToolbar({ tasksSelected, setTasksFilter, tasksFilter }){

  const projectSprintCount = useSelector((state) => state.managerView.project.sprintCount);

  // estados para el input de seleccion de usuario asignado
  const loggedId = useSelector((state) => state.app.loggedUser._id);
  const assignedUsers = useSelector((state) => state.managerView.asignedUsers);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = useState(false);
  const [usersInProject, setUsersInProject] = useState([]);
  const [query, setQuery, filteredUsers] = useSearch(usersInProject);

  // estados de los campos a modificar de las tasks
  const [dynamicFields, setDynamicFields] = useState({
    priorization: null,
    sprintId: null,
    status: null,
    asignedTo: null,
    user: null,
  });

  // este es el estado para mostrar/ocultar los filtros
  const [showFilterList, setShowFilterList] = useState(false);

    useEffect(() => {
        const filteredUsers = assignedUsers
            .filter(({ user }) => user._id !== loggedId)
            .map((u) => u.user);

        setUsersInProject(filteredUsers);
    }, []);

    const isManager = useSelector(
        (state) => state.viewRouter.userRole === "scrumMaster"
    );
    
    const dispatch = useDispatch();

    // funcion para tomar los cambios de los campos 
    function handleTaskFieldsChange(event) {
        setDynamicFields({
            ...dynamicFields,
            [event.target.name]: event.target.value === 0 
            ? null
            : event.target.value
        });
    }

    // misma funcion de arriba pero personalizada para los cambios del usuario asignado
    const handleAddUser = (user) => {
      if(user === null){
        setDynamicFields({
          ...dynamicFields,
          asignedTo: null,
          user: null,
        });
      }
      else{
        setDynamicFields({
          ...dynamicFields,
          asignedTo: user._id,
          user: user,
        });
        setIsSelectUsersOpen(false);
        setQuery("");
      }
    };

    // funcion para tomar los filtros seleccionados y crear las cb que filtraran las tasks
    const handleFilters = (e) => {
      var filterCb;

      if (e.target.value === "All Status" || e.target.value === "All Priorizations" || e.target.value === 0) {
        filterCb = (task) => {
          return task;
        };
      } 
      else {
        filterCb = (task) => {
          return task[e.target.name] === e.target.value;
        };
      }
  
      setTasksFilter({
        ...tasksFilter,
        [e.target.name]: filterCb,
      });
    };

    // funcion para despachar los cambios y modificar todas las tasks seleccionadas
    const handleSubmitSelectedTasks = () => {
      Swal.fire({
        title: `Are you sure you want to modify all these ${tasksSelected.length} tasks?`,
        text: "All selected tasks will modified with this data.",
        showDenyButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: "Cancel",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let fieldsToChange = {};
          for(let field in dynamicFields){
            if(dynamicFields[field] !== null){
              fieldsToChange[field] = dynamicFields[field];
            }
          }
          const changes = {
            tasksId: tasksSelected,
            fieldsToChange: fieldsToChange,
          };

          dispatch(updateManyTask(changes));
        }
      });
    }

    // funcion para borrar las tasks seleccionadas
    const handleDeleteSelected = () => {
      Swal.fire({
        title: `Are you sure you want to delete these ${tasksSelected.length} tasks?`,
        text: "This action is not reversible.",
        showDenyButton: true,
        confirmButtonText: "Cancel",
        denyButtonText: "Delete",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isDenied) {
          // si apreto en "BORRAR"
          dispatch(deleteSelectedTasks(tasksSelected));
        }
      });
    };

    // options de los selects
    const priorizationOptions = ["Easy Win", "Deprioritize", "Worth Pursuing", "Strategic Initiative"];
    const statusOptions = ["Pending", "In progress", "Completed", "Testing"];

    return (
      <Toolbar
        className={styles.toolBar}
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(tasksSelected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {tasksSelected.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            className={styles.toolBarSelected}
          >
            {tasksSelected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Project's Tasks
          </Typography>
        )}
        
        {tasksSelected.length > 0 
        ? (
          <>
            <div className={styles.toolBarFields}>
              <select
                value={dynamicFields.priorization !== null ? dynamicFields.priorization : "Don't Change"}
                name="priorization"
                onChange={(e) => handleTaskFieldsChange(e)}
                >
                  <option key={"Don't Change"} value={null}>
                    {"Don't Change"}
                  </option>
                {priorizationOptions.map((value, index) => (
                    <option key={index} value={value}>
                    {value}
                    </option>
                ))}
              </select>
              <input
                type="number"
                name="sprintId"
                value={dynamicFields.sprintId !== null ? dynamicFields.sprintId : 0}
                onChange={(e) => handleTaskFieldsChange(e)}
                min="0"
                max={projectSprintCount}
              />
              <div className={styles.toolBarSelectUsers}>
                
                <div
                className={styles.userBox}
                onClick={() => {
                    isManager && setIsSelectUsersOpen(true);
                }}
                >
                  {dynamicFields.user !== null ? (
                    <img src={dynamicFields.user.picture} alt="" />
                  ) : (
                    <FaUserCircle size={30} />
                  )}
                  {dynamicFields.user !== null ? <p>{dynamicFields.user.name}</p> : <p>Don't Change</p>}
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
                        <>
                          <article
                            onClick={() => handleAddUser(null)}
                            key={"Don't Change"}
                            className={styles.modalUser}
                          >
                            <FaUserCircle size={30} />
                            <p>Don't Change</p>
                          </article>

                          {filteredUsers.map((user) => (
                            <article
                                onClick={() => handleAddUser(user)}
                                key={user._id}
                                className={styles.modalUser}
                            >
                                <img src={user.picture} alt={user.name} />
                                <p>{user.name}</p>
                            </article>
                            ))
                          }
                        </>
                    ) : (
                        <p>There's no user with that name :(</p>
                    )}
                    </div>
                )}
              </div>
              <select
                  value={dynamicFields.status !== null ? dynamicFields.status : "Don't Change"}
                  name="status"
                  onChange={(e) => handleTaskFieldsChange(e)}
                  >
                    <option key={"Don't Change"} value={null}>
                      {"Don't Change"}
                    </option>
                  {statusOptions.map((value, index) => (
                      <option key={index} value={value}>
                      {value}
                      </option>
                  ))}
              </select>
            </div>
            <div className={styles.toolBarOptions}>
              <Tooltip title="Confirm" className={styles.toolBarBtn}>
                <IconButton
                  onClick={() => handleSubmitSelectedTasks()}
                >
                  <BsCheckBox/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" className={styles.toolBarBtn}> 
                <IconButton
                  onClick={() => handleDeleteSelected()}
                >
                  <BsTrashFill/>
                </IconButton>
              </Tooltip>
            </div>
          </>
        ) 
        : (
          <>
            <Tooltip title="Filter list" className={styles.toolBarBtn}>
              <IconButton
                onClick={() => setShowFilterList(!showFilterList)}
              >
                <BsFilter size={30}/>
              </IconButton>
            </Tooltip>
            {showFilterList
              ? (
                  <div className={styles.filterList}>
                    <select
                      name="priorization"
                      onChange={(e) => handleFilters(e)}
                    >
                      <option key={"All Priorizations"} value={"All Priorizations"}>
                        {"All Priorizations"}
                      </option>
                    {priorizationOptions.map((value, index) => (
                      <option key={index} value={value}>
                      {value}
                      </option>
                    ))}
                    </select>
                    <input
                      type="number"
                      name="sprintId"
                      onChange={(e) => handleFilters(e)}
                      min="0"
                      max={projectSprintCount}
                    />
                    <select
                      name="status"
                      onChange={(e) => handleFilters(e)}
                    >
                      <option key={"All Status"} value={"All Status"}>
                        {"All Status"}
                      </option>
                    {statusOptions.map((value, index) => (
                      <option key={index} value={value}>
                      {value}
                      </option>
                    ))}
                    </select>
                  </div>
                )
              : <></>
            }
          </>
        )}
      </Toolbar>
    );
  };