const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: { //follow the README and change the following Variables:
    username: "my-username" // Your twitch username
,
    password: "something"// Your twitch username's TMI password
  },
  channels: [
 "channels" // The channels where the bot will talk
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  //Making the bot ignore a copy of its own msg
  if (msg.trim() == 'I am not a bot! I am a human'){
    
    return;
    
  }
  var counter =0;
  var say = true //becomes false after a messege has been sent
  //Searching if MSG containes the word 'bot'
  for (var i =0;i<msg.trim().length;i++){
    if (say){
    
    if (counter ==0){
      if (msg.trim().charAt(i) == 'b' || msg.trim().charAt(i) == 'B'){
      counter++;
      continue;
      }
    }
    if (counter ==1){
      if (msg.trim().charAt(i) == 'o' || msg.trim().charAt(i) == 'O'){
      counter++;
      continue;
      }
    }
    if (counter ==2){
      if (msg.trim().charAt(i) == 't' || msg.trim().charAt(i) == 'T'){
      client.say(target,'I am not a bot! I am a human');
      i = msg.trim().length;
      say = false;
      return;
      
      }
    }
    counter =0;
    
    }
  }
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  var firstWord = "";
  for (var i =0; i<10; i++){
    
    if (msg.trim().charAt(i) == ' ' || msg.trim().charAt(i) == '.' || msg.trim().charAt(i) == '?' || msg.trim().charAt(i) == '!' || msg.trim().charAt(i) == '-' || msg.trim().charAt(i) == ',' || msg.trim().charAt(i) == ';' || msg.trim().charAt(i) == '@'){
      i= 10;
      
    }else{
      
      
      firstWord += msg.trim().charAt(i);
      
    }
    
  } 
  // If the command is known, let's execute it
  if (commandName === 'oren' && say) {
    const num = rollDice(commandName);
    client.say(target, `You rolled a ${num} times oren, what is oren? it's my name`);
    say = false;
    console.log(`* Executed ${commandName} command`);
  } else {
    
    //here
    
    if (say && firstWord == "I" || firstWord =="i" ||firstWord == "i'm" || firstWord =="I'm" ||firstWord == "I'M" || firstWord =="Im" || firstWord =="im"){
      
      client.say(target,"Don't say I or I'm... it's sounds like you are talking about yourself!");
      say = false;
      
    }
    if (say && firstWord == "you" ||firstWord == "You" || firstWord =="YOU" ||firstWord == "are" ||firstWord == "ARE" ||firstWord == "Are"){
      
      client.say(target,"Why would you say or ask things about him?");
      say = false;
      
    }
    if (say && firstWord == "lol" ||firstWord == "LOL" || firstWord =="LoL" ||firstWord == "LOOL" ||firstWord == "lool" || firstWord =="lolol" || firstWord =="lols" || firstWord =="Lol" ||firstWord == "LOLS" ){
      
      client.say(target,"it's not funny at all....");
      say = false;
      
    }
    if (say && firstWord == "Twitch" || firstWord =="Twitcher" || firstWord =="Stream" || firstWord =="TWITCH" || firstWord =="twitch" || firstWord =="STREAM" || firstWord =="stream" ||firstWord == "streams" ||firstWord == "Streams" || firstWord =="STREAMS" || firstWord =="Streamer" || firstWord =="Streamers" ||firstWord == "streamers" ){
      
      client.say(target,"TWITCH is our streaming site and everyone in it is good");
      say = false;
      
    }
    if (say && firstWord == "mods" ||firstWord == "mod" || firstWord =="Mods" || firstWord =="Mod" || firstWord =="MODS" || firstWord =="MODs" ||firstWord == "MOD" ||firstWord == "Moderator" ||firstWord == "Moderators" ||firstWord == "moderator" ||firstWord == "moderators" || firstWord =="MODERATORS" ||firstWord == "MODERATOR" || firstWord =="ban" ||firstWord == "BAN" || firstWord =="Ban" ){
      
      client.say(target,"We don't need the mods to ban anyone, I'm becoming a human....");
      say = false;
      
    }
    
    
    
    if(msg.trim().length > 10 && firstWord.length > 3 && say){
      var tmp = rollDice();
      if (tmp >= 0  && tmp <=5 ){
      client.say(target,firstWord + '? are you sure?');
      }
      if (tmp > 5  && tmp <=10 ){
       client.say(target,firstWord + '???? why? why '+ firstWord + "?"); 
        
      }
     if (tmp > 10  && tmp <=15 ){
        
        client.say(target,firstWord + '????????'); 
      }
     if (tmp > 15  && tmp <=20 ){
        client.say(target,firstWord + '!!! lololol you said ' + firstWord); 
        
      }
      
    }
    console.log(msg.trim().length + "  " + firstWord.length + " " + firstWord + " random ="+tmp + "  -  " + say);
    //console.log('my annoying command`);
  }
}




// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
