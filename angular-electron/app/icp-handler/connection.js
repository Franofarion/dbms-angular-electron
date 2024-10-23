var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { EVENT } = require("../../shared/event");
const { ipcMain } = require('electron');
const { Client } = require('pg');
// Function to connect to PostgreSQL
function connectToPostgres() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new Client({
            user: 'user',
            host: 'localhost',
            database: 'testdb',
            password: 'password',
            port: 5432
        });
        try {
            yield client.connect();
            console.log("Connected to PostgreSQL");
            const res = yield client.query('SELECT * FROM users');
            yield client.end();
            console.log(res);
            return true;
        }
        catch (error) {
            console.error("Error connecting to PostgreSQL:", error);
            throw error;
        }
    });
}
// Register the IPC handler for 'get-users' in this module
ipcMain.handle(EVENT.CONNECTION, () => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield connectToPostgres();
        return users;
    }
    catch (error) {
        return { error: 'Failed to retrieve users' };
    }
}));
// Optionally, you can export functions if needed elsewhere
module.exports = {
    connectToPostgres
};
//# sourceMappingURL=connection.js.map