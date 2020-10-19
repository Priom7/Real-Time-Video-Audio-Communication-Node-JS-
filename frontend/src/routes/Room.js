import React, { useRef, useEffect } from "react";
import io from "socket.io-client";

const Room = props => {
  const myVideo = useRef();
  const partnerVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then(stream => {
        myVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect("/");
        socketRef.current.emit(
          "join room",
          props.match.params.roomID
        );

        socketRef.current.on("other user", userID => {
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("new user joined", userID => {
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleRecieveCall);
        socketRef.current.on("answer", handleAnswer);
        socketRef.current.on(
          "ice-candidate",
          handleIceCandicate
        );
      });
  }, []);

  function callUser(userID) {
    peerRef.current = createPeer(userID);
    userStream.current
      .getTracks()
      .forEach(track =>
        peerRef.current.addTrack(track, userStream.current)
      );
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org"
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com"
        }
      ]
    });
    peer.onicecandicate = handleIceCandicate;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () =>
      handleNegotiationNeededEvent(userID);
    return peer;
  }

  return (
    <div>
      <video autoPlay ref={myVideo}></video>
      <video autoPlay ref={partnerVideo}></video>
    </div>
  );
};

export default Room;
