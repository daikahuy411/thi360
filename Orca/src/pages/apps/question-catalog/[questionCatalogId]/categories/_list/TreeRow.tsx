import React, { useState } from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Draggable from 'react-draggable'
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
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

type TreeRowProps = {
  item: any
  excludedId: number
  level: number
  onDeleted: () => void
}

function PaperComponent(props) {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

export default function TreeRow(props: TreeRowProps) {
  const router = useRouter()
  const { item } = props
  const { questionCatalogId } = router.query
  const [isCollapsed, setIsCollapsed] = useState(true)
  const entityIcon = item.children.length > 0 ? isCollapsed ? <Folder /> : <FolderOpenIcon /> : <DescriptionIcon />

  const children = (item.children || [])
    .filter((x: any) => {
      return x.id !== props.excludedId
    })
    .map((child: any) => {
      return (
        <TreeRow
          onDeleted={props.onDeleted}
          level={props.level + 1}
          excludedId={props.excludedId}
          key={child.id}
          // nodeId={child.Id}
          item={child}
        />
      )
    })

  /*
   * handle remove question-catalog
   */
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpenDelete = () => setOpenDelete(true)
  const handleCloseDelete = () => setOpenDelete(false)
  const handleDelete = item => {
    if (item) {
      QuestionCategoryApi.delete({ id: Number(item.key) })
        .then(response => {
          setOpenDelete(false)
          toast.success('Xóa dữ liệu thành công.')
          if (props.onDeleted) {
            props.onDeleted()
          }
        })
        .catch(e => {
          setOpenDelete(false)
          toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
        })
    }
  }
  /*
   * handle remove question-catalog
   */

  return (
    <>
      <TableRow key={`${item.key}-row`} onClick={() => setIsCollapsed(!isCollapsed)}>
        <TableCell component='th' scope='row'>
          <IconButton
            aria-label='filter'
            component={Link}
            href={`/apps/question-catalog/${questionCatalogId}/categories/${item.key}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton aria-label='filter' onClick={() => handleClickOpenDelete()}>
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
        onClose={handleCloseDelete}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Xác nhận
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dữ liệu xóa sẽ không thể khôi phục lại. Bạn có muốn xóa Danh mục câu hỏi này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDelete}>
            {' '}
            Hủy bỏ{' '}
          </Button>
          <Button onClick={() => handleDelete(item)} color='error'>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
