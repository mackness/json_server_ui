"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const appRootDir = __importStar(require("app-root-dir"));
const server_destroy_1 = __importDefault(require("server-destroy"));
const json_server_1 = __importDefault(require("json-server"));
const api_1 = __importDefault(require("./routes/api"));
function start() {
    const DB = appRootDir.get() + '/db.json';
    // setup json-server
    const router = json_server_1.default.router(DB);
    const middleware = json_server_1.default.defaults({
        logger: false
    });
    const app = express_1.default();
    const PORT = 3000;
    app.use(middleware);
    app.use(morgan_1.default('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.static(path.join(appRootDir.get(), 'public')));
    app.use('/api', api_1.default);
    app.use('/', router);
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(http_errors_1.default(404));
    });
    // error handler
    app.use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
    const server = http.createServer(app);
    server_destroy_1.default(server);
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
exports.default = start;
//# sourceMappingURL=index.js.map