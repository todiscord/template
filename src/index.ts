import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { Knub } from "knub";
import { logger } from "./logger";
import { guildPlugins } from "./plugins/availablePlugins";

dotenv.config();

if (!process.env.BOT_TOKEN) {
  logger.error("Bot token not set in .env file");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
  allowedMentions: {
    parse: [],
    users: [],
    roles: [],
    repliedUser: true,
  },
});

const bot = new Knub(client, {
  guildPlugins,

  options: {
    autoRegisterSlashCommands: true,

    async getConfig(guildId) {
      const globalConfig = {
        prefix: process.env.DEFAULT_PREFIX || "!",
      };
      return globalConfig;
    },

    async getEnabledGuildPlugins(ctx, plugins): Promise<string[]> {
      const pluginsGuild = guildPlugins.map((p) => p.name);
      return Array.from(plugins.keys()).filter((pluginName) => {
        return pluginsGuild.includes(pluginName);
      });
    },

    canLoadGuild(guildId) {
      const allowedGuilds = (process.env.ALLOWED_GUILDS || "").split(",");
      return allowedGuilds.includes(guildId);
    },

    logFn: (level, msg) => {
      if (level === "debug") return;

      if (logger[level]) {
        logger[level](msg);
      } else {
        logger.log(`[${level.toUpperCase()}] ${msg}`);
      }
    },
  },
});

bot.initialize();
logger.info("Bot Initialized");
logger.info("Logging in...");
client.login(process.env.BOT_TOKEN);
