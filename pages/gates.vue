<template>
    <Lesson :num-sections="1">
        <template #1="{ next }">
        
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