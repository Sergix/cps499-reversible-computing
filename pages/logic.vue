<template>
    <Lesson :num-sections="7">
        <template #1="{ next }">
            <h3>What is reversible logic?</h3>
            <p>In the previous section, we worked through a simple way to turn addition from an irreversible to reversible operation: for any <i>n</i> inputs, we copy <i>n - 1</i> of the inputs to the output.</p>
            <p>In other words, for our addition operation, <vue-mathjax formula="$$f(1, 2, 3, 4, 5) = (1 + 2 + 3 + 4 + 5, 1, 2, 3, 4)$$"></vue-mathjax> means for our n = 5 inputs, we copied (n - 1) = 4 of our inputs to our output.</p>
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
            <p>A function is reversible if and only if it is one-to-one.</p>
            <p>That's it!</p>
            <p>But briefly, we need to define some important terms:</p>
            <ul>
                <li><b>Forwards-deterministic:</b> an operation on an input always results in the same output.</li>
                <p class="!mt-0 ml-4">(All functions are forwards-deterministic since a function always outputs the same value for any input.)</p>
                <li><b>Backwards-deterministic:</b> the inverse operation on an output always results in the same input.</li>
                <p class="!mt-0 ml-4">(This is just the reverse of forwards-deterministic, but the reverse-arrow means the inverse of the function.)</p>
            </ul>
            <img class="my-8 mx-auto" src="~/assets/images/logic.drawio.png">
            <h4>So, a reversible function is one-to-one, or <input v-model="input1" type="text" class="border border-gray-300 py-1 px-2 text-lg font-mono"> and <input v-model="input2" type="text" class="border border-gray-300 py-1 px-2 text-lg font-mono"><span class="highlighted"> deterministic.</span></h4>
            <button type="button" @click="check2(next)">CHECK ANSWER</button>
            <Transition name="fade">
                <p v-show="attempted2" class="text-sm italic text-gray-600">Hint: Look at the diagram above. The "reversible" operation is a composition of what other two operations?</p>
            </Transition>
        </template>
        <template #3="{ next }">
            <h3>For a reversible process, which may be multiple functions, each must also be reversible.</h3>
            <p>This is called <span class="highlighted">local reversibility</span>. [1]</p>
            <img class="my-8 mx-auto" src="~/assets/images/localreversibility.drawio.png">
            <p>This example is an irreversible process since one stage is irreversible, even though some stages are reversible.</p>
            <button @click="next">NEXT</button>
            <p class="citation">[1] https://soeg.kb.dk/permalink/45KBDK_KGL/1pioq0f/alma99122355092605763</p>
        </template>
        <template #4="{ next }">
            <h3>How can we define <span class="highlighted">no loss of information</span>?</h3>
            <p>This is where things get tricky. Are you confused yet? Hopefully not, as we're entering the world of <span class="highlighted">information theory and state spaces.</span> [1]</p>
            <button @click="next">NEXT</button>
            <p class="citation">[1] This method of analyzing reversibility was well explained by Michael P. Frank in <a href="https://doi.org/10.48550/arXiv.1806.10183" class="italic text-blue-500">Generalized Reversible Computing</a>.</p>
        </template>
        <template #5="{ next }">
            <h3>Where does the heat released from a computer go?</h3>
            <p>As we talked about earlier, if an operation is not one-to-one, information about the inputs is lost.</p>
            <p>For example, consider a traditional AND gate:</p>
            <div class="flex flex-row mx-auto items-center justify-center my-8">
                <img src="~/assets/images/andgate.drawio.png" class="mr-4">
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">IN</th>
                            <th>OUT</th>
                        </tr>
                        <tr>
                            <th>a</th>
                            <th>b</th>
                            <th>c</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-center">Is the AND operation reversible?</p>
            <YesNo hint="Remember the definition of reversibility: each output must map to a unique input, and vice-versa." :answer="false" @success="next"></YesNo>
        </template>
        <template #6="{ next }">
            <h3>So where does that lost information <i>go?</i></h3>
            
            <p>When we talk about a <i>physical</i> computing system, it's helpful to split our entropy into two subsystems, each with its own entropy: computational and non-computational.</p>
            <ul>
                <li><b>Computational subsystem:</b> directly related to the computation, such as the process's bits and how being used are changed</li>
                <li><b>Non-computational subsystem:</b> unrelated to the computation, but physically significant and dependent on the computational entropy</li>
            </ul>
            <p>Remember how we concluded earlier that entropy in a process increases when you lose information, generating heat?</p>
            <p>In the <b>computational</b> subsystem, whenever we erase bits in a process, we actually <span class="highlighted">decrease entropy.</span></p>
            <h4>But why? Didn't we just conclude that entropy increases whenever we do something like erasing?</h4>
            <button @click="next">EXPLAIN!</button>
        </template>
        <template #7="{ next }">
            <h3>When a computer opens up a new process, a certain amount of bits are reserved for that process.</h3>
            <h4>The contents of that chunk of memory is normally completely random -- and, by definition, high in entropy.</h4>
            <div class="mt-4">
                <p><b>STARTING BITS: Time t</b></p>
                <table>
                    <tbody>
                        <tr>
                            <td>1 / 0</td>
                            <td>1 / 0</td>
                            <td>1 / 0</td>
                            <td>1 / 0</td>
                            <td>1 / 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- <p>Using some information theory, we can actually compute the amount of entropy:</p>
            <p>|C|∑(j=0)P(cj)*[log 1/P(cj)]</p> -->
            <p>Let's say we erase and overwrite some of these bits. Then, by writing this bit and adding information to the process, we eliminate the probability that this bit might be 1 or 0, and therefore <span class="highlighted">decrease entropy</span> in the computational subsystem.</p>
            <div class="mt-4">
                <p><b>STARTING BITS: Time t + 1</b></p>
                <table>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1 / 0</td>
                            <td>1 / 0</td>
                            <td>1 / 0</td>
                            <td>1 / 0</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>But what does our old friend, the Second Law of Thermodynamics, affirm about our process? That total entropy must always increase, never decrease. So our lost information, the bit we overwrote, must go into the non-computational subsystem, where the entropy increases and eventually released as heat.</p>
            <!-- <p>We can also calculate the amount of heat generated by erasing one bit of information: TODO</p> -->
            <vue-mathjax formula="$$S = S_{nc} + H$$"></vue-mathjax>
            <vue-mathjax formula="$$S: total\;physical\;entropy$$"></vue-mathjax>
            <vue-mathjax formula="$$S_{nc}:\;noncomputational\;entropy$$"></vue-mathjax>
            <vue-mathjax formula="$$H:\;computational\;entropy$$"></vue-mathjax>

            <h4>If a bit is erased in the computational subsystem, its entropy decreases, and therefore the non-computational entropy must increase to ensure the Second Law of Thermodynamics is not violated. [1]</h4>
            <button @click="next">NEXT</button>
            <p class="citation">[1] pp. 12-14 <a href="https://doi.org/10.48550/arXiv.1806.10183" class="italic text-blue-500">Generalized Reversible Computing</a>.</p>
        </template>
        <!-- <template #8="{ next }">
            <h3>What do state space changes look like when the computations are <span class="highlighted">reversible</span>?</h3>
            <p>In the irreversible example, we saw that </p>
            <p>Essentially, if there is a probability distribution of possible final states given an initial state, then </p>
            <button @click="next">NEXT</button>
        </template> -->
    </Lesson>
</template>

<script>
export default {
    name: 'LogicPage',
    layout: 'tutorial',
    data() {
        return {
            input1: '',
            input2: '',
            attempted2: false
        }
    },
    methods: {
        check2(next) {
            const input1Options = ["forward", "forwards"]
            const input2Options = ["backward", "backwards"]
            if (input1Options.includes(this.input1.trim()) && input2Options.includes(this.input2.trim())) {
                next()
            } else {
                this.attempted2 = true
            }
        },
    }
}
</script>