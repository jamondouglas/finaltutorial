var book = Backbone.Model.extend({
	idAttribue:"_id"
});

var BookCollection = Backbone.Collection.extend({
	model:book,
	url:"/books"
});

var BookView = Backbone.View.extend({
	tagName:'li',
	className:'book',
	render:function(){
		var template = $('#booktemplate').html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	}
});

var BookCollectionView = Backbone.View.extend({
	tagName:'ul',className:'books',
	render:function(){
		this.$el.html('');
		this.collection.each(function(book) {
			var bookView = new BookView({model:book});
			this.$el.append(bookView.render().el);
		},this);
		return this;
	},
	initialize:function(){
		this.listenTo(this.collection,"reset",this.render);
	}
});

var AppRouter = Backbone.Router.extend({
	routes:{
		"":'index'
	},
	index:function(){
		var collection = new BookCollection();
		collection.fetch({reset:true});
		var view = new BookCollectionView({collection:collection});
		$(".app").html(view.render().el);
	}
});