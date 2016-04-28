import localforage from 'localforage';
import Immutable from 'immutable';
import EventEmitter from 'events';

class State extends EventEmitter{
	_user = null;
	_enrolled = null;

	constructor(){
		super();
		this.ready = this._loadData();
	}

	_loadData(){
		let promises = [
			localforage.getItem('user').then((data) => this._user = data),
			localforage.getItem('enrolled').then((data) => this._enrolled = new Immutable.List(data) || new Immutable.List()),
		];

		return Promise.all(promises).then(() => this.emit('ready'));
	}

	get user(){
		return this._user;
	}

	set user(val){
		this._user = val;
		localforage.setItem('user', this._user);
		this.emit('user', val);
	}

	get enrolled(){
		return this._enrolled;
	}

	set enrolled(val){
		this._enrolled = val;
		localforage.setItem('enrolled', this._enrolled.toJS());
		this.emit('enrolled', val);
	}

	enrolledInSubject(id, secType){
		for(let item of this.enrolled){
			if(item.id === id && item.sectionType === secType){
				return true;
			}
		}
		return false;
	}

	enrolledInSection(id, section, secType){
		for(let item of this.enrolled){
			if(item.id === id && item.section === section && item.sectionType === secType){
				return true;
			}
		}
		return false;
	}
}

export default new State();
