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
        this.root;
    }

    buildTree = (array) => {
        if (array.length === 1) return null;
        
        let start = 0;
        let end = array.length;

        const midpoint = Math.floor((start + end) / 2);
        let left = [];
        let right = [];

        for (let i=0; i<midpoint; i++) {
            left.push(array[i]);
        }

        for (let i=midpoint; i<end; i++) {
            right.push(array[i]);
        }

        const root = new Node(array[midpoint]);

        root.left = this.buildTree(left);
        root.right = this.buildTree(right);

        this.root = root;
        
        return root;
        
    }
}

const binaryTree = new Tree(array)
binaryTree.buildTree(array);

console.log(binaryTree);