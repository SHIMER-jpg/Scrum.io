import { React, useState } from 'react';
import styles from './TasksCrud.module.css';

// material-ui componentes para la tabla
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

// nuevo ORDENADOR SUPREMO 2.0
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

// array con las celdas de la cabeza de la tabla, es decir son las columnas
const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'storypoints', numeric: false, disablePadding: true, label: 'Story Points' },
    { id: 'priorization', numeric: false, disablePadding: true, label: 'Priorization' },
    { id: 'assigned', numeric: false, disablePadding: true, label: 'Assigned to' },
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
    { id: 'created', numeric: false, disablePadding: true, label: 'Created' },
    { id: 'completed', numeric: false, disablePadding: true, label: 'Completed' },
    { id: 'helpneeded', numeric: false, disablePadding: true, label: 'Help Needed' },
];

// este es el componente que sera la cabeza de la tabla (despues tengo que modularizarlo)
const setupTableHead = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
    // esta funcion creara el sortHandler al que luego se le debera pasar la propiedad a ordenar para que la ordene con la cb que se le pasa al componente por props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    }

    return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all tasks' }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={styles.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
    );
}

// este es el componente del CRUD que va a importar ManagerView
export default function TasksCrud({ tasksArray }){
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [tasksPerPage, setTasksPerPage] = useState(5);
  
    // funcion para cambiar el orden de cierta propiedad
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    
    // funcion para seleccionar todas las tasks
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = tasksArray.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
    
    // funcion para tomar cada task seleccionada, se puede tener varias seleccionas a la vez
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
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
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
    
    return(
        <div className={styles.container}>
            <Paper className={styles.paper}>
                <TableContainer>
                <Table
                    className={styles.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <setupTableHead
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
                        .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                            >
                            <TableCell padding="checkbox">
                                <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                tasksArrayPerPageOptions={[5, 10, 25]}
                component="div"
                count={tasksArray.length}
                tasksArrayPerPage={tasksPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeTasksPerPage}
                />
            </Paper>
        </div>
    )
}