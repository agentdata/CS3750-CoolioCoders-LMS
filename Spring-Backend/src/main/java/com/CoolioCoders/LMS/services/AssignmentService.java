package com.CoolioCoders.LMS.services;

import com.CoolioCoders.LMS.exceptions.EntityNotFoundException;
import com.CoolioCoders.LMS.models.*;
import com.CoolioCoders.LMS.repositories.AssignmentRepository;
import com.CoolioCoders.LMS.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepository;

    @Autowired
    CourseService courseService;

    public Assignment findByAssignmentId(String assignmentId) {
        return assignmentRepository.findById(assignmentId).orElseThrow(EntityNotFoundException::new);
    }

    public List<Assignment> findByCourseId(String courseId){
        List<Assignment> assignments = assignmentRepository.findByCourseId(courseId);
        if(assignments != null){
            return assignments;
        }
        return new ArrayList<>();
    }

    public Assignment save(Assignment assignment){
        return assignmentRepository.save(assignment);
    }

    public void saveSubmission(Assignment assignment, AssignmentSubmission submission) {
        List<AssignmentSubmission> submissions = assignment.getSubmissions();
        submissions.add(submission);
        assignment.setSubmissions(submissions);
        save(assignment);
    }

    public List<SimplifiedAssignment> getSimplifiedAssignmentList(List<Assignment> assignments) {
        List<SimplifiedAssignment> simplifiedAssignmentList = new ArrayList<>();
        for (Assignment assignment : assignments) {
            String id = assignment.getId();
            String title = assignment.getTitle();
            LocalDateTime dueDate = assignment.getDueDate();
            String assignmentCourseId = assignment.getCourseId();

            simplifiedAssignmentList.add(new SimplifiedAssignment(id, title, dueDate, assignmentCourseId));
        }

        return simplifiedAssignmentList;
    }
    public Map<Object, Object> getAssignmentDetailsAsJson(Assignment assignment){
        Map<Object, Object> body = new LinkedHashMap<>();

        body.put("id", assignment.getId());
        body.put("title", assignment.getTitle());
        body.put("description", assignment.getDescription());
        body.put("submissionType", assignment.getSubmissionType());
        body.put("dueDate", assignment.getDueDate());
        body.put("maxPoints", assignment.getMaxPoints());
        body.put("courseId", assignment.getCourseId());

        return body;
    }

    /**
     * takes assignmentID, studentID and number grade as parameters and then sets the grade and updates the database.
     * @param assignmentId
     * @param studentId
     * @param grade
     * @return boolean value, true if there were no issues setting the grade
     */
    public boolean  gradeAssignmentSubmission(String instructorId, String assignmentId, String studentId, Number grade){

        Assignment assignment = null;
        AssignmentSubmission submission = null;
        try {
            assignment = findByAssignmentId(assignmentId);
            Course course =  courseService.findById(assignment.getCourseId()); //.getInstructor().getId()

            //verify requesting instructor is the instructor for this course
            if(course.getInstructor().getId().compareTo(instructorId) == 0){
                submission = assignment.getStudentSubmission(studentId);
            }
            else{
                return false;
            }

        }catch (Exception e){
            return false;
        }

        if(assignment != null && submission != null && grade.doubleValue() >= 0 && grade.doubleValue() <= assignment.getMaxPoints()) {
            submission.setGraded(true);
            submission.setPointsAwarded(grade.doubleValue());
            assignmentRepository.save(assignment);
            return true;
        }
        return false;
    }
}