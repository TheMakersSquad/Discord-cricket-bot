exports.categories = {
  meta: {
    display_name: "Meta",
    description: "Commands related to the bot itself",
    commands: {
      help: {
        display_names: ["help"],
        pretty_name: "Help",
        short_description: "",
        description: "Get more information about a command, or open quick help",
        syntax: "help ({command})",
        example: "help stats",
        sudo: false,
        user_input: {
          accepts: true,
          optional: true,
        },
      },
      prefix: {
        display_names: ["prefix"],
        pretty_name: "Prefix",
        short_description: "",
        description: "Get or change the current prefix for the bot commands",
        syntax: "prefix [prefix]",
        example: "prefix !",
        sudo: true,
        user_input: {
          accepts: true,
          optional: true,
        },
      },
    },
  },
  cricket: {
    display_name: "Cricket",
    description: "Commands related to the cricket scores",
    commands: {
      current: {
        display_names: ["current"],
        pretty_name: "Current",
        short_description: "",
        description:
          "Get the list of all completed, ongoing and scheduled matches for today",
        syntax: "current",
        example: "current",
        sudo: false,
        user_input: {
          accepts: false,
          optional: false,
        },
      },
      match: {
        display_names: ["match"],
        pretty_name: "Match",
        short_description: "",
        description:
          "Get the summary or specified details of a match. Available parameters are ",
        syntax: "today",
        example: "today",
        sudo: false,
        user_input: {
          accepts: true,
          optional: true,
        },
      },
    },
  },
};
const commGroups = Object.keys(exports.categories).map(
  (cat) => exports.categories[cat].commands
);
exports.commands = commGroups.reduce((acc, group) => {
  for (co in group) {
    if (group.hasOwnProperty(co)) {
      acc[co] = group[co];
    }
  }
  return acc;
}, {});
