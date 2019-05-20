import React, { ReactNode } from 'react';
import PeerData from 'peer-data';
import PeerDataContext from './PeerDataContext';
import useSignaling, { Options } from './useSignaling';

export interface Props {
    locale: string;
    children: ReactNode;
    servers: RTCConfiguration,
    constraints: RTCDataChannelInit,
    signaling: Options,
}

function PeerDataProvider({ children, servers, constraints, signaling = {} }: Props) {
    useSignaling(signaling);

    return (
        <PeerDataContext.Provider value={new PeerData(servers, constraints)}>
            {React.Children.only(children)}
        </PeerDataContext.Provider>
    );
}

export default PeerDataProvider;
