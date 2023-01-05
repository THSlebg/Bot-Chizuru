module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            console.log(command);

            try {
                command.execute(interaction);
            } catch (err) {
                console.log(err);
                interaction.reply({ content: "Something went wrong ... :/", ephemeral: true });
            }
        } else if (interaction.isModalSubmit()) {
            const modal = interaction.customId;
            console.log(modal + " received");

            switch (modal) {
                case "eventForm":
                    require("../reaction/eventForm").execute(interaction);
                    break;
                case "feedbackForm":
                    require("../reaction/feedbackForm").execute(interaction);
                    break;
                case "duel":
                    require("../reaction/duelForm").execute(interaction);
                    break;
                case "blitz_modal":
                    require("../reaction/blitzForm").execute(interaction);
                    break;
                default:
                    break;
            }
        } else if (interaction.isButton()) {
            const btnid = interaction.customId;
            console.log(btnid + " clicked");

            if (btnid.startsWith('Start_d')){
                require("../buttons/duel_handler/Start_d.js").execute(interaction);
            }
            else if (btnid.startsWith('GG|')) {
                require("../buttons/duel_handler/gg.js").execute(interaction);
            }
            if (btnid.startsWith('Start_b')){
                require("../buttons/blitz_handler/Start_b.js").execute(interaction);
            }
            else if (btnid.startsWith('GGb|')) {
                require("../buttons/blitz_handler/ggb.js").execute(interaction);
            }

            switch (btnid) {
                case "Ready_d":
                    require("../buttons/duel_handler/Ready_d.js").execute(interaction);
                    break;
                case "Cancel_d":
                    require("../buttons/duel_handler/Cancel_d.js").execute(interaction);
                    break;
                case "Room_+":
                case "Room_n":
                    require("../buttons/duel_handler/Room_d.js").execute(interaction);
                    break;
                case "Synth_d":
                    require("../buttons/duel_handler/Synth_d.js").execute(interaction);
                    break;
                case "Ready_b":
                    require("../buttons/blitz_handler/Ready_b.js").execute(interaction);
                    break;
                case "Cancel_b":
                    require("../buttons/blitz_handler/Cancel_b.js").execute(interaction);
                    break;
                case "Room_+b":
                case "Room_nb":
                    require("../buttons/blitz_handler/Room_b.js").execute(interaction);
                    break;
                case "Synth_b":
                    require("../buttons/blitz_handler/Synth_b.js").execute(interaction);
                    break;
                case "ConnectToDiamond":
                    require("../buttons/diamond/ConnectToDiamond.js").execute(interaction);
                    break;
                case "Disconnect":
                    require("../buttons/diamond/Disconnect.js").execute(interaction);
                    break;
                case "Home":
                    require("../buttons/diamond/mainPage.js").execute(interaction);
                    break;
                case "Profile":
                    require("../buttons/diamond/profilePage.js").execute(interaction);
                    break;
                case 'GF':
                case 'GF+':
                case 'GF-':
                    require("../buttons/diamond/showgirlfriends.js").execute(interaction);
                    break;
                case 'RentGF':
                    require("../buttons/diamond/rent.js").execute(interaction);
                    break;
                case 'Date':
                case 'Date_resume':
                    require("../buttons/diamond/date.js").execute(interaction);
                    break;
                default:
                    break;
            }
        } else return;
    }
}
