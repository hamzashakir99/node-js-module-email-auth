const addDatabase = async (name) => {
    try {
        const tempMongoose = require("mongoose");
        mongoDatabases = {
            ...mongoDatabases,
            [name]: await tempMongoose.createConnection(process.env.MONGO_URL.replace(process.env.NODE_ENV == 'dev' ? `company-orm-dev`: 'company-orm-prod', name)),
        }
        const files = fs.readdirSync(path.join(__dirname, '../schema/companies'))
        for (const file of files) {
            if (file != 'index.js' && file.includes(".js")) {
                mongoDatabases = {
                    ...mongoDatabases,
                    [`${name}_models_${file.replace('.schema.js', '')}`]: require(path.join(__dirname, `../schema/companies/${file}`))(mongoDatabases[name])
                }
            }
        }
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = {
    addDatabase
}