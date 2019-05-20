import React, { ComponentType, Ref } from 'react';
import PeerData from 'peer-data';
import usePeerData from './usePeerData';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Diff<T, K> = Omit<T, keyof K>;

interface InjectedProps {
  peerData: PeerData;
}

export default function withPeerData<BaseProps extends InjectedProps>(WrappedComponent: ComponentType<BaseProps>) {
  type HocProps = Diff<BaseProps, InjectedProps> & {
    forwardedRef?: Ref<HTMLElement>;
  };

  function Hoc(props: HocProps) {
    const peerData = usePeerData();
    const { forwardedRef, ...rest } = props;

    return <WrappedComponent {...rest as BaseProps} ref={forwardedRef} peerData={peerData} />;
  }

  Hoc.displayName = `withPeerData(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return React.forwardRef((props: HocProps, ref) => {
    return <Hoc {...props} forwardedRef={ref} />;
  });
};
