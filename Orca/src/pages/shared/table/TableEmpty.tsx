import * as React from 'react'

import Icon from '@core/components/icon'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

interface LoadingProps {
    isOpen: boolean;
}
const TableEmpty: React.FC<LoadingProps> = ({ isOpen }) => {

    return (
        <>
            <TableRow style={{}}>
                <TableCell component='td' scope='row' colSpan={5}>
                    <Box sx={{ width: '50%', padding: '15px', margin: '0 auto', textAlign: 'center' }}>
                        <Icon icon='codicon:empty-window' />
                        <Typography variant="h6" gutterBottom style={{ color: '#666666', fontSize: '14px' }}>
                            Dữ liệu trống
                        </Typography>
                    </Box>
                </TableCell>
            </TableRow>
        </>
    )
}

export default TableEmpty;