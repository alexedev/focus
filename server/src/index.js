"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var prisma_client_1 = require("../generated/prisma-client");
var graphql_yoga_1 = require("graphql-yoga");
var resolvers = {
    Query: {
        users: function (parent, args, context) {
            return context.prisma.users();
        },
        tasksByUser: function (parent, args, context) {
            return context.prisma
                .user({
                id: args.userId
            })
                .tasks();
        }
    },
    Mutation: {
        createTask: function (parent, args, context) {
            return context.prisma.createTask({
                title: args.title,
                author: {
                    connect: { id: args.userId }
                }
            });
        },
        toggleTask: function (parent, args, context) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, context.prisma.updateTask({
                            where: { id: args.id },
                            data: { isCompleted: args.isCompleted }
                        })];
                });
            });
        },
        createUser: function (parent, args, context) {
            return context.prisma.createUser({ email: args.email, name: args.name });
        }
    },
    User: {
        tasks: function (parent, args, context) {
            return context.prisma
                .user({
                id: parent.id
            })
                .tasks();
        }
    },
    Task: {
        author: function (parent, args, context) {
            return context.prisma
                .task({
                id: parent.id
            })
                .author();
        }
    }
};
var server = new graphql_yoga_1.GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: resolvers,
    context: {
        prisma: prisma_client_1.prisma
    }
});
server.start(function () { return console.log('Server is running on http://localhost:4000'); });
