import { LevelOrderTree, drawNode, connectEdges, DEFAULT_CONFIG } from "./treeutils.js";

const canvas = document.getElementById("treeCanvas");
const tree = new LevelOrderTree();
const textarea = document.querySelector("textarea");

function render() {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!tree.root) return;

    // xStart is set to 350 to avoid overlapping the side panel
    recursivelyDraw(tree.root, 1, 350, window.innerWidth - 80);
}

function recursivelyDraw(node, level, xStart, xEnd) {
    const ctx = canvas.getContext("2d");
    const xPos = (xStart + xEnd) / 2;
    const yPos = level * DEFAULT_CONFIG.nodeHeightSpacing;

    if (node.left) {
        const leftX = (xStart + xPos) / 2;
        connectEdges(ctx, xPos, yPos + 22, leftX, (level + 1) * 100 - 22);
        recursivelyDraw(node.left, level + 1, xStart, xPos);
    }
    if (node.right) {
        const rightX = (xPos + xEnd) / 2;
        connectEdges(ctx, xPos, yPos + 22, rightX, (level + 1) * 100 - 22);
        recursivelyDraw(node.right, level + 1, xPos, xEnd);
    }
    drawNode(node.value, ctx, xPos, yPos);
}

function updateUI(type, data) {
    document.getElementById("resType").innerText = type.toUpperCase();
    document.getElementById("resPath").innerText = data.result.join(" → ") || "Empty";
    document.getElementById("resTime").innerText = `${data.time} ms`;
}

// Listeners
document.querySelector(".applyBtn").addEventListener("click", () => {
    const values = textarea.value.split(",").map(v => v.trim());
    tree.build(values);
    render();
});

document.querySelector(".clearBtn").addEventListener("click", () => {
    tree.root = null;
    textarea.value = "";
    render();
});

document.getElementById("preBtn").addEventListener("click", () => updateUI("Preorder", tree.getTraversal('preorder')));
document.getElementById("inoBtn").addEventListener("click", () => updateUI("Inorder", tree.getTraversal('inorder')));
document.getElementById("posBtn").addEventListener("click", () => updateUI("Postorder", tree.getTraversal('postorder')));

window.addEventListener("resize", render);