import * as React from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

interface LoadingProps {
    isOpen: boolean;
}
const CircularLoading: React.FC<LoadingProps> = ({ isOpen }) => {

    return (
        <>
            <Box sx={{ width: '50%', padding: '15px', margin: '0 auto', textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="h6" gutterBottom style={{ color: '#16B1FF' }}>
                    Loading
                </Typography>
            </Box>
        </>
    )
}

export default CircularLoading;