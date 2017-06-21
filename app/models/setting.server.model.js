var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var inputs = ['text', 'textarea', 'select', 'checkbox', 'radio'];

var SettingSchema = new Schema({
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Name cannot be blank and must be unique.',
		unique: true
	},
	value: {
		type: String,
		default: '',
		trim: true
	},
	input: {
		type: String,
		default: 'text',
		enum: inputs,
		trim: true
	}
});

SettingSchema.virtual('label').get(function() {
	var splitName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
	splitName = splitName.split(/(?=[A-Z])/);
	return splitName.join(" ");
});

SettingSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('Setting', SettingSchema);
