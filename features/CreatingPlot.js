describe("Feature: Create a plot, as developer, so that I can present data", function() {
	describe("Scenario: Creating a circle", function() {
		var div = document.getElementById("div0");
		var scene = SD.sceneMaker({div:div}); //crear scene
		it("Given a scene created with 'sceneMaker({div:div})'",function() {
			expect(scene.div).toBe(div);
		});
		var circle = SD.circleMaker(); //cerar graph of a function
		scene.add(circle); 
		it("And a circle with circleMaker() added to the scene",function() {
			expect(scene.children.length).toBe(1);
		});
		scene.plotSVG();
		it("when ploting", function() {
			expect(circle.svgElement).not.toBeNull();
		});
		it("Then the plot should contain a graph of a circle", function() {
			var circleSVG = scene.svgElement.getElementById(circle.identificator);
			expect(circleSVG).toBe(circle.svgElement);
		});
		it("and the SVGElement of the scene should be fully inside the <div>.", function() {
			expect(scene.svgElement).toBeFullyContainedIn(div);
		})
	});


	describe("Scenario: Ploating points", function() {
		var div = document.getElementById("div03");
		var scene = SD.sceneMaker({div:div}); //crear scene
		it("Given a scene",function() {
		 	expect(scene.div).toBe(div);
		});
		for (i = 10; i <100; i+=10){
			var spec = {x:i,y:i}
			scene.add(SD.pointMaker(spec)); //cerar graph of a function
		};
		it("And 9 points with pointMaker(spec) added to the scene",function() {
			expect(scene.children.length).toBe(9);
		});
		scene.plotSVG();
		// xit("when ploting", function() {
		// 	expect(circle.svgElement).not.toBeNull();
		// });
		// xit("Then the plot should contain a graph of a circle", function() {
		// 	var circleSVG = scene.svgElement.getElementById(circle.identificator);
		// 	expect(circleSVG).toBe(circle.svgElement);
		// });
	});


	describe("Scenario: Creating standard square plot of a function in rectanguled div", function() {
		var div = document.getElementById("div1");
		//var div = document.createElement('div');
		var scene = SD.sceneMaker({div:div}); //crear scene
		it("Given a scene",function() {
			expect(scene.div).toBe(div);
		});
		var functionGraph = SD.functionGraphMaker(); //cerar graph of a function
		scene.add(functionGraph); 
		it("And instance of FunctionGraph added to scene",function() {
			expect(scene.children.length).toBe(1);
		});
		scene.plotSVG();
		it("when ploting", function() {
			expect(functionGraph.svgElement).not.toBeNull();
		});
		it("Then the plot should contain a graph of a quadratic recurrence equation function", function() {
			var funEl = scene.svgElement.getElementById(functionGraph.identificator);
			expect(funEl).toBe(functionGraph.svgElement);
		});
		it("and the SVGElement of the scene should be fully inside the <div>.", function() {
			expect(scene.svgElement).toBeFullyContainedIn(div);
		})
	});

	describe("Background: Having scene, and functionGraph created", function() {
		describe("Scenario: Scaling <svg> to fit horizontal <div>", function() {
			var scene = SD.sceneMaker(); 
			var functionGraph = SD.functionGraphMaker();
			scene.add(functionGraph); 
			var div = document.getElementById('div2');
			scene.div = div;
			scene.plotSVG();
			xit("The SVGElement of the scene be descendant of 'div'", function() {
				expect(scene.svgElement).toBeDescendantOf(div);
			});
			xit("and should be fully contained inside the <div>.", function() {
				expect(scene.svgElement).toBeFullyContainedIn(div);
			});
		});
		describe("Scenario: Scaling horizontal <svg> to fit squared <div>", function() {
			var scene = SD.sceneMaker(); 
			var functionGraph = SD.functionGraphMaker();
			scene.add(functionGraph); 
			var div = document.getElementById('div3');
			scene.div = div;
			var range = new Range(0,100,0,50);
			scene.range =range;
			functionGraph.range = range;
			scene.plotSVG();
			xit("The SVGElement of the scene be descendant of 'div'", function() {
				expect(scene.svgElement).toBeDescendantOf(div);
			});
			xit("and should be fully contained inside the <div>.", function() {
				expect(scene.svgElement).toBeFullyContainedIn(div);
			});
		});
		describe("Scaling vertical <svg> to fit squared <div>", function() {
			var div = document.getElementById('div4');
			var scene = new Scene(div);
			var range = new Range(0,50,0,100);
			scene.range =range;
			var functionGraph = new FunctionGraph();
			functionGraph.range = range;
			scene.add(functionGraph); 
			scene.plotSVG();
			xit("The SVGElement of the scene be descendant of 'div'", function() {
				expect(scene.svgElement).toBeDescendantOf(div);
			});
			xit("and should be fully contained inside the <div>.", function() {
				expect(scene.svgElement).toBeFullyContainedIn(div);
			});
		});
	});	

	describe("Scenario: Creating a Plot with two points and a line between them", function() {
		var div = document.getElementById('div5');
		var scene, point1, point2, line;
		xit("Given a new Scene", function() {
			scene = new Scene();
			scene.div = div;
			//scene.plotSVG();
			//expect(expect(scene.svgElement).toBeFullyContainedIn(div));
		});
		xit("and creating two points and adding them to the scene", function() {
			point1 = new Point(10,10);
			point2 = new Point(90,60);
			scene.add(point1);
			expect(point1.parentSceneElement).toBe(scene.elements);
			scene.add(point2);
			scene.plotSVG();
			expect(expect(point1.svgElement).toBeFullyContainedIn(scene.svgElement));
		});
		xit("and creating line beetwen them", function() {});
		xit("then we should see a plot with two points and a line", function() {});
	});
});
