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
        this.root;
    }

    mergeArray = (array) => {

        if (array.length === 1) return array;

        let start = 0;
        let end = array.length - 1;
        let midpoint = Math.round((start + end) / 2);

        const leftArray = [];
        const rightArray = [];

        for (let i=0; i<midpoint; i++) {
            leftArray.push(array[i]);
        }
        for (let i=midpoint; i<=end; i++) {
            rightArray.push(array[i]);
        }

        const sort = (l,r) => {
            let lIndex = 0;
            let rIndex = 0;
            const sortedArray = [];

            while (lIndex < l.length && rIndex < r.length) {
                if (l[lIndex] <= r[rIndex]) {
                    sortedArray.push(l[lIndex++]);
                } else {
                    sortedArray.push(r[rIndex++]);
                }
            }

            for (; lIndex<l.length; lIndex++) {
                sortedArray.push(l[lIndex]);
            }
            for (; rIndex<r.length; rIndex++) {
                sortedArray.push(r[rIndex]);
            }
            return sortedArray;
        }
        
        const left = this.mergeArray(leftArray);
        const right = this.mergeArray(rightArray);

        return sort(left,right);

    }

    buildTree = (array, start, end) => {
        
        const sorted = this.mergeArray(array);
        if (start > end) return null;

        const midpoint = Math.floor((start + end) / 2);

        const root = new Node(sorted[midpoint]);

        root.left = this.buildTree(sorted, start, midpoint-1);
        root.right = this.buildTree(sorted, midpoint+1, end);

        this.root = root;

        return root;
    }

    find = (value) => {
        let currentNode = this.root;

        const findNode = (currentNode) => {
            if (!currentNode) {
                return 'The number does not exist in the tree';
            }
            if (value === currentNode.data) return currentNode;
            
            if (value < currentNode.data) {
                currentNode = currentNode.left;
                return findNode(currentNode);
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
                return findNode(currentNode);
            }
        }
        const node = findNode(currentNode);
        return node;
    }

        insert = (value) => {
            const root = new Node(value);
            let currentNode = this.root;

            while (currentNode) {
                if (value < currentNode.data) {
                    if (!currentNode.left) {
                        currentNode.left = root;
                        return;
                    }
                    currentNode = currentNode.left;
                    } else {
                        if (!currentNode.right) {
                            currentNode.right = root;
                            return;
                        }
                        currentNode = currentNode.right;
                    }
            }
        }

        delete = (value) => {
            let currentNode = this.root;
            let parentNode;
            const findNode = (currentNode) => {
                if (!currentNode) {
                    return 'The number does not exist in the tree';
                }
                if (value === currentNode.data) {
                    //if node to be removed is a leaf node
                    if (currentNode.left === null && currentNode.right === null) {
                        if (parentNode.right.data === currentNode.data) {
                            parentNode.right = null;
                        } else {
                            parentNode.left = null;
                        }
                        return;
                    }
                    //if node to be removed has only one child
                    if (currentNode.left === null || currentNode.right === null) {
                        if (currentNode.left === null) {
                            // parentNode.right = currentNode.right;
                            // currentNode.right = null;
                            currentNode.data = currentNode.right.data;
                            currentNode.right = null;
                        } else if (currentNode.right === null) {
                            // parentNode.left = currentNode.left;
                            // currentNode.left = null;
                            currentNode.data = currentNode.left.data;
                            currentNode.left = null;
                        }
                        return;
                    }
                    //last check for anything remaining that has two children
                    let inorderSuccessor = currentNode.right;
                    let successorParent;
                    while (inorderSuccessor.left) {
                        successorParent = inorderSuccessor;
                        inorderSuccessor = inorderSuccessor.left;
                    }

                    //check if the parents left or right is equal to the current node.
                    //if it is, set the parents childs node to inordersucessor
                    //set the inorder successor left and right equal to the currentnodes left and right.

                    if (!successorParent) {
                        console.log(currentNode);
                        currentNode.data = currentNode.right.data;
                        currentNode.right = null;
                        return;
                    }
                    currentNode.data = inorderSuccessor.data;
                    successorParent.left = null;

                }
                if (value < currentNode.data) {
                    parentNode = currentNode;
                    currentNode = currentNode.left;
                    return findNode(currentNode);
                } else if (value > currentNode.data) {
                    parentNode = currentNode;
                    currentNode = currentNode.right;
                    return findNode(currentNode);
                }
            }
            const node = findNode(currentNode);
            return node;

        }

        levelOrder = (callback) => {
            let queue = [];
            let levelOrder = [];
            let node = this.root;
            
            queue.push(node);

            while (queue.length > 0) {
                let shifted = queue.shift();
                if (shifted) {
                    if (callback) {
                    callback(shifted);
                    }
                    levelOrder.push(shifted.data);
                    queue.push(shifted.left);
                    queue.push(shifted.right);
                }
            }
            if (!callback) return levelOrder;

        }

        levelOrderRecursive = (callback, array) => {
            if (array.length === 0) {
                return array;
            }

            let shifted = array.shift();
            if (shifted) {
                callback(shifted);
                array.push(shifted.left);
                array.push(shifted.right);
                this.levelOrderRecursive(callback, array);
            }
        }

        inorder = (root) => {
            if (root === null) return;

            this.inorder(root.left);
            console.log(root.data);
            this.inorder(root.right);
        }

        // preorder = (callback, node) => {
        //     let array = [];

        //     if (node === null) return;
        //     if (callback) {
        //     callback(node);
        //     }

        //     array.push(node);
        //     array = array.concat(this.preorder(callback, node.left));
        //     array = array.concat(this.preorder(callback, node.right));

        //     return array;
        // }
        preorder = (callback, node) => {
            if (node === null) return;
            if (callback) {
            callback(node);
            }
            
            this.preorder(callback, node.left);
            this.preorder(callback, node.right);
        }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const arr = [1,2,3,4,5,6,7,20,40,80,90,76,82];
const tree = new Tree(arr);
tree.buildTree(arr, 0, arr.length - 1);
tree.insert(8);
tree.insert(9);
tree.insert(41);
// console.log(tree.delete(76));
// tree.levelOrder((node) => console.log(node.data));
// tree.preorder((node) => console.log(node), tree.root);
tree.inorder(tree.root);
// console.log(tree.preorder(null, tree.root));
prettyPrint(tree.root);