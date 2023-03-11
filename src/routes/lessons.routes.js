const express = require('express');
const lessonRouter = express.Router();

const{
    makeLesson,
    getLessonbyID,
    getLessonsbyStudentID,
    getPastLessonsbyStudentName,
    getFutureLessonsbyStudentName,
    patchLessonAddStudent,
    getPastLessonsbyStudentID,
    getFutureLessonsbyStudentID,
    patchLesson,
    deletelessons,
    getAllLessons
}= require("../controllers/lessons.controller")

lessonRouter.post('/api/lesson', makeLesson);
lessonRouter.get('/api/lesson', getLessonbyID);
lessonRouter.patch('/api/lesson', patchLesson)
lessonRouter.get('/api/lessonsByStudentID', getLessonsbyStudentID);
lessonRouter.get('/api/pastLessonsByStudentID', getPastLessonsbyStudentID);
lessonRouter.get('/api/futureLessonsByStudentID', getFutureLessonsbyStudentID);
lessonRouter.get('/api/pastLessonsByStudentName', getPastLessonsbyStudentName);
lessonRouter.get('/api/futureLessonsByStudentName', getFutureLessonsbyStudentName);
lessonRouter.patch('/api/lessonAddStudent', patchLessonAddStudent)
lessonRouter.get('/api/allLessons', getAllLessons)
lessonRouter.delete('/api/lesson', deletelessons);


module.exports = lessonRouter;