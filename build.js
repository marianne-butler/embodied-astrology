const fs = require('fs');

fs.writeFileSync("public/data.json", JSON.stringify({test:"ok"}));