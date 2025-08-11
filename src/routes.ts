import { FastifyInstance } from "fastify";
import z from "zod";
import { FastifyTypedInstance } from "./types";
import { randomUUID } from "node:crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export async function routes(app: FastifyTypedInstance) {
  app.get("/users", {
    schema: {
      tags: ["users"],
      summary: "Get all users",
      description: "Get all users",
    },
  }, () => {
    return users;
  });

  app.post("/users", {
    schema: {
      tags: ["users"],
      summary: "Create a new user",
      description: "Create a new user",
      body: z.object({
        name: z.string(),
        email: z.string().email(),
      }),
    },
  }, (request, reply) => {
    const { name, email } = request.body;

    users.push({
      id: randomUUID(),
      name,
      email,
    });

    return reply.status(201).send(users[users.length - 1]);
  });
}