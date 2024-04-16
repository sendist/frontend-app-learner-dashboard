interface UserAccount {
  email: string;
  userId: number;
  username: string;
  roles: string[];
  administrator: boolean;
  name: string;
}

export function getAuthenticatedUser() {
  const userAccountData: UserAccount = {
    email: "admin@gmail.com",
    userId: 4,
    username: "sendis",
    roles: [],
    administrator: true,
    name: "",
  };

  return userAccountData;
}
