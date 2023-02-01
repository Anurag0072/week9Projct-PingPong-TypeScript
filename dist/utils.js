var State;
(function (State) {
    State["STARTED"] = "STARTED";
    State["STOPPED"] = "STOPPED";
})(State || (State = {}));
;
;
const random = (min, max) => {
    //generate a random number in 0 -900(0 -max - min) and add 100 (min)to it.
    return min + Math.floor(Math.random() * (max - min + 1));
};
export { State, random };
