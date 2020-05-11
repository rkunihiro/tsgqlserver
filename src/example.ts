type User = {
    id: number;
    name: string;
};

type UserResolverInput = {
    id?: number;
    name?: string;
};

type UserResolver = (input: UserResolverInput) => User | undefined;

const userResolver: UserResolver = (input) => {
    if (input.id) {
        return;
    }
    return {
        id: 1,
        name: "",
    };
};

const user = userResolver({});
