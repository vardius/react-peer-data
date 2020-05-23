import React, { ReactNode } from 'react';
import PeerData, { EventDispatcher } from 'peer-data';
import PeerDataContext from './PeerDataContext';
import useSignaling, {Options} from './useSignaling';

export interface Props {
    children: ReactNode;
    servers?: RTCConfiguration,
    constraints?: RTCDataChannelInit,
    signaling?: Options,
}

function PeerDataProvider({ children, servers, constraints, signaling = {dispatcher: new EventDispatcher()} }: Props) {
    useSignaling(signaling);

    return (
        <PeerDataContext.Provider value={new PeerData(signaling.dispatcher, servers, constraints)}>
            {React.Children.only(children)}
        </PeerDataContext.Provider>
    );
}

export default PeerDataProvider;
