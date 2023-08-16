const express = require("express");
const bcrypt = require("bcrypt");

const hashedPass = bcrypt.hash("koustubh", 10);
console.log("koustubh");
console.log(hashedPass);