export class UserProfile {
    readonly _tag = "model_UserData";

    public preferredName?: string;

    protected constructor() {
    }

    static constructEmpty() {
        return new UserProfile();
    }
}