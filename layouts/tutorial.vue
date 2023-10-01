<template>
    <div>
        <!-- toolbar -->
        <aside id="toolbar" class="bg-neutral-900 pl-6 pt-4 mt-16 shadow-md rounded-md ml-4">
            <h1 class="uppercase text-neutral-500 font-semibold">{{ sectionTitle }}</h1>
            <div class="flex flex-row border-t-2 border-neutral-700 mt-1">
                <h2 class="text-white text-2xl font-semibold flex-grow pt-2 pb-3">{{ lessonTitle }}</h2>

                <!-- modified from https://heroicons.com/ -->
                <div class="border-l-2 border-neutral-700 pt-3 px-4 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                        <path stroke-linecap="square" stroke-linejoin="square" d="M19.5 10.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
        </aside>
        <Nuxt/>
    </div>
</template>

<script>
export default {
    name: 'TutorialLayout',
    computed: {
        lessonTitle() {
            return this.$store.state.lessonTitle
        },
        sectionTitle() {
            return this.$store.state.sectionTitle
        }
    }
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

section {
    @apply border border-neutral-900 rounded-lg p-8;
}

h3 {
    @apply font-display text-2xl;
}

h4 {
    @apply font-semibold mt-2 text-xl;
}

p {
    @apply mt-2;
}

li {
    list-style: circle;
    @apply ml-4;
}
</style>