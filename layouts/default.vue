<template>
    <div>
        <div v-if="mobile" class="absolute top-0 left-0 bg-black w-screen h-screen z-50 text-white text-center flex flex-col">
            <div class="my-auto">
                <h4 class="font-sans font-semibold mb-1">This website is not compatible with mobile devices.</h4>
                <a href="https://sergix.dev" class=" text-violet-600 font-semibold">www.sergix.dev</a>
            </div>
        </div>
        <Nuxt v-else />
    </div>
</template>

<script>
export default {
    data() {
        return {
            mobile: false
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
    }
}
</script>