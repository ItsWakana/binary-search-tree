const array = [1,2,3,4,5,6,7,8,9];

class Node {

    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = null;
    }

    buildTree = (array, start, end) => {
        if (start > end) return null;

        const mid = (start + (end - start)) / 2;

        this.root = new Node(array[mid]);

        let leftTree = this.buildTree(array, start, mid-1);
        this.root.left = leftTree;
        let rightTree = this.buildTree(array, mid+1, end);
        this.root.right = rightTree;

        return this.root;
        
    }
}

const binaryTree = new Tree(array);

binaryTree.buildTree(array, 0, array.length - 1);

console.log(binaryTree);