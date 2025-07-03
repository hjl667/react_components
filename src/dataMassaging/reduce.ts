// reduce function to group objects in a different way

const projects = [
  {
    projectId: "abc123",
    name: "Project 1",
    userProjects: [
      {
        userId: "xyz789",
        projectId: "abc123",
        user: {
          userId: "xyz789",
          email: "user1@test.com",
        },
      },
      {
        userId: "sdf012",
        projectId: "abc123",
        user: {
          userId: "sdf012",
          email: "user2@test.com",
        },
      },
    ],
  },
  {
    projectId: "def456",
    name: "Project 2",
    userProjects: [
      {
        userId: "xyz789",
        projectId: "def456",
        user: {
          userId: "xyz789",
          email: "user1@test.com",
        },
      },
    ],
  },
];

// create a function to group projects by userId
interface Project {
  projectId: string;
  name: string;
  userProjects: UserProject[];
}

interface User {
  userId: string;
  email: string;
}

interface UserProject {
  userId: string;
  projectId: string;
  user: User;
}

interface GroupedUser {
  userId: string;
  email: string;
  projects: ProjectSummary[];
}

interface ProjectSummary {
  projectId: string;
  name: string;
}

interface GroupedUsers {
  [userId: string]: GroupedUser;
}

const groupByUser = (projects: Project[]): GroupedUsers => {
  return projects.reduce((users, { projectId, name, userProjects }) => {
    userProjects.forEach(({ userId, user: { email } }) => {
      if (!users[userId]) users[userId] = { userId, email, projects: [] };
      users[userId].projects.push({ projectId, name });
    });
    return users;
  }, {} as GroupedUsers);
};

console.log(JSON.stringify(Object.values(groupByUser(projects)), null, 2));