<template>
    <Lesson :num-sections="7">
        <template #1="{ next }">
            <h3>Now to the <i>real</i> computing part. How can we take our reversible functions and use them to compute?</h3>
            <p>This is termed <span class="highlighted">reversible logic synthesis</span>: the process of synthesizing reversible functions into reversible gates using the principles of reversible logic.</p>
            <button @click="next">NEXT</button>
        </template>
        <template #2="{ next }">
            <h3>How can we make a logic gate reversible?</h3>
            <p>Consider the XOR gate. Humble yet pervasive, can we add extra information to it to make it reversible, as we've done before with our addition operation?</p>
            <div class="flex flex-row mx-auto items-center justify-center my-8">
                <img src="~/assets/images/xorgate.drawio.png" class="mr-4">
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
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>Let's try and copy, as before, one of our inputs to our outputs. This is technically known as a <span class="highlighted">Landauer embedding</span>, where we can just copy <i>n - 1</i> of the inputs to our output and make the operation reversible. [1]</p>
            <aside>Why do we not want to always just copy n-1 inputs to our output? Because this is an inefficient use of our precious bits... and because reversible gates will prove quite useful in and of themselves, as we will see soon!</aside>
            <button @click="next">NEXT</button>
            <p class="citation">[1] https://doi.org/10.1007/978-3-642-19805-2_4</p>
        </template>
        <template #3="{ next }">
            <h3>Behold: the <span class="highlighted">CNOT</span> gate.</h3>
            <p>The CNOT gate, or controlled-not gate, looks like it's just a reversible XOR gate.</p>
            <div class="flex flex-row mx-auto items-center justify-center my-8">
                <img src="~/assets/images/cnotgate.drawio.png" class="mr-4">
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">IN</th>
                            <th colspan="2">OUT</th>
                        </tr>
                        <tr>
                            <th>a</th>
                            <th>b</th>
                            <th>c = a</th>
                            <th>d = a xor b</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>0</td>  
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>But in practice, we consider <b>a</b> to be functioning as a control of whether <b>b</b> is flipped in the output, acting as a NOT gate.</p>
            <p>We can again see that the CNOT gate is injective, but also <span class="highlighted">bijective</span>: all 2-bit possibilities are mapped in the input and output.</p>
            <aside>A <b>bijective</b> function is a one-to-one function that maps all possible inputs in the domain to all outputs in the codomain. In this case, our domain and codomain are the set of two-bit permutations, which are (0, 0), (0, 1), (1, 0), (1, 1).</aside>
            
            <button @click="next">NEXT</button>
        </template>
        <template #4="{ next }">
            <h3>Also, a funny property of the CNOT gate is that <span class="highlighted">it's its own inverse.</span></h3>
            <p>In other words, if you apply the CNOT gate to the output of a CNOT gate, you get the original input.</p>
            <p>This is different than the examples we used earlier with addition since the inverse of addition is a separate operation, subtraction.</p>
            <div class="flex flex-row mx-auto items-center justify-center my-8">
                <img src="~/assets/images/cnotgate.drawio.png" class="mr-4">
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">IN</th>
                            <th colspan="2">OUT</th>
                        </tr>
                        <tr>
                            <th>a</th>
                            <th>b</th>
                            <th>c = a</th>
                            <th>d = a xor b</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>0</td>  
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <vue-mathjax formula="$$CNOT(0, 0) = (0, 0) \to CNOT(0, 0) = (0, 0)$$"></vue-mathjax>
            <vue-mathjax formula="$$CNOT(0, 1) = (0, 1) \to CNOT(0, 1) = (0, 1)$$"></vue-mathjax>
            <vue-mathjax formula="$$CNOT(1, 0) = (1, 1) \to CNOT(1, 1) = (1, 0)$$"></vue-mathjax>
            <vue-mathjax formula="$$CNOT(1, 1) = (1, 0) \to CNOT(1, 0) = (1, 1)$$"></vue-mathjax>
            <p>In other words,</p>
            <vue-mathjax formula="$$(CNOT \circ CNOT)(a, b) = (a, b)$$"></vue-mathjax>
            <h4>So, the CNOT gate is reversibly reversible!</h4>
            <button @click="next">NEXT</button>
        </template>
        <template #5="{ next }">
            <h3>We can extend the CNOT gate to another <i>control</i> bit, the <span class="highlighted">Tiffoli</span> gate.</h3>
            <div class="flex flex-row mx-auto items-center justify-center my-8">
                <img src="~/assets/images/tiffoligate.drawio.png" class="mr-4">
                <table>
                    <thead>
                        <tr>
                            <th colspan="3">IN</th>
                            <th colspan="3">OUT</th>
                        </tr>
                        <tr>
                            <th>a</th>
                            <th>b</th>
                            <th>c</th>
                            <th>d</th>
                            <th>e</th>
                            <th>f</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>0</td>  
                            <td>0</td>  
                            <td>1</td>
                            <td>0</td>
                            <td>0</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>0</td>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>0</td>
                            <td>1</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>The Tiffoli gate works by:</p>
            <ul>
                <li><b>Copying</b> the inputs a → d, b → e</li>
                <li>XOR'ing c if <b>both</b> control bits are 1: <vue-mathjax formula="$$(a \cdot b) \oplus c$$" class="inline"></vue-mathjax></li>
            </ul>
            <p>This gate is <b>an extension of the CNOT using two control bits instead of one.</b></p>
            <p>As we can see, the Tiffoli gate is <span class="highlighted">injective</span> and <span class="highlighted">bijective</span>, hence it is reversible. And, like the 2-bit CNOT gate, it is its own inverse.</p>
            <h4>Let's test your knowledge: what are the three values <span class="highlighted">a, b, c</span> such that <vue-mathjax formula="$$\text{Tiffoli}(a, b, c) = (1, 1, 0)?$$" class="inline"></vue-mathjax>?</h4>
            <h4>a = <input v-model="input1" type="number" min="0" max="1" class="border border-gray-300 py-1 px-2 text-lg font-mono w-12 text-center"></h4>
            <h4>b = <input v-model="input2" type="number" min="0" max="1" class="border border-gray-300 py-1 px-2 text-lg font-mono w-12 text-center"></h4>
            <h4>c = <input v-model="input3" type="number" min="0" max="1" class="border border-gray-300 py-1 px-2 text-lg font-mono w-12 text-center"></h4>
            <button type="button" @click="check4(next)">CHECK ANSWER</button>
            <Transition name="fade">
                <p v-show="attempted4" class="text-sm italic text-gray-600">Hint: Make sure you're looking at the inverse since we're trying to figure out the <b>inputs</b>.</p>
            </Transition>
        </template>
        <template #6="{ next }">
            <h3>So what are the principles of reversible gates?</h3>
            <p>From these examples, we observe a few important details that apply to all reversible gates:</p>
            <ol>
                <li><b>Injective</b>: basic principle of reversibility</li>
                <li><b>Bijective</b>: must be information-preserving and operate on any permuation of bits</li>
                <li>(1) and (2) imply that <b>any bijective reversible function can be simulated</b> using a reversible gate</li>
            </ol>
            <button @click="next">NEXT</button>
        </template>
        <template #7="{ next }">
            <h3>Following from this, in classic irreversible computing, a fundamental logic gate is one of the <span class="highlighted">universal</span> gates: the NAND.</h3>
            <p>The NAND and other universal gates are extremely important in computing since they can be used to simulate any other gate or series of gates by composing NANDs together.</p>
            <h4>Is there a universal reversible gate?</h4>
            <p>Indeed: the <span class="highlighted">Tiffoli gate is universal</span> and can be composed to simulate any reversible function.</p>
            <p>In his book <i>Theory of Reversible Computing [1]</i>, Morita proves this by showing how the Tiffoli gate can simulate the operations <b>AND</b> and <b>NOT</b>, essentially simulating the universal <b>NAND</b> gate.</p>
            <p>Let's think about how this works: given the following diagram of Tiffoli gates, what values would <span class="highlighted">a</span> and <span class="highlighted">b</span> need to be to simulate an AND and NOT gate, respectively?</p>

            <button type="button" @click="next">NEXT</button>
            <p class="citation">[1] p.82: https://doi.org/10.1007/978-4-431-56606-9</p>
        </template>
    </Lesson>
</template>

<script>
export default {
    name: 'GatesPage',
    layout: 'tutorial',
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            attempted4: false
        }
    },
    methods: {
        check4(next) {
            if (this.input1.trim() === '1' && this.input2.trim() === '1' && this.input3.trim() === '1') {
                next()
            } else {
                this.attempted4 = true
            }
        },
    }
}
</script>