# todiscord Template

A template bot to use for creating todiscord projects.

## Installation

Clone this repository to your local machine: `git clone https://github.com/todiscord/template.git`

To install the dependencies you can then run `npm install` in the folder you cloned the repository to.

Rename `.env.example` to `.env` and configure the following:
```bash
BOT_TOKEN=your_discord_bot_token
DEFAULT_PREFIX=!
ALLOWED_GUILDS=your_guild_id
```

To run the bot run `npm run prestart` to run with ts-node.
