import { State } from "./utils.js";
import { random } from "./utils.js";
const board = document.querySelector('.board');
const ball = document.querySelector('.ball');
const paddle1 = document.querySelector('.paddle_1');
const paddle2 = document.querySelector('.paddle_2 ');
const score1 = document.querySelector('.player_1_score');
const score2 = document.querySelector('.player_2_score');
const message = document.querySelector('.message');
//where the boatrd is
const boardCoord = board.getBoundingClientRect();
//where ball is currently
let ballCoord = ball.getBoundingClientRect();
//where ball isinitially
const initialBallCoord = ballCoord;
//where paddle are
let paddle1Coord = paddle1.getBoundingClientRect();
let paddle2Coord = paddle2.getBoundingClientRect();
let paddleHeight = paddle1Coord.height;
//balls's top-left in inlline css
let ballTop = ball.style.top;
let ballLeft = ball.style.left;
class Game {
    constructor() {
        this.SPEED = 0.085; // fraction of the screen height thet the paddle moves in one use action 
        this.state = State.STOPPED;
        this.scores = {
            player1: 0,
            player2: 0
        }; //type-assertion (type casting)
    }
    start() {
        console.log('Game Started', this.state);
        this.bindListeners();
    }
    reset() {
        this.state = State.STOPPED;
        ball.style.top = ballTop;
        ball.style.left = ballLeft;
        ballCoord = initialBallCoord;
        message.textContent = 'Press Enter to start';
    }
    bindListeners() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                if (this.state == State.STARTED) {
                    return;
                }
                this.state = State.STARTED;
                message.textContent = "Game on";
                requestAnimationFrame(() => {
                    let velocity = this.getVelocity();
                    this.moveBall(velocity);
                });
            }
            //user actions
            if (this.state === State.STARTED) {
                if (event.key === 'w') {
                    paddle1.style.top = Math.max((paddle1Coord.top - window.innerHeight * this.SPEED), boardCoord.top) + 'px';
                    paddle1Coord = paddle1.getBoundingClientRect();
                }
                if (event.key === 's') {
                    paddle1.style.top = Math.min((paddle1Coord.top + window.innerHeight * this.SPEED), boardCoord.bottom - paddleHeight) + 'px';
                    paddle1Coord = paddle1.getBoundingClientRect();
                }
                if (event.key === 'ArrowUp') {
                    paddle2.style.top = Math.max((paddle2Coord.top - window.innerHeight * this.SPEED), boardCoord.top) + 'px';
                    paddle2Coord = paddle2.getBoundingClientRect();
                }
                if (event.key === 'ArrowDown') {
                    paddle2.style.top = Math.min((paddle2Coord.top + window.innerHeight * this.SPEED), boardCoord.bottom - paddleHeight) + 'px';
                    paddle2Coord = paddle2.getBoundingClientRect();
                }
            }
        });
    }
    getVelocity() {
        return {
            dx: random(3, 8) * (random(0, 1) ? 1 : -1),
            dy: random(3, 8) * (random(0, 1) ? 1 : -1)
        };
    }
    moveBall(velocity) {
        //if the ball hits the board top/bottom boundries we bounce it of
        if (ballCoord.top <= boardCoord.top || ballCoord.bottom > boardCoord.bottom) {
            velocity.dy = -velocity.dy;
        }
        //if  the ball hits  the paddle we need to  bounce it off
        if (ballCoord.left <= paddle1Coord.right &&
            ballCoord.top >= paddle1Coord.top &&
            ballCoord.bottom <= paddle1Coord.bottom
            ||
                ballCoord.right >= paddle2Coord.left &&
                    ballCoord.top >= paddle2Coord.top &&
                    ballCoord.bottom <= paddle2Coord.bottom) {
            velocity.dx = -velocity.dx;
        }
        //has player 1 won?
        if (ballCoord.right > boardCoord.right) {
            ++this.scores.player1;
            score1.textContent = '' + this.scores.player1;
            this.reset();
            return;
        }
        //has player 2 won?
        if (ballCoord.left < boardCoord.left) {
            ++this.scores.player2;
            score2.textContent = '' + this.scores.player2;
            this.reset();
            return;
        }
        ball.style.top = ballCoord.top + velocity.dy + 'px';
        ball.style.left = ballCoord.left + velocity.dx + 'px';
        ballCoord = ball.getBoundingClientRect();
        requestAnimationFrame(() => {
            this.moveBall(velocity);
        });
    }
}
export default Game;
