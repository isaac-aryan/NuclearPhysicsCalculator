//PHYSICS
export const Me = 9.109;
export const MeBuffer = "10^-31";
export const PI = 3.145;
export const h = 6.62607;
export const PlanckBuffer = "10^-34";

export function angFromVel(vel, rad){
    let ans = Me * vel * rad;
    return ans;
}

export function angFromQuant(num){
    let ans = (num*h)/(2*PI);
    return ans;
}