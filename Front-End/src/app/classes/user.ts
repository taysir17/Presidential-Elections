export class User {
    _id?: string;  // Make _id optional
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    role: 'admin' | 'voter';
    favorites: string[];  // List of Candidate IDs
    createdAt: Date;
    updatedAt: Date;

    constructor(
        name: string,
        email: string,
        password: string,
        role: 'admin' | 'voter' = 'voter',
        favorites: string[] = [],
        profilePicture?: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.favorites = favorites;
        this.profilePicture = profilePicture;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
