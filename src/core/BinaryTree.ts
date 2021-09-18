export class BinaryTree<T> {
	root: T;
	left: BinaryTree<T>;
	right: BinaryTree<T>;

	private constructor(element: T) {
		this.root = element;
	}

	static create<T>(element: T) {
		return new BinaryTree(element);
	}

	setLeft(element: T) {
		this.left = BinaryTree.create(element);
	}

	setRight(element: T) {
		this.right = BinaryTree.create(element);
	}
}

export class BinaryTreeQuery {
	static calculateHeight<T>(node: BinaryTree<T>) {
		if (node == null) {
			return 0;
		}
		const heightLeftNode = this.calculateHeight(node.left);
		const heightRightNode = this.calculateHeight(node.right);
		return Math.max(heightLeftNode, heightRightNode) + 1;
	}

	static calculateLevel<T>(node: BinaryTree<T>) {
		if (node == null || node.root == null) {
			return 0;
		}
		return this.calculateLevel(node.left) + 1;
	}

	static isLeaf<T>(node: BinaryTree<T>) {
		if (node == null) {
			return false;
		}
		return node.left == null && node.right == null;
	}

	static isNode<T>(node: BinaryTree<T>) {
		return !(node == null || this.isLeaf(node));
	}

	static calculateNumberOfNodes<T>(node: BinaryTree<T>) {
		if (!this.isNode(node)) {
			return 0;
		}
		const numberOfLeftNodes = this.calculateNumberOfNodes(node.left);
		const numberOfRightNodes = this.calculateNumberOfNodes(node.right);
		return numberOfLeftNodes + numberOfRightNodes + 1;
	}

	static isBalanced(node: BinaryTree<string>): boolean {
		if (node == null) {
			return true;
		}
		const heightLeftNode = this.calculateHeight(node.left);
		const heightRightNode = this.calculateHeight(node.right);
		const differenceBetweenSides = Math.abs(heightLeftNode - heightRightNode);
		const areBalancedLeaves = differenceBetweenSides <= 1;
		return areBalancedLeaves && this.isBalanced(node.left) && this.isBalanced(node.right);
	}
}

export class BinaryTreeMapper {
	static iterateTransversal<T>(node: BinaryTree<T>, level: number): T[] {
		if (node == null) {
			return [null];
		}
		if (level == 0) {
			return [node.root];
		}
		if (level > 0) {
			return BinaryTreeMapper.iterateTransversal(node.left, level - 1).concat(
				BinaryTreeMapper.iterateTransversal(node.right, level - 1)
			);
		}
	}

	static toArrayTransversal<T>(node: BinaryTree<T>): T[] {
		const height = BinaryTreeQuery.calculateHeight(node);
		const levels = Array.from({ length: height }, (_, i) => i);
		const treeAsArray = levels.flatMap((level) => BinaryTreeMapper.iterateTransversal(node, level));
		return this.cleanLastNullPosition(treeAsArray);
	}

	private static cleanLastNullPosition<T>([head, ...tail]: T[]): T[] {
		if (head == null) {
			return [];
		}
		const isLastPositionNull = tail.lastIndexOf(null) === tail.length - 1;
		if (!isLastPositionNull) {
			return [head, ...tail];
		}
		const firstNullIndex = [head, ...tail].indexOf(null);
		return [head, ...tail].slice(0, firstNullIndex);
	}

	static fromArrayToBinaryTreeTransversal<T>(elements: T[], root = BinaryTree.create(null), index = 0): BinaryTree<T> {
		if (index < elements.length) {
			root = BinaryTree.create(elements[index]);
			const indexLeft = 2 * index + 1;
			if (indexLeft < elements.length) {
				root.left = this.fromArrayToBinaryTreeTransversal(elements, root.left, indexLeft);
			}
			const indexRight = 2 * index + 2;
			if (indexRight < elements.length) {
				root.right = this.fromArrayToBinaryTreeTransversal(elements, root.right, indexRight);
			}
		}
		return root;
	}

	static toString<T extends { toString: () => string }>(node: BinaryTree<T>) {
		const height = BinaryTreeQuery.calculateHeight(node);
		const levels = Array.from({ length: height }, (_, i) => i);
		return levels
			.map((level) =>
				BinaryTreeMapper.iterateTransversal(node, level)
					.map((e) => e.toString())
					.reduce((p, c, i) => p + (i % 2 == 0 ? ' L:' + level : ' R:' + level) + c, '')
			)
			.reduce((p, c) => p + c + '\n', '');
	}
}
