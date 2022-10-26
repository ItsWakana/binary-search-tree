// const array = [3,1,2];
const arr = [38, 27, 43, 3, 9, 82, 10];

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
}

const tree = new Tree(arr);
tree.buildTree(arr, 0, arr.length - 1);
console.log(tree);
