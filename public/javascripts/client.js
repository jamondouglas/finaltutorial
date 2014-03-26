var book = Backbone.Model.extend({
	idAttribue:"_id"
});

var BookCollection = Backbone.Collection.extend({
	model:book,
	url:"/books"
});