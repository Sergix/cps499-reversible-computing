<template>
    <div>
        <div v-if="mobile" class="absolute top-0 left-0 bg-black w-screen h-screen z-50 text-white text-center flex flex-col">
            <div class="my-auto">
                <h4 class="font-sans font-semibold mb-1">This website is not compatible with mobile devices.</h4>
                <a href="https://sergix.dev" class=" text-violet-600 font-semibold">www.sergix.dev</a>
            </div>
        </div>
        <div v-else>
            <!-- toolbar -->
            <aside id="toolbar" class="bg-neutral-900 pl-6 pt-4 mt-16 shadow-md rounded-md ml-4 fixed z-10">
                <h1 class="uppercase text-neutral-500 font-semibold cursor-pointer" @click="select_section_toggle">{{ sectionTitle }}</h1>
                <div class="flex flex-row border-t-2 border-neutral-700 mt-1">
                    <h2 class="text-white text-2xl font-semibold flex-grow pt-2 pb-3">{{ lessonTitle }}</h2>
    
                    <!-- modified from https://heroicons.com/ -->
                    <div ref="sidebartoggle" class="border-l-2 border-neutral-700 pt-3 px-4 rounded-md cursor-pointer" @click="toggle">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6 pointer-events-none">
                            <path stroke-linecap="square" stroke-linejoin="square" d="M19.5 10.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
    
                <!-- lessons dropdown -->
                <transition name="slide-fade">
                    <ul v-if="toggled" id="lesson-list" class="list-none text-white">
                        <li v-for="lesson in lessons" :key="lesson.page" class="border-y border-neutral-500 py-2 w-full">
                            <nuxt-link :to="`/${lesson.page}`" :class="lesson.page !== $route.name ? 'text-neutral-500 w-full block' : 'w-full block'">{{ lesson.title }}</nuxt-link>
                        </li>
                    </ul>
                </transition>
            </aside>
            <!-- section select -->
            <transition name="fade">
                <ul v-if="select_section_toggled" class="list-none text-white z-30 fixed mt-16 pt-4 pl-10" @click="select_section_toggled = false">
                    <nuxt-link :to="`/${$store.state.sections[sectionTitle].lessons[0].page}`" class="text-neutral-500 uppercase font-semibold">{{ sectionTitle }}</nuxt-link>
                    <li v-for="section in sections" v-show="section !== sectionTitle" :key="section">
                        <nuxt-link :to="`/${$store.state.sections[section].lessons[0].page}`" :class="section === sectionTitle ? 'text-neutral-500 uppercase font-semibold' : 'uppercase font-semibold'">{{ section }}</nuxt-link>
                    </li>
                </ul>
            </transition>
            <transition name="fade">
                <div v-show="select_section_toggled" ref="selectsectionshadow" class="fixed top-0 left-0 w-screen h-screen bg-black opacity-90 z-20"></div>
            </transition>
            <Nuxt v-if="!mobile" class="tutorial z-0"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'TutorialLayout',
    data() {
        return {
            toggled: false,
            select_section_toggled: false,
            mobile: false,
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
        },
        ...mapGetters(['sections'])
    },
    watch: {
        $route() {
            this.$store.commit('setLessonInfo', this.$route.name)
        }
    },
    mounted() {
        window.onload = window.onresize = (e) => {
            console.log(window.innerHeight, window.innerWidth)
            if (window.innerHeight < 640 || window.innerWidth < 1200 ) {
                this.mobile = true
            } else {
                this.mobile = false
            }
        }

        document.addEventListener('click', (e) => {
            // close the sidebar if mouse is clicked away
            if (e.target !== this.$refs.sidebartoggle)
                this.toggled = false

            // close the overlay if mouse is clicked away
            if (e.target === this.$refs.selectsectionshadow)
                this.select_section_toggled = false
        })
        
        this.$store.commit('setLessonInfo', this.$route.name)
    },
    methods: {
        toggle() {
            this.toggled = !this.toggled
        },
        select_section_toggle() {
            this.select_section_toggled = !this.select_section_toggled
        }
    },
}
</script>

<style>
.tutorial {
    max-width: 64em;
    margin-left: auto;
    margin-right: auto;
}

#toolbar {
    width: 16em;
}

.tutorial h3 {
    @apply font-display text-2xl;
}

.tutorial h4 {
    @apply font-semibold mt-2 text-xl;
}

.tutorial h5 {
    @apply font-bold mt-2;
}

.tutorial p {
    @apply mt-2;
}

.tutorial ul > li {
    list-style: circle;
    @apply ml-4;
}

.tutorial ol > li {
    list-style: decimal;
    @apply ml-4;
}

.tutorial label {
    @apply font-semibold block mt-1;
}

.tutorial input {
    @apply border-black rounded-md mb-1 px-1;
}

.tutorial select {
    @apply px-2 py-1 rounded-md bg-neutral-50 border border-violet-800;
}

.tutorial button {
    @apply border rounded-md px-4 py-2 mt-4 bg-violet-800 text-white hover:bg-violet-700 active:bg-violet-900;
}

.tutorial table td, .tutorial table th {
    @apply border border-black text-center px-4;
}

.tutorial .MathJax_Display {
    @apply my-2;
}

.tutorial span.inline > .MathJax_Display {
    @apply !inline;
}

.tutorial aside {
    @apply border border-l-2 border-y-0 border-r-0 border-gray-500 text-gray-700 pl-4 my-4;
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