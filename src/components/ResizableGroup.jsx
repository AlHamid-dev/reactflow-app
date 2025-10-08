import { Handle, Position, NodeResizer } from "@xyflow/react"
import { memo } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Tooltip } from 'antd';


const ResizableGroup = ({ selected, id, data, children }) => {
    const { label, addChild } = data

    const handleAddChild = (param) => {
        addChild(id, data, param)
    }

    return (
        <div style={{ padding: 10 }}>
            <NodeResizer
                isVisible={selected}
                minWidth={100} minHeight={30}
            />
            <Handle type="target" position={Position.Top} />
            <div className="d-flex justify-content-between">
                <div>
                    <p>{label}</p>
                </div>
                <div>
                    {/* <button onClick={(e) => handleAddChild(e.target.innerText)} className="btn btn-primary btn-sm">Add Child</button> */}
                    <Tooltip title="Add Child">
                        <span style={{cursor:"pointer"}} onClick={(e) => handleAddChild(e.target.innerText)} ><PlusOutlined /></span>
                    </Tooltip>
                </div>
            </div>
            <h6></h6>

            {children}
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}

export default memo(ResizableGroup)