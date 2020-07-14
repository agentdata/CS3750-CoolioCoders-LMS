import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import AddAssignment from './AddAssignment'
import CourseAssignment from './CourseAssignment'
import http from '../../api/http';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '20px',
    paddingBottom : "0px",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  assignmentsDiv: {
      width: '100%',
      margin: '20px'
  },
  listItemRight: {
      textAlign: "right",
      paddingRight: "10px"
  },
  addAssignmentBtn: {
      backgroundColor: "white",
      marginBottom: "10px",
      color: "#f44336"
  },
  paper: {
    position: 'relative',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "auto",
    top: "100px"
  },
}));

// export function getCourseAssignments(){
//   http.getCourseAssignments(props.match.id)
//     .then( async(response) => {
//       var body = await response.json();
//       if(response.status === 200 && body["message"] === "success"){
//           var simpleCourses=[] 
//           for (var assignment in body["assignments"]) {
//             // if(dates.compare(assignment["dueDate"],new Date().toLocaleString())){
//                  let x ={ 
//                     title: assignment["title"],
//                     description: assignment["description"],
//                     maxPoints: assignment["maxPoints"],
//                     dueDate: assignment["dueDate"],
//                     assignmentID: assignment["id"],
//                     submissionType: assignment["submissionType"]}
//             // }
//           }
//       }
//   })
//   .catch((e) => {
//       console.warn("There was an error retrieving instructor courses: ", e);

//       this.setState({
//           error: "There was an error retrieving instructor courses."
//       });
//   });
// }

export default function CourseAssignments(props) {
  const [pastAssignments, setPastAssignments] = React.useState([
    {
        title: "Assignment 1",
        description: "This is the first assignment",
        maxPoints: 100,
        dueDate: "6/30/2020 11:59 PM",
        assignmentID: '1',
        submissionType: "TEXTBOX"
    },
    {
        title: "Assignment 2",
        description: "This is assignment 2",
        maxPoints: 150,
        dueDate: "7/1/2020 11:59 PM",
        assignmentID: '2',
        submissionType: "TEXTBOX"
    }
])

  const [upcomingAssignments, setUpcomingAssignments] = React.useState([
    {
        title: "Assignment 3",
        description: "This is the third assignment",
        maxPoints: 100,
        dueDate: "7/7/2020 11:59 PM",
        assignmentID: '3',
        submissionType: "TEXTBOX"
    },
    {
        title: "Assignment 4",
        description: "Assignment 4 yo",
        maxPoints: 150,
        dueDate: "7/8/2020 11:59 PM",
        assignmentID: '4',
        submissionType: "FILE_UPLOAD"
    }
  ])
  const classes = useStyles();
  const [assignmentListOpen, setassignmentListOpen] = React.useState(true);
  const [pastAssignmentListOpen, setpastAssignmentListOpen] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false)

  const [assignmentModalOpen, setAssignmentModalOpen] = React.useState(false);
  const [assignmentClicked, setAssignmentClicked] = React.useState({assignmentID: -1});
  useEffect(() => {
    if (assignmentClicked.assignmentID !== -1) {
      setAssignmentModalOpen(true);
    }
 }, [assignmentClicked]);

  const handleAssignmentHeadClick = () => {
    setassignmentListOpen(!assignmentListOpen);
  };

  const handlePastAssignmentHeadClick = () => {
    setpastAssignmentListOpen(!pastAssignmentListOpen);
  };

  const handleAddAssignment = () => {
      setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleAssignmentClick = (key) => {
    // do api call first, then
    console.log(key)
    setAssignmentClicked(upcomingAssignments.filter(obj => obj.assignmentID === key))

  }

  const handlePastAssignmentClick = (key) => {
    setAssignmentClicked(pastAssignments.filter(obj => obj.assignmentID === key))
  }

  const handleAssignmentClose = () => {
    setAssignmentModalOpen(false)
    setAssignmentClicked({assignmentID: -1})
  }

  return (
    <div className={classes.assignmentsDiv}>

      <Modal
        className={classes.modal}
        disableBackdropClick
        open={assignmentModalOpen}
        onClose={handleAssignmentClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>
            <CourseAssignment closeModal = {handleAssignmentClose} assignmentClicked = {assignmentClicked}/>
          </div>
        </Modal>
        {sessionStorage.getItem("isInstructor") === "true" ?
            <div>
                <Button className={classes.addAssignmentBtn} onClick={handleAddAssignment}>+ Add New Assignment</Button>
                <Modal
                  className={classes.modal}
                  disableBackdropClick
                  open={modalOpen}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                    >
                    
                  <div className = {classes.paper}>
                      <AddAssignment closeModal = {handleClose}/>
                  </div>
                </Modal>
            </div>
            : null}
        <List
        component="nav"
        className={classes.root}
        >
        <ListItem button onClick={handleAssignmentHeadClick} key="assignmentHead">
            <ListItemIcon>
            <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Upcoming Assignments" />
            {assignmentListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={assignmentListOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

            {upcomingAssignments.map(currentAssignment => (
                <div>
                  <ListItem button className={classes.nested} key={currentAssignment.assignmentID} onClick={() => handleAssignmentClick(currentAssignment.assignmentID)}>
                      <ListItemText primary={currentAssignment.title} 
                      secondary={" Due: " + currentAssignment.dueDate + " | " + currentAssignment.maxPoints + " pts"}  />
                  </ListItem>
                  <Divider />
                </div>
                
            ))}
            </List>
        </Collapse>
        </List>

        <List
      component="nav"
      className={classes.root}
        >
        <ListItem button onClick={handlePastAssignmentHeadClick} key="pastAssignmentHead">
            <ListItemIcon>
            <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Past Assignments" />
            {pastAssignmentListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={pastAssignmentListOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {pastAssignments.map(currentAssignment => (
                <div>
                    <ListItem button className={classes.nested} key={currentAssignment.assignmentID} onClick={() => handlePastAssignmentClick(currentAssignment.assignmentID)}>
                        <ListItemText primary={currentAssignment.title} 
                        secondary={" Due: " + currentAssignment.dueDate + " | " + currentAssignment.maxPoints + " pts"}  />
                    </ListItem>
                    <Divider />
                </div>
            ))}
            </List>
        </Collapse>
        </List>
    </div>

    
  );
}