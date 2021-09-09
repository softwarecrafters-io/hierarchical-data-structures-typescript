import { Maybe } from 'monet';

type BinaryTree<T> = {
	root: Maybe<T>;
	left: Maybe<BinaryTree<T>>;
	right: Maybe<BinaryTree<T>>;
};

export class BalancedBinaryTree<T> {
	private readonly root: T;
	private left: Maybe<BalancedBinaryTree<T>>;
	private right: Maybe<BalancedBinaryTree<T>>;

	private constructor(element: T) {
		this.root = element;
	}

	static create<T>(element: T) {
		return new BalancedBinaryTree(element);
	}

	private setLeft(element: T) {
		return (this.left = Maybe.Just(BalancedBinaryTree.create(element)));
	}

	insert(element: T) {
		if (this.left.isNothing()) {
			this.setLeft(element);
		}
	}
}

class TreeNode<T> {
	left: TreeNode<T> = null
	right: TreeNode<T> = null
	constructor(public value: T) {
		this.left = null;
		this.right = null;
	}
}

export class BST<T> {
	root: TreeNode<T> = null

	addNode(value:T) {
		this.root = this.dfs(this.root, value);
	}

	dfs(node:TreeNode<T>, value:T) {
		if (node == null) {
			return new TreeNode(value);
		}
		if(node != null){
			node.right = this.dfs(node.right, value);
		}
		else {
			node.left = this.dfs(node.left, value);
		}
		return node;
	}

	addNodes(arr) {
		arr.forEach(val => {
			this.addNode(val);
		})
	}

	toString() {
		return this.dfsa(this.root);
	}

	dfsa(node:TreeNode<T>) {
		if(node === null)return null
		this.printNode(node);
		this.dfsa(node.left);
		this.dfsa(node.right);
	}

	printNode(node:TreeNode<T>){
		node.value.toString()
	}
}

