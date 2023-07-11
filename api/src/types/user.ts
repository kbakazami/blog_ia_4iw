type User = {
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    createdAt: Date,
}

type Users = User[];

export { User, Users };