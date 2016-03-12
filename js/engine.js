$(function () {
	var model = {
		init: function() {
			this.cats = [
				{
					"name" : "Mocha",
		 			"image": "images/cat1.jpg",
		 			"counter": "0"
		 		},
		 		{
		 			"name": "Latte",
		 			"image": "images/cat2.jpg",
		 			"counter": "0"
		 		},
		 		{
		 			"name": "Limca",
		 			"image": "images/cat3.jpg",
		 			"counter": "0"
		 		},
		 		{
		 			"name": "Pepsi",
		 			"image": "images/cat4.jpg",
		 			"counter": "0"
		 		},
		 		{
		 			"name": "Chai",
		 			"image": "images/cat5.jpg",
		 			"counter": "0"
		 		}
		 	]; // cats end here
		 	this.adminFlag = false;
		},
		catsList: function() {
			//get cat names in a array : catNames
			var catNames = [];
			for (var i = 0; i < this.cats.length; i++) {
				catNames.push(this.cats[i].name);
			}
			return catNames;
		},
		catDetails: function(name) {
			for( var i = 0; i < this.cats.length; i++ ) {
				var currentCat = this.cats[i];
				if ( name.toString() === currentCat.name.toString() ) {
					return currentCat;
				}
			}
		},
		incrementCounter: function(name) {
			for( var i = 0; i < this.cats.length; i++) {
				var currentCat = this.cats[i];
				if (name.toString() === currentCat.name.toString()) {
					currentCat.counter = Number(currentCat.counter) + 1;
					return currentCat.counter;
				}
			}
		},
		addAdmin: function(){
			this.adminFlag = true;
			return this.adminFlag;
		},
		updateCatDetails: function(newName,counter,image, oldName) {
			for( var i = 0; i < this.cats.length; i++) {
				if (oldName.toString() === this.cats[i].name.toString()) {
					this.cats[i] = {
						"name": newName,
						"counter": Number(counter),
						"image": image
					}
				}
			}

		}

	}; // model ends here

	var octopus = {
		init: function() {
			model.init();
			view.init();
		},
		getCatsList: function() {
			return model.catsList();
		},
		getCatDetails: function(name) {
			return model.catDetails(name);
		},
		getCounter: function(name) {
			return model.incrementCounter(name);
		},
		addAdmin: function() {
			var adminFlag = model.addAdmin();
			if (adminFlag == true) {
				adminView.init();
			}
		},
		updateCat: function(name, counter, image, oldName){
			// alert(name + ' ' + counter + ' ' + image + ' ' + oldName);
			return model.updateCatDetails(name,counter,image, oldName);
		}
	}

	var view = {
		init: function() {
			this.catList = $('.cats');
			this.renderCatsList();
			this.renderCats();
		},
		renderCatsList: function() {
			var htmlStr = '';
			var catNames = octopus.getCatsList();
			for( var i = 0; i < catNames.length; i++) {
				var catName = catNames[i];
				htmlStr += '<li class="catName">' +  catName + '</li> ';
			}
			this.catList.html(htmlStr);
		},
		renderCats: function() {
			var catList = $('.catName');
			var displayArea = $('#displayArea');
			catList.click(function() {
				var catName = $(this).text();
				this.cat = octopus.getCatDetails(catName);
				var htmlStr = '';
				htmlStr += '<h2 id="displayCatName">' + this.cat.name + '</h2> ' +
					'<p id="displayCatCounter">Current Clicks : ' + this.cat.counter + '</p> ' +
					'<img id="displayCatImage" src="' + this.cat.image + '" alt="a cat picture">';
					displayArea.html(htmlStr);
					view.renderCounter();
					octopus.addAdmin();
			});
		},
		renderCounter: function() {
			var catImage = $('#displayCatImage');
			var catCounter = $('#displayCatCounter');
			var catName = $('#displayCatName').text();
			catImage.click(function() {
				var counter = octopus.getCounter(catName);
				catCounter.text("Current Clicks: " + counter);
				adminView.init();

			});
		}

	};

	var adminView = {
		init: function() {
			this.adminArea = $('#adminArea');
			this.htmlStr = '';
			this.htmlStr = '<button type="button" id="admin">Admin</button>' +
				'<div id="formArea"></div>';
			this.renderAdminButton();

		},
		renderAdminButton: function() {
			this.adminArea.html(this.htmlStr);
			adminView.renderForm();
		},
		renderForm: function(){
			this.adminButton = $('#admin');
			this.adminButton.click(function(){
				var catName = $('#displayCatName').text();
				this.cat = octopus.getCatDetails(catName);
				this.htmlStr = '<form id="admin-form">' +
					'<div class="field">' +
					'<label for="name">Cat Name: </label>' +
					'<input type="text" id="name" value="' + this.cat.name +'"><br/>' +
					'</div>' +
					'<div class="field">' +
					'<label for="counter">Cat Counter: </label>' +
					'<input type="text" id="counter" value="' + this.cat.counter + '"><br/>' +
					'</div>' +
					'<div class="field">' +
					'<label for="image">Cat Image: </label>' +
					'<input type="text" id="image" value="' + this.cat.image + '"><br/>' +
					'</div><br/>' +
					'<button type="submit" id="submitForm">Save</button>' +
					'<button type="cancel" id="cancelForm">Cancel</button>' +
					'</form>';
				this.formArea = $('#formArea');
				this.formArea.html(this.htmlStr);

				this.submit = $('#submitForm');
				this.submit.click(function(e){
					this.name = $('#name').val();
					this.counter = $('#counter').val();
					this.image = $('#image').val();
					this.oldName = $('#displayCatName').text();

					octopus.updateCat(this.name, Number(this.counter), this. image, this.oldName);
					view.init();
					this.catNamesListItems = $('.catName');

					this.catNamesListItems.each(function(){
						if ( $(this).text() == $('#name').val() ) {
							$(this).click();
						}
					});

					// this.formArea = $('#formArea');
					// this.formArea.html('');
					e.preventDefault();
				});

				this.cancel = $('#cancelForm');
				this.cancel.click(function(e){
					this.formArea = $('#formArea');
					this.formArea.html('');
					e.preventDefault();
				});

			});

		}
	};

	octopus.init();
});
