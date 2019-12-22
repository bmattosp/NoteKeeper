package com.example.notekeeper

class DataManager {
    val courses = HashMap<String, CourseInfo>()
    val notes = ArrayList<NoteInfo>()

    init {
        InitializeCourses()
    }

    private fun InitializeCourses()
    {
        var course = CourseInfo("android_intents", "Android Programming with Intents")
        courses.set (course.courseid, course)

        course = CourseInfo (title = "Android Async Programming ad Services", courseid = "android_async")
        courses.set (course.courseid, course)

        course = CourseInfo(courseid = "java_lang", title = "Java Fundamentals: The java Language")
        courses.set(course.courseid, course)

        val courseVal = CourseInfo("java_core", "Java Fundamentals: The cores Platform")
        courses.set (course.courseid, course)


    }
}