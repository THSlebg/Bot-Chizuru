require('dotenv').config()

module.exports = {
    name: "patchnote",
    description: "Shows the patchnotes for the current version of the bot.",
    option: null,
    execute(interaction) {
        return interaction.reply({
            content: `**Version ${process.env.BOTVERSION}:**

        **Latest release :**
                
                > Add 2 more Secret Girl (7 Secret Girls for 11 girls in total)
                > Success Feature : 5 Success 
                > Casino Coin and Money Exchange
                > Add Fields for Profile
                > Bank feature (Money saving system)
                > Mono instance for players & Multi-Instance handling system
                > Throw again option in DiceGame
                > Display Currency when rolling Lucky 7
                > Cooldown on rent!work (doable each 5 sec)
                > Alpha Commands for alpha release
                
        **Now Working on :**
                
                > Multi-Server Instances
                > Cooldown on rent
                > Database Conception
                > Auto-Disconnect after inactivity
                > **Slash Commands** (mandatory for unverified discord bots)`});
    }
}