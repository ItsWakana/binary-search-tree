import { Tree, prettyPrint } from './script.js';


class Main {
    
    randomNumberArray = (numCount) => {
        const arr = [];
    
        for (let i=0; i<numCount; i++) {
            let random = Math.floor(Math.random() * 1000);
            arr.push(random);
        }
    
        return arr;
    }

    generateTreeAndTest = () => {
        const numbers = this.randomNumberArray(15);

        const tree = new Tree();

        tree.buildTree(numbers, 0, numbers.length - 1);
        console.log(`Tree balance: ${tree.isBalanced(tree.root)}`);

        console.log(`Level-order: ${tree.levelOrder()}`);
        console.log(`Post-order: ${tree.postorder(tree.root)}`);
        console.log(`Pre-order: ${tree.preorder(tree.root)}`);

        tree.insert(Math.floor(Math.random() * 100));
        tree.insert(Math.floor(Math.random() * 100));
        tree.insert(Math.floor(Math.random() * 100));

        console.log(`Tree balance: ${tree.isBalanced(tree.root)}`);

        tree.rebalance();
        console.log(`Tree balance: ${tree.isBalanced(tree.root)}`);

        console.log(`Level-order: ${tree.levelOrder()}`);
        console.log(`Post-order: ${tree.postorder(tree.root)}`);
        console.log(`Pre-order: ${tree.preorder(tree.root)}`);

        prettyPrint(tree.root);
    }
}
const app = new Main;
app.generateTreeAndTest();