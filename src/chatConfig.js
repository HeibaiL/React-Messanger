//Keys,tokens
import Chatkit from "@pusher/chatkit-client";

let instanceLocator = "v1:us1:ebf6aa30-3403-46e8-93c3-f211df0965d7",
 tokenUrl = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/ebf6aa30-3403-46e8-93c3-f211df0965d7/token",
 secretKey = "f1b92d2f-eabf-449a-aee4-f9529f74853f:prezQfD1zIaefMj/O3cp0nntu/XkaEiqXYAnkta7U84=";
const chatManager = new Chatkit.ChatManager({
 instanceLocator,
 tokenProvider: new Chatkit.TokenProvider(
     {
      url: tokenUrl
     }),
 userId: "Don"
});
 export {chatManager};
