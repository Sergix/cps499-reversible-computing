<template>
    <main>
        <section>
            <p>BBM Model simulation</p>
            <canvas id="canvas" width="500" height="500" class="border border-black"></canvas>
        </section>
    </main>
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
const StateBall = function (x, y, initialState, nextState) {
    this.x = x
    this.y = y
    this.initialState = initialState
    this.nextState = nextState
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
const MAP_RE = [
    new Reflector(7, 0, RB),
    new Reflector(9, 0, RB),
    new Reflector(6, 3, RB),
    new Reflector(6, 3, RR),
    new Reflector(10, 3, RL),
    new Reflector(10, 3, RB),
    new Reflector(14, 3, RB),
    new Reflector(1, 6, RR),
    new Reflector(5, 8, RL),
    new Reflector(21, 8, RB),
    new Reflector(0, 9, RR),
    new Reflector(2, 9, RR),
    new Reflector(6, 9, RR),
    new Reflector(10, 9, RL),
    new Reflector(10, 9, RB),
    new Reflector(10, 9, RT),
    new Reflector(12, 9, RB),
    new Reflector(17, 10, RL),
    new Reflector(17, 10, RB),
    new Reflector(23, 10, RL),
    new Reflector(6, 11, RR),
    new Reflector(20, 11, RT),
    new Reflector(20, 11, RL),
    new Reflector(1, 12, RR),
    new Reflector(8, 13, RT),
    new Reflector(17, 14, RT),
    new Reflector(21, 14, RL),
    new Reflector(7, 16, RT),
    new Reflector(9, 16, RT),
    new Reflector(17, 16, RT),
    new Reflector(8, 19, RT),
    new Reflector(16, 19, RT),
    new IOPort(13, "n", "s'", PT, "red"),
    new IOPort(15, "s", "n'", PB, "yellow"),
    new IOPort(5, "e", "w", PR, "green"),
    new IOPort(7, "w'", "e'", PL, "blue"),
    new StateBall(14, 12, "H", "V"),
    new SignalBall("n")
]

export default {
    name: "BBMPage",
    layout: "tutorial",
    mounted() {
        // TODO: state ball initial placement based on initial state 

        const stage = new this.$createjs.Stage("canvas")

        const grid = new this.$createjs.Container()
        grid.x = grid.y = CELL_SIZE
        stage.addChild(grid)

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
        for (const obj of MAP_RE) {
            if (obj instanceof Reflector) {
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
            } else if (obj instanceof StateBall) {
                const stateBall = new this.$createjs.Shape()
                
                stateBall.x = obj.x * CELL_SIZE
                stateBall.y = obj.y * CELL_SIZE
                stateBall.vx = stateBall.vy = 0
                stateBall.state = obj.initialState
                stateBall.initialState = obj.initialState
                stateBall.nextState = obj.nextState
                
                stateBallText = new this.$createjs.Text(obj.initialState, "italic 16px serif", "black")
                stateBallText.x = obj.x * CELL_SIZE
                stateBallText.y = obj.y * CELL_SIZE
                
                stateBall.name = "stateBall"
                stateBall.graphics.setStrokeStyle(1).beginStroke("black").drawCircle(0, 0, BALL_RADIUS).beginFill("yellow").drawCircle(0, 0, BALL_RADIUS)
                
                balls.push(stateBall)
                grid.addChild(stateBall)
                grid.addChild(stateBallText)
            } else if (obj instanceof SignalBall) {
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
            } else if (obj instanceof IOPort) {
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
                stage.addChild(ioPortInputText)
                stage.addChild(ioPortOutputText)
            }
        }
        
        this.$createjs.Ticker.addEventListener("tick", () => {
            for (const ball of balls) {
                for (const ball2 of balls) {
                    if (ball === ball2) continue

                    // https://flatredball.com/documentation/tutorials/math/circle-collision/
                    const d = ((ball2.x - ball.x) ** 2) + ((ball2.y - ball.y) ** 2)
                    
                    if (d <= ((BALL_RADIUS * 2) ** 2)) {
                        if (ball.name === "stateBall" || ball2.name === "stateBall") {
                            stateBallText.text = ""
                        }

                        // make sure state ball stops moving on second collision
                        // swap state ball state on collision
                        if (ball.name === "stateBall" && (ball.vx !== 0 || ball.vy !== 0)) {
                            // swap state text
                            if (ball.state === ball.initialState) {
                                stateBallText.text = ball.nextState 
                                ball.state = ball.nextState
                            }
                            else {
                                stateBallText.text = ball.initialState
                                ball.state = ball.initialState
                            }
                        }
                        else if (ball2.name === "stateBall" && (ball2.vx !== 0 || ball2.vy !== 0)) {
                            // swap state
                            if (ball2.state === ball2.initialState) {
                                stateBallText.text = ball2.nextState 
                                ball2.state = ball2.nextState
                            }
                            else {
                                stateBallText.text = ball2.initialState
                                ball2.state = ball2.initialState
                            }
                        }

                        // https://codepen.io/zhu1033527427/pen/qBWaBEe
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

                // TODO: signal ball stops at port
                // for (const port in ioPorts) {
                //     // find ball at port and set global state to current port
                // }

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

                    ball.initialVx = -ball.vx
                    ball.initialVy = -ball.vy
                    ball.vx = ball.vy = 0
                }

                ball.x += ball.vx
                ball.y += ball.vy

                // update state ball text position
                if (ball.name === "stateBall") {
                    stateBallText.x = 1 + ball.x - BALL_RADIUS / 2
                    stateBallText.y = ball.y - BALL_RADIUS / 2
                }
            }

            stage.update()
        })
    }
}
</script>