import { prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';

const resolvers = {
  Query: {
    users(parent, args, context) {
      return context.prisma.users();
    },
    tasksByUser(parent, args, context) {
      return context.prisma
        .user({
          id: args.userId
        })
        .tasks();
    }
  },
  Mutation: {
    createTask(parent, args, context) {
      return context.prisma.createTask({
        title: args.title,
        author: {
          connect: { id: args.userId }
        }
      });
    },
    async toggleTask(parent, args, context) {
      return context.prisma.updateTask({
        where: { id: args.id },
        data: { isCompleted: args.isCompleted }
      });
    },
    createUser(parent, args, context) {
      return context.prisma.createUser({ email: args.email, name: args.name });
    }
  },
  User: {
    tasks(parent, args, context) {
      return context.prisma
        .user({
          id: parent.id
        })
        .tasks();
    }
  },
  Task: {
    author(parent, args, context) {
      return context.prisma
        .task({
          id: parent.id
        })
        .author();
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log('Server is running on http://localhost:4000'));
