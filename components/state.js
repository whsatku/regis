import localforage from 'localforage';

class State{
	_user = null;
	_enrolled = [];

	constructor(){
		this.ready = this._loadData();
	}

	_loadData(){
		let promises = [
			localforage.getItem('user').then((data) => this._user = data),
			localforage.getItem('enrolled').then((data) => this._enrolled = data),
		];

		return Promise.all(promises);
	}

	get user(){
		return this._user;
	}

	set user(val){
		this._user = val;
		localforage.setItem('user', this._user);
	}

	get enrolled(){
		return this._enrolled;
	}

	set enrolled(val){
		this._enrolled = val;
		localforage.setItem('enrolled', this._enrolled);
	}
}

export default new State();
