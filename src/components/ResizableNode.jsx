import { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

const ResizableNode = ({ selected, data }) => {
    return (
        <>
            <NodeResizer isVisible={selected} minWidth={100} minHeight={30} />
            <Handle type="target" position={Position.Top} />
            <div style={{ padding: 10, width: 100, height: 50 }}>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </>
    );
};

export default memo(ResizableNode);
