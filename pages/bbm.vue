<template>
    <Lesson :num-sections="2">
        <template #1="{ next }">
            <h3>Can you <i>physically</i> build a reversible circuit?</h3>
            <p>First, it would be helpful to come up with a model to see how a reversible computational model might be built in practice. The <b>Billiard Ball Model</b>, or BBM, is a good way of doing so.</p>
            <h4>The Billiard Ball Model (BBM)</h4>
            <p>BBM simulates a reversible logic element using <i>billiard balls</i> and fixed <i>reflectors</i> on a flat surface, where all collisions are perfectly elastic and at right angles. [1]</p>
            
            <h4>How is BBM reversible?</h4>
            <p>The Billiard Ball Model <i>physically simulates the computation of a reversible logic element in an ideal "conservative-logic network" [Fredken and Tiffoli]</i>. That's a bit a of a mouthful, so let's first break down the terminology before we show how BBM actually works:</p>
            <ul>
                <li class="mt-2">
                    <i>model</i>: we want to represent how a reversible circuit could work, so our model needs to follow reversible principles
                    <p>→ BBM simulates a reversible circuit, and can be used to simulate any reversible circuit</p>
                </li>
                <li class="mt-2">
                    <i>physically simulates</i>: we want to build our model to potentially be built in real life
                    <p>→ BBM uses reversible logic in a (ideal) physical model</p>
                </li>
                <li class="mt-2">
                    <i>reversible logic element</i>: as in the previous section, we want to model how a reversible circuit works
                    <p>→ BBM itself is reversible</p>
                </li>
                <li class="mt-2">
                    <i>conservative-logic network</i>: as in the previous section, it should apply the principles of conservative (reversible) logic by preserving the amount of information before and after the computation
                    <p>→ BBM preserves the amount of information used in its process</p>
                </li>
            </ul>

            <button @click="next">NEXT</button>
            <p class="citation">[1] https://doi.org/10.1007/978-4-431-56606-9</p>
        </template>
        <template #2>
            <h3>BBM Simulation</h3>
            <h4>CNOT with 1 bit of memory</h4>
            <div class="flex flex-row my-4">
                <div>
                    <form class="flex flex-col mb-4 border p-4 border-neutral-500" @submit.prevent="">
                        <fieldset class="flex flex-row">
                            <legend class="font-bold mb-2">Initial Conditions</legend>
                            <div>
                                <label for="input">Input</label>
                                <select v-model="input" name="input">
                                    <option v-for="port in ports" :key="port.inputName">{{ port.inputName }}</option>
                                </select>
                            </div>
                            <div class="ml-8">
                                <label for="initialState">Initial State</label>
                                <select v-model="initialState" name="initialState">
                                    <option v-for="state in Object.keys(state_transitions)" :key="state">{{ state }}</option>
                                </select>
                            </div>
                        </fieldset>
                        <button @click="construct">Construct</button>
                    </form>
                    <p :v-show="stage" class="text-sm italic">Click the <b class="text-green-700">green signal ball</b> to start the computation.</p>
                    <canvas id="canvas" width="500" height="420" class="border border-neutral-500"></canvas>
                </div>

                <div class="ml-4">
                    <h4>Objects</h4>
                    <ul>
                        <li v-for="reflector in reflectors" :key="`${reflector.x},${reflector.y}`" class="my-2 border border-neutral-400 rounded-full pr-2">
                            <span class="text-white bg-black rounded-full px-2 py-2">Reflector</span>
                            <span class="font-mono ml-2">({{ reflector.x }}, {{ reflector.y}})</span>
                        </li>
                    </ul>
                    <ul>
                        <li v-for="port in ports" :key="port.inputName" class="my-2 border border-neutral-400 rounded-full pr-2">
                            <span class="text-white rounded-full px-2 py-2 bg-blue-700">I/O Port</span>
                            <span class="font-mono ml-2">{{ port.inputName }} -> {{ port.outputName }}</span>
                        </li>
                    </ul>
                    <h4>State Transitions</h4>
                    <ul>
                        <li v-for="(transition, state) in state_transitions" :key="state">
                            <span class="font-mono">{{ state }} -> {{ transition.nextState }}</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div>
                <h4>How does it work?</h4>
                <h5>CNOT with 1-bit of memory</h5>
                <p>This specific BBM configuration simulates a CNOT gate with a wire acting as 1 bit of memory. Here is the diagram and state table for the gate.</p>
                <div class="flex flex-row mx-auto items-center justify-center my-8">
                    <img src="~/assets/images/cnot-rlem.drawio.png" class="mr-4">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">IN</th>
                                <th colspan="2">OUT</th>
                            </tr>
                            <tr>
                                <th>a</th>
                                <th>b</th>
                                <th>a'</th>
                                <th>b'</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="bg-green-300">0</td>
                                <td class="bg-yellow-300">0</td>
                                <td class="bg-green-300">0</td>
                                <td class="bg-yellow-300">0</td>
                            </tr>
                            <tr>
                                <td class="bg-green-300">0</td>
                                <td class="bg-yellow-300">1</td>
                                <td class="bg-green-300">0</td>
                                <td class="bg-yellow-300">1</td>
                            </tr>
                            <tr>
                                <td class="bg-green-300">1</td>
                                <td class="bg-yellow-300">0</td>
                                <td class="bg-green-300">1</td>
                                <td class="bg-yellow-300">1</td>
                            </tr>
                            <tr>
                                <td class="bg-green-300">1</td>
                                <td class="bg-yellow-300">1</td>
                                <td class="bg-green-300">1</td>
                                <td class="bg-yellow-300">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul>
                    <li><b>a</b>: input control bit</li>
                    <li><b>b</b>: state ball's current state (where the state ball begins)</li>
                    <li><b>a'</b>: copy of the input control bit</li>
                    <li><b>b'</b>: state ball's final state (where the state ball ends up), the value of <vue-mathjax formula="$$a \oplus b$$" class="inline"></vue-mathjax></li>
                </ul>   
                <p>The <b class="text-green-700">green</b> ball is the <b class="text-green-700">signal ball</b>, and the <b class="text-yellow-600">yellow ball</b> is the <b class="text-yellow-600">state ball</b>. Each <b>highlighted line</b> corresponds to a port that the <b class="text-green-700">signal ball</b> can be placed at. The port acts as an input and output for the computation: the <b class="text-green-700">signal ball's</b> initial location is the input, and its final location is the output.</p>
                <p>The <b class="text-yellow-600">state ball</b> has predefined unique locations for each state in the system, and it will always end up at one of those predefined locations by the end of the computation.</p>
                <p>The balls bounce off reflectors. They reflect the balls at perfect right angles, and each collision is perfectly elastic: the ball does not lose its momentum.</p>
                
                <h5>Running the Computation</h5>
                <p>When the grid is constructed, it places the <b class="text-green-700">signal ball</b> at the selected input port and the <b class="text-yellow-600">state ball</b> at a preconfigured location uniquely dependent on its state that allows the simulation to run properly.</p>
                <p><b>Click</b> the <b class="text-green-700">signal ball</b> to start the computation by sending it down its input port. The <b class="text-green-700">signal ball</b> eventually collides with the <b class="text-yellow-600">state ball</b> and bounce off reflectors. The <b class="text-green-700">signal ball</b> eventually collides with the <b class="text-yellow-600">state ball</b> again, stopping the <b class="text-yellow-600">state ball</b>, and the <b class="text-green-700">signal ball</b> stops once it reaches the output port and ends up in its final configuration.</p>

                <h5>Reversibility</h5>
                <p>Try running the computation in the forwards-direction. Once the <b class="text-green-700">signal ball</b> reaches the output, take note of the output and how it corresponds with the state table for the CNOT gate.</p>
                <p>Then, click the <b class="text-green-700">signal ball</b> again to reverse the operation. This will end up with the <b class="text-green-700">signal ball</b> and <b class="text-yellow-600">state ball</b> in their initial configuration.</p>

                <h5>Example</h5>
                <p>Let the input be <vue-mathjax formula="$$(1, 0)$$" class="inline"></vue-mathjax>. This means that the <b class="text-green-700">signal ball</b> will be placed at the input port 1, and the <b class="text-yellow-600">state ball</b> will be placed at the predefined location for the state 0.</p>
                <p>By running the computation, the output will be <vue-mathjax formula="$$CNOT(1, 0) = (1, 1)$$" class="inline"></vue-mathjax>; the <b class="text-green-700">signal ball</b> will be at output 1, and the <b class="text-yellow-600">state ball</b> will end up at the location for state 1.</p>
                <p>Try it out and see for yourself!</p>
            </div>

            <button v-show="stage !== null" @click="next">NEXT</button>
            <p class="italic text-sm text-gray-600">Run the model at least once to continue.</p>
        </template>
    </Lesson>
</template>

<script>
const BALL_RADIUS = Math.sqrt(2) * 10 // pixels
const BALL_V = 5 // ball 
const CELL_SIZE = 20 // pixels
const GRID_W = 23 // cells
const GRID_H = 19 // cells
const RT = "reflectorTop"
const RB = "reflectorBottom"
const RL = "reflectorLeft"
const RR = "reflectorRight"
const PL = "portLeft"
const PR = "portRight"
const PT = "portTop"
const PB = "portBottom"

const Reflector = function (x, y, type) {
    this.x = x
    this.y = y
    this.type = type
}
const StateBall = function (initialState) {
    this.initialState = initialState
}
const SignalBall = function (input) {
    this.input = input
}
const IOPort = function (n, inputName, outputName, type, color) {
    this.n = n
    this.inputName = inputName
    this.outputName = outputName
    this.type = type
    this.color = color
}
// const MAP_RE = [
//     new Reflector(7, 0, RB),
//     new Reflector(9, 0, RB),
//     new Reflector(6, 3, RB),
//     new Reflector(6, 3, RR),
//     new Reflector(10, 3, RL),
//     new Reflector(10, 3, RB),
//     new Reflector(14, 3, RB),
//     new Reflector(1, 6, RR),
//     new Reflector(5, 8, RL),
//     new Reflector(21, 8, RB),
//     new Reflector(0, 9, RR),
//     new Reflector(2, 9, RR),
//     new Reflector(6, 9, RR),
//     new Reflector(10, 9, RL),
//     new Reflector(10, 9, RB),
//     new Reflector(10, 9, RT),
//     new Reflector(12, 9, RB),
//     new Reflector(17, 10, RL),
//     new Reflector(17, 10, RB),
//     new Reflector(23, 10, RL),
//     new Reflector(6, 11, RR),
//     new Reflector(20, 11, RT),
//     new Reflector(20, 11, RL),
//     new Reflector(1, 12, RR),
//     new Reflector(8, 13, RT),
//     new Reflector(17, 14, RT),
//     new Reflector(21, 14, RL),
//     new Reflector(7, 16, RT),
//     new Reflector(9, 16, RT),
//     new Reflector(17, 16, RT),
//     new Reflector(8, 19, RT),
//     new Reflector(16, 19, RT),
//     new IOPort(13, "n", "s'", PT, "red"),
//     new IOPort(15, "s", "n'", PB, "yellow"),
//     new IOPort(5, "e", "w", PR, "green"),
//     new IOPort(7, "w'", "e'", PL, "blue"),
// ]

// const STATE_TRANSITIONS = {
//     "H": {
//         x: 14,
//         y: 12,
//         nextState: "V"
//     },
//     "V": {
//         x: 8,
//         y: 6,
//         nextState: "H"
//     }
// }

export default {
    name: "BBMPage",
    layout: "tutorial",
    data() {
        return {
            initialState: 'H',
            input: 'n',
            stage: null,
            reflectors: [
                new Reflector(6, 0, RB),
                new Reflector(6, 2, RB),
                new Reflector(8, 4, RL),
                new Reflector(10, 4, RL),
                new Reflector(1, 5, RR),
                new Reflector(5, 5, RR),
                new Reflector(1, 9, RR),
                new Reflector(9, 9, RL),
                new Reflector(5, 11, RT),
                new Reflector(5, 13, RT),
            ],
            ports: [
                new IOPort(7, "1", "1", PL, "blue"),
                new IOPort(10, "0", "0", PL, "red")
            ],
            state_transitions: {
                "0": {
                    x: 3,
                    y: 6,
                    nextState: "1"
                },
                "1": {
                    x: 7,
                    y: 6,
                    nextState: "0"
                }
            }
        }
    },
    mounted() {
    },
    methods: {
        construct() {
            // TODO: validation

            this.stage = new this.$createjs.Stage("canvas")
            this.stage.removeAllChildren()

            const grid = new this.$createjs.Container()
            grid.x = grid.y = CELL_SIZE
            this.stage.addChild(grid)

            const balls = []
            const reflectors = []
            const ioPorts = []

            let stateBallText
            
            // draw grid
            for (let c = 0; c <= GRID_W; c++) {
                const gridLineV = new this.$createjs.Shape()
                // includes grid offset
                gridLineV.graphics.setStrokeStyle(1).beginStroke("black").moveTo(c * CELL_SIZE, 0).lineTo(c * CELL_SIZE, GRID_H * CELL_SIZE)
                grid.addChild(gridLineV)
            }
            for (let r = 0; r <= GRID_H; r++) {
                const gridLineH = new this.$createjs.Shape()
                gridLineH.graphics.setStrokeStyle(1).beginStroke("black").moveTo(0, r * CELL_SIZE).lineTo(GRID_W * CELL_SIZE, r * CELL_SIZE)
                grid.addChild(gridLineH)
            }

            // construct map
            for (const obj of this.reflectors) {
                    // console.log("building ", obj)
                    const reflector = new this.$createjs.Shape()
                    
                    reflector.x = obj.x * CELL_SIZE
                    reflector.y = obj.y * CELL_SIZE
                    reflector.type = obj.type
                    
                    switch (obj.type) {
                        case RT:
                            reflector.w = 4
                            reflector.h = 2
                            reflector.y -= 6
                            reflector.x -= 2
                            break
                        case RB:
                            reflector.w = 4
                            reflector.h = 2
                            reflector.y += 4
                            reflector.x -= 2
                            break
                        case RL:
                            reflector.w = 2
                            reflector.h = 4
                            reflector.x -= 6
                            reflector.y -= 2
                            break
                        case RR:
                            reflector.w = 2
                            reflector.h = 4
                            reflector.y -= 2
                            reflector.x += 4
                            break
                    }
                    reflector.graphics.setStrokeStyle(1).beginStroke("black").drawRect(0, 0, reflector.w, reflector.h)

                    reflectors.push(reflector)
                    grid.addChild(reflector)
            }
            for (const obj of this.ports) {
                const ioPort = new this.$createjs.Shape()
                const ioPortInputText = new this.$createjs.Text(obj.inputName, "italic 16px serif", "black")
                const ioPortOutputText = new this.$createjs.Text(obj.outputName, "italic 16px serif", "black")


                ioPort.type = obj.type
                ioPort.inputName = obj.inputName
                ioPort.n = obj.n

                switch (obj.type) {
                    case PT:
                        ioPort.x = ioPort.endX = (obj.n * CELL_SIZE / 2)
                        ioPort.y = 0
                        ioPort.endY = GRID_H * CELL_SIZE

                        ioPortInputText.x = ioPort.x * 2 + CELL_SIZE - 3
                        ioPortInputText.y = 0
                        ioPortOutputText.x = ioPort.x * 2 + CELL_SIZE - 3
                        ioPortOutputText.y = (GRID_H + 1) * CELL_SIZE + 2
                        break
                    case PL:
                        ioPort.x = 0
                        ioPort.endX = GRID_W * CELL_SIZE
                        ioPort.y = ioPort.endY = (obj.n * CELL_SIZE / 2)

                        ioPortInputText.x = 3
                        ioPortInputText.y = ioPort.y * 2 + CELL_SIZE - 10
                        ioPortOutputText.x = (GRID_W + 1) * CELL_SIZE + 3
                        ioPortOutputText.y = ioPort.y * 2 + CELL_SIZE - 10
                        break
                    case PB:
                        ioPort.x = ioPort.endX = (obj.n * CELL_SIZE / 2)
                        ioPort.y = 0
                        ioPort.endY = GRID_H * CELL_SIZE

                        ioPortInputText.x = ioPort.x * 2 + CELL_SIZE - 3
                        ioPortInputText.y = (GRID_H + 1) * CELL_SIZE + 2
                        ioPortOutputText.x = ioPort.x * 2 + CELL_SIZE - 3
                        ioPortOutputText.y = 0
                        break
                    case PR:
                        ioPort.x = 0
                        ioPort.endX = GRID_W * CELL_SIZE
                        ioPort.y = ioPort.endY = (obj.n * CELL_SIZE / 2)

                        ioPortInputText.x = (GRID_W + 1) * CELL_SIZE + 3
                        ioPortInputText.y = ioPort.y * 2 + CELL_SIZE - 10
                        ioPortOutputText.x = 3
                        ioPortOutputText.y = ioPort.y * 2 + CELL_SIZE - 10
                        break
                        
                }

                ioPort.graphics.setStrokeStyle(3).beginStroke(obj.color).moveTo(ioPort.x, ioPort.y).lineTo(ioPort.endX, ioPort.endY)
                ioPorts.push(ioPort)
                grid.addChild(ioPort)
                this.stage.addChild(ioPortInputText)
                this.stage.addChild(ioPortOutputText)
            }

            // state ball
            {
                const obj = new StateBall(this.initialState)
                const stateBall = new this.$createjs.Shape()

                const state = this.state_transitions[obj.initialState]

                if (state == null) {
                    console.error(`BBModel: ${obj.initialState} not found in list of state transitions`)
                    return
                }

                stateBall.x = state.x * CELL_SIZE
                stateBall.y = state.y * CELL_SIZE
                stateBall.vx = stateBall.vy = 0
                stateBall.state = obj.initialState
                
                stateBallText = new this.$createjs.Text(obj.initialState, "italic 16px serif", "black")
                stateBallText.x = state.x * CELL_SIZE
                stateBallText.y = state.y * CELL_SIZE
                
                stateBall.name = "stateBall"
                stateBall.graphics.setStrokeStyle(1).beginStroke("black").drawCircle(0, 0, BALL_RADIUS).beginFill("yellow").drawCircle(0, 0, BALL_RADIUS)
                
                balls.push(stateBall)
                grid.addChild(stateBall)
                grid.addChild(stateBallText)
            }

            // signal ball
            {
                const obj = new SignalBall(this.input)
                const signalBall = new this.$createjs.Shape()
                const portIndex = ioPorts.findIndex((port) => port.inputName === obj.input)

                if (ioPorts.length === 0) {
                    console.error("BBModel: No IOPorts found. Declare IOPorts before initializing the state ball, since state balls act as an input to an IOPort.")
                    return
                }
                if (portIndex === -1) {
                    console.error(`BBModel: StateBall cannot be assigned to IOPort ${obj.input}: IOPort not found`)
                    return
                }

                const port = ioPorts[portIndex]
                switch (port.type) {
                    case PT:
                        signalBall.x = port.n * CELL_SIZE
                        signalBall.y = CELL_SIZE
                        signalBall.initialVx = 0
                        signalBall.initialVy = BALL_V
                        break
                    case PR:
                        signalBall.x = (GRID_W - 1) * CELL_SIZE
                        signalBall.y = port.n * CELL_SIZE
                        signalBall.initialVx = -BALL_V
                        signalBall.initialVy = 0
                        break
                    case PB:
                        signalBall.x = port.n * CELL_SIZE
                        signalBall.y = (GRID_H - 1) * CELL_SIZE
                        signalBall.initialVx = 0
                        signalBall.initialVy = -BALL_V
                        break
                    case PL:
                        signalBall.x = 1
                        signalBall.y = port.n * CELL_SIZE
                        signalBall.initialVx = BALL_V
                        signalBall.initialVy = 0
                        break
                }

                signalBall.name = "signalBall"
                signalBall.vx = signalBall.vy = 0
                signalBall.graphics.setStrokeStyle(1).beginStroke("black").drawCircle(0, 0, BALL_RADIUS).beginFill("green").drawCircle(0, 0, BALL_RADIUS)
                signalBall.addEventListener("click", (event) => {
                    signalBall.vx = signalBall.initialVx
                    signalBall.vy = signalBall.initialVy
                })

                balls.push(signalBall)
                grid.addChild(signalBall)
            }
            
            this.$createjs.Ticker.addEventListener("tick", () => {
                for (const ball of balls) {

                    ball.x += ball.vx
                    ball.y += ball.vy

                    for (const ball2 of balls) {
                        if (ball === ball2) continue

                        // https://flatredball.com/documentation/tutorials/math/circle-collision/
                        const d = ((ball2.x - ball.x) ** 2) + ((ball2.y - ball.y) ** 2)
                        
                        if (d <= ((BALL_RADIUS * 2) ** 2)) {

                            // make sure state ball stops moving on second collision
                            // swap state ball state on collision
                            if (ball.name === "stateBall" && stateBallText.text === "" && (ball.vx !== 0 || ball.vy !== 0)) {
                                console.log("next state")
                                const nextState = this.state_transitions[ball.state].nextState
                                stateBallText.text = nextState
                                ball.state = nextState
                            }
                            else if (ball2.name === "stateBall" && stateBallText.text === "" && (ball2.vx !== 0 || ball2.vy !== 0)) {
                                console.log("next state")
                                const nextState = this.state_transitions[ball2.state].nextState
                                stateBallText.text = nextState
                                ball2.state = nextState
                            }
                            else if (ball.name === "stateBall" || ball2.name === "stateBall") {
                                stateBallText.text = ""
                            }

                            // https://codepen.io/zhu1033527427/pen/qBWaBEe

                            // TODO: manually compute right-angle collisions since ball can only move in one of 8 directions:
                            // - NSEW: (+-5, 0) or (0, +-5)
                            // - NE, NW, SE, SW: (+-2.5, +-2.5)

                            const dx = ball2.x - ball.x;
                            const dy = ball2.y - ball.y;
                            const angle = Math.atan2(dy, dx);
                            const sin = Math.sin(angle);
                            const cos = Math.cos(angle);

                            // circle1 perpendicular velocities
                            const vx1 = (ball.vx * cos + ball.vy * sin);
                            const vy1 = (ball.vy * cos - ball.vx * sin);
                            
                            // circle2 perpendicular velocities
                            const vx2 = (ball2.vx * cos + ball2.vy * sin);
                            const vy2 = (ball2.vy * cos - ball2.vx * sin);
                            
                            // swapping the x velocity (y is parallel so doesn't matter)
                            // and rotating back the adjusted perpendicular velocities
                            ball.vx = vx2 * cos - vy1 * sin;
                            ball.vy = vy1 * cos + vx2 * sin;
                            ball2.vx = vx1 * cos - vy2 * sin;
                            ball2.vy = vy2 * cos + vx1 * sin;

                            // TODO: REMOVE after right-angle collisions are completed
                            // floor very small velocities, define epsilon = 2 since all velocities *should* be >= +-2.5
                            if (Math.abs(ball.vx) < 2) ball.vx = 0
                            if (Math.abs(ball.vy) < 2) ball.vy = 0
                            if (Math.abs(ball2.vx) < 2) ball2.vy = 0
                            if (Math.abs(ball2.vy) < 2) ball2.vy = 0
                            // clamp values with an epsilon < .5 for non-straight velocities
                            if (Math.abs(ball.vx - 2.5) < 0.5) ball.vx = 2.5;
                            if (Math.abs(ball.vx - (-2.5)) < 0.5) ball.vx = -2.5;
                            if (Math.abs(ball.vy - 2.5) < 0.5) ball.vy = 2.5;
                            if (Math.abs(ball.vy - (-2.5)) < 0.5) ball.vy = -2.5;
                            if (Math.abs(ball2.vx - 2.5) < 0.5) ball2.vx = 2.5;
                            if (Math.abs(ball2.vx - (-2.5)) < 0.5) ball2.vx = -2.5;
                            if (Math.abs(ball2.vy - 2.5) < 0.5) ball2.vy = 2.5;
                            if (Math.abs(ball2.vy - (-2.5)) < 0.5) ball2.vy = -2.5;


                            // ensure second ball moves accordingly to avoid overlap
                            ball.x += ball.vx;
                            ball.y += ball.vy;
                            ball2.x += ball2.vx;
                            ball2.y += ball2.vy;

                            if (ball.name === "stateBall" && stateBallText === "" && (ball.vx !== 0 || ball.vy !== 0)) {
                                ball.vx = ball.vy = 0
                            } else if (ball2.name === "stateBall" && stateBallText === "" && (ball2.vx !== 0 || ball2.vy !== 0)) {
                                ball2.vx = ball2.vy = 0
                            }
                        }
                    }

                    for (const reflector of reflectors) {
                        // https://www.jeffreythompson.org/collision-detection/circle-rect.php

                        let testX = ball.x;
                        let testY = ball.y;

                        // which edge is closest?
                        if (ball.x < reflector.x)         testX = reflector.x;      // test left edge
                        else if (ball.x > reflector.x + reflector.w) testX = reflector.x + reflector.w;   // right edge
                        if (ball.y < reflector.y)         testY = reflector.y;      // top edge
                        else if (ball.y > reflector.y + reflector.h) testY = reflector.y + reflector.h;   // bottom edge

                        // get distance from closest edges
                        const distX = ball.x - testX;
                        const distY = ball.y - testY;
                        const distance = Math.sqrt( (distX*distX) + (distY*distY) );

                        // if the distance is less than the radius, collision!
                        if (distance <= BALL_RADIUS) {
                            if (reflector.type === RL || reflector.type === RR)
                                ball.vx = -ball.vx;
                            else
                                ball.vy = -ball.vy;
                        }
                    }

                    // boundary conditions
                    if ((ball.x - BALL_RADIUS < 0
                        || ball.y - BALL_RADIUS < 0
                        || ball.x + BALL_RADIUS > GRID_W * CELL_SIZE
                        || ball.y + BALL_RADIUS > GRID_H * CELL_SIZE) && (ball.vx !== 0 || ball.vy !== 0)) {

                        // reset ball so that it doesn't get "trapped" in a wall
                        if (ball.x - BALL_RADIUS < 0)
                            ball.x = CELL_SIZE
                        if (ball.y - BALL_RADIUS < 0)
                            ball.y = CELL_SIZE
                        if (ball.x + BALL_RADIUS > GRID_W * CELL_SIZE)
                            ball.x = GRID_W * (CELL_SIZE - 1)
                        if (ball.y + BALL_RADIUS > GRID_H * CELL_SIZE)
                            ball.y = GRID_H * (CELL_SIZE - 1)

                        // ball.initialVx = ball.vx > 0 ? -ball.initialVx
                        // ball.initialVy = -ball.initialVy
                        ball.initialVx = -ball.vx
                        ball.initialVy = -ball.vy
                        ball.vx = ball.vy = 0
                    }

                    // update state ball text position
                    if (ball.name === "stateBall") {
                        stateBallText.x = 1 + ball.x - BALL_RADIUS / 2
                        stateBallText.y = ball.y - BALL_RADIUS / 2
                    }
                }

                this.stage.update()
            })
        }
    },
}
</script>