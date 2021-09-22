import { React } from 'react';
import styles from '../TasksCrud.module.css';

// material-ui componentes para la tabla
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

// array con las celdas de la cabeza de la tabla, es decir son las columnas
const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'storyPoints', numeric: true, disablePadding: true, label: 'Points' },
    { id: 'priorization', numeric: false, disablePadding: true, label: 'Priorization' },
    { id: 'sprintId', numeric: true, disablePadding: true, label: 'Sprint' },
    { id: 'asignedTo', numeric: false, disablePadding: true, label: 'Assigned to' },
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
    { id: 'creationDate', numeric: true, disablePadding: true, label: 'Created' },
    { id: 'completedDate', numeric: true, disablePadding: true, label: 'Completed' },
    { id: 'helpNeeded', numeric: false, disablePadding: true, label: 'Help' },
];

// este es el componente que sera la cabeza de la tabla
export default function SetupTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }){
    // esta funcion creara el sortHandler al que luego se le debera pasar la propiedad a ordenar para que la ordene con la cb que se le pasa al componente por props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    }

    return (
        <TableHead className={styles.tableHead}>
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
                align={'center'}
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
            <TableCell/>
          </TableRow>
        </TableHead>
    );
}
