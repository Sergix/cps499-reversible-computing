// TODO
// current tutorial section
// current section progress
// persistent store

export const state = () => ({
  sectionTitle: "",
  lessonTitle: ""
})
  
export const mutations = {
  setSectionTitle(state, sectionTitle) {
    state.sectionTitle = sectionTitle
  },
  setLessonTitle(state, lessonTitle) {
    state.lessonTitle = lessonTitle
  }
}