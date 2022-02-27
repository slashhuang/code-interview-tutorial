/**
 * @desc NodeDetecter
 * @review: xiaowei.xue@shopee.com
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './nodeDetecter.css'
const useNodeDetector = () => {
    const calculateNode = useCallback(() => {
        const len = document.getElementsByTagName('*').length;
        const getDepth = (node) => {
            if (!node.childNodes || node.childNodes.length === 0) {
                return 1
            } else {
                const maxChildrenDetph = [...node.childNodes].map((childNode) => getDepth(childNode))
                return 1 + Math.max(...maxChildrenDetph)
            }
        }
        return [
            len,
            getDepth(document.documentElement)
        ]
    }, []);
    const [nodeLength, setNodeLength] = useState(null);
    const [nodeDepth, setNodeDepth] = useState(null);
    const triggerDataSet = useCallback(() => {
        const [nextNodeLen, nextNodeDepth ] = calculateNode();
        setNodeLength(nextNodeLen);
        setNodeDepth(nextNodeDepth)
    }, []);
    useEffect(() => {
        triggerDataSet();
        const mutationObserver = new MutationObserver((mutations) => {
            triggerDataSet();
        });
        const config = { childList: true, subtree: true };
        mutationObserver.observe(document.body, config);
        return () => {
            mutationObserver.disconnect();
        }
    }, [])
    return [
        nodeDepth,
        nodeLength,
    ];
}
export const NodeDetecter = (props) => {
    const [
        nodeDepth,
        nodeLength,
    ] = useNodeDetector();
    return (
        <div className="node-detector-wrapper">
            <div className="node-depth">
                节点深度: { nodeDepth }
            </div>
            <div className="node-depth">
                节点总数: { nodeLength }
            </div>
        </div>
    )
}