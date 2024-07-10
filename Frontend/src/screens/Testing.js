import React, { useEffect, useRef, useState } from 'react';

const Testing = () => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const socketRef = useRef();
    const peerRef = useRef();
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8000/ws/vehicle-density/');

        socketRef.current.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.status) {
                setStatusMessage(data.message);
            } else {
                handleSocketMessage(data);
            }
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setLocalStream(stream);
                localVideoRef.current.srcObject = stream;
            }).catch(error => {
                console.error('Error accessing media devices.', error);
            });

        return () => {
            socketRef.current.close();
        };
    }, []);

    const handleSocketMessage = (data) => {
        if (data.offer) {
            handleOffer(data.offer);
        } else if (data.answer) {
            handleAnswer(data.answer);
        } else if (data.iceCandidate) {
            handleICECandidate(data.iceCandidate);
        }
    };

    const handleOffer = (offer) => {
        peerRef.current = createPeer();
        peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        localStream.getTracks().forEach(track => peerRef.current.addTrack(track, localStream));
        peerRef.current.createAnswer().then(answer => {
            peerRef.current.setLocalDescription(answer);
            socketRef.current.send(JSON.stringify({ answer }));
        });
    };

    const handleAnswer = (answer) => {
        peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleICECandidate = (candidate) => {
        peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    const createPeer = () => {
        const peer = new RTCPeerConnection();
        peer.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.send(JSON.stringify({ iceCandidate: event.candidate }));
            }
        };
        peer.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
            remoteVideoRef.current.srcObject = event.streams[0];
        };
        return peer;
    };

    const createOffer = () => {
        peerRef.current = createPeer();
        localStream.getTracks().forEach(track => peerRef.current.addTrack(track, localStream));
        peerRef.current.createOffer().then(offer => {
            peerRef.current.setLocalDescription(offer);
            socketRef.current.send(JSON.stringify({ offer }));
        });
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
            <video ref={remoteVideoRef} autoPlay />
            <button onClick={createOffer}>Start Call</button>
            <div className='text-white'>{statusMessage}</div>
        </div>
    );
};

export default Testing;