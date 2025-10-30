const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const { 
  joinVoiceChannel, 
  createAudioPlayer, 
  createAudioResource, 
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState
} = require('@discordjs/voice');
const { PermissionFlagsBits } = require('discord.js');

// Global queue for your bot. Every server will have a key and value pair in this map.
const queue = new Map();

module.exports = {
  name: "play",
  aliases: ["skip", "stop", "pause", "unpause", "resume"],
  cooldown: 0,
  permissions: [],
  description: "Advanced music bot - play, pause, skip, and stop music from YouTube",
  async execute(message, args, cmd, client) {
    // Checking for the voice channel and permissions
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send(
        "You need to be in a voice channel to execute this command!"
      );
    }
    
    const permissions = voice_channel.permissionsFor(message.client.user);
    if (!permissions.has(PermissionFlagsBits.Connect)) {
      return message.channel.send("I don't have permission to connect to your voice channel!");
    }
    if (!permissions.has(PermissionFlagsBits.Speak)) {
      return message.channel.send("I don't have permission to speak in your voice channel!");
    }

    // Get the server queue from the global queue
    const server_queue = queue.get(message.guild.id);

    // If the user has used the play command
    if (cmd === "play") {
      if (!args.length) {
        return message.channel.send("You need to provide a YouTube URL or search terms!");
      }
      
      let song = {};

      // If the first argument is a link
      if (ytdl.validateURL(args[0])) {
        const song_info = await ytdl.getInfo(args[0]);
        song = {
          title: song_info.videoDetails.title,
          url: song_info.videoDetails.video_url,
        };
      } else {
        // Use keywords to search for a video
        const video_finder = async (query) => {
          const video_result = await ytSearch(query);
          return video_result.videos.length > 1 ? video_result.videos[0] : null;
        };

        const video = await video_finder(args.join(" "));
        if (video) {
          song = { title: video.title, url: video.url };
        } else {
          return message.channel.send("Error finding video.");
        }
      }

      // If the server queue does not exist, create a new one
      if (!server_queue) {
        const queue_constructor = {
          voice_channel: voice_channel,
          text_channel: message.channel,
          connection: null,
          player: null,
          songs: [],
        };

        // Add to global queue
        queue.set(message.guild.id, queue_constructor);
        queue_constructor.songs.push(song);

        // Establish a connection and play the song
        try {
          const connection = joinVoiceChannel({
            channelId: voice_channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
          });
          
          queue_constructor.connection = connection;
          queue_constructor.player = createAudioPlayer();
          connection.subscribe(queue_constructor.player);
          
          video_player(message.guild, queue_constructor.songs[0]);
        } catch (err) {
          queue.delete(message.guild.id);
          console.error(err);
          message.channel.send("There was an error connecting!");
        }
      } else {
        server_queue.songs.push(song);
        return message.channel.send(`👍 **${song.title}** added to queue!`);
      }
    } 
    else if (cmd === "skip") skip_song(message, server_queue);
    else if (cmd === "stop") stop_song(message, server_queue);
    else if (cmd === "pause") {
      if (!server_queue) {
        return message.channel.send("There is no song playing!");
      }
      if (server_queue.player.state.status === AudioPlayerStatus.Paused) {
        return message.channel.send("Song is already paused!");
      }
      server_queue.player.pause();
      message.channel.send("⏸️ Paused the song!");
    }
    else if (cmd === "unpause" || cmd === "resume") {
      if (!server_queue) {
        return message.channel.send("There is no song playing!");
      }
      if (server_queue.player.state.status !== AudioPlayerStatus.Paused) {
        return message.channel.send("Song isn't paused!");
      }
      server_queue.player.unpause();
      message.channel.send("▶️ Resumed the song!");
    }
  },
};

const video_player = async (guild, song) => {
  const song_queue = queue.get(guild.id);

  // If no song is left in the server queue, leave the voice channel
  if (!song) {
    if (song_queue.connection) {
      song_queue.connection.destroy();
    }
    queue.delete(guild.id);
    return;
  }

  try {
    const stream = ytdl(song.url, { 
      filter: "audioonly",
      quality: 'highestaudio',
      highWaterMark: 1 << 25
    });
    const resource = createAudioResource(stream);
    
    song_queue.player.play(resource);
    
    song_queue.player.on(AudioPlayerStatus.Idle, () => {
      song_queue.songs.shift();
      video_player(guild, song_queue.songs[0]);
    });

    song_queue.player.on('error', error => {
      console.error('Audio player error:', error);
      song_queue.songs.shift();
      video_player(guild, song_queue.songs[0]);
    });

    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`);
  } catch (error) {
    console.error('Error playing song:', error);
    song_queue.text_channel.send("Error playing the song!");
    song_queue.songs.shift();
    video_player(guild, song_queue.songs[0]);
  }
};

const skip_song = (message, server_queue) => {
  if (!message.member.voice.channel) {
    return message.channel.send(
      "You need to be in a voice channel to execute this command!"
    );
  }
  if (!server_queue) {
    return message.channel.send(`There are no songs in queue 😔`);
  }
  server_queue.player.stop();
  message.channel.send("⏭️ Skipped the song!");
};

const stop_song = (message, server_queue) => {
  if (!message.member.voice.channel) {
    return message.channel.send(
      "You need to be in a voice channel to execute this command!"
    );
  }
  if (!server_queue) {
    return message.channel.send(`There is nothing playing!`);
  }
  server_queue.songs = [];
  server_queue.player.stop();
  if (server_queue.connection) {
    server_queue.connection.destroy();
  }
  queue.delete(message.guild.id);
  message.channel.send("⏹️ Stopped the music and left the voice channel!");
};
