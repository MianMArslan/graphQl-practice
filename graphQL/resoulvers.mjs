import { nanoid } from "nanoid";

const courseHolder = {};

const resolvers = {
  getCourse: ({ id }) => {
    return courseHolder[id];
  },
  createCourse: ({ input }) => {
    let id = nanoid();
    input.id = id;
    courseHolder[id] = input;
    return courseHolder[id];
  },
};

export { resolvers };
