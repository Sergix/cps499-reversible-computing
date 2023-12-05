// TODO
// current tutorial section
// current section progress
// persistent store

export const state = () => ({
  sections: {
    "Introduction": {
      index: 1,
      lessons: [
        {
          title: "Why?",
          page: "intro"
        },
        {
          title: "Logic",
          page: "logic"
        }
      ]
    },
    "Synthesis": {
      index: 2,
      lessons: [
        {
          title: "Basic Gates",
          page: "gates"
        },
        {
          title: "Billiard Balls",
          page: "bbm"
        }
      ]
    },
    "Computation": {
      index: 3,
      lessons: [
        {
          title: "Reversible Turing Machines",
          page: "rtm"
        }
      ]
    }
  },
  sectionTitle: "",
  lessonTitle: "",
  lessons: []
})

export const getters = {
  getNextLesson: (state) => (currentLessonPage) => {
    // find the section that the lesson is in
    // if the lesson is the last index,
    //  find the next section if there is one, else return null
    let found = false

    for (const section of Object.keys(state.sections)) {
      for (const lesson of state.sections[section].lessons) {
        if (found === true) {
          return lesson
        } else if (lesson.page === currentLessonPage) {
          found = true
        }
      }

      // if there is no next lesson (last one in the section), get the first lesson of the next section
      if (found === true) {
        for (const section2 of Object.keys(state.sections)) {
          if (state.sections[section2].index === state.sections[section].index + 1) {
            return state.sections[section2].lessons[0]
          }
        }
      }
    }

    // if it's the last section or something else goes wrong, return an empty lesson by default
    return { title: '', page: '' }
  },
  sections: (state) => {
    return Object.keys(state.sections)
  }
}
  
export const mutations = {
  // setSectionTitle(state, sectionTitle) {
  //   state.sectionTitle = sectionTitle
  //   state.lessons = SECTIONS.hasOwn(sectionTitle) ? SECTIONS[sectionTitle] : []
  // },
  // setLessonTitle(state, lessonTitle) {
  //   state.lessonTitle = lessonTitle
  // }
  setLessonInfo(state, page) {
    // find the current lesson based on the page name
    for (const section of Object.keys(state.sections)) {
      for (const lesson of state.sections[section].lessons) {
        if (lesson.page === page) {
          state.sectionTitle = section
          state.lessonTitle = lesson.title
          state.lessons = state.sections[section].lessons
        }
      }
    }
  }
}