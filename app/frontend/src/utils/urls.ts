export const apiUrls = {
  todos: {
    getAll: "/api/todos/",
    create: "/api/todos/",
    getOne: (id: string) => `/api/todos/${id}/`,
    updateOne: (id: string) => `/api/todos/${id}/`,
    deleteOne: (id: string) => `/api/todos/${id}/`,
  },
  users: {
    getUserProfile: "/api/users/profile/",
    login: "/api/users/login/",
    register: "/api/users/register/",
    updateOne: (id: string) => `/api/users/${id}/`,
  },
}