const express = require('express');
const lessonRouter = express.Router();

const{
    makeLesson,
    getLessonbyID,
    getLessonsbyStudentID,
    getLessonsbyStudentName,
    patchLessonAddStudent,
    patchLesson
}= require("../controllers/lessons.controller")

lessonRouter.post('/api/lesson', makeLesson);
lessonRouter.get('/api/lesson', getLessonbyID);
lessonRouter.patch('/api/lesson', patchLesson)
lessonRouter.get('/api/lessonsByStudentID', getLessonsbyStudentID);
lessonRouter.get('/api/lessonsByStudentName', getLessonsbyStudentName);
lessonRouter.patch('/api/lessonAddStudent', patchLessonAddStudent)


module.exports = lessonRouter;