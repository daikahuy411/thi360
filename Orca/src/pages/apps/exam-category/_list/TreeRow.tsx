import React, { useState } from 'react'

import { ExamCategoryApi } from 'api/catalog-api'
// import { ExamCategoryApi } from 'api/catalog-api'
// import ExamCategoryApi from 'api/catalog-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import DescriptionIcon from '@mui/icons-material/Description'
import EditIcon from '@mui/icons-material/Edit'
import Folder from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

type TreeRowProps = {
  item: any
  excludedId: number
  level: number
}

// export default function TreeRow(props: TreeRowProps) {
const TreeRow: React.FC<TreeRowProps> = (props: TreeRowProps) => {
  const { item } = props
  const router = useRouter()

  const [isCollapsed, setIsCollapsed] = useState(true)
  const entityIcon = item.children.length > 0 ? isCollapsed ? <Folder /> : <FolderOpenIcon /> : <DescriptionIcon />

  const children = (item.children || [])
    .filter((x: any) => {
      return x.id !== props.excludedId
    })
    .map((child: any) => {
      return (
        <TreeRow
          level={props.level + 1}
          excludedId={props.excludedId}
          key={child.id}
          // nodeId={child.Id}
          item={child}
        />
      )
    })

  /*
  * remove exam-category
  */
  const [openDelete, setOpenDelete] = useState(false)
  const [titleDelete, setTitleDelete] = useState('')
  const handleClickOpenFormDelete = (item: any) => {
    if (item) {
      setTitleDelete(item.title)
      setOpenDelete(true)
    }
  }
  const handleCloseFormDelete = () => setOpenDelete(false)
  const handleDelete = (item: any) => {
    console.log('item:', item);
    if (item) {
      const param = {id: Number(item.key)}
      ExamCategoryApi.delete(param)
      .then(response => {
        handleCloseFormDelete()
        toast.success('Xóa dữ liệu thành công')
        router.reload()
        // router.replace('/apps/exam-category')
        // router.prefetch('/apps/exam-category')
      })
      .catch((e) => {
        handleCloseFormDelete()
        toast.error(e.response.data)
      })
    }

  }
  /*
  * end remove exam-category
  */

  return (
    <>
      <TableRow onClick={() => setIsCollapsed(!isCollapsed)}>
        {/* <TableCell padding='checkbox'>
          <Checkbox />
        </TableCell> */}
        <TableCell
          component='th'
          scope='row'
          onClick={event => {
            event.preventDefault()
          }}
        >
          <IconButton aria-label='filter' component={Link} href={`/apps/exam-category/${item.key}`}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label='filter' onClick={() => handleClickOpenFormDelete(item)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          <Stack direction='row' alignItems='center' gap={1} style={{ paddingLeft: props.level * 10 }}>
            {!(item.children.length > 0) ? (
              <span style={{ display: 'inline-block', width: 24 }}></span>
            ) : (
              <ChevronRightIcon />
            )}
            {entityIcon}
            <Typography variant='body1'>{item.title}</Typography>
          </Stack>
        </TableCell>
        <TableCell align='right'>{item.totalUser}</TableCell>
      </TableRow>
      {!isCollapsed && <>{children}</>}

      <Dialog
        open={openDelete}
        onClose={handleCloseFormDelete}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Bạn có muốn xóa dữ liệu Danh mục Kỳ thi <b>{titleDelete}</b> không?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleCloseFormDelete}>Hủy bỏ</Button>
          <Button onClick={() => handleDelete(item)}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TreeRow;
