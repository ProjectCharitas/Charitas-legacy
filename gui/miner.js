var $jscomp$destructuring$var0=require("child_process"),spawn=$jscomp$destructuring$var0.spawn,exec=$jscomp$destructuring$var0.exec,miner,logger,state=!1,searchForOpenMiners=function(){exec("wmic process WHERE \"CommandLine LIKE '%--charitas-role=charitas-miner%' AND Name LIKE '%pwsh%'\" get ProcessId | more +1",function(b,c,d){b&&console.error(b);var a=c.trim().split("\n").filter(function(a){return""!=a}).map(function(a){return a.trim()});state=0<a.length;0<a.length&&(1==a.length?(miner={kill:function(){exec("taskkill /PID "+
a[0])}},toggleSpinner()):(console.error("Multiple Miners found: "+a),alert("Multiple Miners Detected. Closing all open miners.\nThis should not occur.\nPlease reach out to us on social media or contact us at help@charitas.co"),killDuplicates()))});exec('wmic process WHERE \'CommandLine LIKE "%--charitas-role=charitas-log%" AND Name LIKE "%pwsh%"\' GET ProcessId | more +1',function(b,c,d){var a=c.trim().split("\n").filter(function(a){return""!=a}).map(function(a){return a.trim()});state=0<a.length;
0<a.length&&(1==a.length?(logger={kill:function(){exec("taskkill /PID "+a[0])}},toggleSpinner()):(console.error("Multiple Loggers found: "+a),alert("Multiple Loggers Detected. Closing all open log files.\nThis should not occur.\nPlease reach out to us on social media or contact us at help@charitas.co"),killDuplicates()))})},killDuplicates=function(){exec("wmic process where \"commandline like '%--charitas-role=charitas-%' AND name like '%pwsh%'\" get processid | more +1",function(b,c,d){b&&console.error(b);
c.trim().split("\n").filter(function(a){return""!=a}).map(function(a){return a.trim()}).forEach(function(a){return exec("taskkill /f /pid "+a,function(a,b,c){a&&console.error(a);c&&console.error(c);console.log(b)})})})},toggleSpinner=function(){[document.getElementById("mine-button").children[3],document.getElementById("mine-button").children[4]].forEach(function(b){return b.setAttribute("class",state?"on":"off")})},clicked=function(b){(state=!state)?(startMining(),searchForOpenMiners()):(stopMining(),
document.getElementById("anim-off").innerHTML="\n        @keyframes unspin {\n            from {\n                transform: rotate("+-1*(180*Math.asin(getComputedStyle(document.getElementById("arrows")).transform.replace(/[a-z()]/g,"").split(",")[1])/Math.PI)+"deg);\n            }\n            to {\n                transform: rotate(0deg);\n            }\n        }\n        ",toggleSpinner())},startMining=function(){require(process.env.APPDATA+"\\charitas\\options.json");var b=spawn(path.join(__dirname,
"../miner/CharitasCGPU.bat"));b.stdout.on("data",function(b){return console.log("stdout: "+b)});b.stderr.on("data",function(b){return console.error("stderr: "+b)})},stopMining=function(){miner.kill();logger.kill()};