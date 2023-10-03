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
const CELL_SIZE = 20 // pixels
const GRID_W = 23 // cells
const GRID_H = 19 // cells
const RT = "reflectorTop"
const RB = "reflectorBottom"
const RL = "reflectorLeft"
const RR = "reflectorRight"

const Reflector = function (x, y, type) {
    this.x = x
    this.y = y
    this.type = type
}
const StateBall = function (x, y) {
    this.x = x
    this.y = y
}
const SignalBall = function (x, y, vx, vy) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
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
    new Reflector(17, 16, RT),
    new Reflector(8, 19, RT),
    new Reflector(16, 19, RT),
    new StateBall(14, 12),
    new SignalBall(15, 19, 0, -5)
]

export default {
    name: "BBMPage",
    layout: "tutorial",
    mounted() {
        const stage = new this.$createjs.Stage("canvas")
        const balls = []
        const reflectors = []

        const stateBallText = new this.$createjs.Text("H", "italic 16px serif", "black")
        
        // draw grid
        for (let c = 0; c < GRID_W; c++) {
            const gridLineV = new this.$createjs.Shape()
            gridLineV.graphics.setStrokeStyle(1).beginStroke("black").moveTo(c * CELL_SIZE, 0).lineTo(c * CELL_SIZE, GRID_H * CELL_SIZE)
            stage.addChild(gridLineV)
        }
        for (let r = 0; r < GRID_H; r++) {
            const gridLineH = new this.$createjs.Shape()
            gridLineH.graphics.setStrokeStyle(1).beginStroke("black").moveTo(0, r * CELL_SIZE).lineTo(GRID_W * CELL_SIZE, r * CELL_SIZE)
            stage.addChild(gridLineH)
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
                stage.addChild(reflector)
            } else if (obj instanceof StateBall) {
                const stateBall = new this.$createjs.Shape()
                
                stateBall.x = obj.x * CELL_SIZE
                stateBall.y = obj.y * CELL_SIZE
                stateBall.vx = stateBall.vy = 0
                
                stateBallText.x = obj.x * CELL_SIZE
                stateBallText.y = obj.y * CELL_SIZE
                
                stateBall.name = "stateBall"
                stateBall.graphics.setStrokeStyle(1).beginStroke("black").drawCircle(0, 0, BALL_RADIUS).beginFill("yellow").drawCircle(0, 0, BALL_RADIUS)
                
                balls.push(stateBall)
                stage.addChild(stateBall)
                stage.addChild(stateBallText)
            } else if (obj instanceof SignalBall) {
                const signalBall = new this.$createjs.Shape()
                
                signalBall.x = obj.x * CELL_SIZE
                signalBall.y = obj.y * CELL_SIZE
                signalBall.vx = signalBall.vy = 0
                
                signalBall.graphics.setStrokeStyle(1).beginStroke("black").drawCircle(0, 0, BALL_RADIUS).beginFill("green").drawCircle(0, 0, BALL_RADIUS)
                signalBall.addEventListener("click", (event) => {
                    signalBall.vx = obj.vx
                    signalBall.vy = obj.vy
                })

                balls.push(signalBall)
                stage.addChild(signalBall)
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
                            stateBallText.text = "V"
                        }

                        // collision resolution
                        // const tangX = ball2.y - ball.y
                        // const tangY = -(ball2.x - ball.x)

                        // const tangMag = Math.sqrt((tangX ** 2) + (tangY ** 2))

                        // const normTangX = tangX / tangMag
                        // const normTangY = tangY / tangMag

                        // const relVx = ball2.vx - ball.vx
                        // const relVy = ball2.vy - ball.vy

                        // const length = (relVx * normTangX) + (relVy * normTangY)

                        // const vComponentX = normTangX * length
                        // const vComponentY = normTangY * length

                        // const vComponentPX = relVx - vComponentX
                        // const vComponentPY = relVy - vComponentY
                        
                        // ball.vx = vComponentPX
                        // ball.vy = vComponentPY
                        // ball2.vx = -vComponentPX
                        // ball2.vy = -vComponentPY

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
                        ball2.x += ball2.vx;
                        ball2.y += ball2.vy;

                        // make sure state ball stops moving on second collision
                        // TODO
                        if (ball.name === "stateBall" && (ball.vx > 0 || ball.vy > 0)) {
                            ball.vx = ball.vy = 0
                        }
                        if (ball2.name === "stateBall" && (ball2.vx > 0 || ball2.vy > 0)) {
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

                if (ball.x + BALL_RADIUS > stage.canvas.width
                    || ball.x - BALL_RADIUS < 0) {
                    ball.vx = -ball.vx
                }
                if (ball.y + BALL_RADIUS > stage.canvas.height
                    || ball.y - BALL_RADIUS < 0) {
                        ball.vy = -ball.vy
                }

                ball.x += ball.vx
                ball.y += ball.vy

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