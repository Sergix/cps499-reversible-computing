<template>
    <main>
        <section>
            <p>BBM Model simulation</p>
            <canvas id="canvas" width="500" height="300" class="border border-black"></canvas>
        </section>
    </main>
</template>

<script>
const BALL_RADIUS = Math.sqrt(2) * 10
// const GRID_SIZE = 10

export default {
    name: "BBMPage",
    layout: "tutorial",
    data() {
        return {
            stateBall: {
                vx: 0,
                vy: 0
            }
        }
    },
    mounted() {
        const stage = new this.$createjs.Stage("canvas")
        const balls = []

        const stateBall = new this.$createjs.Shape()
        const signalBall = new this.$createjs.Shape()
        const stateBallText = new this.$createjs.Text("H", "italic 16px serif", "black")

        // TODO: wrapper for balls
        stateBall.x = stateBall.y = 50
        stateBall.vx = stateBall.vy = 0
        stateBall.name = "stateBall"

        signalBall.x = signalBall.y = 100
        signalBall.vx = signalBall.vy = 0
        signalBall.name = "signalBall"

        stateBall.graphics.setStrokeStyle(1).beginStroke("black").drawCircle(0, 0, BALL_RADIUS).beginFill("yellow").drawCircle(0, 0, BALL_RADIUS)
        stateBall.addEventListener("click", (event) => {
            stateBall.vx = 6
            stateBall.vy = 2
        })

        signalBall.graphics.setStrokeStyle(1).beginStroke("black").drawCircle(0, 0, BALL_RADIUS).beginFill("green").drawCircle(0, 0, BALL_RADIUS)

        balls.push(stateBall)
        balls.push(signalBall)
        stage.addChild(stateBall)
        stage.addChild(signalBall)
        stage.addChild(stateBallText)

        this.$createjs.Ticker.addEventListener("tick", () => {
            for (const ball of balls) {
                for (const ball2 of balls) {
                    if (ball === ball2) continue

                    // https://flatredball.com/documentation/tutorials/math/circle-collision/
                    const d = ((ball2.x - ball.x) ** 2) + ((ball2.y - ball.y) ** 2)
                    
                    if (d <= ((BALL_RADIUS * 2) ** 2)) {
                        if ((ball.name === "stateBall" && ball2.name === "signalBall") 
                            || (ball2.name === "stateBall" && ball.name === "signalBall")) {
                            stateBallText.text = "V"
                        }

                        // collision resolution
                        const tangX = ball2.y - ball.y
                        const tangY = -(ball2.x - ball.x)

                        const tangMag = Math.sqrt((tangX ** 2) + (tangY ** 2))

                        const normTangX = tangX / tangMag
                        const normTangY = tangY / tangMag

                        const relVx = ball2.vx - ball.vx
                        const relVy = ball2.vy - ball.vy

                        const length = (relVx * normTangX) + (relVy * normTangY)

                        const vComponentX = normTangX * length
                        const vComponentY = normTangY * length

                        const vComponentPX = relVx - vComponentX
                        const vComponentPY = relVy - vComponentY
                        
                        ball.vx = vComponentPX
                        ball.vy = vComponentPY
                        ball2.vx = -vComponentPX
                        ball2.vy = -vComponentPY
                    }
                }

                // TODO: collisions for boxes

                if (ball.x + BALL_RADIUS > stage.canvas.width
                    || ball.x - BALL_RADIUS < 0) {
                    ball.vx = -ball.vx
                }
                if (ball.y + BALL_RADIUS > stage.canvas.height
                    || ball.y - BALL_RADIUS < 0) {
                        ball.vy = -ball.vy
                }

                ball.x += ball.vx;
                ball.y += ball.vy;
            }

            stateBallText.x = 1 + stateBall.x - BALL_RADIUS / 2
            stateBallText.y = stateBall.y - BALL_RADIUS / 2
            
            stage.update()
        })
    }
}
</script>