const array = [1,2,3,4,5,6,7];

class Node {

    constructor(data) {
        this.data = data;
        this.left;
        this.right;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = null;
    }

    sortedArrayToBST = (array) => {
        if (array.length === 0) return null;

        return this.buildTree(array, 0, array.length-1);
    }

    buildTree = (array, start, end) => {
        if (start > end) return null;

        const midpoint = start + (end-start) / 2;
        let root = new Node(array[midpoint]);
        this.root = root;
        this.root.left = this.buildTree(array, start, midpoint-1);
        this.root.right = this.buildTree(array, midpoint+1, end);

        return root;
        
    }
}

const binaryTree = new Tree(array);

binaryTree.sortedArrayToBST(array);

console.log(binaryTree);