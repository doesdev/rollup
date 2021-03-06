import Variable from './Variable';
import Identifier from '../nodes/Identifier';
import ExternalModule from '../../ExternalModule';

export default class ExternalVariable extends Variable {
	module: ExternalModule;
	isExternal: true;
	isNamespace: boolean;
	referenced: boolean;

	constructor(module: ExternalModule, name: string) {
		super(name);
		this.module = module;
		this.isNamespace = name === '*';
		this.referenced = false;
	}

	addReference(identifier: Identifier) {
		this.referenced = true;
		if (this.name === 'default' || this.name === '*') {
			(<ExternalModule>this.module).suggestName(identifier.name);
		}
	}

	include() {
		if (!this.included) {
			this.included = true;
			this.module.used = true;
		}
	}
}

ExternalVariable.prototype.isExternal = true;
