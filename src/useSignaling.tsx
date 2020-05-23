import { useState } from 'react';
import { SocketChannel } from "peer-data";
import type { EventDispatcher } from "peer-data";

export interface Options {
    dispatcher: EventDispatcher
    url?: string | null,
    customChannel?: Object | null,
}

const useSignaling = ({ dispatcher, url = null, customChannel = null }: Options) => useState(customChannel ? customChannel : new SocketChannel(dispatcher, url));

export default useSignaling;
