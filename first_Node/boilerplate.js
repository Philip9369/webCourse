const fs = require('fs');
const folderName = process.argv[2] || 'Project'





try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, "for");
    // fs.writeFileSync(`${folderName}/app.js`)
    // fs.writeFileSync(`${folderName}/app.css`)
} catch (e) {
    console.log("WUH OH");
    console.log(e);
}