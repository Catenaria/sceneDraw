describe("Feature: Create a plot, as developer, so that I can present data", function() {
  var range2 = SD.rangeMaker({yMax: 50});
  var range3 = SD.rangeMaker({xMax: 50});
  describe("Scenario: Creating a circle", function() {
    var div = document.getElementById("div0");
    var scene = SD.sceneMaker({div:div}); //crear scene
    it("Given a scene created with 'sceneMaker({div:div})'",function() {
      expect(scene.div).toBe(div);
    });
    var circle = SD.circleMaker(); //cerar graph of a function
    scene.add(circle); 
    it("And a circle with circleMaker() added to the scene with scene.add(circle)",function() {
      expect(scene.children.length).toBe(1);
    });
    scene.plotSVG();
    it("when ploting", function() {
      expect(circle.svgElement).not.toBeNull();
    });
    it("Then the plot should contain a graph of a circle", function() {
      var circleSVG = scene.svgElement.getElementById(circle.identificator);
      expect(circleSVG).toBe(circle.svgElement);
      expect(circleSVG.tagName).toBe("circle")
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
  });

  describe("Scenario: Ploating a line", function() {
    var div = document.getElementById("div06");
    var scene = SD.sceneMaker({div:div}); //create scene
    it("Given a scene",function() {
      expect(scene.div).toBe(div);
    });
    var line = SD.lineMaker({style: "->"});
    scene.add(line);
    it("And a line= lineMaker() added to the scene",function() {
      expect(scene.children.length).toBe(1);
    });
    scene.plotSVG();
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
      functionGraph.color = "red";
      scene.add(functionGraph); 
      var div = document.getElementById('div2');
      scene.div = div;
      scene.plotSVG();
      it("The SVGElement of the scene be descendant of 'div'", function() {
	expect(scene.svgElement).toBeDescendantOf(div);
      });
      it("and should be fully contained inside the <div>.", function() {
	expect(scene.svgElement).toBeFullyContainedIn(div);
      });
    });

    describe("Scenario: Scaling horizontal <svg> to fit squared <div>", function() {
      var scene = SD.sceneMaker(); 
      var functionGraph = SD.functionGraphMaker();
      scene.add(functionGraph); 
      var div = document.getElementById('div3');
      scene.div = div;
      scene.range =range2;
      functionGraph.range = range2;
      scene.plotSVG();
      it("The SVGElement of the scene be descendant of 'div'", function() {
	expect(scene.svgElement).toBeDescendantOf(div);
      });
      it("and should be fully contained inside the <div>.", function() {
	expect(scene.svgElement).toBeFullyContainedIn(div);
      });
    });
    describe("Scaling vertical <svg> to fit squared <div>", function() {
      var div = document.getElementById('div4');
      var scene = SD.sceneMaker({div:div}); 
      var functionGraph = SD.functionGraphMaker();
      scene.range =range3;
      var functionGraph = SD.functionGraphMaker({style:".", color:"blue", numberOfSegments:100, pointSize:"0.1px"})
      functionGraph.range = range3;
      scene.add(functionGraph); 
      scene.plotSVG();
      it("The SVGElement of the scene be descendant of 'div'", function() {
	expect(scene.svgElement).toBeDescendantOf(div);
      });
      it("and should be fully contained inside the <div>.", function() {
	expect(scene.svgElement).toBeFullyContainedIn(div);
      });
    });
  });	

  describe("Scenario: Creating a Plot with two points and a line between them", function() {
    var div = document.getElementById('div5');
    var scene, point1, point2, line;
    var scene = SD.sceneMaker({div:div});
    it("Given a new Scene", function() {
      scene.plotSVG();
      expect(expect(scene.svgElement).toBeFullyContainedIn(div));
    });
    it("and creating two points and adding them to the scene", function() {
      point1 = SD.pointMaker({x:10,y:10});
      point2 = SD.pointMaker({x:90,y:60});
      scene.add(point1);
      expect(point1.parent).toBe(scene);
      scene.add(point2);
      scene.plotSVG();
      expect(expect(point1.svgElement).toBeFullyContainedIn(scene.svgElement));
    });
    xit("and creating line beetwen them", function() {});
    xit("then we should see a plot with two points and a line", function() {});
  });

  describe("Scenario: Creating a moving circle", function() {
    var div = document.getElementById("div10");
    var scene = SD.sceneMaker({div:div}); //crear scene
    it("Given a scene created with 'sceneMaker({div:div})'",function() {
      expect(scene.div).toBe(div);
    });
    var circle = SD.circleMaker({x:10,y:10,r:10}); //cerar graph of a function
    scene.add(circle); 
    it("And a circle with circleMaker() added to the scene with scene.add(circle)",function() {
      expect(scene.children.length).toBe(1);
    });
    
    it("aaa", function() {
      scene.plotSVG();
      circle.x=50;
      circle.y=50;
      scene.plotSVG(); 
    })
  });

  describe("Scenario: Creating a moving function", function() {
    var div = document.getElementById("div11");
    var scene = SD.sceneMaker({div:div}); //crear scene
    it("Given a scene created with 'sceneMaker({div:div})'",function() {
      expect(scene.div).toBe(div);
    });
    var functionGraph = SD.functionGraphMaker(); //cerar graph of a function
    scene.add(functionGraph); 
    it("And a circle with circleMaker() added to the scene with scene.add(circle)",function() {
      expect(scene.children.length).toBe(1);
    });
    
    it("aaa", function() {
      scene.plotSVG();
      functionGraph.f = function(x) {return 2*x*(1-x/100)} 
      scene.plotSVG(); 
    })
  });

  describe("Scenario: Ploting an arrow", function() {
    var div = document.getElementById("divArrows");
    var scene = SD.sceneMaker({div:div}); //create scene
    it("Given a scene",function() {
      expect(scene.div).toBe(div);
    });
    var arrow1 = SD.lineMaker({style: "->", y1:80, y2:80});
    scene.add(arrow1);
    it("We add a arrow1 = SD.lineMaker({style: '->'}); ",function() {
      //expect(scene.children.length).toBe(1);
    });

    var arrow2 = SD.lineMaker({style: "->", y1:70, y2:70, color:'DarkViolet'});
    scene.add(arrow2);
    it("We add another with arrow2 = SD.lineMaker({style: '->', color:'DarkViolet'}); ",function() {
      //expect(scene.children.length).toBe(2);
    });

    var arrow3 = SD.lineMaker({style: "->", y1:60, y2:60, color:'blue', arrowColor:'Red'});
    scene.add(arrow3);
    it("We add another with arrow3 = SD.lineMaker({style: '->', color: 'blue', arrowColor:'Red'}); ",function() {
      //expect(scene.children.length).toBe(2);
    });

    var arrow4 = SD.lineMaker({style: "<-", y1:50, y2:50});
    scene.add(arrow4);
    it("We add another with arrow4 = SD.lineMaker({style: '<-'}); ",function() {
      //expect(scene.children.length).toBe(2);
    });

    var arrow5 = SD.lineMaker({style: "<->", y1:40, y2:40});
    scene.add(arrow5);
    it("We add another with arrow5 = SD.lineMaker({style: '<->'}); ",function() {
      //expect(scene.children.length).toBe(2);
    });

    var arrow6 = SD.lineMaker({style: ">->", x1: 20, x2: 70, y1:30, y2:30});
    scene.add(arrow6);
    it("We add another with arrow6 = SD.lineMaker({style: '>->'}); ",function() {
      //expect(scene.children.length).toBe(2);
    });

    var arrow7 = SD.lineMaker({style: "<-<", x1: 20, x2: 70, y1:20, y2:20, arrowColor: 'DarkViolet'});
    scene.add(arrow7);
    it("We add another with arrow7 = SD.lineMaker({style: '<-<'}); ",function() {
      //expect(scene.children.length).toBe(2);
    });

    var arrow8 = SD.lineMaker({style: ">-<", x1: 20, x2: 70, y1:10, y2:10});
    scene.add(arrow8);
    it("We add another with arrow8 = SD.lineMaker({style: '>-<'}); ",function() {
      //expect(scene.children.length).toBe(2);
    });

    var arrow9 = SD.lineMaker({style: "-->", x1: 90, x2: 90, y1:10, y2:90, arrowSize:30});
    scene.add(arrow9);
    it("We add another with arrow8 = SD.lineMaker({style: '-->', arrowSize:30}); ",function() {
      //expect(scene.children.length).toBe(2);
    });

    scene.plotSVG();
  });



  describe("Scenario: Creating a path", function() {
    var div = document.getElementById("divPaths");
    var scene = SD.sceneMaker({div:div}); //crear scene
    it("Given a scene created with 'sceneMaker({div:div})'",function() {
      expect(scene.div).toBe(div);
    });
    var path1 = SD.pathMaker(); //cerar graph of a function
    scene.add(path1); 
    var path2 = SD.pathMaker({closed: true, x:[10,30,20], y:[30,30,50]}); //cerar graph of a function
    scene.add(path2); 

    scene.plotSVG();
    it("And a path with SD.pathMaker() added to the scene with scene.add(path)",function() {
      expect(scene.children.length).toBe(2);
    });
    it("and another path with SD.pathMaker({closed:true})", function() {
      expect(scene.children.length).toBe(2);
    });
  });

  describe("Scenario: Creating a function with a path", function() {
    var div = document.getElementById("divFunc");
    var range = {xMin: -10, xMax:10, yMin:-5, yMax: 40};
    var scene = SD.sceneMaker({div:div, range:range}); //crear scene
    it("Given a scene created with 'sceneMaker({div:div})'",function() {
      expect(scene.div).toBe(div);
    });
    var func = SD.functionGraphMaker({range:range}); //crear graph of a function
    func.f = function (x) { return x*x;};
    scene.add(func); 
    scene.plotSVG();
    xit("And a function with SD.pathMaker() added to the scene with scene.add(path)",function() {
      expect(scene.children.length).toBe(2);
    });
  });

  describe("Scenario: Creating a path with range", function() {
    var div = document.getElementById("divPathRange");
    var scene = SD.sceneMaker({div:div}); //crear scene
    it("Given a scene created with 'sceneMaker({div:div})'",function() {
      expect(scene.div).toBe(div);
    });
    var path1 = SD.pathMaker({range: {xMin: 30, xMax:80, yMin: 5, yMax: 70}, closed:true}); //cerar graph of a function
    var path2 = SD.pathMaker({x:[30,80,80,30], y:[5,5,70,70],  closed:true});
    //scene.add(path2);
    scene.add(path1).plotSVG();
  });
});
