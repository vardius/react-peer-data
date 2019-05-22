React WebRTC - PeerData
================
[![Build Status](https://travis-ci.org/vardius/react-peer-data.svg?branch=master)](https://travis-ci.org/vardius/react-peer-data)
[![npm version](https://img.shields.io/npm/v/react-peer-data.svg)](https://www.npmjs.com/package/react-peer-data)
[![npm downloads](https://img.shields.io/npm/dm/react-peer-data.svg)](https://www.npmjs.com/package/react-peer-data)
[![license](https://img.shields.io/github/license/vardius/react-peer-data.svg)](LICENSE)
[![codecov](https://codecov.io/gh/vardius/react-peer-data/branch/master/graph/badge.svg)](https://codecov.io/gh/vardius/react-peer-data)

<details>
  <summary>Table of Content</summary>

<!-- toc -->
- [About](#about)
- [How to use](#how-to-use)
  - [Installation](#installation)
  - [Examples](#examples)
    - [Hook](#hook)
    - [HOC](#hoc)
- [License](#license)
<!-- tocstop -->

</details>

ABOUT
==================================================
React wrapper for PeerData library for files, media streaming/sharing using WebRTC.

Contributors:

* [Rafał Lorenz](http://rafallorenz.com)

Want to contribute ? Feel free to send pull requests!

Have problems, bugs, feature ideas?
We are using the github [issue tracker](https://github.com/vardius/react-peer-data/issues) to manage them.

<!-- ![Dashboard](../master/.github/kubernetes-dashboard-overview.png)
![Dashboard](../master/.github/kubernetes-dashboard-pods.png) -->

HOW TO USE
==================================================

1. [Chat Example](https://github.com/vardius/react-webrtc-chat)

## Getting started
### Installation
```bash
npm install react-peer-data
```
### Examples
Use `PeerDataProvider` to instantiate and pass peerData object down the component tree
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { PeerDataProvider } from 'react-peer-data';

import App from './App';

ReactDOM.render(
    <PeerDataProvider
        servers={{ iceServers: [{ url: "stun:stun.1.google.com:19302" }] }}
        constraints={{ ordered: true }}
    >
        <App />
    </PeerDataProvider>,
    document.getElementById("root")
);
```
You can access peerData context value in two ways:
#### Hook
```javascript
import React, { useEffect } from 'react';
import { usePeerData } from 'react-peer-data';

function App() {
  const peerData = usePeerData();

  useEffect(() => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const room = peerData.connect('my-room', stream);
      room
        .on("participant", participant => {
            participant
                .on("disconnected", () => { console.log('disconnected', participant.id); })
                .on("track", event => { console.log('stream', participant.id, event.streams[0]); })
                .on("message", payload => { console.log(participant.id, payload); })
                .on("error", event => {
                    console.error('peer', participant.id, event);
                    participant.renegotiate();
                });
        })
        .on("error", event => { console.error('room', name, event); });

      return () => room.disconnect()
  }, [peerData]);

  return null; // @TODO: render participants
}

export default App;
```
#### HOC
```javascript
import React from 'react';
import { withPeerData } from 'react-peer-data';

function App({ peerData }) {
  // follow example from above

  return null; // @TODO: render participants
}

export default withPeerData(App);
```

License
-------

This package is released under the MIT license. See the complete license in the package:

[LICENSE](LICENSE.md)