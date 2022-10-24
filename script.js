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
        
        let mid = (start + (end - start)) / 2;
        console.log(array[mid]);

        
    }
}

const binaryTree = new Tree(array);

binaryTree.buildTree(array, 0, array.length - 1);