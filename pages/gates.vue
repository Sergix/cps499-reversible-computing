<template>
    <Lesson :num-sections="1">
        <template #1="{ next }">
            <h3>BEHOLD: the CNOT gate.</h3>
            <button @click="next"></button>
        </template>
    </Lesson>
</template>

<script>
export default {
    name: 'GatesPage',
    layout: 'tutorial'
}
</script>