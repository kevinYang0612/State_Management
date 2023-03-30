/**
 * Small useful functions that such as displayScore
 * */
export function drawStatusText(ctx, input, player)
{
    ctx.font = "28px Helvetica";
    ctx.fillText('Last input: ' + input.lastKey, 20, 50);
    ctx.fillText("Active state: " + player.currentState.state, 20, 90)
}