const { sendAnnouncementDefinition} = require("./sendAnnouncement")
const definitions = [sendAnnouncementDefinition];

 const allDefinitions = (agenda) => {
  definitions.forEach((definition) => definition(agenda));
};

module.exports = { allDefinitions }