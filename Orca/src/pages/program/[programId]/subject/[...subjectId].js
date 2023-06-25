import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArticleIcon from '@mui/icons-material/Article'
import FolderIcon from '@mui/icons-material/Folder'
import HomeIcon from '@mui/icons-material/Home'
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem'
import TreeView from '@mui/lab/TreeView'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Pagination from '@mui/material/Pagination'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};


const SubjectPage = () => {
  const router = useRouter()
  const { programId, subjectId } = router.query
  const [curriculums, setCurriculums] = useState([]);
  const [program, setProgram] = useState(null)
  const [subject, setSubject] = useState(null)
  const [selected, setSelected] = React.useState([]);
  const [exams, setExams] = useState([]);
  const [curriculumId, setCurriculumId] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!programId || programId == 0) {
      return
    }
    new V1Api().getCurriculums(programId, subjectId[0]).then(response => {
      setCurriculums(response.data)
    })

    new V1Api().getProgramCatalog(programId).then(response => {
      setProgram(response.data)
    })

    new V1Api().getSubjectCatalog(programId, subjectId[0]).then(response => {
      setSubject(response.data)
    })

    if (subjectId && subjectId.length > 0) {
      let id = subjectId.length > 1 ? subjectId[1] : 0;
      // subjectId: subjectId[0], programId: programId,
      new V1Api().searchExams({ subjectId: subjectId[0], curriculumId: id, programId: programId }).then(response => {
        setExams(response.data.value)
        setTotalItems(response.data.totalItems)
      })
    }
  }, [programId, subjectId])

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    new V1Api().searchExams({ curriculumId: nodeIds }).then(response => {
      setExams(response.data.value)
      setTotalItems(response.data.totalItems)
    })
  };

  return <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            component={NavLink}
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          </Link>
          {program && (
            <Link
              underline="hover"
              component={NavLink}
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href={`/program/${programId}`}
            >
              {program.name}
            </Link>
          )}
          {subject && (
            <Typography color="text.primary">{subject.name}</Typography>
          )}
        </Breadcrumbs>
        <br />
      </Grid>
      <Grid item md={4} alignContent={"center"}>
        <TreeView
          aria-label="curriculum tree"
          multiSelect={false}
          // defaultExpanded={'152'}
          // defaultSelected={curriculumId.toString()}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          onNodeSelect={handleSelect}
          defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
          {curriculums && curriculums.map((item) =>
          (
            <>
              <StyledTreeItem key={item.id.toString()} nodeId={item.id.toString()} labelText={item.name} labelIcon={FolderIcon} >
                {item.children.map((child) => (
                  <StyledTreeItem
                    nodeId={child.id.toString()}
                    key={child.id}
                    labelText={child.name}
                    labelIcon={ArticleIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                ))}
              </StyledTreeItem>
            </>
          ))}
        </TreeView>
      </Grid>
      <Grid item md={8} alignContent={"center"}>
        <Grid container padding={2} spacing={2}>
          <Grid item md={8} alignContent={"center"}>
            <span style={{ color: 'gray' }}>Tổng số {totalItems} kỳ thi</span>
          </Grid>
          {exams && exams.map((item, index) => (
            <Grid item md={8} key={item.id}>
              <Card  >
                <CardContent>
                  <Typography
                    component={NavLink}
                    href={`/exam/${item.id}`}
                    sx={{ fontSize: 16, color: '#1a2c47', textDecoration: 'none' }} color="text.secondary" gutterBottom>
                    {index + 1}.&nbsp;{item.name}
                  </Typography>
                  {item.curriculum && (
                    <Typography>
                      {item.curriculum.name}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item md={8} alignContent={"center"}>
            <br />
            <Pagination count={totalItems}
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              rowsPerPage={10}
              shape='rounded' color='primary' />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
}

export default SubjectPage


