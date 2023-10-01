<template>
    <div>
        <!-- toolbar -->
        <aside id="toolbar" class="bg-neutral-900 pl-6 pt-4 mt-16 shadow-md rounded-md ml-4 absolute">
            <h1 class="uppercase text-neutral-500 font-semibold">{{ sectionTitle }}</h1>
            <div class="flex flex-row border-t-2 border-neutral-700 mt-1">
                <h2 class="text-white text-2xl font-semibold flex-grow pt-2 pb-3">{{ lessonTitle }}</h2>

                <!-- modified from https://heroicons.com/ -->
                <div class="border-l-2 border-neutral-700 pt-3 px-4 rounded-md" @click="toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="square" stroke-linejoin="square" d="M19.5 10.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            <transition name="slide-fade">
                <ul v-if="toggled" id="lesson-list" class="list-none text-white">
                    <li v-for="lesson in lessons" :key="lesson.page" class="border-y border-neutral-500 py-2">
                        <nuxt-link :to="`/${lesson.page}`" :class="lesson.page !== $route.name ? 'text-neutral-500' : ''">{{ lesson.title }}</nuxt-link>
                    </li>
                </ul>
            </transition>
        </aside>
        <Nuxt class="pt-64"/>
    </div>
</template>

<script>
export default {
    name: 'TutorialLayout',
    data() {
        return {
            toggled: false
        }
    },
    computed: {
        lessonTitle() {
            return this.$store.state.lessonTitle 
        },
        lessons() {
            return this.$store.state.lessons
        },
        sectionTitle() {
            return this.$store.state.sectionTitle
        }
    },
    watch: {
        $route() {
            this.$store.commit('setLessonInfo', this.$route.name)
        }
    },
    mounted() {
        this.$store.commit('setLessonInfo', this.$route.name)
    },
    methods: {
        toggle() {
            this.toggled = !this.toggled
        }
    },
}
</script>

<style scoped>
main {
    max-width: 64em;
    margin-left: auto;
    margin-right: auto;
}

#toolbar {
    width: 16em;
}

main section {
    @apply border border-neutral-900 rounded-lg p-8;
}

main h3 {
    @apply font-display text-2xl;
}

main h4 {
    @apply font-semibold mt-2 text-xl;
}

main p {
    @apply mt-2;
}

main li {
    list-style: circle;
    @apply ml-4;
}

/* from https://v2.vuejs.org/v2/guide/transitions#CSS-Transitions */
.slide-fade-enter-active {
  transition: all .15s ease;
}
.slide-fade-leave-active {
  transition: all .15s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-40px);
  opacity: 0;
}
</style>