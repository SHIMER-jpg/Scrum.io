import { React, useEffect, useState, useCallback } from 'react';
import styles from './TasksCrud.module.css';

// material-ui componentes para la tabla
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'storypoints', numeric: false, disablePadding: true, label: 'Story Points' },
    { id: 'priorization', numeric: false, disablePadding: true, label: 'Priorization' },
    { id: 'assigned', numeric: false, disablePadding: true, label: 'Assigned to' },
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
    { id: 'created', numeric: false, disablePadding: true, label: 'Created' },
    { id: 'completed', numeric: false, disablePadding: true, label: 'Completed' },
    { id: 'helpneeded', numeric: false, disablePadding: true, label: 'Help Needed' },
]

export default function TasksCrud({ tasksArray }){
    
    return(
        <div className={styles.container}>
            
        </div>
    )
}