import {server} from "./server.js";
import "./datebase.js";

server.start({port:4300}, ({port})=>{
    console.log("puerto levantado en ", port);
});

console.log("Levantamiento de BD")