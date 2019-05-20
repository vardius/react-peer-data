import { useContext } from 'react';
import PeerData from 'peer-data';
import PeerDataContext from './PeerDataContext';

const usePeerData = (): PeerData | null => useContext(PeerDataContext);

export default usePeerData;
