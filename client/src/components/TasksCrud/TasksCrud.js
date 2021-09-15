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
                        .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.title)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row._id}
                            selected={isItemSelected}
                            >
                            <TableCell padding="checkbox">
                                <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                {row.title}
                            </TableCell>
                            <TableCell align="center">{row.storyPoints}</TableCell>
                            <TableCell align="center">{row.priorization}</TableCell>
                            <TableCell align="center">{row.asignedTo}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.creationDate}</TableCell>
                            <TableCell align="center">{row.completedDate}</TableCell>
                            <TableCell align="center">{row.helpNeeded}</TableCell>
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
                tasksArrayPerPage={tasksPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeTasksPerPage}
                />
            </Paper>
        </div>
    )
}