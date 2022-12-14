class Node {

    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
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

        inorder = (root, callback) => {
            if (callback) {
                if (!root) return;
                
                this.inorder(root.left, callback);
                callback(root);
                this.inorder(root.right, callback);

                return root;
            } else {
                if (root === null) return [];

                const leftTree = this.inorder(root.left);
                const rightTree = this.inorder(root.right);

                return [...leftTree, root.data, ...rightTree]
            }
        }

        postorder = (root, callback) => {
            if (callback) {
                if (!root) return;

                this.postorder(root.left, callback);
                this.postorder(root.right, callback);
                callback(root);

                return root;
            } else {
                if (!root) return [];

                const leftTree = this.postorder(root.left);
                const rightTree = this.postorder(root.right);

                return [...leftTree, ...rightTree, root.data];
            }
        }

        preorder = (root, callback) => {
            if (callback) {
                if (!root) return;

                callback(root);
                this.preorder(root.left, callback);
                this.preorder(root.right, callback);

                return root;
            } else {
                if (!root) return [];

                const leftTree = this.preorder(root.left);
                const rightTree = this.preorder(root.right);

                return [root.data, ...leftTree, ...rightTree];
            }
        }

        getHeight = (root) => {
            if (!root) return -1;

            const leftHeight = this.getHeight(root.left);
            const rightHeight = this.getHeight(root.right);

            return Math.max(leftHeight, rightHeight) + 1; 
        }

        getDepth = (root, data, dpth = 0) => {
            if (root.data === data) return dpth;

            if (data < root.data) {
                return this.getDepth(root.left, data, dpth+1);
            } else {
                return this.getDepth(root.right, data, dpth+1);
            }
        }

        isBalanced = (root) => {

            //we need to check every node on the left and right subtree and the heights of left and right subtree should not be more than 1. If its more than 1, we should return false.
            if (!root) return true;

            let leftHeight = this.getHeight(root.left);
            let rightHeight = this.getHeight(root.right);

            let difference = Math.abs(leftHeight - rightHeight);
            
            if (difference > 1 ) {
                return false;
            } 

            return this.isBalanced(root.left) && this.isBalanced(root.right);

        }

        rebalance = () => {
            let arr = [];
            this.postorder(this.root, (node) => arr.push(node.data));
            
            this.buildTree(arr, 0, arr.length - 1);
        }
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '???   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '????????? ' : '????????? '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '???   '}`, true);
    }
}

