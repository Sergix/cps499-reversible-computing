// TODO
// current tutorial section
// current section progress
// persistent store

const SECTIONS = {
  "Synthesis": [
    {
      title: "Basic Gates",
      page: "gates"
    },
    {
      title: "Billiard Balls",
      page: "bbm"
    }
  ]
}

export const state = () => ({
  sectionTitle: "",
  lessonTitle: "",
  lessons: []
})
  
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
    for (const section of Object.keys(SECTIONS)) {
      for (const lesson of SECTIONS[section]) {
        if (lesson.page === page) {
          state.sectionTitle = section
          state.lessonTitle = lesson.title
          state.lessons = SECTIONS[section]
        }
      }
    }
  }
}