<template>
    <Lesson num-sections="3">
        <template #1="{ next }">
            <h3>Ok, so we've built some reversible gates and shown we can build a computer using them, but it still doesn't feel like we've done much actual computing.</h3>
            <p>And you would be correct! We've mostly been discussing reversible logic and how to build gates out of that reversible logic, but not much on the abstract models of computation.</p>
            <p>There are a few different abstract models of computing, but the most common is a <span class="highlighted">Turing Machine (TM)</span>: a simple theoretical device that can simulate <b>any possible computation</b>, given enough time and memory. It works by having an infinitely long <i>tape</i> where the information is stored, and a read/write/move device called the <i>tape head</i> that performs one of its operations based on the value of the symbol on the tape and the rules that it is preset to follow.</p>
            <p>Essentially, a TM has the following components:</p>
            <ul>
                <li>A set of distinct states that the TM can be in</li>
                <li>A set of symbols used on the tape, including a blank symbol</li>
                <li>A set of rules for how the machine interacts with the tape, depending on the value of the tape at the current position</li>
                <li>The starting state of the machine</li>
                <li>The final state of the machine</li>
            </ul>
            <button @click="next">NEXT</button>
            <p class="citation">The definitions and examples in this section are from https://doi.org/10.1007/s00236-015-0253-y</p>
        </template>
        <template #2="{ next }">
            <h3>How would you define a <span class="highlighted">reversible</span> turing machine?</h3>
            <p>Simply using the definitions of local forwards and backwards determinism discussed in the first section.</p>
            <p>In other words, if each state transition rule is injective then it is an RTM: each next state can only have at most one initial state, and vice-versa.</p>
            <!-- <p>You can be a bit more specific with how the rules are organized, though.</p> -->
            <buptton @click="next">NEXT</buptton>
        </template>
    </Lesson>
</template>

<script>
export default {
    name: "RTMPage",
    layout: 'tutorial'
}
</script>