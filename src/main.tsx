import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { setupLocalization } from "./CometChat/utils/utils";
import { CometChatProvider } from "./CometChat/context/CometChatContext";

export const COMETCHAT_CONSTANTS = {
  APP_ID: "167213029ca1d8759",
  REGION: "in",
  AUTH_KEY: "86cd7b801c6df3b2567097ecf3cb9a03577c241f"
};


const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(uiKitSettings)?.then(() => {
  setupLocalization();

  const UID = "cometchat-uid-1"; // test UID from docs

  CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
    if (!user) {
      CometChatUIKit.login(UID)
        .then((loggedUser: CometChat.User) => {
          console.log("Login Successful:", loggedUser);

          ReactDOM.createRoot(
            document.getElementById("root") as HTMLElement
          ).render(
            <CometChatProvider>
              <App />
            </CometChatProvider>
          );
        })
        .catch((error) => console.error("Login Failed:", error));
    } else {
      console.log("User already logged in:", user);

      ReactDOM.createRoot(
        document.getElementById("root") as HTMLElement
      ).render(
        <CometChatProvider>
          <App />
        </CometChatProvider>
      );
    }
  });
});
