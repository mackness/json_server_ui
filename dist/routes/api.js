"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = require("express");
const app_root_dir_1 = __importDefault(require("app-root-dir"));
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send('ok');
});
router.post('/json', (req, res) => {
    fs_1.default.writeFile(app_root_dir_1.default.get() + '/db.json', JSON.parse(req.body.payload), (err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.sendStatus(200);
    });
});
exports.default = router;
//# sourceMappingURL=api.js.map