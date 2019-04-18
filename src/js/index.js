import "../sass/index.scss";

import {firebase} from "./init_firebase";

import * as firebaseui from "firebaseui";

const uiConfig = {
    signInSuccessUrl: "/app",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", uiConfig);