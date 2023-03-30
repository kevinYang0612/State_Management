import {StandingLeft, StandingRight,
    SittingLeft, SittingRight,
    RunningLeft, RunningRight,
    JumpingLeft, JumpingRight,
    FallingLeft, FallingRight} from "./state.js";

/**
 *  where we write all the logic to control and animate our player character
 * */
export default class Player
{
    constructor(gameWidth, gameHeight)
    {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        /** swapping player between different states,
         * such as running, jumping, sitting */
        this.states = [new StandingLeft(this), new StandingRight(this),
            new SittingLeft(this), new SittingRight(this),
            new RunningLeft(this), new RunningRight(this),
            new JumpingLeft(this), new JumpingRight(this),
            new FallingLeft(this), new FallingRight(this)];
        this.currentState = this.states[1];
        this.image = document.getElementById("dogImage");

        // spritesheet width and height
        this.width = 1800 / 9;
        this.height = 2182 / 12;
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height;
        this.vy = 0;
        this.weight = 0.5;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6; // initial state standing right, 5 frames
        this.speed = 0;
        this.maxSpeed = 10;
        this.fps = 25;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }
    draw(ctx, deltaTime)
    {
        if (this.frameTimer > this.frameInterval)
        {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        }
        else this.frameTimer += deltaTime;

        ctx.drawImage(this.image,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width, this.height,
            this.x, this.y, this.width, this.height);
    }
    update(input)
    {
        /*
        * player.update(input) where
        * input is from keyboard, the lastKey was pressed like "PRESS left or PRESS right"
        * currentState is state type, StandingLeft or StandingRight has handleInput
        * which will check "PRESS left", if do, setState will reset currentState
        * and enter will change the frame row, to the respected state(face right or left etc)
        * */
        this.currentState.handleInput(input);
        /** horizontal movement */
        this.x += this.speed;
        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;

        /** vertical movement */
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
    }
    setState(state)
    {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround()
    {
        return this.y >= this.gameHeight - this.height;
    }
}