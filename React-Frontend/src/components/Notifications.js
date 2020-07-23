import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import http from "../api/http";
import utilities from "../actions/utilities";

const state = {

    notifications: [
        {
            id: "123456",
            title: "New comment for \"Assignment 4 Fork Help\"",
            courseName: "CS 3100",
            timestamp: "2020-07-20T11:51:00",
            link: "link to assignment",
            cleared: false
        }
    ]
}

const getNotifications = () => {

    http.getUserNotifications()
        .then( async (response) => {
            const data = await response.json();
            if (response.status === 200 && data["message"] === "success") {
                state.notifications = data["newNotifications"];
            }
        })
        .catch((e) => {
            console.warn("There was an error retrieving notifications: ", e);
        })
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  title: {
      whiteSpace: "normal"
  }
}));

export default function AlignItemsList() {
  const classes = useStyles();
  getNotifications();

  return (
    <List className={classes.root}>
        {state.notifications ? (
            state.notifications.map(currentNotification => (
                <div key={ currentNotification.id }>
                <ListItem alignItems="flex-start">
                    <Link href={currentNotification.link}>
                        <ListItemText className={classes.title}
                            primary={currentNotification.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                        >
                                            {currentNotification.courseName}
                                        </Typography>
                                        <br />
                                        { utilities.formatDateTime(currentNotification.timestamp) }
                                    </React.Fragment>
                                }
                            />
                    </Link>
                </ListItem>
                <Divider />
                </div>
            ))
        ) : <div>No notifications</div>
        }
    </List>
  );
}