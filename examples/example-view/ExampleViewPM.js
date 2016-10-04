
module.exports = class ExampleViewPM
{
	constructor() {
		this.message = '';
		this.count = 0;
	}


	init() {
		this.message = 'Click To Count';
	}


	inc() {
		this.count++;
	}
};