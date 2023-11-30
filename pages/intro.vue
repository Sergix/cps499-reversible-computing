<!-- eslint-disable vue/no-unused-vars -->
<template>
    <Lesson :num-sections="12">
        <template #1="{ next }">
            <h3>Why do computers generate heat?</h3>
            <p>You can probably think of some possible answers:</p>
            <ul>
                <li>Electrical transistor resistence</li>
                <li>Imperfect materials and transfer of energy between components</li>
                <li>High power usage</li>
            </ul>

            <p>All of these are correct, and you can probably think of some others.</p>
            <p>Why does the heat produced by a computer matter?</p>
            <ul>
                <li>Higher-performance computing from reduced processor throttling (Frank)</li>
                <li>Environmental concerns</li>
                <li>Low-power devices (e.g. CMOS)</li>
            </ul>
            <p>So, the question becomes...</p>
            <button @click="next">NEXT</button>
        </template>
        <template #2="{ next }">
            <h3>Is there a way to build a computer that generates no heat?</h3>
            <p>First off: <b>a device's heat generation will always be affected by electrical resistance.</b> This is the primary source of heat from a computer. So, we can continuously improve those electrical pathways to make them more and more efficient. However, there's an unexpected roadblock: even if we could build an extremely efficient, even 100% efficient, electrical resistor that conserves as much energy as physically possible, <i>the device would still generate heat</i>.</p>
            <p>(include visualization)</p>
            <p>But why? If we could have a physically ideal electrical device that has perfect materials without any resistance, why would it still generate heat?</p>
            <p>This is the question posed by Raulph Landauer, a researcher for IBM, back in 1961. And his conclusion surprised everyone who realized its implications. But before the explanation...</p>
            <button @click="next">NEXT</button>
        </template>
        <template #3="{ next }">
            <h3>What is 2 + 2?</h3>
            <InputCheck hint="Are you sure you are human?" answer="4" @success="next" />
        </template>
        <template #4="{ next }">
            <h3>Wow, you are human!</h3>
            <p>What if instead I asked, "What two numbers did I choose that add up to 4?" Could you give a possible answer?</p>
            <input v-model="input1" type="text" class="border border-gray-300 py-1 px-2 text-lg font-mono" placeholder="First number...">
            <input v-model="input2" type="text" class="border border-gray-300 py-1 px-2 text-lg font-mono" placeholder="Second number...">
            <button type="button" @click="check4(next)">CHECK ANSWER</button>
            <Transition name="fade">
                <p v-show="attempted4" class="text-sm italic text-gray-600">Hint: <a class="text-blue-500" href="https://www.wikiwand.com/en/Peano_axioms#Addition">Refresh your arithmetic</a></p>
            </Transition>
        </template>
        <template #5="{ next }">
            <h4>Can you <i>definitively</i> say that your choice of numbers are what I might have originally chosen?</h4>
            <YesNo hint="Think about the question again -- If I say that I chose two numbers that add to 4, but don't tell you what either of those numbers are, how could you know what two numbers I chose?" :answer="false" @success="next"/>
        </template>
        <template #6="{ next }">
            <h3>But why is that?</h3>
            <p>Why is it that you can't definitively tell me what my choices were?</p>
            <p>It seems like common sense, but let's analyze what's going on.</p>
            <p>Let's start by considering how we could change our outcome: how <i>could</i> we definitively know what two inputs were chosen to add to 4?</p>
            <h4>The simplest answer is to add more information to our output.</h4>
            <p>Instead of just outputting the number 4 -- what if I say that the output was 4, and 3 was one of the addends? <b>Can you definitively determine what the other input was?</b></p>
            <p class="font-mono text-lg">x + 3 = 4</p>
            <InputCheck hint="Maths" answer="1" @success="next"></InputCheck>
        </template>
        <template #7="{ next }">
            <h3>Now, you can <i>deterministically</i> say what the other input is.</h3>
            <p>So, what is our insight from adding extra information to the output?</p>
            <p>Notice the number of inputs and outputs in the original question: <b>2 inputs and 1 output</b></p>
            <p class="font-mono text-lg">x + y = 4</p>
            <p>Now, notice the number of inputs and outputs in our second question: <b>1 input and 1 output</b></p>
            <p class="font-mono text-lg">1 + y = 4</p>
            <p>We could also state it this way: <b>2 inputs and 2 outputs</b></p>
            <p class="font-mono text-lg">x + y = (4, 1); where 1 = x</p>
            <p>Our conclusion, then, is that to definitively know the original inputs of an operation, <span class="highlighted">the number of outputs must equal the number of inputs.</span></p>
            <p>This implies one other critical observation, though: with addition, any two numbers will <i>always</i> add up to the same number. But if given just the number 4, the output is not unique to its inputs, since there are infinitely many choices of two numbers that add up to 4.</p>
            <p>But if we add sufficient information to the output, as in the third example above, <span class="font-mono">(4, 1)</span> means that the two inputs will <i>always</i> be 1 and 3.</p>
            <p>This uniqueness of outputs to inputs (and inputs to outputs) is critical, and is mathematically called a <b>one-to-one</b> or <b>injective</b> function.</p>
            <p class='math'></p>
            <button @click="next">OK, SO...</button>
        </template>
        <template #8="{ next }">
            <h3>What in the world does this have to do with reversible computing?</h3>
            <p>Let's ask it this way: how can you <span class="highlighted">reverse</span> an addition operation?</p>
            <p>And as we've shown, you need to have the number of outputs equal to the number of inputs, and addition is one-to-one: <b>so we've just created our first reversible operation.</b></p>
            <button @click="next">COOL! WHAT DOES THIS ALL HAVE TO DO WITH HEAT GENEATION IN COMPUTING?</button>
        </template>
        <template #9="{ next }">
            <h3>I'm glad you asked.</h3>
            <p>Let's consider what happens with an non-reversible operation like we started with.</p>
            <p>1 + 3 = 4.</p>
            <p>Like we saw before, if I just have the output 4, I can't definitively know that the inputs were 1 and 3.</p>
            <p>In other words, I'm actually <span class="highlighted">losing information</span> in the addition operation. I go from <b>two</b> inputs (pieces of information), 1 and 3, to <b>one</b> output (pieces of information), 4.</p>
            <p>But when I give enough information in the output, I <span class="highlighted">preserve information</span> in the addition operation. I go from <b>two</b> inputs (pieces of information), 1 and 3, to <b>two</b> outputs (pieces of information), 4 and 1, where the 1 tells me that one of the inputs was 1.</p>
            <p>What's another word for <span class="highlighted">losing information</span>?</p>
            <InputCheck hint="Think back to a science or physics class you've taken -- what term does the Second Law of Thermodynamics give to losing information in a physical system?" answer="entropy" @success="next"></InputCheck>
        </template>
        <template #10="{ next }">
            <h3>And <i>entropy</i> explains the behavior of what phenomenon in the Second Law of Thermodynamics?</h3>
            <InputCheck hint="Entropy concerns the transfer of ____ between systems." answer="heat" @success="next"></InputCheck>
        </template>
        <template #11="{ next }">
            <h3>So, we return to our original question: Why do computers generate heat?</h3>
            <p>In the early 1960s, Ralph Landauer, an IBM employee, was one of the first to deeply investigate this question from a theoretical standpoint. His landmark paper, <i>Irreversibility and Heat Generation in the Computing Process</i>, brought to light the connection we just made: that the irreversible information loss in a process or operation releases heat in a computer.</p>
            <p>But Landauer's conclusion implied something critical: that even if we had perfect materials engineering, ideal transistors, and no energy dissipation from the computer's hardware, there is an "unavoidable minimum [of heat dissipation] arising from the fact that the computer performs irreversible operations." [1]</p>
            <p>This is known as <b><span class="highlighted">Landauer's Principle</span></b>, and is the motivation for reversible computing:</p>
            <h4>If we design a completely reversible computer, we effectively remove the lower bound on heat dissipation described by Landauer's Principle.</h4>
            <button @click="next">NEXT</button>
        </template>
        <template #12="{ next }">
            <p>So, the answer to our original question: <b>Is there a way to build a computer that generates no heat?</b></p>
            <p>And the surprising answer is, (given ideal materials engineering),</p>
            <h4><span class="highlighted">Yes.</span></h4>
            <p>Let's learn how to do that.</p>
            <button @click="next">FINISH</button>
        </template>
    </Lesson>
</template>

<script>
export default {
    name: 'IntroPage',
    layout: 'tutorial',
    data() {
        return {
            input1: '',
            input2: '',
            attempted4: false
        }
    },
    mounted() {
        
    },
    methods: {
        check4(next) {
            const input1int = parseInt(this.input1)
            const input2int = parseInt(this.input2)
            if (!input1int || !input2int) {
                this.attempted4 = true
                return
            }

            if (input1int + input2int === 4) {
                next()
            } else {
                this.attempted4 = true
            }
        },
    }
}
</script>