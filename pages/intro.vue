<!-- eslint-disable vue/no-unused-vars -->
<template>
    <Lesson :num-sections="13">
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
            <p>What if instead I asked, "I chose two numbers that add to 4. Can you tell me what they were?" Could you give a possible answer?</p>
            <input v-model="input1" type="text" class="border border-gray-300 py-1 px-2 text-lg font-mono" placeholder="First number...">
            <input v-model="input2" type="text" class="border border-gray-300 py-1 px-2 text-lg font-mono" placeholder="Second number...">
            <button type="button" @click="check4(next)">CHECK ANSWER</button>
            <Transition name="fade">
                <p v-show="attempted4" class="text-sm italic text-gray-600">Hint: <a class="text-blue-500" href="https://www.wikiwand.com/en/Peano_axioms#Addition">Refresh your arithmetic</a></p>
            </Transition>
        </template>
        <template #5="{ next }">
            <h4>Can you <span class="highlighted">definitively</span> say that those are the two numbers that I chose?</h4>
            <YesNo hint="Think about the question again -- If I say that I chose two numbers that add to 4, but don't tell you what either of those numbers are, how could you know what two numbers I chose?" :answer="false" @success="next"/>
        </template>
        <template #6="{ next }">
            <h3>But why is that?</h3>
            <p>Why is it that you can't definitively tell me what my choices were?</p>
            <p>How <i>could</i> we definitively know what two addends were chosen to add to 4?</p>
            <h4>The simplest answer is to give you more information.</h4>
            <p>Instead of just saying the result is 4 -- what if I say that the result is 4, and 3 was one of the addends? <b>Can you definitively determine what the other addend was?</b></p>
            <p class="font-mono text-lg">x + 3 = 4</p>
            <InputCheck hint="Solve for x!" answer="1" @success="next"></InputCheck>
        </template>
        <template #7="{ next }">
            <h3>Now, you can <i>deterministically</i> say what the other addend was.</h3>
            <p>So, what is our insight from giving you that extra information?</p>
            <p>Let's think about our addends as our <b>two inputs</b> and the number 4 as our <b>one output</b>. Now, when we add our extra information of one of our addends, we can define it as a <b>second output</b> just copying one of the inputs.</p>
            <p>Input: (x, y)</p>
            <p>Output: (x + y, x)</p>
            <p>Defining a function to do so, <vue-mathjax formula="$$f(x, y) = (x + y, x)$$"></vue-mathjax></p>
            <p>Using this definition, if I gave you the output (5, 3), can you figure out what the other input <b>y</b> is?</p>
            <InputCheck hint="In this example, x + y = 5 and x = 3. Can you then substitute and solve for y?" answer="2" @success="next"></InputCheck>
        </template>
        <template #8="{ next }">
            <h3>Knowing that extra information about x, you were able to solve correctly since there is only one possible solution for the input y.</h3>
            <h4>The insight: <span class="highlighted">to definitively know the original inputs of an operation, the output must be unique to the input.</span></h4>
            <p>This uniqueness of <i>outputs to inputs</i> is critical, and is mathematically called a <b>one-to-one</b> or <b>injective</b> function.</p>
            <button @click="next">OK, SO...</button>
        </template>
        <template #9="{ next }">
            <h3>What in the world does this have to do with reversible computing?</h3>
            <p>Let's ask it this way: how can you <span class="highlighted">reverse</span> an addition operation?</p>
            <p>And as we've shown, you just need the operation to be one-to-one. <b>In fact, we've just created our first reversible operation.</b></p>
            <button @click="next">COOL!</button>
        </template>
        <template #10="{ next }">
            <h3>What does all this have to do with heat generation in computing?</h3>
            <h4>I'm glad you asked.</h4>
            <p>Let's consider what happens with an non-reversible operation like we started with.</p>
            <p>x + y = 4.</p>
            <p>Like we saw before, if I just have the output 4 from a normal addition operation, I can't definitively what the inputs x and y are.</p>
            <p>We're actually <span class="highlighted">losing information</span> in this addition operation. I go from <b>two</b> inputs (pieces of information), 1 and 3, to <b>one</b> output (pieces of information), 4.</p>
            <p>But when I give enough information in the output, I <span class="highlighted">preserve information</span> in the addition operation. I go from <b>two</b> inputs (pieces of information), x and y, to <b>two</b> outputs (pieces of information), 4 and x, where the x in the output tells me one of the inputs so that I can deterministically solve for the other input y. The other necessity is that our operation is one-to-one, which we have already shown it is.</p>
            <p>What's another word for <span class="highlighted">losing information</span>?</p>
            <InputCheck hint="Think back to a science or physics class you've taken -- what term does the Second Law of Thermodynamics give to losing information in a physical system?" answer="entropy" @success="next"></InputCheck>
        </template>
        <template #11="{ next }">
            <h3>And <i>entropy</i> explains the behavior of what phenomenon in the Second Law of Thermodynamics?</h3>
            <InputCheck hint="Entropy concerns the transfer of ____ between systems." answer="heat" @success="next"></InputCheck>
        </template>
        <template #12="{ next }">
            <h3>So, we return to our original question: Why do computers generate heat?</h3>
            <p>In the early 1960s, Ralph Landauer, an IBM employee, was one of the first to deeply investigate this question from a theoretical standpoint. His landmark paper, <i>Irreversibility and Heat Generation in the Computing Process</i>, brought to light the connection we just made: that the irreversible information loss in a process or operation releases heat in a computer.</p>
            <p>But Landauer's conclusion implied something critical: that even if we had perfect materials engineering, ideal transistors, and no energy dissipation from the computer's hardware, there is an "<span class="highlighted">unavoidable minimum [of heat dissipation]</span> arising from the fact that the computer performs irreversible operations." [1]</p>
            <p>This is known as <b><span class="highlighted">Landauer's Principle</span></b>, and is the motivation for reversible computing:</p>
            <h4>If we design a completely reversible computer, we effectively <span class="highlighted">remove the unavoidable minumum of heat dissipation</span> described by Landauer's Principle.</h4>
            <button @click="next">NEXT</button>
        </template>
        <template #13="{ next }">
            <p>So, the answer to our original question: <b>Is there a way to build a computer that generates no heat?</b></p>
            <p>And the surprising answer is,</p>
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