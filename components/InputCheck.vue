<template>
    <div>
        <form @submit.prevent="check">
            <input v-model="input" type="text" class="border border-gray-300 py-1 px-2 text-lg font-mono">
            <button type="button" @click.prevent="check">CHECK ANSWER</button>
            <Transition name="fade">
                <p v-show="attempted && hint !== ''" class="text-sm italic text-gray-600">Hint: {{ hint }}</p>
            </Transition>
        </form>
        <slot v-if="success"></slot>
    </div>
</template>

<script>
/*

*/

export default {
    name: 'InputCheck',
    props: {
        value: {
            type: String,
            required: false,
            default() { return ""}
        },
        answer: {
            type: String,
            required: true,
            default() { return "" }
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
            input: this.value
        }
    },
    methods: {
        check() {
            if (this.input.trim().toLowerCase() === this.answer) {
                this.success = true
                this.$emit('success')
            } else {
                this.attempted = true
            }
        }
    }
}
</script>
