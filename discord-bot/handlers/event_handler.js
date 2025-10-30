const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const load_dir = (dirs) => {
    const eventsPath = path.join(__dirname, `../events/${dirs}`);
    const event_files = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));
    
    for (const file of event_files) {
      const event = require(`../events/${dirs}/${file}`);
      const event_name = file.split(".")[0];
      client.on(event_name, event.bind(null, client));
    }
  };
  ["client", "guild"].forEach((e) => load_dir(e));
};
