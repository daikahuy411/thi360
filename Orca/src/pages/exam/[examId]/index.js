import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import NavLink from 'next/link'
import { useRouter } from 'next/router'

import HistoryIcon from '@mui/icons-material/History'
import HomeIcon from '@mui/icons-material/Home'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Divider } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

const ExamPage = () => {
  const router = useRouter()
  const { examId } = router.query
  const [exam, setExam] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!examId || examId == 0) {
      return
    }

    new V1Api().getExam(examId).then(response => {
      setExam(response.data)
    })

  }, [examId])

  return <>
    <Grid container>
      <Grid item md={12}>
        {exam && (
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              component={NavLink}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/program/${exam.program.id}`}
              component={NavLink}
            >
              {exam.program.name}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/program/${exam.program.id}/subject/${exam.subject.id}`}
              component={NavLink}
            >
              {exam.subject.name}
            </Link>
            {
              exam.curriculum && (
                <Link
                  underline="hover"
                  color="inherit"
                  href={`/program/${exam.program.id}/subject/${exam.subject.id}/${exam.curriculum.id}`}
                  component={NavLink}
                >
                  {exam.curriculum.name}
                </Link>
              )}
            {exam.curriculum && exam.curriculum.children && exam.curriculum.children.map((item) => (
              <Link
                underline="hover"
                key={item.id}
                color="inherit"
                href={`/program/${exam.program.id}/subject/${exam.subject.id}/${item.id}`}
                component={NavLink}
              >
                {item.name}
              </Link>
            ))}
          </Breadcrumbs>
        )}
        <Divider />
        <br />
      </Grid>
      <Grid item md={12} alignContent={"center"}>
        {exam && (
          <>
            <Typography color="inherit">
              {exam.name}
            </Typography>
            <br />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 50 }}>STT</TableCell>
                    <TableCell >Tên</TableCell>
                    <TableCell style={{ width: 280 }}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exam.examItems[0].tests.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" size='small'>Thi thử</Button>
                        &nbsp;
                        <Button variant="outlined" size='small'>Luyện tập</Button>
                        &nbsp;
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              width: '20ch',
                            },
                          }}
                        >
                          <MenuItem key={'history'} onClick={handleClose}>
                            Lịch sử thi
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Grid>
    </Grid>
  </>
}

export default ExamPage

