import React from 'react';
import PeerData from 'peer-data';

const PeerDataContext = React.createContext<PeerData|null>(null);

export default PeerDataContext;
