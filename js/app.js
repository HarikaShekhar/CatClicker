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
		updateCatDetails: function(newName,counter,image, oldName) {
			// alert('inside model');
			this.cats.push({
				"name": newName,
				"counter": counter,
				"image": image
			});
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
				var cat = octopus.getCatDetails(catName);
				var htmlStr = '';
				htmlStr += '<h2 id="displayCatName">' + cat.name + '</h2> ' +
					'<p id="displayCatCounter">Current Clicks : ' + cat.counter + '</p> ' +
					'<img id="displayCatImage" src="' + cat.image + '" alt="a cat picture">';
					displayArea.html(htmlStr);
					view.renderCounter();
					adminView.init();
			});
		},
		renderCounter: function() {
			var catImage = $('#displayCatImage');
			var catCounter = $('#displayCatCounter');
			var catName = $('#displayCatName').text();
			catImage.click(function() {
				var counter = octopus.getCounter(catName);
				catCounter.text("Current Clicks: " + counter);
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
			this.htmlStr = '';
			this.htmlStr = '<form id="admin-form">' +
				'<div class="field">' +
				'<label for="name">Cat Name: </label>' +
				'<input type="text" id="name"><br/>' +
				'</div>' +
				'<div class="field">' +
				'<label for="counter">Cat Counter: </label>' +
				'<input type="text" id="counter"><br/>' +
				'</div>' +
				'<div class="field">' +
				'<label for="image">Cat Image: </label>' +
				'<input type="text" id="image"><br/>' +
				'</div><br/>' +
				'<button type="submit" id="submitForm">Save</button>' +
				'<button type="cancel" id="cancelForm">Cancel</button>' +
				'</form>';

			this.adminButton = $('#admin');
			this.formArea = $('#formArea');
			this.renderForm();


		},
		renderAdminButton: function() {
			this.adminArea.html(this.htmlStr);
		},
		renderForm: function() {
			this.adminButton.click((function(formCopy, htmlStrCopy){
				return function(){
					formCopy.html(htmlStrCopy);



					var oldName = $('#displayCatName');
					var oldCounter = $('#displayCatCounter');
					var oldImage = $('#displayCatImage');

					var submit = $('#submitForm');
					submit.click(function(e){
						var newName = $('#name').val();
						var newCounter = $('#counter').val();
						var newImage = $('#image').val();

						var oldName = $('#displayCatName');
						var oldCounter = $('#displayCatCounter');
						var oldImage = $('#displayCatImage');
						var oldNameValue = oldName.text();

							console.log(newName, newCounter, newImage, oldName.text());
							octopus.updateCat(newName, newCounter, newImage, oldNameValue);
							view.init();
							oldName.text(newName);
							oldCounter.text(newCounter);
							oldImage.attr('src', newImage);
							formCopy.html('');
							e.preventDefault();
					});
				}
			})(this.formArea,this.htmlStr));
		}
	};

	octopus.init();

});
