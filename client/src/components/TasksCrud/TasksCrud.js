import { React, useState } from 'react';
import styles from './TasksCrud.module.css';

// material-ui componentes para la tabla
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

// TableParts
import SetupTableHead from './TableParts/SetupTableHead';
import SetupTableCellInput from './TableParts/SetupTableCellInput';

// componentes
import TaskCardModal from "../TaskCardModal/TaskCardModal";


// nuevo SUPER ORDENADORINADOR 2.0
// compara los elementos de forma que los ordene descendentemente (segun la propiedad por la que se esta ordenando)
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    else if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  // obtiene el tipo de comparacion que se debe hacer, desc o asc y la retorna
  // a esta funcion se le pasan el orden (asc, desc) y la propiedad por la cual se debe ordenar
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy) // si es desc retorna lo que retorne la funcion de arriba
      : (a, b) => -descendingComparator(a, b, orderBy); // si es asc, retorna lo opuesto a lo que deberia retornar la funcion de arriba (osea, si retorna 1 hace que retorne -1)
  }
  
  // esta funcion hace un sort utilizando las dos funciones de arriba, las cuales se encargan de setear bien por cual propiedad se deben filtrar los elementos
  // a la funcion se le pasa el arreglo de elementos a ordenar y la funcion `getComparator` con sus respectivas propiedades
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
    //   if (order !== 0) return order;
    //   return a[1] - b[1];
        return order;
    });
    return stabilizedThis.map((el) => el[0]);
  }

// este es el componente del CRUD que va a importar ManagerView
export default function TasksCrud({ tasksArray, customHandleClick }){
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [tasksPerPage, setTasksPerPage] = useState(5);

  // estados para mostrar el TaskCardModal
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  // funcion para cambiar el orden de cierta propiedad
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  // funcion para seleccionar todas las tasks
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tasksArray.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  
  // funcion para tomar cada task seleccionada, se puede tener varias seleccionas a la vez
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  
  // funcion para cambiar de pagina
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // funcion para cambiar cuantas tareas se deben mostrar por pagina
  const handleChangeTasksPerPage = (event) => {
    setTasksPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // comprueba si la tarea esta seleccionada
  const isSelected = (id) => selected.indexOf(id) !== -1;
  
  return(
    <div className={styles.container}>
      <Paper className={styles.paper}>
        <TableContainer>
          <Table
            className={styles.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <SetupTableHead
            styles={styles}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={tasksArray.length}
            />
            <TableBody>
            {stableSort(tasksArray, getComparator(order, orderBy))
              .slice(page * tasksPerPage, page * tasksPerPage + tasksPerPage)
              .map((task, index) => {
              const isItemSelected = isSelected(task._id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={task._id}
                selected={isItemSelected}
                >
                <TableCell padding="checkbox">
                  <Checkbox
                  onClick={(event) => handleClick(event, task._id)}
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell 
                  component="th" 
                  id={labelId} 
                  scope="row" 
                  padding="none"
                  onClick={() => {
                    if (customHandleClick) customHandleClick(task);
                    else {
                      setModalDetails(task);
                      setIsModalOpen(true);
                    }
                  }}
                >
                    {task.title}
                </TableCell>
                <TableCell align="center">{task.storyPoints}</TableCell>
                <SetupTableCellInput property={"priorization"} task={task} taskId={task._id}/>
                <SetupTableCellInput property={"asignedTo"} task={task} taskId={task._id}/>
                <SetupTableCellInput property={"status"} task={task} taskId={task._id}/>
                <TableCell align="center">{new Date(task.creationDate).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  {task.completedDate && task.completedDate !== null
                    ? new Date(task.completedDate).toLocaleDateString()
                    : "---"
                  }
                </TableCell>
                <SetupTableCellInput property={"helpNeeded"} task={task} taskId={task._id}/>
                </TableRow>
              );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasksArray.length}
          rowsPerPage={tasksPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeTasksPerPage}
        />
      </Paper>

        {modalIsOpen && (
          <TaskCardModal
            isOpen={modalIsOpen}
            setIsModalOpen={setIsModalOpen}
            modalDetails={modalDetails}
          />
        )}
    </div>
  )
}