import { BinaryTree, BinaryTreeMapper, BinaryTreeQuery } from '../core/BinaryTree';

describe('The binary tree query', () => {
	it('calculates the greatest distance between root and any of the leaves (height) for a given binary tree', () => {
		const binaryTree = createPerfectBinaryTreeWithOneLevel();
		binaryTree.left.setLeft('d');

		const height = BinaryTreeQuery.calculateHeight(binaryTree);
		expect(height).toBe(3);
	});

	it('evaluates if a given node does not have children (leaf) for a given binary tree', () => {
		const binaryTree = createPerfectBinaryTreeWithOneLevel();

		expect(BinaryTreeQuery.isLeaf(binaryTree)).toBeFalsy();
		expect(BinaryTreeQuery.isLeaf(binaryTree.right)).toBeTruthy();
	});

	it('calculates the number of nodes for a given binary tree', () => {
		const binaryTree = createPerfectBinaryTreeWithOneLevel();
		//level 2
		binaryTree.left.setLeft('d');
		binaryTree.right.setLeft('e');

		const numberOfNodes = BinaryTreeQuery.calculateNumberOfNodes(binaryTree);
		expect(numberOfNodes).toBe(3);
	});

	it('evaluates if a given binary tree is balanced', () => {
		const binaryTree = createPerfectBinaryTreeWithOneLevel();
		//level 2
		binaryTree.left.setLeft('d');

		const isBalanced = BinaryTreeQuery.isBalanced(binaryTree);

		expect(isBalanced).toBeTruthy();
	});
});

describe('Binary tree mapper', () => {
	it('iterates transversal by level', () => {
		const binaryTree = createPerfectBinaryTreeWithOneLevel();

		const result = BinaryTreeMapper.iterateTransversal(binaryTree, 1);

		expect(result).toEqual(['b', 'c']);
	});

	it('transforms a given perfect binary tree into an array by iterating transversal', () => {
		const binaryTree = createPerfectBinaryTreeWithTwoLevels();

		const result = BinaryTreeMapper.toArrayTransversal(binaryTree);
		expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
	});

	it('transforms a given complete binary tree into an array by iterating transversal', () => {
		const binaryTree = createPerfectBinaryTreeWithOneLevel();
		//level 2
		binaryTree.left.setLeft('d');
		binaryTree.left.setRight('e');

		const result = BinaryTreeMapper.toArrayTransversal(binaryTree);
		expect(result).toEqual(['a', 'b', 'c', 'd', 'e']);
	});

	it('transforms a given balance binary tree into an array by iterating transversal', () => {
		const binaryTree = createPerfectBinaryTreeWithOneLevel();
		//level 2
		binaryTree.left.setLeft('d');

		const result = BinaryTreeMapper.toArrayTransversal(binaryTree);
		expect(result).toEqual(['a', 'b', 'c', 'd']);
	});

	it('transforms a given array to a binary tree by iterating transversal', () => {
		const elements = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

		const result = BinaryTreeMapper.fromArrayToBinaryTreeTransversal(elements);

		expect(result).toEqual(createPerfectBinaryTreeWithTwoLevels());
	});

	it('transforms a given binary tree into a formatted string', () => {
		const binaryTree = createPerfectBinaryTreeWithTwoLevels();

		console.log(BinaryTreeMapper.toString(binaryTree));

		expect(true).toEqual(true);
	});
});

function createPerfectBinaryTreeWithOneLevel() {
	const binaryTree = BinaryTree.create('a');
	//level 1
	binaryTree.setLeft('b');
	binaryTree.setRight('c');

	return binaryTree;
}

function createPerfectBinaryTreeWithTwoLevels() {
	const binaryTree = createPerfectBinaryTreeWithOneLevel();
	//level 2
	binaryTree.left.setLeft('d');
	binaryTree.left.setRight('e');
	binaryTree.right.setLeft('f');
	binaryTree.right.setRight('g');
	return binaryTree;
}
