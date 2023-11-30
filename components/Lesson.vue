<template>
  <div>
    <main class="relative flex flex-col justify-center align-middle min-h-screen py-4">
      <progress ref="lessonprogress" class="w-full mt-2 rounded-full" :value="current_section - 1" :max="numSections"> {{ current_section }} / {{ numSections }} </progress>
      <transition name="fade">
        <section v-show="current_section <= numSections" id="lesson-content-section" ref="lessonsection" class="border border-neutral-900 rounded-lg p-8 my-2">
          <slot :name="current_section" :next="next"/>
        </section>
      </transition>
      <transition name="fade">
        <section v-show="current_section > numSections" class="my-4">
          <h3 class="mb-8">Lesson complete!</h3>
          <nuxt-link class="rounded bg-violet-500 px-6 py-4 text-3xl font-semibold font-sans text-blue-600 shadow" :to="`/${$store.getters.getNextLesson($route.name).page}`">Next Lesson: {{ $store.getters.getNextLesson($route.name).title }} →</nuxt-link>
        </section>
      </transition>
      <transition name="fade">
        <button v-show="current_section > 1" class="ml-auto" @click="prev">PREV</button>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Lesson',
  props: {
    numSections: {
      required: true,
      type: Number,
    }
  },
  data(){
      return {
          current_section: 1
      }
  },
  watch: {
    current_section(value) {
      // for animating the progress bar in Firefox
      this.$refs.lessonprogress.style.setProperty('--value', `${((value - 1) / this.numSections) * 100}%`)
    }
  },
  methods: {
    next() {
      // TODO: what if end of lesson?
      // - need to get next lesson from vuex
      if (this.current_section > this.numSections)
        return

      // slide out
      this.$refs.lessonsection.classList.add('slide-left')
      setTimeout(() => {
        this.current_section += 1
        this.$refs.lessonsection.classList.remove('slide-left')

        this.$refs.lessonsection.classList.add('slide-right')
        setTimeout(() => this.$refs.lessonsection.classList.remove('slide-right'), 200)
      }, 200)
    },
    prev() {
      // slide in
      this.$refs.lessonsection.classList.add('slide-right')
      setTimeout(() => {
        this.current_section -= 1

        this.$refs.lessonsection.classList.remove('slide-right')

        this.$refs.lessonsection.classList.add('slide-left')
        setTimeout(() => this.$refs.lessonsection.classList.remove('slide-left'), 200)
      }, 200)
    }
  }
}
</script>

<style scoped>

/* https://codepen.io/snookca/pen/KRdRzZ */
progress {
  /* width: 400px; */
  border: 0; /* for IE */
  height: 10px;
  background-color: white;
  border: 1px solid var(--primary-color);
  overflow: hidden;
}

/* necessary to style the progress bar background */
::-webkit-progress-bar {
  background-color: white;
}
progress::-webkit-progress-value {
  transition: width 1s;
  background-color: var(--primary-color);
}
progress::-moz-progress-bar {
  transition: padding-bottom 1s;
  padding-left: 60px;
  padding-bottom: var(--value);
  background-color: var(--primary-color);
  height: 0;
  transform-origin: 0 0;
  transform: rotate(-90deg) translateX(-60px) ;
}
progress::-ms-fill {
  background-color: var(--primary-color);
  border:0;
}

#lesson-content-section {
  transition: all .2s ease;
}

/* https://v2.vuejs.org/v2/guide/transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-left {
  transform: translateX(-50px);
  opacity: 0;
}

.slide-right {
  transform: translateX(50px);
  opacity: 0;
}
</style>