import CometChatApp from "./CometChat/CometChatApp";

const App = () => {
  return (
    // CometChatApp needs explicit height & width
    <div style={{ width: "100vw", height: "100vh" }}>
      <CometChatApp />
    </div>
  );
};

export default App;
