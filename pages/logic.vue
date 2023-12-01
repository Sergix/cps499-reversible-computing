<template>
    <Lesson :num-sections="3">
        <template #1="{ next }">
            <h3>What is reversible logic?</h3>
            <p>In the previous section, we worked through a simple way to turn addition from an irreversible to reversible operation: for any <i>n</i> inputs, we copy <i>n - 1</i> of the inputs to the output.</p>
            <p>In other words, for our addition operation, f(1, 2, 3, 4, 5) = (1 + 2 + 3 + 4 + 5, 1, 2, 3, 4) means for our n = 5 inputs, we copied (n - 1) = 4 of our inputs to our output.</p>
            <p>This makes our addition operation one-to-one: every output maps to one unique input; and the number of inputs is equal to the number of outputs.</p>
            <p>In summary, the characteristics of reversible operations are:</p>
            <ol >
                <li><span class="highlighted">One-to-one</span>: uniqueness of outputs to inputs</li>
                <li>(Under most cases) <span class="highlighted">the number of inputs equals the number of outputs</span></li>
                <li>(1) and (2) imply that <span class="highlighted">no information is lost</span> in the operation</li>
            </ol>
            <h4>Let's formalize these characteristics mathematically.</h4>
            <button class="mb-4" @click="next">NEXT</button>
            <!-- <p class="citation">Most of the notation and ideas in this section are used from DOI:10.1145/1366230.1366239, but my own ideas are inserted as well.</p> -->
        </template>
        <template #2="{ next }">
            <h3>How can we define a reversible function?</h3>
            <p>A function f is reversible if and only if it is one-to-one.</p>
            <p>That's it!</p>
            <p>But briefly, we need to define some important terms:</p>
            <ul>
                <li><b>Forwards-deterministic:</b> an operation on an input always results in the same output.</li>
                <p class="!mt-0 ml-4">(All functions are forwards-deterministic since a function always outputs the same value for any input.)</p>
                <li><b>Backwards-deterministic:</b> the inverse operation on an output always results in the same input.</li>
                <p class="!mt-0 ml-4">(This is just the reverse of forwards-deterministic, but the reverse-arrow means the inverse of the function.)</p>
            </ul>
            <img class="my-8 mx-auto" src="~/assets/images/logic.drawio.png">
            <h4>So, a reversible function is one-to-one, or <span class="highlighted">forwards and backwards deterministic.</span></h4>
            <button @click="next">NEXT</button>
        </template>
        <template #3="{ next }">
            <h3>How can we define "no loss of information"?</h3>
            <p>This is where things get tricky. Are you confused yet? Hopefully not, as we're entering the world of <span class="highlighted">information theory and state spaces.</span> [1]</p>
            <button @click="next">NEXT</button>
            <p class="citation">[1] This method of analyzing reversibility was poineered by Michael P. Frank in <a href="https://doi.org/10.48550/arXiv.1806.10183" class="italic text-blue-500">Generalized Reversible Computing</a>.</p>
        </template>
    </Lesson>
</template>

<script>
export default {
    name: 'LogicPage',
    layout: 'tutorial'
}
</script>