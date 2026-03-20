import { BinaryTreeNode } from "./BinaryTreeNode.js";

export const DEFAULT_CONFIG = {
    radius: 22,
    nodeHeightSpacing: 100,
};

export class LevelOrderTree {
    constructor() { this.root = null; }

    // Builds a balanced tree from comma-separated values
    build(values) {
        if (!values.length || values[0] === "") { this.root = null; return; }
        
        this.root = new BinaryTreeNode(values[0]);
        const queue = [this.root];
        let i = 1;

        while (queue.length > 0 && i < values.length) {
            const current = queue.shift();
            // Left Child
            if (i < values.length) {
                if (values[i] !== "null") {
                    current.left = new BinaryTreeNode(values[i]);
                    queue.push(current.left);
                }
                i++;
            }
            // Right Child
            if (i < values.length) {
                if (values[i] !== "null") {
                    current.right = new BinaryTreeNode(values[i]);
                    queue.push(current.right);
                }
                i++;
            }
        }
    }

    getTraversal(type) {
        const start = performance.now();
        const result = [];
        if (type === 'preorder') this._preOrder(this.root, result);
        else if (type === 'inorder') this._inOrder(this.root, result);
        else if (type === 'postorder') this._postOrder(this.root, result);
        return { result, time: (performance.now() - start).toFixed(4) };
    }

    _preOrder(n, r) { if(n) { r.push(n.value); this._preOrder(n.left, r); this._preOrder(n.right, r); } }
    _inOrder(n, r) { if(n) { this._inOrder(n.left, r); r.push(n.value); this._inOrder(n.right, r); } }
    _postOrder(n, r) { if(n) { this._postOrder(n.left, r); this._postOrder(n.right, r); r.push(n.value); } }
}

export function drawNode(value, ctx, x, y) {
    // Outer Glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(4, 42, 56, 0.8)";
    
    // Gradient fill (Light blue to Cyan)
    const grad = ctx.createRadialGradient(x, y, 2, x, y, DEFAULT_CONFIG.radius);
    grad.addColorStop(0, "#bae6fd"); 
    grad.addColorStop(1, "#0fb4fa");

    ctx.beginPath();
    ctx.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.fill();

    // Text Styling
    ctx.shadowBlur = 0;
    ctx.font = `600 11pt Inter, sans-serif`;
    ctx.fillStyle = "#082f49";
    ctx.textAlign = "center";
    ctx.fillText(value, x, y + 6);
}

export function connectEdges(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.3)"; // Subtle greyish-blue
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1, (y1 + y2) / 2, x2, (y1 + y2) / 2, x2, y2);
    ctx.stroke();
}