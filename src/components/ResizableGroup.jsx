import { NodeResizer } from "@xyflow/react"
import { memo } from "react"

const ResizableGroup = ({ selected, data, children }) => {
    return (
        <div style={{ padding: 10 }}>
            <NodeResizer
                isVisible={selected}
                minWidth={100} minHeight={30}
            />
            <h4>{data.label}</h4>
            <button>Add Child Node</button>
            {children}
        </div>
    )
}

export default memo(ResizableGroup)