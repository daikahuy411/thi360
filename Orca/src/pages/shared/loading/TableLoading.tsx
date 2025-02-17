import * as React from 'react'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

interface LoadingProps {
    isOpen: boolean;
    colSpan: number
}
const TableLoading: React.FC<LoadingProps> = ({ isOpen, colSpan }) => {
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => { });
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);


    return (
        <>
            <TableRow style={{ display: isOpen ? 'table-row' : 'none' }}>
                <TableCell component='td' scope='row' colSpan={5}>
                    <Box sx={{ width: '180px', padding: '15px', margin: '0 auto', textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom style={{ color: '#16B1FF' }}>
                            Loading
                        </Typography>
                        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
                    </Box>
                </TableCell>
            </TableRow>
        </>
    )
}

export default TableLoading;