import { PropsWithChildren } from 'react';

function CenterColumn({ children }: PropsWithChildren) {
    return <main className="flex-1">{children}</main>;
}

export default CenterColumn;
