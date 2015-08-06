var protractor = require('/usr/local/lib/node_modules/protractor');
describe('TodoMVC Protractor Assignment', function() { 

	browser.manage().window().setSize(1080, 2200);

    beforeEach(function () {
        browser.ignoreSynchronization = true;
		browser.get('http://localhost:8080/todomvc/examples/angularjs/#/'); 
    }, 5000);

    afterEach(function () {
        //common.checkJSLogs(this);
        browser.manage().deleteAllCookies();
    });
 
	//The URL is correct. 	 
 	it('should show correct URL.', function() { 
 		expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/todomvc/examples/angularjs/#/'); 
 	}); 
 	  	
	//The page title is correct 
 	it('should show correct page title.', function () { 
 		expect(browser.getTitle()).toEqual('AngularJS • TodoMVC'); 
 	}); 
 
 
 	//A user can add a todo item.
 	it('should add a todo by user.', function () { 
 		element(by.model('newTodo')).sendKeys("todoMVC"); 
 		element(by.id('todo-form')).submit(); 
 		expect(element(by.id('todo-count')).getText()).toEqual('1 item left'); 
 	}); 
 
 
 	//The list of current todo items is correct.
 	it('should match current todo items', function () { 
 		element(by.model('newTodo')).sendKeys("AngularJS Optimized"); 
 		element(by.id('todo-form')).submit(); 
 		expect(element.all(by.binding('todo.title')).last().getText()).toEqual('AngularJS Optimized'); 
	}); 
 	 
 	//A user can change views("All", "Active", "Completed")  
	it('should changes views(all, active, completed'', function () {
        //Change focus to the next window
        browser.getAllWindowHandles().then(function (handles) {
            homePageHandle = handles[0];
            newWindowHandle = handles[1];
            browser.switchTo().window(newWindowHandle).then(function () {
                //Assert the URL
                expect(browser.getCurrentUrl()).toContain('http://localhost:8080/todomvc/examples/angularjs/#/active');
                browser.driver.close().then(function () {
                    browser.switchTo().window(homePageHandle);
                });
            });

        });
    });
 
 	//A user can mark an item as completed 
 	it('should mark an item as complete', function() { 
 		element(by.model('newTodo')).sendKeys("Assignment"); 
 		element(by.id('todo-form')).submit(); 
 		element(by.model('todo.completed')).click(); 
 		expect(element(by.id('todo-count')).getText()).toEqual('2 items left'); 
 	}); 
 
 
 	//Items is made 0 when user clicks allChecked Input Button
 	it('should clear count when user clicks allChecked input.', function() { 
 		element(by.id('toggle-all')).click(); 
 		expect(element(by.id('todo-count')).getText()).toEqual('0 items left'); 
 	}); 
 
 
 	//Clears out all inouts when user clicks on clear complete. 
 	it('should clear all inputs when user clicks on clear complete.', function() { 
 		element(by.id('clear-completed')).click(); 
 		expect(element.all(by.css('#filters a')).get(0).isDisplayed()).toBeFalsy(); 
 	}); 
 }); 
