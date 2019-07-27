import {firebase} from "../../script/Firebase"
import DocumentRef = firebase.firestore.DocumentReference

export class UserProfile {
    readonly _tag = "model_UserData";

    public preferredName: string;

    protected constructor() {
        this.preferredName = "";
    }

    static constructEmpty() {
        return new UserProfile();
    }

    static loadFromDocument(document: DocumentRef): Promise<UserProfile> {
        return document.get().then(payload => {
            const rv = this.constructEmpty();

            if(payload) {
                rv.preferredName = payload.get("preferredName");
            }

            return rv;
        })
    }
}

export default UserProfile;