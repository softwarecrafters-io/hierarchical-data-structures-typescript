import { BST } from '../core/BinaryTree';

test('binary tree', () => {
	const binaryTree = new BST()

	binaryTree.addNodes([1,2,3,4,5,6,1,2,3,4,5,6])
	console.log(binaryTree)
	expect(true).toBe(true);
});
