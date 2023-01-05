const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'guildCreate',
    once: false,
    execute(guild) {
        console.log('bot joined : ' + guild.name + ', ID : ' + guild.id);

        const genpath = path.join(__dirname, "..").normalize();

        
        if(!fs.existsSync(path.join(genpath, 'data/server/' + guild.id))) 
        {
            try 
            {
                fs.mkdirSync(path.join(genpath, 'data/server/' + guild.id + '/servinfo'), { recursive: true });
            } 
            catch (err) 
            {
                console.log(err);
            }

            // improvement notice : once the data load on the boot, use an iteration to write down the data needed into the directory
            // read the templates (better to load them on boot)

            const loglog = fs.readFileSync(path.join(genpath, "data/log_info.json"));
            const loginfo = JSON.parse(loglog);
            const servserv = fs.readFileSync(path.join(genpath, "data/serv_info.json"));
            const servinfo = JSON.parse(servserv);
            const eventvent = fs.readFileSync(path.join(genpath, "data/event_info.json"));
            const eventinfo = JSON.parse(eventvent);
            const duelduel = fs.readFileSync(path.join(genpath, "data/duel_info.json"));
            const duelinfo = JSON.parse(duelduel);
            const blitzblitz = fs.readFileSync(path.join(genpath, "data/blitz_info.json"));
            const blitzinfo = JSON.parse(blitzblitz);

            // write every new files into the server directory

            const destpath = path.join(genpath, "data/server/" + guild.id + "/servinfo");

            fs.writeFile(path.join(destpath, "log_info.json"), JSON.stringify(loginfo, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors du chargement des données dans le fichier data/" + guild.id + "/server/log_info.json", err);
                    return;
                }
                console.log("data/" + guild.id + "/server/log_info.json.....updated successfully!");
            });

            fs.writeFile(path.join(destpath, "serv_info.json"), JSON.stringify(servinfo, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors du chargement des données dans le fichier data/" + guild.id + "/server/serv_info.json", err);
                    return;
                }
                console.log("data/" + guild.id + "/server/serv_info.json....updated successfully!");
            });

            fs.writeFile(path.join(destpath, "event_info.json"), JSON.stringify(eventinfo, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors du chargement des données dans le fichier data/" + guild.id + "/server/event_info.json", err);
                    return;
                }
                console.log("data/" + guild.id + "/server/event_info.json...updated successfully!");
            });

            fs.writeFile(path.join(destpath, "duel_info.json"), JSON.stringify(duelinfo, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors du chargement des données dans le fichier data/" + guild.id + "/server/duel_info.json", err);
                    return;
                }
                console.log("data/" + guild.id + "/server/duel_info.json....updated successfully!");
            });

            fs.writeFile(path.join(destpath, "blitz_info.json"), JSON.stringify(blitzinfo, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors du chargement des données dans le fichier data/" + guild.id + "/server/blitz_info.json", err);
                    return;
                }
                console.log("data/" + guild.id + "/server/blitz_info.json...updated successfully!");
            });
        }
        else
        {
            console.log('Files already exist for server : ' + guild.name + ', ID : ' + guild.id);
        }
    }
}