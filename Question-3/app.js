import os from "os"
import fs, { appendFileSync, readFileSync, unlinkSync, writeFileSync } from "fs"
import { unlink } from "fs";

const FreeMemory=os.freemem();
const CPU_core=os.cpus().length;
console.log(FreeMemory)
console.log(CPU_core)



const file=writeFileSync("data.txt","Hello World")
const file1=writeFileSync("Read.md","## This is first line in Readme")
const read=readFileSync("data.txt","utf-8")
console.log(read)
const append=appendFileSync("data.txt","This is second line")
unlinkSync ("Read.md")
console.log("deleted sucessfully")
