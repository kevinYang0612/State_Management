/**
 *  We write state design pattern to swap between different player states
 *  define a class for each state
 * */
// each state will be an object that will contain a list of all possible states
// using enum to define a set of named constants
export const states =
    {
        STANDING_LEFT: 0,
        STANDING_RIGHT: 1,
        SITTING_LEFT: 2,
        SITTING_RIGHT: 3,
        RUNNING_LEFT: 4,
        RUNNING_RIGHT: 5,
        JUMPING_LEFT: 6,
        JUMPING_RIGHT: 7,
        FALLING_LEFT: 8,
        FALLING_RIGHT: 9
    };
/**
 * its job will be just to hold this.state property
 * */
class State
{
    constructor(state)
    {
        // keep track of name of currently active state,
        // we can write that state name on canvas
        this.state = state;
    }
}
/**
 * StandingLeft or StandingRight class is where current state
 * if it detected there is a change of state such as PRESS right,
 * that means the current state is facing left, that's why it's called StandingLeft
 * it needs to change the state
 * */
export class StandingLeft extends State
{
    constructor(player)
    {
        super('STANDING LEFT');
        this.player = player;
    }
    /**
     * when player enters this particular state
     * for example it will change its speed or spritesheet
     * enter method will just run once when standing left state is entered
     * */
    enter()
    {
        this.player.frameY = 1; // here to change the row on the spritesheet
        this.player.speed = 0;
        this.player.maxFrame = 6;
    }
    /**
     * will listen for a predefined set of inputs and swap to a different state
     * when the correct key is pressed.
     * This method will run over and over per each animation frame
     * */
    handleInput(input)
    {
        // standing to running only when right key is pressed
        if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
        else if (input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
        else if (input === "PRESS up") this.player.setState(states.JUMPING_LEFT);
    }
}
export class StandingRight extends State
{
    constructor(player)
    {
        super('STANDING RIGHT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 0;
        this.player.speed = 0;
        this.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
        else if (input === "PRESS up") this.player.setState(states.JUMPING_RIGHT);
    }
}
export class SittingLeft extends State
{
    constructor(player)
    {
        super('SITTING LEFT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 9; // row 9 is sitting facing left
        this.player.speed = 0;
        this.player.maxFrame = 4;
    }
    handleInput(input)
    {
        if (input === 'PRESS right') this.player.setState(states.SITTING_RIGHT);
            /*
             * PRESS up for player to be standing up only PRESS up,
             * otherwise, it remains sitting
             * */
        // else if (input === 'PRESS up') this.player.setState(states.STANDING_LEFT);
        else if (input === 'RELEASE down') this.player.setState(states.STANDING_LEFT);
    }
}
export class SittingRight extends State
{
    constructor(player)
    {
        super('SITTING RIGHT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 8; // row 8 is sitting facing right
        this.player.speed = 0;
        this.player.maxFrame = 4;
    }
    handleInput(input)
    {
        if (input === 'PRESS left') this.player.setState(states.SITTING_LEFT);
        // else if (input === 'PRESS up') this.player.setState(states.STANDING_RIGHT);
        else if (input === 'RELEASE down') this.player.setState(states.STANDING_RIGHT);
    }
}
export class RunningLeft extends State
{
    constructor(player)
    {
        super('RUNNING LEFT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 7; // row 7 is running facing left
        this.player.speed = -this.player.maxSpeed;
        this.player.maxFrame = 8;
    }
    handleInput(input)
    {
        if (input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT);
        else if (input === 'RELEASE left') this.player.setState(states.STANDING_LEFT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_LEFT);
    }
}
export class RunningRight extends State
{
    constructor(player)
    {
        super('RUNNING RIGHT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 6; // row 6 is running facing right
        this.player.speed = this.player.maxSpeed;
        this.player.maxFrame = 8;
    }
    handleInput(input)
    {
        if (input === 'PRESS left') this.player.setState(states.RUNNING_LEFT);
        else if (input === 'RELEASE right') this.player.setState(states.STANDING_RIGHT);
        else if (input === 'PRESS down') this.player.setState(states.SITTING_RIGHT);
    }
}
export class JumpingLeft extends State
{
    constructor(player)
    {
        super('JUMPING LEFT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 3;
        if (this.player.onGround()) this.player.vy -= 20;
        this.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (input === 'PRESS right') this.player.setState(states.JUMPING_RIGHT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
        // vy: -20, -19.5, -19, ...0, 0.5, 1, ..., at 0 means falling
        else if (this.player.vy > 0) this.player.setState(states.FALLING_LEFT);
        else if (!this.player.onGround() && input === 'PRESS left')
        {
            this.player.speed = -this.player.maxSpeed * 0.5;
        }
    }
}
export class JumpingRight extends State
{
    constructor(player)
    {
        super('JUMPING RIGHT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 2;
        if (this.player.onGround()) this.player.vy -= 20;
        this.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (input === 'PRESS left') this.player.setState(states.JUMPING_LEFT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT);
        else if (this.player.vy > 0) this.player.setState(states.FALLING_RIGHT);
        else if (!this.player.onGround() && input === 'PRESS right')
        {
            this.player.speed = this.player.maxSpeed * 0.5;
        }
    }
}
export class FallingLeft extends State
{
    constructor(player)
    {
        super('FALLING LEFT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 5;
        this.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (input === 'PRESS right') this.player.setState(states.FALLING_RIGHT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_LEFT);
        else if (!this.player.onGround() && input === 'PRESS left')
        {
            this.player.speed = -this.player.maxSpeed * 0.5;
        }
    }
}
export class FallingRight extends State
{
    constructor(player)
    {
        super('FALLING RIGHT');
        this.player = player;
    }
    enter()
    {
        this.player.frameY = 4;
        this.player.maxFrame = 6;
    }
    handleInput(input)
    {
        if (input === 'PRESS left') this.player.setState(states.FALLING_LEFT);
        else if (this.player.onGround()) this.player.setState(states.STANDING_RIGHT);
        else if (!this.player.onGround() && input === 'PRESS left')
        {
            this.player.speed = -this.player.maxSpeed * 0.5;
        }
    }
}

