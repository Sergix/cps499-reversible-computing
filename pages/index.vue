<template>
  <main class="overflow-hidden">
    <section id="frame2">
      <div class="absolute right-0 bottom-0 flex mr-16 mb-12 cursor-pointer" @click="sectionScrollDown">
        <p class="text-purple-600 text-xl font-semibold self-start">[prev]</p>
        <img src="~/assets/images/arrow-down.svg" class="w-10"/>
      </div>

      <div class="my-auto p-32">
        <p class="text-white leading-tight text-sm">
          A PROJECT BY PEYTON MCGINNIS<br>
          SERGIX.DEV<br>
          ESTIMATED TUTORIAL TIME: 2 HOURS
        </p>
        <h2 class="text-white font-display text-5xl mt-2">So, are you ready to learn?</h2>
        <button type="button" class="border rounded-md px-8 py-2 font-semibold text-purple-600 bg-white font-display text-2xl mt-6 shadow-md hover:bg-slate-100 active:bg-purple-800 transition-colors">JUMP IN</button>
      </div>
    </section>
    <section id="frame1">
      <div class="absolute right-0 top-0 flex mr-16 mt-12 cursor-pointer" @click="sectionScrollUp">
        <p class="text-purple-600 text-xl font-semibold self-end">[next]</p>
        <img src="~/assets/images/arrow-up.svg" class="w-10 animate-bounce"/>
      </div>
      <div class="absolute right-0 bottom-0 flex mr-16 mb-12 cursor-pointer" @click="sectionScrollDown">
        <p class="text-purple-600 text-xl font-semibold self-start">[prev]</p>
        <img src="~/assets/images/arrow-down.svg" class="w-10"/>
      </div>

      <div class="flex flex-row w-full my-auto">
        <h3 class="w-full font-display text-4xl px-8">
          Reversible computing is a little-known but powerful field that has implications across all areas of computing to <span class="text-purple-600">[speed up proccessing]</span>, <span class="text-purple-600">[track state changes in complex systems]</span>, and  <span class="text-purple-600">[defy physical constraints]</span>.
          <br><br>
          Also, <span class="text-purple-600">[quantum computing.]</span>
        </h3>
        <div id="frame1-vanta" class="px-8 mr-24 w-1/2"></div>
      </div>
    </section>
    <section id="frame0">
      <img id="frame0-bg" class="absolute left-0 top-0 w-screen h-screen" src="https://images.unsplash.com/photo-1667487935540-f59515f6c7fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1962&q=80"/>

      <div class="absolute right-0 top-0 flex mr-16 mt-12 cursor-pointer" @click="sectionScrollUp">
        <p class="text-purple-600 text-xl font-semibold self-end">[next]</p>
        <img src="~/assets/images/arrow-up.svg" class="w-10 animate-bounce"/>
      </div>

      <div id="frame0-div" class="my-auto opacity-80 absolute h-screen left-0 top-0 p-16">
        <h3 class="font-display text-4xl">The science and math behind what's already changing the world.</h3>
        <p class="text-rose-500 font-semibold text-xl mt-4">[by Peyton McGinnis]</p>
      </div>
      <h1 class="font-display absolute">REVERSIBLE COMPUTING</h1>
    </section>
  </main>
</template>

<script>
import DOTS from 'vanta/dist/vanta.net.min'
import * as THREE from 'three';

export default {
  name: 'IndexPage',
  data() {
    return {
      current_section: 0,
      NUM_FRAMES: 3
    }
  },
  mounted() {
    window.scrollTo(0, document.body.scrollHeight);
    document.body.style.overflow = 'hidden';
    this.current_section = 0;

    this.vantaEffect = DOTS({
      el: "#frame1-vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 300.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      size: 3.00,
      spacing: 15,
      backgroundColor: 0x7320bd,
      color: 0xababab,
      color2: 0xababab,
      THREE,
    });
  },
  methods: {
    sectionScrollUp() {
      if (this.current_section < this.NUM_FRAMES) {
        this.current_section++;
        this.scrollToFrame();
      }
    },
    sectionScrollDown() {
      if (this.current_section > 0) {
        this.current_section--;
        this.scrollToFrame();
      }
    },
    scrollToFrame() {
      (document.getElementById(`frame${this.current_section}`)).scrollIntoView({behavior: "smooth"});
    }
  }
}
</script>

<style scoped>
section {
  @apply h-screen w-screen flex p-8;
  position: relative;
}

#frame0-bg {
  animation: hue 3s infinite;
}

#frame0-div {
  background: conic-gradient(from 0.20turn at 25% 35%, rgba(0,0,0, 0.8), rgba(25, 25, 25, 0.8));
  width: 32em;
}

#frame1 {
  background: #bcbcbc;
}

#frame2 {
  background: linear-gradient(to bottom, #A32FFF 0 75%, #bcbcbc);
}

h1 {
  font-size: 12rem;
  line-height: 0.85;
  left: -0.1em;
  bottom: 0em;
  overflow: hidden;

  background: linear-gradient(-45deg, #86198f, #7e22ce, #e73c7e, #23a6d5);
  background-size: 400% 400%;

  /* https://codepen.io/P1N2O/pen/pyBNzX */
  animation: gradient 15s ease infinite;
}

h3 {
  color: #555;
}
</style>