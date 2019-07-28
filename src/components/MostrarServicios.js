import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
  Paper,
} from '@material-ui/core';

const styles = theme => ({
	container: {
		padding: 48,
		display: 'flex',
		flexDirection: 'column'
	},
});

class MostrarServicio extends Component {
  render() {
		const { servicios } = this.props;

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              servicios.map(row => (
                <TableRow key={row.titulo}>
                  <TableCell>{row.titulo || ''}</TableCell>
                  <TableCell>{row.descripcion || ''}</TableCell>
                  <TableCell>{`USD ${row.precio}` || 0}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(MostrarServicio)