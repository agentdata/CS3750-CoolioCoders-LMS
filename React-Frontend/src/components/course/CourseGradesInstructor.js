import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({

})

class CourseGrades extends Component {

    render() {
        return (
            <div>
                This will be the Course Grades for the instructor
            </div>
        )
    }
}

export default withStyles(styles)(CourseGrades)