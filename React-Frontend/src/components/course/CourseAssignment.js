import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
  contentDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "Space-between",
    padding: "20px"
  },
  submitDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: "20px"
  }
}));

export default function CourseAssignment(props) {

  const classes = useStyles();
//   const isInstructor = sessionStorage.getItem("isInstructor")
  const isInstructor = true
  const assignmentClicked = props.assignmentClicked[0]

  return (
    
    <div>
      <Button onClick={props.closeModal}>
        Cancel
      </Button>
      <div className={classes.contentDiv}>
        <Typography variant="h3">
          {assignmentClicked.title}
        </Typography>
      </div>
      <Divider />
      <div className={classes.contentDiv}>
        <Typography>
          Points Possible: {assignmentClicked.maxPoints}
        </Typography>
        <Typography>
          Due: {assignmentClicked.dueDate}
        </Typography>
        <Typography>
          {assignmentClicked.submissionType === "TEXTBOX" ? 'Submission Type: Text Input' : 'Submission Type: File Upload'}
        </Typography>
      </div>
      <Divider />
      <div className={classes.contentDiv}>
        <Typography>
          {assignmentClicked.description}
        </Typography>
      </div>
      <Divider />
      <div className={classes.submitDiv}>
        <Button>
          Submit Assignment
        </Button>
      </div>
    </div>
    
  );
}