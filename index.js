const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1199050360782864425')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/qwoqowq') //Must be a youtube video link 
    .setState(' ')
    .setName(' ')
    .setDetails(`  [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1197246292955516930/1199044144849506388/HD_transparent_picture.png?ex=65ca5661&is=65b7e161&hm=bb8d2fb8bdeb40dca8207175664a88e84e4937343a303319525370dc17074847&=&format=webp&quality=lossless&width=1177&height=662') //You can put links in tenor or discord and etc.
    .setAssetsLargeText(' ') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1197246292955516930/1199044144849506388/HD_transparent_picture.png?ex=65ca5661&is=65b7e161&hm=bb8d2fb8bdeb40dca8207175664a88e84e4937343a303319525370dc17074847&=&format=webp&quality=lossless&width=1177&height=662') //You can put links in tenor or discord and etc.
    .setAssetsSmallText(' ') //Text when you hover the Small image
    .addButton(' ', 'https://discord.com/terms')
    .addButton(' ', 'https://discord.com/terms');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = ` [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
