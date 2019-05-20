import { useState } from 'react';
import { SocketChannel } from "peer-data";

export interface Options {
    url?: string | null,
    customChannel?: Object | null,
}

const useSignaling = ({ url = null, customChannel = null }: Options) => useState(customChannel ? customChannel : new SocketChannel(url));

export default useSignaling;
