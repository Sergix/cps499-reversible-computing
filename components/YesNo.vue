<template>
    <div class="p-2">
        <div class="flex flex-row justify-center mb-4">
            <button class="w-32 font-display mr-2 !bg-emerald-600 disabled:!bg-gray-400" @click="select(true)">YES</button>
            <button class="w-32 font-display !bg-red-800 disabled:!bg-gray-400" @click="select(false)">NO</button>
        </div>
        <Transition name="fade">
            <p v-show="attempted && hint !== ''" class="text-sm italic text-gray-600">Hint: {{ hint }}</p>
        </Transition>
        <slot v-if="success"></slot>
    </div>
</template>

<script>
/*
FEATURES:
- emits @yes or @no event on click
- exposes named slots for "yes" and "no" answers
*/

export default {
    name: 'YesNo',
    props: {
        answer: {
            type: Boolean,
            required: true,
        },
        hint: {
            type: String,
            required: false,
            default() { return "" }
        }
    },
    data() {
        return {
            attempted: false,
            success: false,
        }
    },
    methods: {
        select(answer) {
            if (answer !== this.answer) {
                this.attempted = true
            } else {
                this.success = true
                this.$emit('success')
            }
        }
    }
}
</script>

<style>

</style>